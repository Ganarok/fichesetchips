import { apiCall } from "@/utils/apiCall"

export default {
    namespaced: true,
    state: {
        room: {},
        unpublished_rooms: [],
        gm_rooms: [],
        published_rooms: [],
        player_rooms: []
    },
    mutations: {
        set_room(state, room) {
            state.room = room
        },
        set_gm_rooms(state, gm_rooms) {
            state.gm_rooms = gm_rooms
        },
        set_published_rooms(state, published_rooms) {
            state.published_rooms = published_rooms
        },
        set_player_rooms(state, player_rooms) {
            state.player_rooms = player_rooms
        },
        set_unpublished_rooms(state, unpublished_rooms) {
            state.unpublished_rooms = unpublished_rooms
        },
    },
    actions: {
        async fetch_rooms({ commit }) {
            try {
                const { data } = await apiCall({
                    method: "GET",
                    route: `/rooms`,
                })
                commit("set_gm_rooms", data.gm_rooms)
                commit("set_published_rooms", data.published_rooms)
                commit("set_player_rooms", data.player_rooms)
                commit("set_unpublished_rooms", data.unpublished_rooms)
            } catch(error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        async fetch_room({ commit }, room_id) {
            try {
                const response = await apiCall({
                    method: "GET",
                    route: `/rooms/${room_id}`,
                })
                commit("set_room", response)
            } catch(error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        async create_room({ commit }, body) {
            try {
                const { data } = await apiCall({
                    method: "POST",
                    route: `/rooms`,
                    body: body,
                })
                commit("set_room", data)
            } catch(error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
    },
    getters: {},
}