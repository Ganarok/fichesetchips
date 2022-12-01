<template>
    <SidebarLayout>
<!--        <div
            class="absolute top-0 right-0 mt-4 mr-4 cursor-pointer"
            @click="preview = !preview">
            show preview
        </div>-->

        <div class="h-screen w-full md:overflow-hidden flex md:flex-row flex-col font-barlow">
            <div
                class="md:w-1/3 h-full md:border-r-4 md:border-fc-green p-4 flex flex-col items-center mb-48">
                <div class="flex flex-col items-center mb-10">
                    <Avatar
                        nickname="Ganarok"
                        nick_bold
                        nick_under
                        nick_size="2xl"
                        class="mb-3 h-36" />
                </div>
                <div class="flex flex-col w-full text-xl mb-8">
                    <EditableDiv :editMode="editMode" v-model="user.location" />
                    <EditableDiv :editMode="editMode" v-model="user.email" />
                </div>
                <p class="font-bold italic text-2xl">
                    <EditableDiv
                        v-model="user.description"
                        :editMode="editMode"
                        class="max-w-full" />
                </p>

                <div class="grid gap-6 md:gap-4 grid-cols-5 mt-auto">
                    <Badge
                        size="s"
                        canFav
                        :isFav="badges[badgesPage][idx].isFav"
                        :completion="badge.completion"
                        @favorite="handleFavorite(badge.id)"
                        v-for="(badge, idx) in badges[badgesPage]"
                        :key="badge.id" />
                </div>
                <div class="flex space-x-10 mt-4">
                    <div
                        :class="
                            badgesPage != 0
                                ? null
                                : 'pointer-events-none opacity-25'
                        "
                        class="cursor-pointer select-none"
                        @click="badgesPage > 0 ? (badgesPage -= 1) : null
                        ">
                        <img src="../../assets/icons/icons8-left-arrow-30.png"/>
                    </div>
                    <div>{{ badgesPage + 1 }} / {{ badges.length }}</div>
                    <div
                        :class="
                            badgesPage < badges.length - 1
                                ? null
                                : 'pointer-events-none opacity-25'
                        "
                        class="cursor-pointer select-none"
                        @click="
                            badgesPage < badges.length - 1
                                ? (badgesPage += 1)
                                : null
                        ">
                      <img src="../../assets/icons/icons8-right-arrow-30.png"/>
                    </div>
                </div>
                <div class="flex space-x-10 mt-4">
                    <button class="text-gray-600" @click="editMode = !editMode">
                        {{ editMode ? 'Enregistrer' : 'Editer' }}
                    </button>
                    <button
                        class="text-gray-600 hover:text-red-500"
                        @click="showModal = true">
                        Supprimer
                    </button>
                </div>
            </div>
            <div class="w-full h-full flex flex-col md:px-8 md:pb-16 pt-8 space-y-4">
                <div class="h-3/4 flex md:flex-row flex-col pb-6 justify-center md:mb-0 mb-48 space-y-4">
                  <div class="h-full flex flex-col text-center space-y-2 min-w-[20em]">
                        <div
                            class="flex w-full h-20 items-center justify-center text-center font-bold bg-fc-black text-fc-green">
                            Statistiques
                        </div>
                        <div class="flex flex-col space-y-2 p-1">
                            <div class="flex w-full h-16">
                                <div
                                    class="w-2/5 flex items-center justify-center">
                                    666
                                </div>
                                <div
                                    class="relative w-3/5 flex items-center justify-center text-white bg-fc-black">
                                    <div
                                        class="absolute -right-1 -top-1 z-[-1] bg-fc-green h-2 w-2" />
                                    <div
                                        class="absolute -right-1 -bottom-1 z-[-1] bg-fc-green h-2 w-2" />
                                    Parties jouées (Joueur)
                                </div>
                            </div>
                            <div class="flex w-full h-16">
                                <div
                                    class="relative w-3/5 flex items-center justify-center text-white bg-fc-black">
                                    <div
                                        class="absolute -left-1 -top-1 z-[-1] bg-fc-green h-2 w-2" />
                                    <div
                                        class="absolute -left-1 -bottom-1 z-[-1] bg-fc-green h-2 w-2" />
                                    Parties jouées (MJ)
                                </div>
                                <div
                                    class="w-2/5 flex items-center justify-center">
                                    666
                                </div>
                            </div>
                            <div class="flex w-full h-16">
                                <div
                                    class="w-2/5 flex items-center justify-center">
                                    01-01-01
                                </div>
                                <div
                                    class="relative w-3/5 flex items-center justify-center text-white bg-fc-black">
                                    <div
                                        class="absolute -right-1 -top-1 z-[-1] bg-fc-green h-2 w-2" />
                                    <div
                                        class="absolute -right-1 -bottom-1 z-[-1] bg-fc-green h-2 w-2" />
                                    Date d'inscription
                                </div>
                            </div>
                            <div class="flex w-full h-16">
                                <div
                                    class="relative w-3/5 flex items-center justify-center text-white bg-fc-black">
                                    <div
                                        class="absolute -left-1 -top-1 z-[-1] bg-fc-green h-2 w-2" />
                                    <div
                                        class="absolute -left-1 -bottom-1 z-[-1] bg-fc-green h-2 w-2" />
                                    Temps de jeu
                                </div>
                                <div
                                    class="w-2/5 flex items-center justify-center">
                                    666
                                </div>
                            </div>
                        </div>
                    </div>
                  <div class="h-full flex justify-center items-center">
                    <CharacterCard class="w-auto" />
                  </div>
                </div>
                <div class="w-full h-1/4 mt-auto">
                    <h1 class="font-bold text-3xl">Amis</h1>
                    <div class="h-1 w-full bg-fc-black" />
                    <div class="flex overflow-x-auto justify-center space-x-4">
                      <div class="flex text-center h-full items-center sm:mt-[4em] mt-[1em] mb-[1em]" v-if="friendsList.length == 0">
                        Ajoutez des amis pour voir leur status
                      </div>
                      <Avatar
                        else
                        class="mt-4 h-32 w-32 mb-20"
                        :grayed="!friend.online"
                        :nickname="friend.username"
                        v-for="friend in friendsList"
                        :key="n" />
                    </div>
                </div>
            </div>
        </div>

        <Modal v-show="showModal" @close-modal="showModal = false">
            <div
                class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-fc-yellow-trans">
                <div
                    class="bg-white h-1/3 w-1/3 flex flex-col justify-center items-center text-red-500 font-bold text-xl space-y-10">
                    <div class="text-center">
                        <div>
                            Voulez-vous vraiment supprimer votre profil ?
                        </div>
                        <div class="text-sm">
                            Attention, cette action est irreversible et toute
                            vos donnée serons perdues définitivement
                        </div>
                    </div>
                    <div
                        class="flex justify-center items-center w-full space-x-16">
                        <button
                            class="bg-red-500 text-white h-[2.5em] p-1"
                            style="aspect-ratio: 1/1"
                            @click="deleteProfile">
                            Oui
                        </button>
                        <button
                            class="bg-fc-green text-white h-[2.5em] p-1"
                            style="aspect-ratio: 1/1"
                            @click="showModal = false">
                            Non
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    </SidebarLayout>
</template>

