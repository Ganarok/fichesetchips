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

export default {
    name: 'Chat',
    props: {
        connected: {
            type: Boolean,
            required: true
        },
        // messages: Array,
        sendMessage: {
            type: Function,
            required: true,
        }
    },
    data() {
        return {
            message: ''
        }
    },
}

</script>