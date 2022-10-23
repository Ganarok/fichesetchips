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
                    <EditableDiv value="Paris, france" />
                    <EditableDiv value="jean.bobby@gmail.com" />
                </div>
                <p class="font-bold italic text-2xl">
                    <EditableDiv
                        value="“Jeune elfe recherche un mage mortel ...”"
                        class="max-w-full" />
                </p>

                <div class="grid gap-6 md:gap-4 grid-cols-5 mt-auto">
                    <Badge
                        size="s"
                        canFav
                        :isFav="badges[idx].isFav"
                        :completion="badge.completion"
                        @favorite="handleFavorite(badge.id)"
                        v-for="(badge, idx) in badges"
                        :key="badge.id" />
                </div>
            </div>
            <div class="w-full h-3/4 flex flex-col px-8 pb-16 pt-8">
                <div class="h-full flex pb-6">
                    <div
                        class="h-full flex flex-col w-1/2 text-center space-y-4 px-20">
                        <div
                            class="flex w-full h-20 items-center justify-center text-center bg-fc-black text-fiche-green">
                            Statistiques
                        </div>
                        <div class="flex w-full h-16">
                            <div class="w-2/5 flex items-center justify-center">
                                666
                            </div>
                            <div
                                class="w-3/5 flex items-center justify-center text-white bg-fc-black">
                                Parties jouées
                            </div>
                        </div>
                        <div class="flex w-full h-16">
                            <div
                                class="w-3/5 flex items-center justify-center text-white bg-fc-black">
                                Parties jouées
                            </div>
                            <div class="w-2/5 flex items-center justify-center">
                                666
                            </div>
                        </div>
                        <div class="flex w-full h-16">
                            <div class="w-2/5 flex items-center justify-center">
                                01-01-01
                            </div>
                            <div
                                class="w-3/5 flex items-center justify-center text-white bg-fc-black">
                                Date d'inscription
                            </div>
                        </div>
                        <div class="flex w-full h-16">
                            <div
                                class="w-3/5 flex items-center justify-center text-white bg-fc-black">
                                Temps de jeu
                            </div>
                            <div class="w-2/5 flex items-center justify-center">
                                666
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
                class="flex w-full h-60 mt-auto mb-20 items-center justify-evenly bg-chips-yellow">
                <Badge
                    size="l"
                    :completion="badge.completion"
                    v-for="badge in badgesToDisplayWhenPublic"
                    :key="badge.id" />
            </div>
        </div>
    </div>
</template>

<script>
import CustomTable from '~/components/subComponent/CustomTable.vue'
import EditableDiv from '~/components/subComponent/EditableDiv.vue'
import Avatar from '~/components/subComponent/Avatar.vue'
import Badge from '~/components/subComponent/Badge.vue'
import CharacterCard from '~/components/subComponent/CharacterCard.vue'
import { apiCall } from '~/utils/apiCall'

export default {
    components: { CustomTable, EditableDiv, Avatar, Badge, CharacterCard },

    data() {
        return {
            profile: {},
            stats: {},
            prefs: {},
            friends: [],
            campaignsHistory: [],
            badges: [],
            ownprofile: true,
            preview: false,
        }
    },
    mounted() {
        this.badgeGenerator(20)
    },
    methods: {
        badgeGenerator(badgeNbr) {
            for (let index = 0; index < badgeNbr; index++) {
                this.badges.push({
                    id: index,
                    isFav: false,
                    completion: this.randomIntFromInterval(0, 100),
                })
            }
        },
        handleFavorite(badgeID) {
            const badgeIndex = this.badges.findIndex(
                (badge) => badge.id == badgeID
            )
            this.badges[badgeIndex].isFav = !this.badges[badgeIndex].isFav
        },
        randomIntFromInterval(min, max) {
            // min and max included
            return Math.floor(Math.random() * (max - min + 1) + min)
        },
    },
    computed: {
        badgesToDisplayWhenPublic() {
            let toDisplay = []
            this.badges.forEach((badge) =>
                badge.isFav ? toDisplay.push(badge) : null
            )
            return toDisplay
        },
    },
}
</script>

<style></style>
