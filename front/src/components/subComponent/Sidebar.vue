<template>
    <div class="bg-[#1E1E1E]">
        <div class="mobile:flex mobile:justify-between mobile:px-6 h-[80px] w-[100vw] mobileSup:hidden">
            <img
                src="@/assets/menuIcon.svg"
                class="w-1/7 my-auto"
                alt="F&C logo"
                @click="mobileMenu()"
            >
            <img
                src="@/assets/icon.svg"
                class="w-1/7 my-4"
                alt="F&C logo"
            >
        </div>

        <div 
            class="flex flex-col sidebar bg-fc-black justify-between h-screen mobile:h-[calc(100vh-80px)] w-56 p-4 absolute left-0 transform -translate-x-full mobileSup:relative mobileSup:translate-x-0 transition duration-200 ease-in-out"
        >
            <router-link 
                to="/"
                class="p-4"
            >
                <img
                    src="@/assets/fetc.png"
                    alt="Fiche&Chips"
                >
            </router-link>

            <div
                v-if="connected()"
                class="flex flex-col text-white select-none sm:gap-2"
            >
                <router-link
                    to="/user/maps"
                    class="font-bold text-xl"
                    active-class="underline"
                >
                    Maps
                </router-link>

                <router-link
                    to="/user/profile"
                    class="font-bold text-xl cursor-pointer hover:opacity-70"
                    active-class="underline"
                >
                    {{ $t('Profil') }} 
                </router-link>

                <div class="flex flex-col">
                    <div
                        class="flex flex-col mb-4"
                        :class="{active: personnageIsShow}"
                    >
                        <span 
                            class="text-xl font-bold cursor-pointer hover:opacity-70"
                            @click="() => personnageIsShow = !personnageIsShow"
                        >
                            Personnage
                        </span>

                        <ul 
                            v-if="personnageIsShow"
                            class="flex flex-col text-xl font-bold text-neutral-300 pl-2 list-none opacity-50"
                        >
                            <router-link 
                                to="/characters/create"
                                class="hover:opacity-70"
                                active-class="underline"
                            >
                                {{ $t('Créer') }} 
                            </router-link>

                            <router-link 
                                to="/characters"
                                class="hover:opacity-70"
                                active-class="underline"
                            >
                                {{ $t('Liste') }} 
                            </router-link>
                        </ul>
                    </div>

                    <div 
                        :class="{active: roomIsShow}"
                        class="flex flex-col mb-4"
                    >
                        <span 
                            class="text-xl font-bold cursor-pointer hover:opacity-70"
                            @click="() => roomIsShow = !roomIsShow" 
                        >
                            Rooms
                        </span>

                        <ul 
                            v-if="roomIsShow"
                            class="flex flex-col text-xl font-bold text-neutral-300 pl-2 list-none opacity-50"
                        >
                            <router-link 
                                to="/rooms/create"
                                class="hover:opacity-70"
                                active-class="underline"
                            >
                                {{ $t('Créer') }}  
                            </router-link>

                            <router-link 
                                to="/rooms"
                                class="hover:opacity-70"
                                active-class="underline"
                            >
                                {{ $t('Rejoindre') }} 
                            </router-link>
                        </ul>
                    </div>
                </div>
            </div>

            <div 
                v-else
                class="text-white"
            >
                <div class="flex flex-col self-start gap-6">
                    <router-link 
                        to="/"
                        class="font-bold text-xl cursor-pointer hover:opacity-70"
                        active-class="underline"
                        exact
                    >
                        {{ $t('Accueil') }}
                    </router-link>

                    <router-link
                        to="/about"
                        class="font-bold text-xl cursor-pointer hover:opacity-70"
                        active-class="underline"
                    >
                        {{ $t('À propos') }}
                    </router-link>
                    
                    <router-link
                        to="/glossaire"
                        class="font-bold text-xl cursor-pointer hover:opacity-70"
                        active-class="underline"
                    >
                        {{ $t('Glossaire') }}
                    </router-link>
                </div>
            </div>

            <div class="flex flex-col w-full justify-center items-center relative">
                <router-link
                    v-if="connected()"
                    exact
                    to="/"
                    class="flex items-center justify-center font-bold text-xl w-[80%]"
                    @click="logout()"
                >
                    <Button
                        :button-text="$t('Déconnexion')"
                        class="px-4 py-2 text-base"
                        textColor="text-fc-black"
                        color="fc-yellow"
                        backgroundColor="fc-yellow"
                        :rounded="false"
                    />
                </router-link>

                <router-link
                    v-else
                    exact
                    to="/login"
                    class="flex items-center justify-center font-bold text-xl w-[80%]"
                >
                    <Button
                        :button-text="$t('Connexion')"
                        class="bg-fc-green px-4 py-2 text-base"
                        textColor="text-fc-black"
                        color="fc-green"
                        :rounded="false"
                    />
                </router-link>

                <img
                    src="@/assets/icon.png"
                    class="w-1/2"
                    alt="F&C logo"
                >

                <p class="text-white text-[10px]">
                    Made with ❤️ by fiches&chips
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

import Button from "@/components/subComponent/Button.vue"

export default {
    name: "Sidebar",
    components: { Button },
    data() {
        return {
            personnageIsShow: true,
            roomIsShow: true
        }
    },
    methods: {
        ...mapGetters({
            connected: "user/connected"
        }),
        ...mapMutations({
            logout: "user/logout"
        }),
        mobileMenu() {
            let sidebar = document.querySelector(".sidebar")
            sidebar.classList.toggle("-translate-x-full")
        },
        toggle(e) {
            this.e = !e
        },
    },
}
</script>
