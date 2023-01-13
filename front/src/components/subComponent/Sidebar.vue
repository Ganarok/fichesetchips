<template>
    <div class="bg-[#1E1E1E]">
        <div class="mobile:flex mobile:justify-between mobile:px-6 h-[80px] w-[100vw] mobileSup:hidden">
            <img src="../../assets/menuIcon.svg" class="w-1/7 my-auto" alt="F&C logo" @click="mobileMenu()"  />
            <img src="../../assets/icon.svg" class="w-1/7 my-4" alt="F&C logo" />
        </div>

        <div class="sidebar bg-[#1E1E1E] flex flex-col justify-between h-screen mobile:h-[calc(100vh-80px)] w-[220px] py-4 absolute left-0 transform -translate-x-full mobileSup:relative mobileSup:translate-x-0 transition duration-200 ease-in-out ">
            <div class="w-full top-0 justify-center p-6">
                <router-link to="/">
                    <img src="@/assets/fetc.png" alt="Fiche&Chips" />
                </router-link>
            </div>
            
            <div
                v-if="connected()"
                class="flex flex-col items-center justify-center text-white space-y-8"
            >
                <router-link
                    to="/user/dashboard"
                    class="font-bold text-xl"
                    active-class="underline"
                    >Dashboard</router-link
                >
                <router-link
                    to="/user/profile"
                    class="font-bold text-xl"
                    active-class="underline"
                    >Profile</router-link
                >
            </div>
            <div
                v-else
                class="flex flex-col items-center justify-center text-white space-y-8">
                <router-link
                    to="/"
                    exact
                    class="font-bold text-xl"
                    active-class="underline"
                    >Accueil</router-link
                >
                <router-link
                    to="/about"
                    class="font-bold text-xl"
                    active-class="underline"
                    >A propos</router-link
                >
                <router-link
                    to="/glossaire"
                    class="font-bold text-xl"
                    active-class="underline"
                    >Glossaire</router-link
                >
            </div>
    
            <div
                class="flex flex-col w-full justify-center items-center relative">
                <router-link
                    v-if="connected()"
                    exact
                    to="/"
                    class="font-bold text-xl w-[80%]"
                    @click.native="logout()"
                    ><Button
                        button-text="Logout"
                        class="text-fc-yellow"
                        color="fc-yellow"
                /></router-link>
                <img src="@/assets/icon.png" class="w-2/4" alt="F&C logo" />
                <p class="text-white text-[10px]">Made with love by fiches&chips</p>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '@/components/subComponent/Button.vue'
export default {
    name: 'Sidebar',
    components: { Button },
    methods: {
        connected: function () {
            return this.$store.getters.connected
        },
        logout: function () {
            this.$store.commit('logout')
        },
        mobileMenu: function () {
            let sidebar = document.querySelector('.sidebar')
            sidebar.classList.toggle('-translate-x-full')
        },
    },
}
</script>

<style></style>
