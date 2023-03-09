<template>
    <div class="flex w-screen">
        <div
            v-if="loading"
            class="flex items-center justify-center"
        >
            <Loader />
        </div>

        <div
            v-else
            class="absolute left-0"
        >
            <div 
                class="flex flex-col relative items-center h-screen bg-fc-black transition-all duration-200"
                :class="sidebarOpened ? 'w-72' : 'w-0'"
            >
                <div class="absolute items-center h-8 w-6 -right-6 top-4 rounded-r-lg bg-fc-yellow border border-fc-black z-20 cursor-pointer">
                    <div 
                        class="flex items-center justify-center h-full w-full rotate-90"
                        @click="sidebarOpened = !sidebarOpened"
                    >
                        <img
                            src="@/assets/selector_black.svg"
                            class="object-contain"
                            alt="Arrow"
                            :class="
                                sidebarOpened
                                    ? 'transition duration-250'
                                    : 'transition duration-250 rotate-180'
                            "
                        >
                    </div>
                </div>
    
                <div 
                    v-if="sidebarOpened"
                    class="flex flex-col w-full"
                >
                    <div 
                        class="flex h-16 w-full items-center justify-evenly bg-fc-green border border-fc-black"
                    >
                        <div 
                            class="relative h-10 w-10 p-1 hoverStyle"
                            :class="selectedOption === 'chat' && 'border-2 bg-fc-yellow border-black'"
                            @click="selectedOption = 'chat'"
                        >
                            <img
                                src="@/assets/icons/chat.svg"
                                class="object-contain"
                                alt="Chat"
                            />
                        </div>
        
                        <div
                            class="relative h-10 w-10 p-1 hoverStyle"
                            :class="selectedOption === 'diary' && 'border-2 bg-fc-yellow border-black'"
                            @click="selectedOption = 'diary'"
                        >
                            <img
                                src="@/assets/icons/diary.svg"
                                class="object-contain"
                                alt="Chat"
                            />
                        </div>
        
                        <div 
                            class="relative h-10 w-10 p-1 hoverStyle"
                            :class="selectedOption === 'options' && 'border-2 bg-fc-yellow border-black'"
                            @click="selectedOption = 'options'"
                        >
                            <img
                                src="@/assets/icons/option_black.svg"
                                class="object-contain"
                                alt="Chat"
                            />
                        </div>
                    </div>
                    
                    <Chat
                        v-if="selectedOption === 'chat'"
                        :socket="socket"
                    />
                    <Diary v-if="selectedOption === 'diary'" />
                    <Options v-if="selectedOption === 'options'" />
                </div>
            </div>
        </div>

        <slot />
    </div>
</template>

<script>
import Chat from '@/components/game/Chat.vue'
import Diary from '@/components/game/Diary.vue'
import Options from '@/components/game/Options.vue'
import Loader from '@/components/Loader.vue'

export default {
    name: "GameLayout",
    components: {
        Loader,
        Chat,
        Options,
        Diary
    },
    props: {
        loading: {
            type: Boolean,
            required: true
        },
        socket: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            selectedOption: 'chat',
            sidebarOpened: true
        }
    },
    methods: {}
}
</script>
