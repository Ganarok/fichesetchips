<template>
    <div 
        class="flex flex-col w-full justify-between space-y-4 p-4 overflow-y-scroll text-white"
        :style="{
            height: 'calc(100vh - 64px)'
        }"
    >
        <div class="flex flex-col space-y-4">
            <p class="self-start font-bold text-fc-yellow text-xl">
                Options
            </p>

            <div
                v-if="vocal_url"
                class="flex flex-col"
            >
                <p class="font-bold text-lg">
                    Vocal
                </p>

                <p class="underline italic">
                    {{ vocal_url }}
                </p>
            </div>

            <div class="flex flex-col">
                <p class="font-bold text-lg">
                    MJ
                </p>

                <p>
                    {{ gm.username }}
                </p>
            </div>

            <Button
                :button-text="$t('Pauser la partie')"
                class="bg-fc-green p-3 text-base self-center hoverStyle"
                textColor="text-fc-black"
                color="fc-yellow"
                :rounded="false"
                @click="resetMessages()"
            />
        </div>

        <div class="flex space-x-2 justify-evenly">
            <Button
                v-if="is_gm"
                :button-text="$t('Pauser la partie')"
                class="bg-fc-green p-3 text-base hoverStyle"
                textColor="text-fc-black"
                color="fc-yellow"
                :rounded="false"
                @click="pauseGame()"
            />

            <router-link
                to="/rooms"
                class="flex items-center font-bold hoverStyle bg-fc-red text-center text-fc-black p-3"
            >
                <p class="text-base">
                    Quitter la partie 
                </p>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

import Button from '@/components/common/Button.vue'

export default {
    name: "Options",
    components: {
        Button
    },
    computed: {
        ...mapState('game', {
            vocal_url: state => state.vocal_url,
            gm: state => state.gm,
            is_gm: state => state.diary.is_gm
        })
    },
    methods: {
        ...mapMutations('game', [
            'resetMessages'
        ]),
        pauseGame() {
            console.log('pauseGame')
        },
    }
}

</script>