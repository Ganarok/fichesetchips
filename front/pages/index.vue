<template>
    <div class="flex flex-col">
        <div
            class="flex flex-row w-full items-center bg-fc-black justify-between z-10 p-4 h-[10%] sm:p-auto sm:flex-col sm:fixed sm:h-screen sm:w-[13%]">
            <img
                src="../assets/logo.svg"
                class="w-[10%] sm:w-auto sm:m-[15%]"
                alt="logo" />
            <div
                class="text-center font-barlow text-white font-bold text-lg sm:text-xl">
                <h1 class="hover:underline">
                    <NuxtLink to="/"> {{ $t('Accueil') }} </NuxtLink>
                </h1>
            </div>
            <div
                class="flex font-barlow text-center space-x-4 px-2 items-center sm:px-0 sm:space-x-0 sm:w-full sm:space-y-8 sm:flex-col">
                <button
                    class="rounded-full text-fc-yellow border-fc-yellow border-2 p-1 px-2 sm:p-2 sm:border-[3px] min-w-[50%]">
                    <NuxtLink to="/login"> {{ $t("S'inscrire") }} </NuxtLink>
                </button>
                <button
                    class="rounded-full text-fc-green border-fc-green border-2 p-1 px-2 sm:p-2 min-w-[50%] sm:border-[3px]">
                    <NuxtLink to="/login"> {{ $t('Se connecter') }} </NuxtLink>
                </button>
                <img
                    src="../assets/marque.svg"
                    class="hidden sm:block sm:h-[20%] sm:w-[20%] mt-[15%] ml-auto mr-auto"
                    alt="Fiches&Chips" />
                <p class="hidden sm:block text-white text-[11px]">
                    {{ $t('Fait avec amour par Fiches&Chips') }}
                </p>
            </div>
        </div>

        <div
            v-on:scroll="scrollHandler"
            class="flex flex-col w-full sm:w-[87%] sm:mr-0 sm:ml-auto"
            id="top">
            <div class="h-screen tashas font-barlow relative">
                <div
                    class="flex flex-col w-[41%] bg-fc-green justify-between p-[2%] absolute bottom-[13%] tablet:w-[45%]">
                    <p
                        class="text-xl sm:text-2xl lg:text-3xl text-white font-bold w-[75%] pr-[5%] tablet:text-2xl">
                        Notre site il est trop bien alors tu t’inscris et tu
                        kiffes ! Sinon je te retrouve et je te pète les genoux !
                    </p>
                    <button
                        class="flex flex-row justify-center w-20 lg:w-24 xl:w-28 border-[3px] self-end rounded-full text-3xl font-bold text-white tablet:text-xl">
                        <NuxtLink to="/login"> GO -> </NuxtLink>
                    </button>
                    <div
                        class="w-[45px] h-[45px] bg-fc-green absolute bottom-0 right-0 translate-x-[45px] translate-y-[45px]"></div>
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
                    class="w-full pl-0 translate-x-[-10px] sm:translate-x-[-25px]">
                    <MapVue />
                </div>

                <div class="w-full self-center">
                    <AmisVue />
                </div>

                <div class="w-full mt-[8%] ml-[8%]">
                    <PersoVue />
                </div>
            </div>
        </div>

        <a
            @scroll="scrollHandler"
            href="#top"
            class="fixed transition-opacity bottom-0 right-0 w-[50px] h-[50px] m-[2%] z-50"
            v-show="isVisible">
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
    background-image: url('~/assets/index/tashasCauldronOfEverythingDnd.svg');
    background-size: cover;
}

.background {
    background-image: url('~/assets/index/pixelsBackgrounds.svg');
    background-size: cover;
}

html {
    scroll-behavior: smooth;
}
</style>
