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

import GameContainer from "@/components/phaser/GameContainer"
import GameLayout from "@/layouts/Game.vue"
import Loader from "@/components/common/Loader.vue"
import { useSocketIO } from "@/utils/socket.io"

export default {
    name: "Session",
    components: {
        GameContainer,
        GameLayout,
        Loader
    },
    data() {
        return {
            connected: false,
            loading: true,
            roomId: this.$route.params.id,
            connectionId: null,
            socket: null
        }
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
            toast.error("You are not connected to the server")
            this.loading = false
        })
    },
    beforeUnmount() {
    }
}
</script>
