<!-- eslint-disable -->
<template>
    <div class="flex flex-col relative w-full h-full justify-between bg-fc-black-light border-2 border-fc-black">
        <div 
            class="flex flex-col h-full w-full text-white items-start justify-end p-4"
        >
        <div v-if="messages.length > 0">
            
            <p 
            v-for="(message, index) in messages" :key="index"
                class="flex space-x-2"
            >
                <span class="font-bold">
                    {{ message.senderName }}
                </span>
                : 
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
            class="p-2 m-1 focus:outline-fc-green"
            autofocus
            @input="message = $event.target.value"
            @keyup.enter="sendMessage(message); message = ''"
        />

        <img 
            src="../assets/cornerPixels.svg" 
            alt="pixels" 
            class="w-12 h-12 absolute top-0 right-0"
        />
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    name: "Chat",
    props: {
        socket: {
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
            this.messages.push(message)
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
