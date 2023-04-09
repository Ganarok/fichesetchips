<template>
    <GameLayout
        :loading="loading"
        :socket="socket"
    >
        <!-- La map -->

        <Suspense>
            <GameContainer />

            <template #fallback>
                <div
                    class="flex h-screen w-screen justify-center items-center bg-fc-black-light"
                >
                    <Loader />
                </div>
            </template>
        </Suspense>
    </GameLayout>
</template>

<script>
import { useToast } from "vue-toastification"
import { mapState } from "vuex"

import GameContainer from "@/components/phaser/GameContainer"
import GameLayout from "@/layouts/Game.vue"
import Loader from "@/components/common/Loader.vue"
import { useSocketIO } from "@/utils/socket.io"

export default {
    // TODO: On fait un call api voir si la ROOM existe
    // Si elle existe pas, on redirige vers la page d'erreur
    // Si elle existe, on connecte l'utilisateur en socket
    // Si l'utilisateur est connecté, on apiCall pour récupérer les infos de la map dans la BootScene
    // Ensuite, on envoie la map dans la GameScene
    name: "Session",
    components: {
        GameContainer,
        GameLayout,
        Loader
    },
    data() {
        return {
            loading: true,
            roomId: this.$route.params.id,
            connectionId: null,
            socket: null
        }
    },
    computed: {
        ...mapState("game", {
            connected: (state) => state.connected,
        })
    },
    mounted() {
        const { socket } = useSocketIO()
        const toast = useToast()
        this.socket = socket

        socket.on("connect", () => {
            socket.emit("join", {
                roomId: this.roomId,
            })
        })

        socket.on("room_joined", (n) => {
            toast.success("You joined the room")

            this.connected = true
            this.loading = false
            this.connectionId = n.connectionId

            socket.emit("message", {
                text: "joined the room",
                senderName: this.$store.state.user.username || n.connectionId,
                roomId: this.roomId,
            })
        })

        socket.on("connect_error", () => {
            toast.error("You failed to connect to the server")
            this.loading = false
        })
    },
    beforeUnmount() {
    }
}
</script>
