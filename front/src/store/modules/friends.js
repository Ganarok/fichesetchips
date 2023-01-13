import { apiCall } from "@/utils/apiCall"

export default {
    namespaced: true,
    state: {
        my_friends: [],
        pending_approval: [],
        pending_request: [],
    },
    mutations: {
        set_friends(state, friends) {
            state.friends = friends
        },
        set_my_friends(state, my_friends) {
            state.my_friends = my_friends
        },
        set_pending_approval(state, pending_approval) {
            state.pending_approval = pending_approval
        },
        set_pending_request(state, pending_request) {
            state.pending_request = pending_request
        },
    },
    actions: {
        async fetch_my_friends({ commit }) {
            try {
                const response = await apiCall({
                    method: "GET",
                    route: `/friends`,
                })
                commit("set_my_friends", response.friends)
                commit("set_pending_approval", response.pending_approval)
                commit("set_pending_request", response.pending_request)
            } catch (error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        async fetch_friends({ commit }, username) {
            try {
                const response = await apiCall({
                    method: "GET",
                    route: `/friends/${username}`,
                })
                commit("set_friends", response.friends)
            } catch (error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        async ask_a_friend({ commit, dispatch }, body) {
            try {
                const response = await apiCall({
                    method: "POST",
                    route: "/friends",
                    body: body,
                })
                dispatch("fetch_my_friends")
            } catch (error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        async accept_a_friend({ commit, dispatch }, username) {
            try {
                await apiCall({
                    method: "PATCH",
                    route: `/friends/${username}`,
                    body: { accepted: true },
                })
                dispatch("fetch_my_friends")
            } catch (error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        async delete_a_friend({ commit, dispatch }, username) {
            try {
                await apiCall({
                    method: "DELETE",
                    route: `/friends/${username}`,
                })
                dispatch("fetch_my_friends")
            } catch (error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
    },
    getters: {
        connected(state) {
            if (state.user.access_token !== null) return true
            else return false
        },
    },
}
