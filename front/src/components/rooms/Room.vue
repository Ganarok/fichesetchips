<template>
    <div
        v-if="!room"
        class="flex flex-col h-full items-center justify-center font-bold text-xl"
    >
        {{ $t("Cette room n'existe pas ou n'a pas pu être récupérée") }}

        <div class="my-4">
            <Button
                :button-text="$t('Retour')"
                class="px-6 py-2"
                color="fc-green"
                @click="() => $router.push('/rooms')"
            />
        </div>
    </div>
    <div
        v-else
        class="flex flex-col h-full space-y-4 sm:space-y-8"
    >
        <div class="flex items-center">
            <BlackGreenDiv
                :title="room.title"
                :right-green-div="false"
                color="text-fc-yellow"
                height="h-16"
                :canEdit="false"
            />
            <!-- todo here : if is gm -->
            <div
                v-if="is_gm"
                class="flex relative h-full h-12 px-4 justify-between items-center text-white font-bold select-none"
            >
                <div class="ml-4 relative z-50">
                    <img
                        src="@/assets/icons/option.svg"
                        class="p-2 h-10 w-10 cursor-pointer transition ease-in-out hover:opacity-80 hover:rotate-90 bg-fc-black rounded-full"
                        alt="option"
                        @click="() => optionsOpened = !optionsOpened"
                    >

                    <div
                        v-if="optionsOpened"
                        class="absolute right-10 items-center p-2 bg-fc-black-light text-fc-yellow whitespace-nowrap"
                    >
                        <div class="flex flex-col space-y-4">
                            <div
                                v-for="option in options"
                                :key="option.name"
                                class="flex flex-col"
                            >
                                <p
                                    :class="option.class"
                                    class="text-xs cursor-pointer hover:opacity-80"
                                    @click="option.action"
                                >
                                    {{ option.name }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <Button
                    v-if="is_gm"
                    class="ml-4 sm:mx-12"
                    :button-text="room.is_published ? 'Dépublier' : 'Publier'"
                    color="fc-green"
                    :rounded="false"
                    background-color="fc-black"
                    @click="handlePublish"
                />
                <Button
                    class="ml-4 sm:mx-12"
                    :button-text="is_gm ? 'Sauvegarder' : canPlayerJoin"
                    color="fc-green"
                    :rounded="false"
                    background-color="fc-black"
                    @click="postForm"
                /> -->
            </div>
            <div
                v-else-if="is_player"
                class="flex"
            >
                <Button
                    v-if="game_is_running"
                    :class="`ml-4 sm:mx-12`"
                    :button-text="'Rejoindre la session en cours'"
                    :color="'fc-green'"
                    :rounded="false"
                    :background-color="'fc-black'"
                    @click="$router.push(`/rooms/${room.id}/session`)"
                />
                <Button
                    v-else-if="game_is_planned || game_is_paused"
                    :class="`ml-4 sm:mx-12 cursor-auto hover:opacity-100`"
                    :button-text="'Session non commencée'"
                    :color="''"
                    :rounded="false"
                    :background-color="'fc-gray'"
                />
                <Button
                    v-else-if="game_is_closed"
                    :class="`ml-4 sm:mx-12 cursor-auto hover:opacity-100`"
                    :button-text="'Session cloturée'"
                    :color="''"
                    :rounded="false"
                    :background-color="'fc-gray'"
                />
            </div>
            <div
                v-else
                class="flex"
            >
                <Button
                    v-if="game_is_full"
                    :class="`ml-4 sm:mx-12 cursor-auto hover:opacity-100`"
                    :button-text="'La game est déjà pleine !'"
                    :color="''"
                    :rounded="false"
                    :background-color="'fc-gray'"
                />
                <Button
                    v-else
                    :class="`ml-4 sm:mx-12`"
                    :button-text="'Rejoindre'"
                    :color="'fc-green'"
                    :rounded="false"
                    :background-color="'fc-black'"
                    @click="joinGame"
                />
            </div>
        </div>

        <div class="flex flex-col h-full w-full sm:overflow-y-auto sm:space-x-8 sm:flex-row relative">
            <div
                v-if="characters_modal" 
                class="absolute z-10 bg-white"
                :style="{'width':'100%', 'height':'100%'}"
            >
                <h2 class="font-bold text-xl text-center mb-5">
                    Choisi ton personnage !
                </h2>
                <CharactersList
                    :player_id="player.id"
                    :room_id="room_id"
                />
            </div>
            <div class="flex flex-col relative h-full w-full pb-4 sm:w-3/4">
                <BlackGreenDiv
                    title="Description"
                    :right-green-div="false"
                    color="text-white"
                />
                <div class="flex h-full overflow-y-scroll scrollbar-hide">
                    <p
                        class="flex text-justify pr-2 m-2 sm:m-3 w-full"
                    >
                        {{ room.description }}
                    </p>
                </div>

                <img
                    src="@/assets/cornerPixels.svg"
                    class="absolute bottom-4 right-0 w-12 -rotate-180 -z-10 scale-x-[-1]"
                >
            </div>

            <div class="flex flex-col w-full h-full">
                <BlackGreenDiv
                    title="Paramétrage"
                    :right-green-div="false"
                    color="text-white"
                />

                <div class="flex w-full h-full p-4 justify-evenly  sm:h-1/2">
                    <div class="flex flex-col space-y-4 sm:space-y-6">
                        <ParamétrageDiv
                            v-for="(content, index) in left_contents"
                            :key="index"
                            :content="content"
                            :name="content.name"
                            :value="content.value"
                        />
                    </div>

                    <div class="flex flex-col space-y-4 sm:space-y-6">
                        <ParamétrageDiv
                            v-for="(content, index) in right_contents"
                            :key="index"
                            :content="content"
                            :name="content.name"
                            :value="content.value"
                        />
                    </div>
                </div>

                <div class="flex flex-col h-full">
                    <BlackGreenDiv
                        title="Maitre de jeu"
                        :right-green-div="false"
                        color="text-white"
                    />

                    <div class="flex flex-col items-center justify-between p-4 space-x-2 sm:flex-row">
                        <div class="flex items-center space-x-4">
                            <div class="bg-gray-400 border-2 border-fc-black-light rounded-full w-24 h-24">
                                <img src="@/assets/avatar/avatar_default.svg">
                            </div>
                            <p class="text-xl font-bold">
                                {{ room?.gm?.username || "MJ" }}
                            </p>
                        </div>
                    </div>

                    <BlackGreenDiv
                        title="Liste des joueurs"
                        :right-green-div="false"
                        color="text-white"
                    />

                    <div class="flex flex-wrap items-center justify-start p-4">
                        <div
                            v-for="(player, index) of room.game?.players"
                            :key="index"
                            class="flex text-xl font-bold items-center p-2"
                        >
                            <div class="bg-gray-400 border-2 border-fc-black-light rounded-full mr-4 w-20 h-20">
                                <img src="@/assets/avatar/avatar_default.svg">
                            </div>
                            <div class="flex flex-col justify-evenly">
                                <p>
                                    {{ player.user.username || "Utilisateur" }}
                                </p>
                                <div v-if="player.character">
                                    <p>
                                        {{ `${player.character.firstname}${player.character.lastname}` }}
                                    </p>
                                    <p>
                                        {{ player.character.level_id }}
                                    </p>
                                </div>
                                <div v-else>
                                    No character
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex"
import { useToast } from "vue-toastification"

import Button from "@/components/common/Button.vue"
import ParamétrageDiv from "@/components/rooms/ParamétrageDiv.vue"
import BlackGreenDiv from "@/components/common/BlackGreenDiv.vue"
import { apiCall } from '@/utils/apiCall'
import CharactersList from '@/components/rooms/Characters.vue'



export default {
    name: "Room",
    components: {
        Button,
        BlackGreenDiv,
        ParamétrageDiv,
        CharactersList
    },
    props: {
        room_id: {
            type: String,
            default: null
        },
    },
    data() {
        return {
            left_contents: [],
            right_contents: [],
            characters_modal: false,
            player: [],
            is_player: false,
            optionsOpened: false,
            options: []
        }
    },
    computed: {
        ...mapState("room", {
            room: (state) => state.room,
        }),
        ...mapState("user", {
            user: (state) => state.user,
        }),
        is_gm() {
            return this.room?.gm?.id === this.user?.id
        },
        game_is_full () {
            return this.room?.game?.players?.length >= this.room?.players_nb_max
        },
        game_is_running () {
            return this.room?.game.status == "running"
        },
        game_is_paused () {
            return this.room?.game.status == "paused"
        },
        game_is_closed () {
            return this.room?.game.status == "closed"
        },
        game_is_planned () {
            return this.room?.game.status == "planned"
        }
    },
    async mounted() {
        await this.clear_room()
        await this.fetch_room(this.room_id)
        this.checkPlayer()
        this.reloadOptions()
        this.left_contents = [{name: 'Prérequis:', value: this.room.requirements},
            {name: 'Story:', value: this.room?.game?.story?.title},
            {name: 'Map:', value: this.room?.game?.tilemap?.title},
            {name: 'Nombre de joueurs:', value: `${this.room?.game?.players.length}/${this.room.players_nb_max}`}]
        this.right_contents = [{name: 'Vocal:', value: this.room.vocal_url},
            {name: 'Accessibilité:', value: this.room.is_private ? 'privé' : 'public'}]
    },
    methods: {
        checkPlayer() {
            const player_exist = this.room?.game.players.filter(player => player.user.id == this.user.id)
            if (player_exist.length > 0) {
                this.is_player = true
                this.player = player_exist[0]
            } else {
                this.is_payer = false
            }
        },
        reloadOptions() {
            this.optionsOpened = false
            this.options = [
                {
                    name: "Editer la room",
                    action: () => this.$router.push(`/rooms/${this.room_id}/edit`),
                },
                {
                    name: this.room.is_published ? "Dépublier" : "Publier",
                    action: async () => { await this.handlePublish()} ,
                },
            ]
            if (this.game_is_running) {
                this.options.push({
                    name: "Rejoindre la game en cours",
                    action: () => this.$router.push(`/rooms/${this.room_id}/session`),
                }, {
                    name: "Mettre en pause la game",
                    action: async () => {await this.updateGameStatus("paused")},
                })
            } else if (this.game_is_paused || this.game_is_planned) {
                this.options.push({
                    name: "Démarrer la game",
                    action: async () => {
                        await this.updateGameStatus("running")
                        this.$router.push(`/rooms/${this.room_id}/session`)
                    },
                }, {
                    name: "Cloturer la game",
                    action: async () => {
                        await this.updateGameStatus("closed")
                    },
                })
            }
        },
        async handlePublish() {
            const toast = useToast()
            try {
                await apiCall({
                    route: `/rooms/${this.room_id}`,
                    method: 'PATCH',
                    body: {is_published: !this.room.is_published}
                })
                await this.fetch_room(this.room_id)
                this.reloadOptions()
                toast.success('Room updated avec succes')
            } catch (error) {
                toast.error(error)
            }
        },
        async joinGame() {
            const toast = useToast()
            try {
                await apiCall({
                    route: `/rooms/${this.room_id}/join`,
                    method: 'PATCH'
                })
                this.fetch_room
                this.checkPlayer()
                this.characters_modal = true
            } catch (error) {
                toast.error(error)
            }
        },
        async updateGameStatus(status) {
            const toast = useToast()
            try {
                console.log(this.room.game.state)
                await apiCall({
                    route: `/games/${this.room.game.id}`,
                    method: 'PUT',
                    body: {status : status, state: this.room.game.state}
                })
                toast.success('Room updated avec succes')
                await this.fetch_room(this.room_id)
                this.reloadOptions()
                    
            } catch (error) {
                toast.error(error)
            }
        },
        ...mapActions({
            fetch_room: "room/fetch_room",
            clear_room: "room/clear_room",
        }),
        ...mapMutations({
            set_title: "room/set_title",
            set_description: "room/set_description",
            set_requirements: "room/set_requirements",
            set_vocal_url: "room/set_vocal_url",
            set_is_private: "room/set_is_private",
            set_is_published: "room/set_is_published",
            set_password: "room/set_password",
            set_players_nb_max: "room/set_players_nb_max",
            set_universe: "room/set_universe_id",
            set_story_id: "room/set_story_id",
            set_map_id: "room/set_map_id",
            set_status: "room/set_status"
        }),
    }
}
</script>
