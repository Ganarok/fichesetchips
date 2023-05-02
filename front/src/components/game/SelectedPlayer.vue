<template>
    <div 
        v-if="Object.keys(selectedPlayerFromPhaser).length && is_gm"
        class="absolute right-0"
    >
        <div
            class="flex flex-col relative items-center pb-4 bg-fc-black-light transition-all duration-200"
            :class="isOpened ? 'w-72' : 'w-0 animate-pulse'"
        >
            <div 
                class="absolute items-center h-8 w-6 -left-6 top-4 rounded-l-lg bg-fc-yellow border border-fc-black z-20 cursor-pointer"
                @click="isOpened = !isOpened"
            >
                <div class="flex items-center justify-center h-full w-full -rotate-90">
                    <img
                        src="@/assets/selector_black.svg"
                        class="object-contain"
                        alt="Arrow"
                        :class="
                            isOpened
                                ? 'transition duration-250'
                                : 'transition duration-250 rotate-180'
                        "
                    >
                </div>
            </div>

            <div 
                v-if="isOpened"
                class="flex flex-col w-full space-y-4"
            >
                <div class="flex h-16 w-full space-x-3 items-center justify-center bg-fc-green border border-fc-black">
                    <div class="relative h-6 w-6">
                        <img
                            src="@/assets/icons/user.svg"
                            class="object-contain"
                            alt="Chat"
                        />
                    </div>

                    <p class="text-fc-black font-bold">
                        Personnage selectionné
                    </p>
                </div>

                <div class="flex flex-col px-2 space-y-2">
                    <p class="font-bold text-fc-yellow text-xl">
                        {{ selectedPlayerFromPhaser.character.firstname }} {{ selectedPlayerFromPhaser.character.lastname }}
                    </p>
    
                    <p class="text-white">
                        {{ `${selectedPlayerFromPhaser.character.hp} HP. ${selectedPlayerFromPhaser.character.experience_points} EXP.` }}
                    </p>
    
                    <p class="text-white">
                        {{ `X: ${selectedPlayerFromPhaser.character.x} Y: ${selectedPlayerFromPhaser.character.y}` }}
                    </p>

                    <div class="self-center">
                        <Button
                            :button-text="$t('Déplacer')"
                            class="bg-fc-green p-3"
                            textColor="text-fc-black"
                            color="fc-green"
                            :rounded="false"
                            @click="() => triggerMovePlayer()"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import Button from '@/components/common/Button.vue'
import store from '@/store'

export default {
    name: "SelectedPlayer",
    components: {
        Button
    },
    props: {
        socket: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            isOpened: false
        }
    },
    computed: {
        ...mapState('game', {
            selectedPlayerFromPhaser: (state) => state.selectedPlayerFromPhaser,
            is_gm: (state) => state.diary.is_gm
        })
    },
    watch: {
        selectedPlayerFromPhaser: function (val) {
            if (val) {
                this.isOpened = true
            } else {
                this.isOpened = false
            }
        }
    },
    methods: {
        triggerMovePlayer() {
            store.commit('game/updateState', {
                property: 'isMovingPlayer',
                newState: true
            })
            this.isOpened = false
        }
    }
}
</script>