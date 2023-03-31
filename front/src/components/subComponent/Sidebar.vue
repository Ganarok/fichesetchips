<template>
    <div class="bg-[#1E1E1E]">
        <div class="mobile:flex mobile:justify-between mobile:px-6 h-[80px] w-[100vw] mobileSup:hidden">
            <img
                src="../../assets/menuIcon.svg"
                class="w-1/7 my-auto"
                alt="F&C logo"
                @click="mobileMenu()"
            >
            <img
                src="../../assets/icon.svg"
                class="w-1/7 my-4"
                alt="F&C logo"
            >
        </div>

        <div
            class="sidebar bg-[#1E1E1E] flex flex-col justify-between h-screen mobile:h-[calc(100vh-80px)] w-[220px] py-4 absolute left-0 transform -translate-x-full mobileSup:relative mobileSup:translate-x-0 transition duration-200 ease-in-out"
        >
            <div class="w-full top-0 justify-center p-6">
                <router-link to="/">
                    <img
                        src="@/assets/fetc.png"
                        alt="Fiche&Chips"
                    >
                </router-link>
            </div>
            <!-- Navbar content when conected-->
            <div
                v-if="connected()"
                class="content text-white select-none"
            >
                <div class="bloc flex flex-col mb-12">
                    <router-link
                        to="/user/dashboard"
                        class="font-bold text-xl cursor-pointer hover:opacity-70"
                    >
                        {{ $t('Tableau de bord') }} 
                    </router-link>
                    <router-link
                        to="/user/profile"
                        class="font-bold text-xl cursor-pointer hover:opacity-70"
                    >
                        {{ $t('Profil') }} 
                    </router-link>
                </div>

                <router-link
                    to="/user/maps"
                    class="font-bold text-xl"
                    active-class="underline"
                >
                    Maps
                </router-link>

                <div class="bloc flex flex-col mb-12">
                    <div
                        class="categorie flex flex-col mb-4"
                        :class="{active: personnageIsShow}"
                    >
                        <router-link
                            to="/user/profile"
                            class="font-bold text-xl cursor-pointer hover:opacity-70"
                        >
                            {{ $t('Profile') }} 
                        </router-link>
                        <ul 
                            class="visible block text-xl font-bold text-white pl-2 list-none opacity-50"
                        >
                            <li class="leading-7 text-neutral-300 hover:opacity-70">
                                <router-link to="/user/profile?page=Friends">
                                    {{ $t('Amis') }} 
                                </router-link>
                            </li>

                            <!-- <li class="leading-7 text-neutral-300 hover:opacity-70">
                                <router-link to="/user/profile?page=Stats">
                                    {{ $t('Liste') }} 
                                </router-link>
                            </li> -->
                            <li class="leading-7 text-neutral-300 hover:opacity-70">
                                <router-link to="/user/profile?page=Characters">
                                    {{ $t('Personnage') }} 
                                </router-link>
                            </li>

                            <!-- <li class="leading-7 text-neutral-300 hover:opacity-70">
                                <router-link to="/user/profile?page=Games">
                                    {{ $t('Partie') }} 
                                </router-link>
                            </li> -->
                        </ul>
                    </div>


                    <div
                        class="categorie flex flex-col mb-4"
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
                            class="visible block text-xl font-bold text-white pl-2 list-none opacity-50"
                        >
                            <li class="leading-7 text-neutral-300 hover:opacity-70">
                                <router-link to="/characters/create">
                                    {{ $t('Créer') }} 
                                </router-link>
                            </li>

                            <li class="leading-7 text-neutral-300 hover:opacity-70">
                                <router-link to="/characters">
                                    {{ $t('Liste') }} 
                                </router-link>
                            </li>
                        </ul>
                    </div>

                    <div 
                        :class="{active: roomIsShow}"
                        class="categorie flex flex-col mb-4"
                    >
                        <span 
                            class="text-xl font-bold cursor-pointer hover:opacity-70"
                            @click="() => roomIsShow = !roomIsShow" 
                        >
                            Rooms
                        </span>

                        <ul 
                            v-if="roomIsShow"
                            class="visible block text-xl font-bold text-white pl-2 list-none opacity-50"
                        >
                            <li class="leading-7 text-neutral-300 hover:opacity-70">
                                <router-link to="/rooms/create">
                                    {{ $t('Créer') }}  
                                </router-link>
                            </li>

                            <li class="leading-7 text-neutral-300 hover:opacity-70">
                                <router-link to="/rooms">
                                    {{ $t('Rejoindre') }} 
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- Navbar content when not conected (guest)-->
            <div 
                v-else
                class="content disconected text-white"
            >
                <div class="flex flex-col justify-between h-1/3">
                    <router-link 
                        to="/"
                        class="font-bold text-xl cursor-pointer hover:opacity-70"
                        exact
                    >
                        {{ $t('Accueil') }}
                    </router-link>

                    <router-link
                        to="/about"
                        class="font-bold text-xl cursor-pointer hover:opacity-70"
                    >
                        {{ $t('À propos') }}
                    </router-link>
                    
                    <router-link
                        to="/glossaire"
                        class="font-bold text-xl cursor-pointer hover:opacity-70"
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
                    class="w-2/4"
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
        mobileMenu: function () {
            let sidebar = document.querySelector(".sidebar")
            sidebar.classList.toggle("-translate-x-full")
        },
        toggle: function (e) {
            this.e = !e
        },
    },
}
</script>

<style>
.sidebar .content{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    padding-left: 1rem;
}

.sidebar .content.disconected{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.sidebar .content .bloc .categorie span::after{
    content: url(../../assets/selector.svg);
    margin-left: .5rem;
    display: inline-flex;
    transition: all .25s ease;
}

.sidebar .content .bloc .categorie.active span::after{
    content: url(../../assets/selector.svg);
    transition: all .25s ease;
    display: inline-flex;
    transform: rotate(180deg);
}

.sidebar .content .bloc .categorie ul li::before{
    content: "■";
    font-size: .8rem;
    color: #FFDB57;
    margin-right: .5rem;
    position: relative;
    display: inline-block;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-10%);
}

</style>
