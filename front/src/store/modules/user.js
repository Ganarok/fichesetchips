import { apiCall } from "@/utils/apiCall"

export default {
    namespaced: true,
    state: {
        user: {},
        access_token: "",
        visited_user: { "username": "loading"},
    },
    mutations: {
        set_user(state, user) {
            state.user = user
        },
        set_visited_user(state, visited_user) {
            state.visited_user = visited_user
        },
        set_token(state, access_token) {
            state.access_token = access_token
        },
        logout(state) {
            const properties = Object.keys(state.user)

            properties.forEach((property) => {
                state.user[property] = null
            })

            state.user = {}
            state.access_token = ""
            state.visited_user = {}
        },
    },
    actions: {
        async register_user({ commit }, body) {
            try {
                const response = await apiCall({
                    method: "POST",
                    route: "/auth/register",
                    body: body,
                })
                commit("set_user", response.user)
                commit("set_token", response.access_token)
            } catch(error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        async log_user({ commit }, body) {
            try {
                const response = await apiCall({
                    method: "POST",
                    route: "/auth/login",
                    body: body,
                })
                commit("set_user", response.user)
                commit("set_token", response.access_token)
            } catch(error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        async fetch_user({ commit }, username) {
            try {
                const response = await apiCall({
                    method: "GET",
                    route: `/users/profile/${username}`,
                })
                commit("set_visited_user", response.user)
            } catch(error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        async patch_user({ commit }, body) {
            try {
                const response = await apiCall({
                    method: "PATCH",
                    route: "/users",
                    body: body,
                })
                commit("set_user", response.user)
                commit("set_token", response.access_token)
            } catch(error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        async delete_user({ commit }) {
            try {
                await apiCall({
                    method: "DELETE",
                    route: "/users",
                })
                commit("set_user", {})
                commit("set_token", "")
            } catch(error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
    },
    getters: {
        connected(state) {
            if(state.access_token) return true
            else return false
        },
    },
}