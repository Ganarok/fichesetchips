<template>
    <div class="bg-[#1E1E1E]">
        <div class="mobile:flex mobile:flex-row mobile:justify-between mobile:px-6 h-[80px] w-[100vw] mobileSup:hidden">
            <img src="../../assets/menuIcon.svg" class="w-1/7 my-auto" alt="F&C logo" v-on:click="mobileMenu()"  />
            <img src="../../assets/logoUperbar.png" class="w-1/7 my-auto" alt="F&C logo" />
        </div>

        <div class="sidebar bg-[#1E1E1E] flex flex-col justify-between h-screen mobile:h-[calc(100vh-80px)] w-[220px] py-4 absolute left-0 transform -translate-x-full transition duration-200 ease-in-out mobileSup:relative mobileSup:translate-x-0 transition duration-200 ease-in-out ">
            <div class="w-full top-0 justify-center p-6">
                <NuxtLink to="/">
                    <img src="../../assets/fetc.png" alt="Fiche&Chips" />
                </NuxtLink>
            </div>
            
            <div
                class="flex flex-col items-center justify-center text-white space-y-8"
                v-if="connected()"
>
                <NuxtLink
                    to="/user/dashboard"
                    class="font-bold text-xl"
                    active-class="underline"
                    >Dashboard</NuxtLink
                >
                <NuxtLink
                    to="/profile"
                    class="font-bold text-xl"
                    active-class="underline"
                    >Profile</NuxtLink
                >
            </div>
            <div
                class="flex flex-col items-center justify-center text-white space-y-8"
                v-else>
                <NuxtLink
                    to="/"
                    exact
                    class="font-bold text-xl"
                    active-class="underline"
                    >Accueil</NuxtLink
                >
                <NuxtLink
                    to="/about"
                    class="font-bold text-xl"
                    active-class="underline"
                    >A propos</NuxtLink
                >
                <NuxtLink
                    to="/glossaire"
                    class="font-bold text-xl"
                    active-class="underline"
                    >Glossaire</NuxtLink
                >
            </div>
    
            <div
                class="flex flex-col w-full justify-center items-center relative">
                <NuxtLink
                    exact
                    to="/"
                    class="font-bold text-xl w-[80%]"
                    @click.native="logout()"
                    v-if="connected()"
                    ><Button
                        buttonText="Logout"
                        class="text-fc-yellow"
                        color="fc-yellow"
                /></NuxtLink>
                <img src="../../assets/icon.png" class="w-2/4" alt="F&C logo" />
                <p class="text-white text-[10px]">Made with love by fiches&chips</p>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '~/components/subComponent/Button.vue'
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
