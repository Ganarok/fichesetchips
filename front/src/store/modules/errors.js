export default {
    namespaced: true,
    state: {
        errors: { message: null },
    },
    mutations: {
        set_error: (state, errors) => (state.errors = errors),
    },
    actions: {
        update_error({ commit }, errors) {
            commit("set_error", errors)
        },
    },
    getters: {
        get_errors: (state) => {
            return state.errors
        },
    },
}
