<template>
    <div class="flex flex-wrap gap-4 justify-center items-center">
        <div v-for="character in characters"
            :key="character.id"
            :character="character">

        <Card 
            class="max-w-[340px] min-w-[340px] max-h-[550px] mb-5"
            :key="character.id"
            :character="character"
            :with_router_link="false"
            :grayed="characters_in_game[character.id]"
        />
        
        <Button
                    :customClass="characters_in_game[character.id] ? 'cursor:auto' : ''"
                    :button-text="characters_in_game[character.id] ? 'En jeu' : 'Choisir'"
                    :textColor="'text-fc-black'"
                    :color="characters_in_game[character.id] ? 'fc-gray' : 'fc-yellow'"
                    :rounded="false"
                    :background-color="characters_in_game[character.id] ? 'fc-gray' : 'fc-yellow'"
                    @click="characters_in_game[character.id] ? '' : chooseCharacter(character.id)"
                />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { useToast } from "vue-toastification"
import { apiCall } from '@/utils/apiCall'
import Button from "@/components/common/Button.vue"

import Card from "@/components/common/Cards/CharacterCard.vue"

export default {
    name: "CharactersList",
    components: { Card, Button },
    props: {
        player_id: {
            type: String,
            default: ''
        },
        room_id: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            characters_in_game: []
        }
    },
    computed: {
        ...mapState("characters", {
            characters: (state) => state.characters,
        }),
        ...mapState("room", {
            room: (state) => state.room,
        }),
        ...mapState("user", {
            user: (state) => state.user,
        }),
    },
    async mounted() {
        await this.fetch_room(this.room_id)
        await this.fetch_characters() 
        await this.checkIfCharactersAreInGame()
    },
    methods: {
        ...mapActions({
            fetch_characters: "characters/fetch_characters",
            fetch_room: "room/fetch_room",
        }),
        async checkIfCharactersAreInGame() {
        const {data} = await apiCall({
                    route: `/cem/characters/are_in_game`,
                    method: 'POST',
                    body: {characters: this.characters.map(character => character.id)}
                })
        this.characters_in_game = data
        console.log(this.characters_in_game)
        console.log(this.characters_in_game["21e2e286-2ec6-442c-b7d9-b47163696653"])
        },
        async chooseCharacter(character_id) {
            console.log(this.player_id)
            const toast = useToast()
            try {
                const players = this.room.game.players.filter(player => player.user.id == this.user.id)
                await apiCall({
                    route: `/players/${players[0].id}`,
                    method: 'PATCH',
                    body: {character_id: character_id}
                })
                await this.$router.push(`/rooms/${this.room_id}`)
                toast.success('Room joined avec succes')
            } catch (error) {
                toast.error(error)
            }
        },
    }
}
</script>

<style>

.container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    row-gap: .5em;
    flex-wrap: wrap;
    margin-top: 1em;
    
    
}

    
</style>