<script>
import CustomTable from '@/components/subComponent/CustomTable.vue'
import Modal from '@/components/Modal.vue'
import EditableDiv from '@/components/subComponent/EditableDiv.vue'
import Avatar from '@/components/subComponent/Avatar.vue'
import Badge from '@/components/subComponent/Badge.vue'
import CharacterCard from '@/components/subComponent/CharacterCard.vue'
import SidebarLayout from '@/layouts/Sidebar.vue'
import { apiCall } from '@/utils/apiCall'

export default {
    components: {
        Modal,
        CustomTable,
        EditableDiv,
        Avatar,
        Badge,
        CharacterCard,
        SidebarLayout
    },

    data() {
        return {
            showModal: false,
          user: {
            id: 0,
            username: 'John Doe',
            email: 'JohnDoe@mail.com',
            location: 'FarFarAway Kingdom, Farlands',
            avatar: '',
            description: '“Jeune elfe recherche un mage mortel ...”',
            lastConnection: 'il y a 1 heure',
            createdAt: '',
          },
          friendsList: [{username: 'SmithMan', online: true}, {username: 'SmithMan', online: false}, {username: 'SmithMan', online: false}, {username: 'SmithMan', online: false}, {username: 'SmithMan', online: false}],
            badges: [],
            badgesPage: 0,
            ownprofile: true,
            preview: false,
            editMode: false,
        }
    },
    mounted() {
        this.badgeGenerator(3)
    },
    methods: {
        badgeGenerator(pageNbr = 3, badgeNbr = 20) {
            for (let i = 0; i < pageNbr; i++) {
                let tempBadges = []
                for (let index = 0; index < badgeNbr; index++) {
                    tempBadges.push({
                        id: i + '-' + index,
                        isFav: false,
                        completion: this.randomIntFromInterval(0, 100),
                    })
                }
                this.badges.push(tempBadges)
            }
        },
        handleFavorite(badgeID) {
            this.badges.forEach((badgeList, page) => {
                const badgeIndex = badgeList.findIndex(
                    (badge) => badge.id == badgeID
                )
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
        setupUserInfos() {
            this.user = this.$store.state.user.user

            if (this.user) {
                this.getFriends()
            }
        },
        getFriends(username = this.user.username) {
            apiCall({
                method: 'GET',
                route: '/friends/' + username,
            })
                .then((res) => {
                    this.friends = res.friends
                })
                .catch((err) => {
                    console.log('err', err)
                })
        },
        getBadges(username = this.user.username) {
            apiCall({
                method: 'GET',
                route: '/badges/' + username,
            })
                .then((res) => {
                    this.badges = res.badges
                })
                .catch((err) => {
                    console.log('err', err)
                })
        },
        updateProfile() {
            apiCall({
                method: 'PATCH',
                route: '/users',
                body: {
                    username: this.user.username,
                    email: this.user.email,
                    location: this.user.location,
                    avatar: this.user.avatar,
                },
            })
                .then((res) => {
                    this.badges = res.badges
                })
                .catch((err) => {
                    console.log('err', err)
                })
        },
        deleteProfile() {
            apiCall({
                method: 'DELETE',
                route: '/users',
            })
                .then((res) => {
                    this.$router.push('/')
                })
                .catch((err) => {
                    console.log('err', err)
                })
        },
    },
    computed: {
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
}
</script>

<style></style>
