import { apiCall } from "@/utils/apiCall"

export default {
    namespaced: true,
    state: {
        room: {
            title: "",
            description:"",
            password: "",
            players_nb_max: 5,
            requirements: "",
            mj: {},
            players: [],
            vocal_url: "",
            isPrivate: false,
        },
    },
    mutations: {
        set_room(state, room) {
            state.room = room
        },
    },
    actions: {
        async fetch_room({ commit }, room_id) {
            try {
                const response = await apiCall({
                    method: "GET",
                    route: `/rooms/${room_id}`,
                })
                commit("set_room", response)
            } catch (error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        async create_room({ commit }, body) {
            try {
                const response = await apiCall({
                    method: "POST",
                    route: `/rooms`,
                    body: body,
                })
                commit("set_room", response)
            } catch (error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
    },
    getters: {},
}
