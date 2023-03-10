<template>
    <SidebarLayout :is-border="false">
        <div class="flex justify-center flex-col items-center ">
            <div class="flex w-4/5 justify-center items-center bg-gray-200 mt-10 p-5 flex-col xl:flex-row"> 
                <img
                    src="../../assets/avatar/character.png"
                    class="object-contain rounded-full bg-fc-green border-8 border-fc-black w-52"
                    :style="grayed ? 'filter: grayscale(1)' : null"
                >
                <div class="flex flex-col justify-between w-full items-center">
                    <div class="flex flex-col font-bold xl:flex-row">
                        <span class="flex flex-col ml-3 items-center xl:items-start">
                            <p class=" text-7xl ">
                                Username
                            </p>
                            <p class="text-2xl mt-5 text-ellipsis flex-nowrap text-center xl:text-left ">
                                “Jeune elfe recherche un mage mortel ...”
                            </p>
                        </span>
                        <span class="flex flex-col items-center xl:items-start xl:ml-16 w-full pt-4 infoProfils  ">
                            <span>
                                Paris, France
                            </span>
                            <span>
                                Jean.bobby@gmail.com
                            </span>
                        </span>
                    </div>
                    <div class="flex  justify-end w-full ">
                        <span class="tabs flex flex-row w-full pt-5 justify-evenly font-bold text-xl xl:text-3xl xl:w-4/5">
                            <span v-bind:class="[isTabActive('Friends') ? 'activeTab' : 'inactiveTab']"  @click="changeTab('Friends')">
                                Amis
                            </span>        
                            <span v-bind:class="[isTabActive('Stats') ? 'activeTab' : 'inactiveTab']" @click="changeTab('Stats')">
                                Stats
                            </span>
                            <span v-bind:class="[isTabActive('Characters') ? 'activeTab' : 'inactiveTab']" @click="changeTab('Characters')">
                                Personnages
                            </span>
                            <span v-bind:class="[isTabActive('Partie') ? 'activeTab' : 'inactiveTab']" @click="changeTab('Partie')">
                                Partie
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="mt-5 w-full" > <!--CONTENT-->
                <div class="flex w-full flex-col h-full justify-between items-center">
                    <component :is="tabs" class="w-4/5"/>
                </div>     
            </div>
        </div>
    </SidebarLayout>
</template>

<script>
import Modal from "@/components/Modal.vue"
import SidebarLayout from "@/layouts/Sidebar.vue"
import { mapState, mapActions } from "vuex"
import moment from "moment"
import Loader from "@/components/Loader.vue"
import { useRoute } from 'vue-router'

import Characters from "@/components/subComponent/Characters.vue"

export default {
    components: {
        Modal,
        SidebarLayout,
        Characters,
        Loader,
    },
    data() {
        return {
            showModal: false,
            badges: [],
            badgesPage: 0,
            preview: false,
            editMode: false,
            tabName: "Friends",
        }
    },
    computed: {
        ...mapState("characters", {
            characters: (state) => state.characters,
        }),
        ...mapState("errors", {
            errors: (state) => state.errors,
        }),
        ...mapState("user", {
            user: (state) => state.user,
        }),
        ...mapState("friends", {
            friends: (state) => state.my_friends,
            pending_approval: (state) => state.pending_approval,
            pending_request: (state) => state.pending_request,
        }),
        badgesToDisplayWhenPublic() {
            let toDisplay = []
            this.badges.forEach((badgeList) =>
                badgeList.forEach((badge) =>
                    badge.isFav ? toDisplay.push(badge) : null
                )
            )
            return toDisplay
        },
    },
    async mounted() {
        this.badgeGenerator(3)
        await this.fetch_my_friends()
        await this.fetch_characters()
        this.changeTab(useRoute().params.tabName)

    },
    methods: {
        ...mapActions({
            fetch_my_friends: "friends/fetch_my_friends",
            patch_user: "user/patch_user",
            delete_user: "user/delete_user",
            fetch_characters: "characters/fetch_characters"
        }),
        getDate(date) {
            return moment(date).format("ll")
        },
        badgeGenerator(pageNbr = 3, badgeNbr = 20) {
            for (let i = 0; i < pageNbr; i++) {
                let tempBadges = []
                for (let index = 0; index < badgeNbr; index++) {
                    tempBadges.push({
                        id: i + "-" + index,
                        isFav: false,
                        completion: this.randomIntFromInterval(0, 100),
                    })
                }
                this.badges.push(tempBadges)
            }
        },
        handleFavorite(badgeID) {
            this.badges.forEach((badgeList, page) => {
                const badgeIndex = badgeList.findIndex((badge) => badge.id == badgeID)
                console.log(badgeID, badgeIndex)
                if (badgeIndex != -1) {
                    this.badges[page][badgeIndex].isFav =
            !this.badges[page][badgeIndex].isFav
                }
            })
        },
        randomIntFromInterval(min, max) {
            // min and max included
            return Math.floor(Math.random() * (max - min + 1) + min)
        },
        async updateProfile() {
            const body = {
                username: this.user.username,
                email: this.user.email,
                location: this.user.location,
                avatar: this.user.avatar,
            }
            await this.patch_user(body)
        },
        async deleteProfile() {
            await this.delete_user()
            await this.$router.push("/login")
        },
        getFriendUsername(friendship) {
            if (this.user.username == friendship.user_asked.username) {
                return friendship.user_answered.username
            } else {
                return friendship.user_asked.username
            }
        },
        changeTab(string) {
            const components = {
                Characters,
            }
            let newTabName = string || "Characters"
            this.tabs = components[newTabName]
            this.tabName = newTabName
            console.log(this.tabName)
        },
        isTabActive(tabName) {
            return this.tabName == tabName
        },
    }
}
</script>

<style >
.infoProfils {
    font-size: 1.5rem;
    font-weight: 500;
}
.inactiveTab {
    position: relative;
    opacity: 0.3;
    letter-spacing: 0.02rem;
    display: inline-block;
}
.activeTab {
    position: relative;
    opacity: 1;
}
.tabs{
    text-transform: uppercase;
    text-decoration: none;
}

.activeTab::after{
    content: '';
    width: 100%;
    height: .2rem;
    bottom: 0;
    left: 0;
    background-color: #4FEA74;
}

.inactiveTab:hover{
    opacity: .6;
}

:after {    
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: .2rem;
    left: 0;
    position: absolute;
    background: #4FEA74;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
}
.inactiveTab:hover:after { 
    width: 100%; 
    left: 0; 
}


</style>