<template>
    <div 
        class="flex flex-col w-full h-full justify-between space-y-4 p-4 text-white"
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

        <div class="flex justify-center">
            <router-link
                to="/rooms"
                class="flex font-bold hoverStyle bg-fc-yellow text-fc-black p-3"
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

export default {
    name: "Options",
    computed: {
        ...mapState('game', {
            vocal_url: state => state.vocal_url,
            gm: state => state.gm
        })
    },
}

</script>