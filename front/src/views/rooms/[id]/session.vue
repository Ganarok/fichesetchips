<template>
    <GameLayout
        :loading="loading"
    >
        <!-- La map -->
    </GameLayout>
</template>

<script>
import GameLayout from "@/layouts/Game.vue"
import Loader from "@/components/Loader.vue"
import Chat from "@/components/Chat.vue"
import { useSocketIO } from "@/utils/socket.io"
import { useToast } from "vue-toastification"
import { Ref } from "vue"

export default {
    name: "Session",
    components: {
        GameLayout,
        Loader,
        Chat,
    },
    data() {
        return {
            connected: false,
            loading: true,
            roomId: this.$route.params.id,
            connectionId: null,
            messages: [],
            socket: null,
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

            this.socket.emit("message", {
                text: "joined the room",
                senderName: this.$store.state.user.username || n.connectionId,
                roomId: this.roomId,
            })
        })

        socket.on("connect_error", () => {
            toast.error("You are not connected to the server")
            this.loading = false
        })

        socket.on("message", (message) => {
            this.messages.push(message)
        })
    },
    methods: {
        sendMessage(text) {
            const newMessage = {
                text,
                senderName: this.connectionId,
                roomId: this.roomId,
            }

            this.socket.emit("message", newMessage)
            this.messages.push(newMessage)
        },
    },
}
</script>
