<template>
    <SidebarLayout :is-border="false">
        <div class="flex flex-col h-screen w-full md:flex-row">
            <div
                class="flex flex-col relative items-center justify-between h-full w-full md:w-1/2 md:max-w-sm space-y-4 p-4 md:border-fc-green md:border-r-4"
            >
                <img
                    src="@/assets/cornerPixels.svg"
                    class="absolute top-0 right-0 rotate-90 -z-10 scale-x-[-1] invisible sm:visible"
                >

                <div class="relative text-2xl w-52 sm:w-40 xl:w-52">
                    <Avatar
                        :username="user.username"
                        username_under
                        class="text-3xl xl:text-4xl"
                    />
                </div>

                <div class="flex flex-col items-center space-y-1 text-xl">
                    <EditableDiv
                        v-model="user.location"
                        :edit-mode="editMode"
                    />
                    <EditableDiv
                        v-model="user.email"
                        :edit-mode="editMode"
                    />
                </div>

                <p class="flex text-center font-bold italic text-xl">
                    <EditableDiv
                        v-model="user.description"
                        :edit-mode="editMode"
                    />
                </p>

                <div class="flex flex-wrap items-center justify-center">
                    <Badge
                        v-for="(badge, idx) in badges[badgesPage]"
                        :key="badge.id"
                        size="s"
                        can-fav
                        class="m-1"
                        :is-fav="badges[badgesPage][idx].isFav"
                        :completion="badge.completion"
                        @favorite="handleFavorite(badge.id)"
                    />
                </div>

                <div class="flex items-center justify-evenly mt-4">
                    <div
                        :class="badgesPage != 0 ? null : 'pointer-events-none opacity-25'"
                        class="cursor-pointer select-none"
                        @click="badgesPage > 0 ? (badgesPage -= 1) : null"
                    >
                        <img src="../../assets/icons/fleche.svg">
                    </div>

                    <div class="mx-2">
                        {{ badgesPage + 1 }} / {{ badges.length }}
                    </div>

                    <div
                        :class="
                            badgesPage < badges.length - 1
                                ? null
                                : 'pointer-events-none opacity-25'
                        "
                        class="cursor-pointer select-none rotate-180"
                        @click="badgesPage < badges.length - 1 ? (badgesPage += 1) : null"
                    >
                        <img src="../../assets/icons/fleche.svg">
                    </div>
                </div>

                <div class="flex space-x-10">
                    <button
                        class="text-gray-600"
                        @click="editMode = !editMode"
                    >
                        {{ editMode ? "Enregistrer" : "Editer" }}
                    </button>
                    <button
                        class="text-gray-600 hover:text-red-500"
                        @click="showModal = true"
                    >
                        Supprimer
                    </button>
                </div>

                <img
                    src="@/assets/cornerPixels.svg"
                    class="absolute bottom-0 right-0 rotate-180 -z-10 scale-x-[-1] invisible sm:visible"
                >
            </div>

            <div class="flex flex-col space-y-4 w-full h-full px-4 pt-4">
                <div
                    class="flex flex-col items-center w-full space-y-4 md:space-x-2 md:space-y-0 md:flex-row xl:space-x-4"
                >
                    <div class="flex flex-col w-full h-full text-center space-y-2">
                        <div
                            class="flex w-full h-20 items-center justify-center text-center text-3xl font-bold bg-fc-black text-fc-green"
                        >
                            Statistiques
                        </div>

                        <div class="flex flex-col justify-evenly h-full space-y-2 p-1">
                            <div class="flex w-full h-16">
                                <div class="w-2/5 flex items-center justify-center">
                                    666
                                </div>
                                <div
                                    class="relative w-3/5 flex items-center justify-center text-white bg-fc-black"
                                >
                                    <div
                                        class="absolute -right-1 -top-1 z-[-1] bg-fc-green h-2 w-2"
                                    />
                                    <div
                                        class="absolute -right-1 -bottom-1 z-[-1] bg-fc-green h-2 w-2"
                                    />
                                    Parties jouées (Joueur)
                                </div>
                            </div>

                            <div class="flex w-full h-16">
                                <div
                                    class="relative w-3/5 flex items-center justify-center text-white bg-fc-black"
                                >
                                    <div
                                        class="absolute -left-1 -top-1 z-[-1] bg-fc-green h-2 w-2"
                                    />
                                    <div
                                        class="absolute -left-1 -bottom-1 z-[-1] bg-fc-green h-2 w-2"
                                    />
                                    Parties jouées (MJ)
                                </div>
                                <div class="w-2/5 flex items-center justify-center">
                                    666
                                </div>
                            </div>
                            <div class="flex w-full h-16">
                                <div class="w-2/5 flex items-center justify-center">
                                    {{ getDate(user.created_at) }}
                                </div>
                                <div
                                    class="relative w-3/5 flex items-center justify-center text-white bg-fc-black"
                                >
                                    <div
                                        class="absolute -right-1 -top-1 z-[-1] bg-fc-green h-2 w-2"
                                    />
                                    <div
                                        class="absolute -right-1 -bottom-1 z-[-1] bg-fc-green h-2 w-2"
                                    />
                                    Date d'inscription
                                </div>
                            </div>
                            <div class="flex w-full h-16">
                                <div
                                    class="relative w-3/5 flex items-center justify-center text-white bg-fc-black"
                                >
                                    <div
                                        class="absolute -left-1 -top-1 z-[-1] bg-fc-green h-2 w-2"
                                    />
                                    <div
                                        class="absolute -left-1 -bottom-1 z-[-1] bg-fc-green h-2 w-2"
                                    />
                                    Temps de jeu
                                </div>
                                <div class="w-2/5 flex items-center justify-center">
                                    666
                                </div>
                            </div>
                        </div>
                    </div>

                    <CharacterCard
                        name="Ganarok"
                        image="@/assets/dragon.svg"
                        :level="12"
                    />
                </div>

                <div class="flex flex-col w-full h-full">
                    <h1 class="font-bold text-3xl">
                        Amis
                    </h1>

                    <div class="h-1 w-full bg-fc-black" />

                    <div
                        class="flex self-center overflow-x-auto space-x-2 justify-center items-center h-full w-full md:w-[50vw] my-4"
                    >
                        <div
                            v-if="friends.length < 1"
                            class="flex font-bold text-center h-full items-center"
                        >
                            Ajoutez des amis pour voir leur status
                        </div>

                        <Avatar
                            v-for="friendship in friends"
                            :key="friendship.id"
                            :grayed="false"
                            :username="getFriendUsername(friendship)"
                        />
                        <div v-if="pending_approval.length > 0">
                            <p>Ils veulent être ton ami !</p>
                            <Avatar
                                v-for="friendship in pending_approval"
                                :key="friendship.id"
                                :grayed="false"
                                :username="friendship.user_asked.username"
                            />
                        </div>

                        <div v-if="pending_request.length > 0">
                            <p>Vouys attendez toujours leur retour</p>
                            <Avatar
                                v-for="friendship in pending_request"
                                :key="friendship.id"
                                :grayed="false"
                                :username="friendship.user_answered.username"
                            />
                        </div>
                    </div>
                </div>

                <Modal
                    v-show="showModal"
                    @close-modal="showModal = false"
                >
                    <div
                        class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-fc-yellow-trans"
                    >
                        <div
                            class="bg-white h-1/3 w-1/3 flex flex-col justify-center items-center text-red-500 font-bold text-xl space-y-10"
                        >
                            <div class="text-center">
                                <div>Voulez-vous vraiment supprimer votre profil ?</div>
                                <div class="text-sm">
                                    Attention, cette action est irreversible et toute vos donnée
                                    serons perdues définitivement
                                </div>
                            </div>
                            <div class="flex justify-center items-center w-full space-x-16">
                                <button
                                    class="bg-red-500 text-white h-[2.5em] p-1"
                                    style="aspect-ratio: 1/1"
                                    @click="deleteProfile"
                                >
                                    Oui
                                </button>
                                <button
                                    class="bg-fc-green text-white h-[2.5em] p-1"
                                    style="aspect-ratio: 1/1"
                                    @click="showModal = false"
                                >
                                    Non
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    </SidebarLayout>
</template>

<script>
import Modal from "@/components/Modal.vue"
import EditableDiv from "@/components/subComponent/EditableDiv.vue"
import Avatar from "@/components/subComponent/Avatar.vue"
import Badge from "@/components/subComponent/Badge.vue"
import CharacterCard from "@/components/subComponent/CharacterCard.vue"
import SidebarLayout from "@/layouts/Sidebar.vue"
import { mapState, mapActions } from "vuex"
import moment from "moment"

export default {
    components: {
        Modal,
        EditableDiv,
        Avatar,
        Badge,
        CharacterCard,
        SidebarLayout,
    },

    data() {
        return {
            showModal: false,
            badges: [],
            badgesPage: 0,
            preview: false,
            editMode: false,
        }
    },
    computed: {
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
    },
    methods: {
        ...mapActions({
            fetch_my_friends: "friends/fetch_my_friends",
            patch_user: "user/patch_user",
            delete_user: "user/delete_user",
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
    }}
</script>
