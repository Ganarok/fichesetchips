import { apiCall } from "@/utils/apiCall"

export default {
    namespaced: true,
    state: {
        // array of maps with "title" & "id"
        maps: [],
    },
    mutations: {
        set_maps(state, maps) {
            state.maps = maps
        }
    },
    actions: {
        async fetch_maps({ commit }) {
            try {
                const { data } = await apiCall({
                    method: "GET",
                    route: `/maps`,
                })
                commit("set_maps", data)
            } catch (error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
    },
    getters: {},
}