<template>
    <div class="flex flex-col">
        <div
            class="w-[13%] h-screen bg-fc-black flex flex-col justify-between fixed tablet:w-[20%]">
            <img src="../assets/logo.svg" class="m-[15%]" alt="logo" />
            <div class="text-center text-xl font-barlow text-white font-bold">
                <h1 class="m-[15%] underline opacity-80 hover:opacity-100">
                    <NuxtLink to="/"> Accueil </NuxtLink>
                </h1>
                <h1 class="m-[15%] opacity-80 hover:opacity-100">
                    <NuxtLink to="/about"> A propos </NuxtLink>
                </h1>
            </div>
            <div
                class="flex font-barlow text-center space-x-4 px-2 items-center sm:px-0 sm:space-x-0 sm:w-full sm:space-y-8 sm:flex-col"
            >
                <button
                    class="border-[3px] rounded-full text-fiche-green border-fiche-green m-[5%] p-[2%] opacity-80 hover:opacity-100">
                    <NuxtLink to="/login"> Se Connecter </NuxtLink>
                </button>
                <button
                    class="border-[3px] rounded-full text-chips-yellow border-chips-yellow m-[5%] p-[2%] opacity-80 hover:opacity-100">
                    <NuxtLink to="/login"> S'Inscrire </NuxtLink>
                </button>
                <img
                    src="../assets/marque.svg"
                    class="h-[20%] w-[20%] m-[8%] mt-[15%] ml-auto mr-auto"
                    alt="marque" />
                <p class="text-white text-[11px]">
                    Made with ❤️ by Fiches&Chips
                </p>
            </div>
        </div>

        <div
            v-on:scroll="scrollHandler"
            class="flex flex-col w-full sm:w-[87%] sm:mr-0 sm:ml-auto"
            id="top"
        >
            <div class="h-screen tashas font-barlow relative">
                <div
                    class="w-[41%] bg-fiche-green flex justify-between p-[2%] absolute bottom-[13%] tablet:w-[45%]">
                    <p
                        class="text-4xl text-white font-bold w-[75%] pr-[5%] tablet:text-2xl">
                        Notre site il est trop bien alors tu t’inscris et tu
                        kiffes ! Sinon je te retrouve et je te pète les genoux !
                    </p>
                    <button
                        class="border-[3px] rounded-full mt-[25%] text-3xl font-bold w-[25%] text-white tablet:text-xl opacity-80 hover:opacity-100">
                        <NuxtLink to="/login"> GO </NuxtLink>
                    </button>
                    <div
                        class="w-[45px] h-[45px] bg-fiche-green absolute bottom-0 right-0 translate-x-[45px] translate-y-[45px]"></div>
                </div>
            </div>
            <div class="flex flex-col background">
                <img
                    class="h-screen translate-x-[-25px] p-[3%] pl-0"
                    src="../assets/index/map.svg" />
                <img
                    class="h-screen self-center p-[3%]"
                    src="../assets/index/amis.svg" />
                <div
                    class="h-screen pl-[10%] self-end p-[3%] pr-0 relative flex">
                    <img src="../assets/index/perso.svg" />
                    <a
                        href="#top"
                        class="absolute bottom-0 right-0 w-[50px] h-[50px] m-[2%] opacity-80 hover:opacity-100">
                        <img src="../assets/vector.svg" alt="vector" />
                    </a>
                </div>
            </div>
        </div>

        <a
            @scroll="scrollHandler"
            href="#top"
            class="fixed transition-opacity bottom-0 right-0 w-[50px] h-[50px] m-[2%] z-50"
            v-show="isVisible"
        >
            <img src="../assets/vector.svg" alt="vector" />
        </a>
    </div>
</template>
<script lang="js">
import Vue from 'vue'
import MapVue from '~/components/svg/Map.vue'
import AmisVue from '~/components/svg/Amis.vue'
import PersoVue from '~/components/svg/Perso.vue'

export default Vue.extend({
    name: "IndexPage",
    mounted() {
        window.addEventListener('scroll', this.scrollHandler)
    },
    destroyed() {
        window.removeEventListener('scroll', this.scrollHandler)
    },
    data: function () {
        return { isVisible: false };
    },
    methods: {
        scrollHandler: function scrollHandler(e) {
            this.isVisible = e.target.scrollingElement.scrollTop > window.screen.height * 0.5 ? true : false;
        }
    },
    components: { MapVue, AmisVue, PersoVue }
})
</script>

<style>
.tashas {
    background-image: url('../assets/index/tashasCauldronOfEverythingDnd.svg');
    background-size: cover;
}

.background {
    background-image: url('../assets/index/pixelsBackgrounds.svg');
    background-size: cover;
}

html {
    scroll-behavior: smooth;
}
</style>
