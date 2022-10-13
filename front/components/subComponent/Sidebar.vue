<template>
    <div
        class="h-screen w-[220px] bg-[#1E1E1E] flex flex-col relative justify-center">
        <div class="w-full absolute top-0 flex justify-center p-6">
            <NuxtLink to="/">
                <img src="../../assets/fetc.png" alt="Fiche&Chips" />
            </NuxtLink>
        </div>

        <div
            class="flex flex-col items-center justify-center text-white space-y-8"
            v-if="connected()">
            <NuxtLink
                to="/dashboard"
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
            class="flex flex-col w-full justify-center items-center relative top-[32%]">
            <NuxtLink
                exact
                to="/"
                class="font-bold text-xl w-[80%]"
                active-class="text-fc-yellow"
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
    },
}
</script>

<style></style>
