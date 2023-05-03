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
        v-else-if="!is_gm"
        class="flex flex-col h-full items-center justify-center font-bold text-xl"
    >
        {{ $t("Vous n'êtes pas GM de cette room et ne pouvez l'éditer") }}

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
        <div class="flex justify-between">
            <BlackGreenDiv
                :title="room.title"
                :onChange="(v) => set_title(v.target.value)"
                :right-green-div="false"
                color="text-fc-yellow"
                height="h-16"
                :canEdit="true"
            />
            <!-- <Button
                v-if="is_gm"
                class="ml-4 sm:mx-12"
                :button-text="room.is_published ? 'Dépublier' : 'Publier'"
                color="fc-green"
                :rounded="false"
                background-color="fc-black"
                @click="handlePublish"
            /> -->
            <Button
                class="ml-4 sm:mx-12"
                :button-text="is_gm ? 'Sauvegarder' : canPlayerJoin"
                color="fc-green"
                :rounded="false"
                background-color="fc-black"
                @click="postForm"
            />
        </div>

        <div class="flex flex-col h-full w-full sm:overflow-y-auto sm:space-x-8 sm:flex-row">
            <div class="flex flex-col relative h-full w-full pb-4 sm:w-3/4">
                <BlackGreenDiv
                    title="Description"
                    :right-green-div="false"
                    color="text-white"
                />

                <div class="flex h-full overflow-y-scroll scrollbar-hide">
                    <textarea
                        :value="room.description"
                        :onChange="(v) => set_description(v.target.value)"
                        class="flex text-justify pr-2 m-2 sm:m-3 w-full"
                        placeholder="Entrez une description"
                    />
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
                        <h3 class="flex font-bold">
                            Prérequis:
                            <CustomInput
                                :max-length="254"
                                place-holder="Prérequis"
                                type="text"
                                outline="fc-green"
                                :value="room.requirements"
                                @input="(v) => set_requirements(v.target.value)"
                            />
                        </h3>

                        <h3 class="flex font-bold">
                            Story:
                            <Selector
                                :items="stories"
                                :default-selected-item="{
                                    name: room?.game?.story?.title, value: room?.game?.story?.id
                                }"
                                :on-select-item="(v) => set_map_id(v)"
                                selector-class="font-normal ml-2 border-2 text-black"
                            />
                        </h3>

                        <h3 class="flex font-bold">
                            Map:
                            <Selector
                                :items="maps"
                                :default-selected-item="{
                                    name: room?.game?.tilemap?.title, value: room?.game?.tilemap?.id
                                }"
                                :on-select-item="(v) => set_map_id(v)"
                                selector-class="font-normal ml-2 border-2 text-black"
                            />
                        </h3>
                        <h3 class="flex font-bold">
                            Nombre de joueurs max:
                            <CustomInput
                                :max-length="254"
                                place-holder="url vocal"
                                type="number"
                                outline="fc-green"
                                :value="room.players_nb_max"
                                @input="(v) => set_players_nb_max(parseInt(v.target.value))"
                            />
                        </h3>
                    </div>

                    <div class="flex flex-col space-y-4 sm:space-y-6">
                        <h3 class="flex font-bold">
                            Status:
                            <Selector
                                :items="tmp_game_status"
                                :default-selected-item="{
                                    name: room?.game?.status, value: room?.game?.status
                                }"
                                :on-select-item="(v) => set_status(v)"
                                selector-class="font-normal ml-2 border-2 text-black"
                            />
                        </h3>

                        <h3 class="flex font-bold">
                            Vocal:
                            <CustomInput
                                :max-length="254"
                                place-holder="url vocal"
                                type="text"
                                outline="fc-green"
                                :value="room.vocal_url"
                                @input="(v) => set_vocal_url(v.target.value)"
                            />
                        </h3>
                        <h3 class="flex font-bold">
                            privé:
                            <input
                                :checked="room.is_private"
                                type="checkbox"
                                :onClick="(v) => set_is_private(v.target.checked)"
                            >
                        </h3>
                        <h3 class="flex font-bold">
                            Password:
                            <CustomInput
                                :max-length="254"
                                place-holder="password"
                                type="password"
                                outline="fc-green"
                                :value="room.password"
                                @input="(v) => set_password(v.target.value)"
                            />
                        </h3>
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
import BlackGreenDiv from "@/components/common/BlackGreenDiv.vue"
import { apiCall } from '@/utils/apiCall'
import Selector from '@/components/common/Selector.vue'
import CustomInput from "@/components/common/CustomInput.vue"



