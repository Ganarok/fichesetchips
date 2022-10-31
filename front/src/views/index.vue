<template>
    <SidebarLayout :topRightPixels="false" :isBorder=false>
        <div class="flex flex-col">
            <div
                v-on:scroll="scrollHandler"
                class="flex flex-col"
                id="top">
                <div class="h-screen tashas font-barlow relative mobile:h-[calc(100vh-80px)]">
                    <div
                        class="flex flex-col w-[41%] bg-fc-green justify-between p-[2%] absolute bottom-[13%] tablet:w-[45%] mobile:w-full">
                        <p
                            class="text-xl sm:text-2xl lg:text-3xl text-white font-bold w-[75%] pr-[5%] tablet:text-2xl mobile:w-full">
                            Notre site il est trop bien alors tu t’inscris et tu
                            kiffes ! Sinon je te retrouve et je te pète les genoux !
                        </p>
                        <button
                            class="flex flex-row justify-center w-20 lg:w-24 xl:w-28 border-[3px] self-end rounded-full text-3xl font-bold text-white tablet:text-xl">
                            <NuxtLink to="/login"> GO -> </NuxtLink>
                        </button>
                        <div
                            class="w-[45px] h-[45px] bg-fc-green absolute bottom-0 right-0 translate-x-[45px] translate-y-[45px] mobile:hidden"></div>
                    </div>
                    <Transition name="fade">
                        <div
                            class="absolute bottom-0 left-[50%] animate-bounce"
                            v-show="isVisibleBounce">
                            <a @scroll="scrollHandler" href="#MapVue">
                                <img
                                    class="w-[50px] h-[50px] rotate-180"
                                    src="../assets/vector.svg"
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
                    <img src="../assets/vector.svg" alt="vector" />
                </a>
            </Transition>
        </div>
    </SidebarLayout>
</template>

<script lang="js">
import MapVue from '@/components/svg/Map.vue'
import AmisVue from '@/components/svg/Amis.vue'
import PersoVue from '@/components/svg/Perso.vue'
import SidebarLayout from '@/layouts/Sidebar.vue'

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
    components: { MapVue, AmisVue, PersoVue, SidebarLayout },
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
