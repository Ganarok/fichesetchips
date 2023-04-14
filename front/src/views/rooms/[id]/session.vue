<template>
    <GameLayout
        :loading="loading"
        :socket="socket"
    >
        <div
            v-if="loading"
            class="flex h-screen w-screen justify-center items-center bg-fc-black-light"
        >
            <Loader v-if="!error" />

            <div
                v-else
                class="flex flex-col text-center items-center space-y-4"
            >
                <p class="font-bold text-white text-2xl max-w-prose">
                    {{ error }}
                </p>

                <Button
                    :button-text="$t('Reconnexion')"
                    class="bg-fc-green px-4 py-2 text-base max-w-xs"
                    textColor="text-fc-black"
                    color="fc-green"
                    :rounded="false"
                    @click="handleReconnect()"
                />
            </div>
        </div>

        <Suspense 
            v-else
        >
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
import { mapActions } from "vuex"

import { useSocketIO } from "@/utils/socket.io"
import GameContainer from "@/components/phaser/GameContainer"
import GameLayout from "@/layouts/Game.vue"
import Loader from "@/components/common/Loader.vue"
import Button from "@/components/common/Button.vue"
import { GAMESTATUS } from '@/utils/enums'

export default {
    name: "Session",
    components: {
        GameContainer,
        GameLayout,
        Button,
        Loader
    },
    data() {
        return {
            connected: false,
            loading: true,
            roomId: this.$route.params.id,
            connectionId: null,
            socket: null,
            error: ''
        }
    },
    mounted() {
        this.initGame()
    },
    methods: {
        ...mapActions({
            init_session: "game/init_session"
        }),
        handleReconnect() {
            this.error = ''
            this.loading = true
            this.initGame()
        },
        async initGame() {
            try {
                const data = await this.init_session({ roomId: this.roomId })

                if (data.game.status !== GAMESTATUS.PLANNED) {
                    this.error = `La session n'est pas en cours (${data.game.status}).`
                    return
                }

                const { socket } = useSocketIO()
                const toast = useToast()
                this.socket = socket

                console.log('socket', socket)

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
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