export default {
    name: "Room",
    components: {
        Button,
        BlackGreenDiv,
        Selector,
        CustomInput
    },
    props: {
        room_id: {
            type: String,
            default: null
        },
    },
    data() {
        return {
            tmp_game_status: [
                {
                    name: "running",
                    value: "running",
                },
                {
                    name: "paused",
                    value: "paused"
                },
                {
                    name: "planned",
                    value: "planned",
                },
                {
                    name: "closed",
                    value: "closed"
                }
            ],
        }
    },
    computed: {
        ...mapState("room", {
            room: (state) => state.room,
        }),
        ...mapState("maps", {
            maps: (state) => state.maps.map(({ title: name, id: value }) => ({ name, value }))
        }),
        ...mapState("stories", {
            stories: (state) => state.stories.map(({ title: name, id: value }) => ({ name, value }))
        }),
        ...mapState("user", {
            user: (state) => state.user,
        }),
        is_gm () {
            return this.room?.gm?.id === this.user?.id || false
        },
    

        // "Rejoint": player already in game
        // "Complet": game is full
        // "Rejoindre": can join
        canPlayerJoin() {
            if (this.room?.game?.players.some(player => player.user.id === this.user?.id)) {
                return "Rejoint"         
            }
            else if (this.room?.game?.players?.length >= this.room?.players_nb_max) {
                return "Complet"
            }
            else
                return "Rejoindre"
        }
    },
    mounted() {
        this.clear_room()
        this.fetch_room(this.room_id)
        this.fetch_maps()
        this.fetch_stories()
    },
    methods: {
        async postForm() {
            if (this.is_gm) {
                const form = {
                    title: this.room.title,
                    description: this.room.description,
                    requirements: this.room.requirements,
                    vocal_url: this.room.vocal_url,
                    players_nb_max: this.room.players_nb_max,
                    is_private: this.room.is_private,
                    password: this.room.password,
                    game: {
                        story_id: this.room.game.story.id,
                        map_id: this.room.game.tilemap.id,
                        status: this.room.game.status
                    }
                }
                console.log(form)

                const toast = useToast()
                try {
                    await apiCall({
                        route: `/rooms/${this.room_id}`,
                        method: 'PUT',
                        body: form
                    }).then(() => {
                        toast.success('Room updated avec succes')
                        this.$router.push(`/rooms/${this.room_id}`)
                    })
                } catch (error) {
                    toast.error(error)
                }


            }
            else {
                const toast = useToast()
                if (this.canPlayerJoin == "Rejoindre") {
                    try {
                        await apiCall({
                            route: `/rooms/${this.room_id}/join`,
                            method: 'PATCH',
                            body: {}
                        }).then(() => toast.success('Room updated avec succes'))
                    } catch (error) {
                        toast.error(error)
                    }
                } else {
                    console.error("Impossible de rejoindre - room déja rejoint ou complète")
                }
            }
        },
        async handlePublish() {
            const toast = useToast()
            try {
                await apiCall({
                    route: `/rooms/${this.room_id}`,
                    method: 'PATCH',
                    body: {is_published: this.room.is_published}
                }).then(() =>{ 
                    this.set_is_published(!this.room.is_published)
                    toast.success('Room updated avec succes')
                })
            } catch (error) {
                toast.error(error)
            }
        },
        ...mapActions({
            fetch_room: "room/fetch_room",
            clear_room: "room/clear_room",
            fetch_maps: "maps/fetch_maps",
            fetch_stories: "stories/fetch_stories"
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
