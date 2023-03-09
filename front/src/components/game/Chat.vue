<!-- eslint-disable -->
<template>
    <div class="flex flex-col relative w-full justify-end bg-fc-black-light">
        <div 
            class="flex flex-col w-full text-white items-start justify-end px-4 py-2"
            :style="{
                height: 'calc(100vh - 114px )'
            }"
        >
            <div 
                v-if="messages.length > 0"
                class="flex flex-col space-y-4 overflow-y-auto scrollbar-hide w-full z-10"
            >
                <p 
                v-for="(message, index) in messages" :key="index"
                    class="flex flex-col space-y-1"
                >
                    <span class="w-full font-bold text-fc-yellow">
                        {{ message.senderName }} :
                    </span>

                    <span>
                        {{ message.text }}
                    </span>
                </p>
            </div>

            <p
                v-else
                class="opacity-50"
            >
                No messages
            </p>
        </div>

        <input
            type="text"
            :model="message"
            :value="message"
            placeholder="Type your message"
            class="p-2 mx-2 m-1 focus:outline-fc-green"
            autofocus
            @input="message = $event.target.value"
            @keyup.enter="sendMessage(message); message = ''"
        />

        <img 
            src="@/assets/cornerPixels.svg" 
            alt="pixels" 
            class="w-12 h-12 absolute top-1 right-1 opacity-50"
        />
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
    name: "Chat",
    props: {
        socket: {
            type: Object,
            required: true
        },
    },
    computed: {
        ...mapState("user", {
            user: (state) => state.user
        }),
        ...mapState("game", {
            messages: (state) => state.messages
        }),
    },
    mounted() {
        this.socket.on("message", (message) => {
            this.pushMessage(message)
        })
    },
    methods: {
        ...mapMutations({
            pushMessage: "game/pushMessage",
            resetMessages: "game/resetMessages",
        }),
        sendMessage(text) {
            const newMessage = {
                text,
                senderName: this.user.username || this.socket.id,
                roomId: this.roomId,
            }

            this.socket.emit("message", newMessage)
            this.pushMessage(newMessage)
        },
    },
}
</script>
