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
        </div>

        <div class="flex justify-evenly">
            <Button
                v-if="is_gm"
                :button-text="$t('Pauser la partie')"
                class="bg-fc-green px-4 py-2 text-base"
                textColor="text-fc-black"
                color="fc-yellow"
                :rounded="false"
                @click="pauseGame()"
            />

            <router-link
                to="/rooms"
                class="flex font-bold hoverStyle bg-fc-red text-fc-black p-3"
            >
                <p class="text-base">
                    Quitter la partie 
                </p>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

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
        pauseGame() {
            console.log('pauseGame')
        }
    }
}

</script>