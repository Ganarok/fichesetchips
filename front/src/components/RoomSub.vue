<template>
    <table class="flex flex-col justify-between w-full relative space-y-3 p-4 bg-white">
        <thead class="w-full">
            <tr class="grid grid-cols-7 justify-between w-full border-b-2 border-fc-gray-light">
                <th class="text-grey min-w-1/10"></th> <!-- Avatar -->
                <th class="text-fc-gray w-2/10">
                    NOM DE LA PARTIE
                </th>
                <th class="text-fc-gray w-2/10">
                    UNIVERS
                </th>
                <th class="text-fc-gray w-2/10">
                    CARTE
                </th>
                <th class="text-fc-gray w-1/10">
                    SLOT
                </th>
                <th class="text-fc-gray w-1/10">
                    STATUT
                </th>
                <th class="text-fc-gray min-w-2/10"></th>
            </tr>
        </thead>
        <tbody
            v-for="(room, index) in rooms"
            :key="index"
            :room="room"
            class="flex justify-between w-full"
        >
            <tr class="grid grid-cols-7 w-full border-b-2 border-fc-gray-light">
                <td class="flex flex-col justify-center items-center">
                    <img
                        src="../assets/avatar/character.png"
                        class="object-cover h-10 rounded-full bg-fc-green border-2 border-fc-black hover:opacity-70 cursor-pointer"
                        :style="grayed ? 'filter: grayscale(1)' : null"
                        @click="() => $router.push(`/user/profile/${room.gm.username}`)"
                    >
                    {{ room.gm.username }}
                </td>
                <td class="flex justify-center">
                    {{ room.title }}
                </td>
                <td class="flex justify-center">
                    Caves & Monstres
                </td>
                <td class="flex justify-center">
                    <div v-if="room.game.tilemap">
                        {{ room.game.tilemap.title }}
                    </div><div v-else>
                        None
                    </div>
                </td>
                <td class="flex justify-center">
                    {{ room.game.players?.length }}/{{ room.players_nb_max }}
                </td>
                <td class="flex justify-center uppercase text-black">
                    {{ room.game.status }}
                </td>
                <td class="flex justify-end">
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

