<template>
    <div 
        class="flex flex-col w-full space-y-4 p-4 text-lg overflow-y-scroll text-white"
        :style="{
            height: 'calc(100vh - 64px )'
        }"
    >
        <p class="text-xl font-bold text-fc-yellow">
            {{ $t('log') }}
        </p>

        <div class="flex flex-col">
            <p class="font-bold">
                {{$t('characters')}}
            </p>

            <div
                v-for="(character, index) in diary.characters"
                :key="index"
            >
                <!-- TODO: récupérer la data -->
            </div>
        </div>

        <div class="flex flex-col">
            <p class="font-bold">
                {{ $t('places') }}
            </p>

            <div
                v-for="(place, index) in diary.places"
                :key="index"
            >
                <!-- TODO: récupérer la data -->
            </div>
        </div>

        <div class="flex flex-col">
            <p class="font-bold">
                {{ $t('players') }}
            </p>

            <div
                v-for="(player, index) in diary.players"
                :key="index"
            >
                <!-- TODO: récupérer la data -->
            </div>
        </div>

        <div class="flex flex-col h-full space-y-2">
            <p class="font-bold">
                Notes
            </p>

            <textarea
                v-model="diary.notes"
                class="flex p-2 h-full bg-transparent border border-fc-green outline-none text-base text-fc-yellow"
                placeholder="Vous pouvez écrire toutes vos notes ici"
            />
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