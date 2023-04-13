<template>
    <table class="table-auto relative space-y-3 p-4 bg-white">
        <thead>
            <tr>
                <th class="text-grey"></th>
                <th class="text-fc-gray">NOM DE LA PARTIE</th>
                <th class="text-fc-gray">UNIVERS</th>
                <th class="text-fc-gray">CARTE</th>
                <th class="text-fc-gray">SLOT</th>
                <th class="text-fc-gray"></th>
            </tr>
        </thead>
        <tbody
            v-for="(room, index) in rooms"
            :key="index"
            :room="room"
        >
            <tr>
                <td>
                    <img
                        src="../assets/avatar/character.png"
                        class="object-cover h-10 rounded-full bg-fc-green border-2 border-fc-black"
                        :style="grayed ? 'filter: grayscale(1)' : null"
                    >
                </td>
                <td class="center">
                    {{ room.title }}
                </td>
                <td>Caves & Monstres</td>
                <td>
                    <div v-if="room.game.tilemap">
                        {{ room.game.tilemap.title }}
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
        rooms: []
    },
    data() {
    },
    computed: {
    },
    async mounted() {
    },
    methods: {
    }}
</script>

