<template>
    <div class="flex">
        <div
            class="absolute top-0 right-0 mt-4 mr-4 cursor-pointer"
            @click="preview = !preview">
            show preview
        </div>
        <SubComponentSidebar />
        <div
            class="h-screen w-full overflow-hidden flex font-barlow"
            v-if="ownprofile && !preview">
            <div
                class="w-1/3 h-full border-r-4 border-fiche-green p-8 flex flex-col items-center">
                <div class="flex flex-col items-center mb-8">
                    <Avatar
                        nickname="Ganarok"
                        nick_bold
                        nick_under
                        nick_size="5xl"
                        class="mb-3" />
                </div>
                <div class="flex flex-col w-full text-2xl mb-8">
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
                                : 'pointer-events-none text-gray-400'
                        "
                        class="cursor-pointer select-none"
                        @click="badgesPage > 0 ? (badgesPage -= 1) : null">
                        <
                    </div>
                    <div>{{ badgesPage + 1 }} / {{ badges.length }}</div>
                    <div
                        :class="
                            badgesPage < badges.length - 1
                                ? null
                                : 'pointer-events-none text-gray-400'
                        "
                        class="cursor-pointer select-none"
                        @click="
                            badgesPage < badges.length - 1
                                ? (badgesPage += 1)
                                : null
                        ">
                        >
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
            <div class="w-full h-3/4 flex flex-col px-8 pb-16 pt-8">
                <div class="h-full flex pb-6">
                    <div
                        class="h-full flex flex-col w-1/2 text-center space-y-2 px-20">
                        <div
                            class="flex w-full h-20 items-center justify-center text-center bg-fc-black text-fiche-green">
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
                                        class="absolute -right-1 -top-1 z-[-1] bg-fiche-green h-2 w-2" />
                                    <div
                                        class="absolute -right-1 -bottom-1 z-[-1] bg-fiche-green h-2 w-2" />
                                    Parties jouées (Joueur)
                                </div>
                            </div>
                            <div class="flex w-full h-16">
                                <div
                                    class="relative w-3/5 flex items-center justify-center text-white bg-fc-black">
                                    <div
                                        class="absolute -left-1 -top-1 z-[-1] bg-fiche-green h-2 w-2" />
                                    <div
                                        class="absolute -left-1 -bottom-1 z-[-1] bg-fiche-green h-2 w-2" />
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
                                        class="absolute -right-1 -top-1 z-[-1] bg-fiche-green h-2 w-2" />
                                    <div
                                        class="absolute -right-1 -bottom-1 z-[-1] bg-fiche-green h-2 w-2" />
                                    Date d'inscription
                                </div>
                            </div>
                            <div class="flex w-full h-16">
                                <div
                                    class="relative w-3/5 flex items-center justify-center text-white bg-fc-black">
                                    <div
                                        class="absolute -left-1 -top-1 z-[-1] bg-fiche-green h-2 w-2" />
                                    <div
                                        class="absolute -left-1 -bottom-1 z-[-1] bg-fiche-green h-2 w-2" />
                                    Temps de jeu
                                </div>
                                <div
                                    class="w-2/5 flex items-center justify-center">
                                    666
                                </div>
                            </div>
                        </div>
                    </div>
                    <CharacterCard class="ml-auto mr-28" />
                </div>
                <div class="w-full mt-auto">
                    <h1 class="font-bold text-3xl">Amis</h1>
                    <div class="h-1 w-full bg-fc-black" />
                    <div class="flex">
                        <Avatar
                            class="mx-auto mt-4"
                            :nickname="'[pseudo-' + n + ']'"
                            v-for="n in 6"
                            :key="n" />
                    </div>
                </div>
            </div>
        </div>
        <div
            class="h-screen w-full overflow-hidden flex flex-col font-barlow"
            v-else>
            <div class="flex h-[60%] p-12">
                <div
                    class="h-full rounded-full border-8 bg-fiche-green border-fc-black"
                    style="aspect-ratio: 1/1" />
                <div class="flex flex-col h-full ml-8">
                    <h1 class="text-3xl font-bold text-fiche-green">
                        [Pseudo]
                    </h1>
                    <h1 class="text-chips-yellow">
                        dernière connexion:
                        <span class="font-bold">le 05-01-01 à 12:12</span>
                    </h1>
                    <p class="font-bold italic">
                        “Jeune elfe recherche un mage mortel ...”
                    </p>
                    <h1 class="mt-auto">Paris, France</h1>
                    <h1>Privé</h1>
                </div>
                <div class="flex flex-col flex-grow h-full ml-8">
                    <div class="flex mt-auto">
                        <div class="">Nombre de partie (Joueur):</div>
                        <div class="ml-auto">666</div>
                    </div>
                    <div class="flex">
                        <div class="">Nombre de partie (MJ):</div>
                        <div class="ml-auto">666</div>
                    </div>
                    <div class="flex">
                        <div class="">Temp passé en campagne:</div>
                        <div class="ml-auto">666</div>
                    </div>
                    <div class="flex">
                        <div class="">Date d'inscription:</div>
                        <div class="ml-auto">666</div>
                    </div>
                </div>
            </div>
            <div
                class="flex w-full h-60 mt-auto mb-20 items-center justify-evenly space-x-2 bg-chips-yellow overflow-hidden">
                <Badge
                    size="l"
                    :completion="badge.completion"
                    v-for="badge in badgesToDisplayWhenPublic"
                    :key="badge.id" />
            </div>
        </div>
        <Modal v-show="showModal" @close-modal="showModal = false">
            <div
                class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-chip-yellow-trans">
                <div
                    class="bg-white h-1/3 w-1/3 flex flex-col justify-center items-center text-red-500 font-bold text-xl space-y-10">
                    <div class="text-center">
                        <div>
                            Voulez-vous vraiment supprimer votre profile ?
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
                            class="bg-fiche-green text-white h-[2.5em] p-1"
                            style="aspect-ratio: 1/1"
                            @click="showModal = false">
                            Non
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import CustomTable from '~/components/subComponent/CustomTable.vue'
import Modal from '~/components/Modal.vue'
import EditableDiv from '~/components/subComponent/EditableDiv.vue'
import Avatar from '~/components/subComponent/Avatar.vue'
import Badge from '~/components/subComponent/Badge.vue'
import CharacterCard from '~/components/subComponent/CharacterCard.vue'
import { apiCall } from '~/utils/apiCall'

export default {
    components: {
        Modal,
        CustomTable,
        EditableDiv,
        Avatar,
        Badge,
        CharacterCard,
    },

    data() {
        return {
            showModal: false,
            user: {
                id: 0,
                username: 'Ganarok',
                email: 'Ganarok@mail.com',
                location: 'Montpelier, france',
                avatar: '',
                description: '“Jeune elfe recherche un mage mortel ...”',
                lastConnection: '',
                createdAt: '',
                badges: [],
                characters: [],
            },
            profile: {},
            stats: {},
            prefs: {},
            friends: [],
            campaignsHistory: [],
            badges: [],
            badgesPage: 0,
            ownprofile: true,
            preview: false,
            editMode: false,
        }
    },
    mounted() {
        this.badgeGenerator(50)
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
