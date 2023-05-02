import { useToast } from "vue-toastification"

import { apiCall } from "@/utils/apiCall"
import store from '@/store'

export default {
    namespaced: true,
    state: {
        messages: [],
        maps: [],
        gm: {},
        game_state: {},
        diary: {
            is_gm: false,
            my_character: {}, 
            characters: [],
            places: {},
            players: [],
            notes: '',
            lastDice: {},
        },
        selectedPlayerFromPhaser: {},
        starter_map_id: '',
        current_map_title: '',
        vocal_url: '',
        roomId: '',
        gameId: '',
        isMovingPlayer: false,
        haveToEmit: false,
        notificationToEmit: '',
        contentToEmit: {},
        hasToUpdatePlayers: false
    },
    mutations: {
        updateState(state, payload) {
            const { property, newState } = payload

            console.log('Updating state', property, 'with', newState)

            state[property] = newState
        },
        pushMessage(state, message) {
            state.messages = [...state.messages, message]
        },
        resetMessages(state) {
            const toast = useToast()

            state.messages = []
            toast.success("Messages supprimés")
        },
        updateDiceResult(state, result) {
            state.diary.lastDice = result
        },
    },
    actions: {
        async init_session({ commit, state }, roomId) {
            try {
                if (!roomId) {
                    throw new Error("Pas de room id")
                }

                const { data } = await apiCall({
                    method: "GET",
                    route: `/rooms/${roomId}`,
                })

                state.gm = data.gm
                state.vocal_url = data.vocal_url
                state.starter_map_id = data.game.tilemap.id
                state.diary.players = data.game.players
                state.gameId = data.game.id

                const characters = data.game.players.map(player => player.character)
                const is_gm = store.state.user.user.id === data.gm.id

                state.diary.is_gm = is_gm
                state.diary.characters = characters
                state.diary.my_character = is_gm ? null : characters.find(character => character.user_id === store.state.user.user.id)
                state.story = data.game.story
                state.diary.places = data.game.tilemap
                state.selectedPlayerFromPhaser = {}
                state.isMovingPlayer = false
                state.haveToEmit = false
                state.notificationToEmit = ''
                state.contentToEmit = {}

                if (data.game_state) {
                    console.log('Retreiving game state registered...')
                    let gameState = data.game_state

                    gameState.players.forEach((player, index) => {
                        if (!player.character.x) {
                            console.log('No x position for player', player.character.firstname, player.character.lastname, 'setting default position...')
                            player.character.x = 9 + index + index
                        }
                        if (!player.character.y) {
                            console.log('No y position for player', player.character.firstname, player.character.lastname, 'setting default position...')
                            player.character.y = 15 + index
                        }
                    })

                    state.game_state = gameState
                } else {
                    console.log('No game state registered, creating a new one...')

                    state.game_state = {
                        id: data.game.id,
                        map: {
                            id: data.game.tilemap.id,
                            title: data.game.tilemap.title,
                            // data: data.game.tilemap.data
                        },
                        players: data.game.players.reduce((players, player, index) => [
                            ...players,
                            {
                                id: player.id,
                                user: {
                                    id: player.user.id,
                                    username: player.user.username,
                                },
                                character: {
                                    id: player.character.id,
                                    firstname: player.character.firstname,
                                    lastname: player.character.lastname,
                                    hp: player.character.hp,
                                    experience_points: player.character.experience_points,
                                    x: 9 + index + index,
                                    y: 15 + index
                                }
                            }
                        ], [])
                    }
                }

                return data
            } catch (error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                throw new Error(error.message)
            }
        },
        async update_game_state({ commit, state }, newState) {
            try {
                await apiCall({
                    method: "PUT",
                    route: `/games/${state.gameId}`,
                    body: newState,
                })

            } catch (error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                throw new Error(error.message)
            }
        },
        async update_game_state_player({ commit, state }, update) {
            try {
                console.log('Updating game state player', update.playerId, update.character)

                const playerIndex = state.game_state.players.findIndex(player => player.id === update.playerId)

                if (playerIndex === -1) {
                    throw new Error('Player not found')
                }

                state.game_state.players[playerIndex].character = update.character
            } catch (error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                throw new Error(error.message)
            }
        }
    },
    getters: {},
}