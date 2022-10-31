<template>
    <div class="flex flex-col">
        <div
            class="flex flex-row w-full items-center bg-fc-black justify-between z-10 p-4 h-[10%] sm:p-auto sm:flex-col sm:fixed sm:h-screen sm:w-[13%]">
            <img
                src="@/assets/logo.svg"
                class="w-[10%] sm:w-auto sm:m-[15%]"
                alt="logo" />
            <div
                class="text-center font-barlow text-white font-bold text-lg sm:text-xl">
                <h1 class="hover:underline">
                    <router-link to="/"> {{ $t('Accueil') }} </router-link>
                </h1>
            </div>
            <div
                class="flex font-barlow text-center space-x-4 px-2 items-center sm:px-0 sm:space-x-0 sm:w-full sm:space-y-8 sm:flex-col">
                <router-link to="/register">
                    <button
                        class="rounded-full text-fc-yellow border-fc-yellow border-2 p-1 px-2 sm:p-2 sm:border-[3px] min-w-[50%]">
                        {{ $t("S'inscrire") }}
                    </button>
                </router-link>
                <router-link to="/login">
                    <button
                        class="rounded-full text-fc-green border-fc-green border-2 p-1 px-2 sm:p-2 min-w-[50%] sm:border-[3px]">
                        {{ $t('Se connecter') }} 
                    </button>
                </router-link>

                <Button 
                    @click="showToaster()"
                    :filled="'true'"
                />

                <img
                    src="@/assets/marque.svg"
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
                    <router-link to="/login"> 
                        <button
                            class="flex flex-row justify-center w-20 lg:w-24 xl:w-28 border-[3px] self-end rounded-full text-3xl font-bold text-white tablet:text-xl">
                            GO -> 
                        </button>
                    </router-link>
                    <div
                        class="w-[45px] h-[45px] bg-fc-green absolute bottom-0 right-0 translate-x-[45px] translate-y-[45px]"></div>
                </div>
                <Transition name="fade">
                    <div
                        class="absolute bottom-0 left-[50%] animate-bounce"
                        v-show="isVisibleBounce">
                        <a @scroll="scrollHandler" href="#MapVue">
                            <img
                                class="w-[50px] h-[50px] rotate-180"
                                src="@/assets/vector.svg"
                                alt="vector" />
                        </a>
                    </div>
                </Transition>
            </div>
            <div class="flex flex-col overflow-x-hidden background" id="MapVue">
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
        <Transition name="fade">
            <a
                @scroll="scrollHandler"
                href="#top"
                class="fixed transition-opacity bottom-0 right-0 w-[50px] h-[50px] m-[2%] z-50"
                v-show="isVisible">
                <img src="@/assets/vector.svg" alt="vector" />
            </a>
        </Transition>
    </div>
</template>
<script>
import MapVue from '@/components/svg/Map.vue'
import AmisVue from '@/components/svg/Amis.vue'
import PersoVue from '@/components/svg/Perso.vue'
import Button from '@/components/subComponent/Button.vue'

export default {
    name: "IndexPage",
    mounted() {
        window.addEventListener('scroll', this.scrollHandler)        
    },
    destroyed() {
        window.removeEventListener('scroll', this.scrollHandler)
    },
    data: function () {
        return { isVisible: false, isVisibleBounce: true };
    },
    methods: {
        scrollHandler: function scrollHandler(e) {
            this.isVisible = e.target.scrollingElement.scrollTop > window.screen.height * 0.5 ? true : false;
            this.isVisibleBounce = e.target.scrollingElement.scrollTop > window.screen.height * 0.001 ? false : true;
        },
        showToaster() {
            console.log('this', this);
        }
    },
    components: { MapVue, AmisVue, PersoVue, Button }
}
</script>

<style>
.tashas {
    background-image: url('../assets/index/background.jpg');
    background-size: cover;
}

.background {
    background-image: url('../assets/index/pixelsBackgrounds.svg');
    background-size: cover;
}

html {
    scroll-behavior: smooth;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
