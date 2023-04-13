<template>
    <table class="table-auto relative space-y-3 p-4 bg-white">
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
        >
            <tr>
                <td>
                    <img
                        :src="room.gm.avatar"
                        class="object-cover h-10 rounded-full bg-fc-green border-2 border-fc-black"
                        :style="grayed ? 'filter: grayscale(1)' : null"
                    >
                </td>
                <td class="center">
                    {{ room.title }}
                </td>
                <td>Caves & Monstres</td>
                <td>
                    <div v-if="room.game.map">
                        {{ room.game.map.title }}
                    </div><div v-else>
                        None
                    </div>
                </td>
                <td>{{ room.game.players.length }}/{{ room.players_nb_max }}</td>
                <td>
                    <Button
                        :button-text="'Voir'"
                        class="px-4 py-2 text-base rounded-full"
                        textColor="text-fc-black"
                        color="fc-green"
                        backgroundColor="fc-green"
                        :rounded="false"
                    />
                </td>
            </tr>
        </tbody>
    </table>
<!-- 
    <div class="flex flex-col relative space-y-3 p-4 bg-white">
                    <div class="flex flex-row space-x-4 lg:space-x-32">
                        <p>GM</p>
                        <p>NOM DE LA PARTIE</p>
                        <p>UNIVERS</p>
                        <p>CARTE</p>
                        <p>SLOT</p>
                    </div>
                    <div
                        class="flex flex-row space-x-4 lg:space-x-32"
                        v-for="(room, index) in rooms"
                        :key="index"
                        :room="room"
                    >
                    <p>{{ room.gm.avatar }}</p>
                    </div>
                    </div> -->
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