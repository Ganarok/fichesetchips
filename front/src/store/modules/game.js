// import { apiCall } from "@/utils/apiCall"

import { apiCall } from "@/utils/apiCall"
import store from '@/store'
import { useToast } from "vue-toastification"

export default {
    namespaced: true,
    state: {
        messages: [],
        maps: [],
        gm: {},
        diary: {
            is_gm: false,
            my_character: {}, 
            characters: [],
            places: {},
            players: [],
            notes: '',
            lastDice: {},
        },
        starter_map_id: '',
        current_map_title: '',
        vocal_url: '',
        roomId: '',
        gameId: ''
    },
    mutations: {
        updateState(state, payload) {
            const { property, newState } = payload

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
        }
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

                return data
            } catch (error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                throw new Error(error.message)
            }
        },
        async update_game_state({ commit, state }, newState) {
            try {
                console.log('newState', newState)

                const resJson = await apiCall({
                    method: "PATCH",
                    route: `/game/${state.gameId}`,
                    body: newState,
                })

                console.log('resJson', resJson)

            } catch (error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                throw new Error(error.message)

            }
        }
    },
    getters: {},
}