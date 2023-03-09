<template>
    <div 
        class="flex flex-col w-full space-y-4 p-4 text-lg text-white"
        :style="{
            height: 'calc(100vh - 64px )'
        }"
    >
        <p class="text-xl font-bold text-fc-yellow">
            Journal
        </p>

        <div class="flex flex-col">
            <p class="font-bold">
                Personnages
            </p>

            <div
                v-for="(character, index) in diary.characters"
                :key="index"
            >
                p
            </div>
        </div>

        <div class="flex flex-col">
            <p class="font-bold">
                Lieux
            </p>

            <div
                v-for="(place, index) in diary.places"
                :key="index"
            >
                p
            </div>
        </div>

        <div class="flex flex-col">
            <p class="font-bold">
                Joueurs
            </p>

            <div
                v-for="(player, index) in diary.players"
                :key="index"
            >
                p
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "Diary",
    computed: {
        ...mapState("game", {
            diary: (state) => state.diary
        })
    }
}

</script>