<template>
    <SidebarLayout
        :top-right-pixels="false"
        :is-border="false"
    >
        <div class="flex flex-col">
            <div
                id="top"
                class="flex flex-col"
                @scroll="scrollHandler"
            >
                <div
                    class="h-screen tashas font-barlow relative mobile:h-[calc(100vh-80px)]"
                >
                    <div
                        class="flex flex-col w-[41%] bg-fc-green justify-between p-[2%] absolute bottom-[13%] tablet:w-[45%] mobile:w-full"
                    >
                        <p
                            class="max-w-md text-xl sm:text-2xl text-white font-bold pr-[5%] tablet:text-2xl mobile:w-full"
                        >
                            Faites du JdR avec vos amis !
                            Créez vos propres personnages, cartes et plus encore ... le tout, sur Fiches&Chips !
                        </p>

                        <router-link
                            to="/login"
                            class="flex flex-row justify-center w-20 p-2 bg-fc-black self-end text-2xl font-bold text-white whitespace-nowrap tablet:text-xl hover:opacity-90"
                        >
                            GO ->
                        </router-link>

                        <div
                            class="w-[45px] h-[45px] bg-fc-green absolute bottom-0 right-0 translate-x-[45px] translate-y-[45px] mobile:hidden"
                        />
                    </div>
                    <Transition name="fade">
                        <div
                            v-show="isVisibleBounce"
                            class="absolute bottom-0 left-[50%] animate-bounce"
                        >
                            <a
                                href="#MapVue"
                                @scroll="scrollHandler"
                            >
                                <img
                                    class="w-[50px] h-[50px] rotate-180"
                                    src="../assets/vector.svg"
                                    alt="vector"
                                >
                            </a>
                        </div>
                    </Transition>
                </div>
                <div
                    id="MapVue"
                    class="flex flex-col overflow-x-hidden background"
                >
                    <div class="w-full pl-0 translate-x-[-10px] sm:translate-x-[-25px]">
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
                    v-show="isVisible"
                    href="#top"
                    class="fixed transition-opacity bottom-0 right-0 w-[50px] h-[50px] m-[2%] z-50"
                    @scroll="scrollHandler"
                >
                    <img
                        src="../assets/vector.svg"
                        alt="vector"
                    >
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
    components: { MapVue, AmisVue, PersoVue, SidebarLayout },
    data: function () {
        return { isVisible: false, isVisibleBounce: true }
    },
    mounted() {
        window.addEventListener('scroll', this.scrollHandler)
    },
    unmounted() {
        window.removeEventListener('scroll', this.scrollHandler)
    },
    methods: {
        scrollHandler: function scrollHandler(e) {
            this.isVisible = e.target.scrollingElement.scrollTop > window.screen.height * 0.5 ? true : false
            this.isVisibleBounce = e.target.scrollingElement.scrollTop > window.screen.height * 0.001 ? false : true
        },
        showToaster() {
            console.log('this', this)
        }
    },
}
</script>

<style>
.tashas {
  background-image: url("../assets/index/background.jpg");
  background-size: cover;
  object-fit: cover;
}

.background {
  background-image: url("../assets/index/pixelsBackgrounds.svg");
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
