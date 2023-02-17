<template>
    <div class="bg-[#1E1E1E]">
        <div class="mobile:flex mobile:justify-between mobile:px-6 h-[80px] w-[100vw] mobileSup:hidden">
            <img src="../../assets/menuIcon.svg" class="w-1/7 my-auto" alt="F&C logo" v-on:click="mobileMenu()"  />
            <img src="../../assets/icon.svg" class="w-1/7 my-4" alt="F&C logo" />
        </div>

        <div class="sidebar bg-[#1E1E1E] flex flex-col justify-between h-screen mobile:h-[calc(100vh-80px)] w-[220px] py-4 absolute left-0 transform -translate-x-full mobileSup:relative mobileSup:translate-x-0 transition duration-200 ease-in-out ">
            <div class="w-full top-0 justify-center p-6">
                <router-link to="/">
                    <img src="@/assets/fetc.png" alt="Fiche&Chips" />
                </router-link>
            </div>
            <!-- Navbar content when conected-->
            <div class="content text-white" v-if="connected()">
                <div class="bloc flex flex-col mb-12">

                    <router-link
                        to="/user/dashboard"
                        class="font-bold text-xl"
                    >
                        {{$t('Dashboard')}} 
                    </router-link>

                    <router-link
                        to="/user/profile"
                        class="font-bold text-xl"
                    >
                        {{$t('Profile')}} 
                    </router-link>
                </div>

                <div class="bloc flex flex-col mb-12">
                    <div class="categorie flex flex-col mb-4" v-bind:class="{active: personnageIsShow}">
                        <span class="text-xl font-bold" @click="() => this.personnageIsShow = !this.personnageIsShow">Personnage</span>
                        <ul class="visible block text-xl font-bold text-white pl-2 list-none opacity-50" v-if="personnageIsShow">
                            <li class="leading-7 text-neutral-300 hover:text-neutral-50">
                                <router-link to="/user/characters/create">
                                    {{$t('Créer')}} 
                                    
                                </router-link>
                            </li>
                            <li class="leading-7 text-neutral-300 hover:text-neutral-50">
                                <router-link to="/user/characters">
                                    {{$t('Liste')}} 
                                    
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="categorie flex flex-col mb-4" v-bind:class="{active: roomIsShow}">
                        <span class="text-xl font-bold" @click="() => this.roomIsShow = !this.roomIsShow" >Rooms</span>
                        <ul class="visible block text-xl font-bold text-white pl-2 list-none opacity-50" v-if="roomIsShow">
                            <li class="leading-7 text-neutral-300 hover:text-neutral-50">
                                <router-link to="/rooms/create">
                                    {{$t('Créer')}}  
                                </router-link>
                            </li>
                            <li class="leading-7 text-neutral-300 hover:text-neutral-50">
                                <router-link to="/rooms">
                                    {{$t('Rejoindre')}} 
                                </router-link>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            <!-- Navbar content when not conected (guest)-->
            <div class="content disconected text-white " v-else>
                <div class="flex flex-col justify-between h-1/3">

                    <router-link to="/" exact class="font-bold text-xl" >
                        {{$t('Accueil')}}
                    </router-link>

                    <router-link to="/about" class="font-bold text-xl"> 
                        {{$t('A propos')}}
                    </router-link>
                    
                    <router-link to="/glossaire" class="font-bold text-xl">
                        {{$t('Glossaire')}}
                    </router-link>
                </div>
            </div>

    
            <div class="flex flex-col w-full justify-center items-center relative">
                <router-link exact to="/" class="text-yellow-400 border-yellow-400 border font-bold text-xl py-2 px-4 rounded-lg transition-all ease-in-out duration-200 hover:bg-yellow-400 hover:text-gray-900" @click.native="logout()" v-if="connected()">
                    {{$t('Déconnexion')}}
                </router-link>
                <img src="@/assets/icon.png" class="w-2/4" alt="F&C logo" />
                <p class="text-white text-[10px]">Made with ❤️ by fiches&chips</p>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '@/components/subComponent/Button.vue'
export default {
    name: 'Sidebar',
    components: { Button },
    data() {
        return {
            personnageIsShow: true,
            roomIsShow: true
        }
    },
    methods: {
        connected: function () {
            return true
        },
        logout: function () {
            this.$store.commit('logout')
        },
        mobileMenu: function () {
            let sidebar = document.querySelector('.sidebar')
            sidebar.classList.toggle('-translate-x-full')
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
    justify-content: start;

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
