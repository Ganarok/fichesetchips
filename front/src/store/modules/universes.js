import { apiCall } from '@/utils/apiCall'

export default {
    namespaced: true,
    state: {
        universes: [],
        universe: "cem",
    },
    mutations: {
        set_universes: (state, data) => (state.universes = data),
        set_universe: (state, data) => (state.universe = data),
    },
    actions: {
        async fetch_universes({ commit }) {
            const { data } = await apiCall({
                route: `/universes`,
                method: 'GET',
            })
                .catch((error) => console.log(JSON.stringify(error.message)))
            commit("set_universes", data)
        },
    },
    getters: {},
}