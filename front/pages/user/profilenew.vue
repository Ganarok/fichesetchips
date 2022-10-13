<template>
    <div class="flex">
        <SubComponentSidebar />
        <div class="h-screen w-full overflow-hidden flex font-barlow">
            <div
                class="w-1/3 h-full bg-yellow-300 p-8 flex flex-col items-center">
                <div class="flex flex-col items-center mb-8">
                    <Avatar
                        nickname="Ganarok"
                        nick_bold
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
                    <badge v-for="n in 20" />
                    <div />
                </div>
            </div>
            <div class="w-full h-3/4 flex flex-col px-8 pb-16 pt-10">
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
                    <CharacterCard />
                </div>
                <div class="w-full mt-auto">
                    <h1 class="font-bold text-3xl">Amis</h1>
                    <div class="h-1 w-full bg-fc-black" />
                    <div class="flex">
                        <Avatar
                            class="mx-auto mt-4"
                            :nickname="'[pseudo-' + n + ']'"
                            v-for="n in 6" />
                    </div>
                </div>
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
        }
    },
}
</script>

<style></style>
