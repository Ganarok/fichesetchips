<template>
    <table class="table-auto relative space-y-4 divide-y-2">
        <thead>
            <tr>
                <th></th>
                <th>NOM DE LA PARTIE</th>
                <th>UNIVERS</th>
                <th>CARTE</th>
                <th>SLOT</th>
                <th></th>
            </tr>
        </thead>

        <tbody
            v-for="(room, index) in rooms"
            :key="index"
            :room="room"
            class="text-center gap-4"
        >
            <tr>
                <td>
                    <div class="relative w-10 h-10">
                        <img
                            src="../assets/avatar/character.png"
                            class="object-contain rounded-full bg-fc-green border-2 border-fc-black"
                            :style="grayed ? 'filter: grayscale(1)' : null"
                        >
                    </div>
                </td>
                <td class="center">
                    {{ room.title }}
                </td>
                <td>Caves & Monstres</td>
                <td>
                    <div v-if="room.game">
                        {{ room.game }}
                    </div><div v-else>
                        None
                    </div>
                </td>
                <td>{{ room.game.players.length }}/{{ room.players_nb_max }}</td>
                <td>
                    <Button
                        :button-text="'Inspecter'"
                        class="px-4 py-2 text-base divide-x-2"
                        textColor="text-white"
                        color="fc-green"
                        backgroundColor="fc-black"
                        :rounded="false"
                        @click="() => $router.push(`/rooms/${room.id}`)"
                    />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import Button from "@/components/common/Button.vue"

export default {
    components: { Button
    },
    props: {
        rooms: {
            type: Array,
            default: () => []
        },
        grayed: {
            type: Boolean,
            default: false
        }
    },
}
</script>

