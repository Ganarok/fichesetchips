<template>
    <div class="flex flex-col relative w-full h-full justify-between bg-fc-black-light border-2 border-fc-black">
        <div 
            class="flex flex-col h-full w-full text-white items-start justify-end p-4"
        >
            <p 
                v-if="messages.length > 0"
                v-for="(message, index) in messages"
                class="flex space-x-2"
            >
                <p class="font-bold">
                    {{ message.senderName }}
                </p>
                : 
                <p>
                    {{ message.text }}
                </p>
            </p>

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
            @input="message = $event.target.value"
            placeholder="Type your message"
            @keyup.enter="sendMessage(message); message = ''"
            class="p-2 m-1 focus:outline-fc-green"
            autofocus
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
        messages: {
            type: Array,
            default: []
        },
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