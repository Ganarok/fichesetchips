<template>
    <div class="flex w-screen">
        <div
            v-if="current_map_title"
            class="absolute right-0 m-4 text-fc-yellow transition opacity-40 hover:opacity-100 delay-200 hover:delay-75"
        >
            <div class="bg-fc-black-light p-4">
                <p class="font-bold">
                    {{ current_map_title }}
                </p>
            </div>
        </div>

        <div
            v-if="!loading"
            class="absolute left-0"
        >
            <div 
                class="flex flex-col relative items-center h-screen bg-fc-black transition-all duration-200"
                :class="sidebarOpened ? 'w-72' : 'w-0 animate-pulse'"
            >
                <div 
                    class="absolute items-center h-8 w-6 -right-6 top-4 rounded-r-lg bg-fc-yellow border border-fc-black z-20 cursor-pointer"
                    @click="sidebarOpened = !sidebarOpened"
                >
                    <div 
                        class="flex items-center justify-center h-full w-full rotate-90"
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
                            v-if="is_gm"
                            class="relative h-10 w-10 p-1 hoverStyle"
                            :class="selectedOption === 'gm' && 'border-2 bg-fc-yellow border-black'"
                            @click="selectedOption = 'gm'"
                        >
                            <img
                                src="@/assets/icons/gm.svg"
                                class="object-contain"
                                alt="Chat"
                            />
                        </div>

                        <div
                            v-if="!is_gm"
                            class="relative h-10 w-10 p-1 hoverStyle"
                            :class="selectedOption === 'character' && 'border-2 bg-fc-yellow border-black'"
                            @click="selectedOption = 'character'"
                        >
                            <img
                                src="@/assets/icons/user.svg"
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
                    <GM v-if="selectedOption === 'gm' && is_gm" />
                    <Character v-if="selectedOption === 'character' && !is_gm" />
                    <Diary v-if="selectedOption === 'diary'" />
                    <Options v-if="selectedOption === 'options'" />
                </div>
            </div>
        </div>

        <slot />
    </div>
</template>

<script>
import { mapState } from 'vuex'

import Chat from '@/components/game/Chat.vue'
import Diary from '@/components/game/Diary.vue'
import Options from '@/components/game/Options.vue'
import Character from '@/components/game/Character.vue'
import GM from '@/components/game/GM.vue'

export default {
    name: "GameLayout",
    components: {
        Chat,
        Options,
        Diary,
        Character,
        GM
    },
    props: {
        loading: {
            type: Boolean,
            required: true
        },
        socket: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            selectedOption: 'chat',
            sidebarOpened: false
        }
    },
    computed: {
        ...mapState('game', {
            current_map_title: (state) => state.current_map_title,
            is_gm: (state) => state.diary.is_gm
        })
    },
    created() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Tab')
                this.sidebarOpened = !this.sidebarOpened
        })
    }
}
</script>
