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
                    <p>Paris, France</p>
                    <p>jean.bobby@gmail.com</p>
                </div>
                <p class="font-bold italic text-2xl">
                    “Jeune elfe recherche un mage mortel ...”
                </p>
                <div class="grid gap-6 grid-cols-5 mt-auto">
                    <badge v-for="n in 20" />
                    <div />
                </div>
            </div>
            <div class="w-full h-full flex flex-col p-8">
                <div class="h-full">
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
            campaignsHistory: [],
            badges: [],
        }
    },
}
</script>

<style></style>
