<template>
    <div 
        class="flex flex-col w-full space-y-4 p-4 text-lg overflow-y-scroll text-white"
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

            <div class="flex flex-col space-y-1 truncate">
                <p
                    v-for="(character, index) in diary.characters"
                    :key="index"
                    class="italic"
                >
                    {{ character.firstname }} {{ character.lastname }}
                </p>
            </div>
        </div>

        <div class="flex flex-col">
            <p class="font-bold">
                Lieux
            </p>

            <div>
                {{ diary.places.title }}
            </div>
        </div>

        <div class="flex flex-col">
            <p class="font-bold">
                Joueurs
            </p>

            <div class="flex flex-col space-y-1 truncate">
                <p
                    v-for="(player, index) in diary.players"
                    :key="index"
                    class="italic"
                >
                    {{ player.user.username }}
                </p>
            </div>
        </div>

        <div 
            class="flex flex-col h-full space-y-2"
            style="minHeight: 400px"
        >
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