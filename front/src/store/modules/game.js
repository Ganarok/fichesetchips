export default {
    namespaced: true,
    state: {
        messages: []
    },
    mutations: {
        pushMessage(state, message) {
            state.messages = [...state.messages, message]
        },
        resetMessages(state) {
            state.messages = []
        }
    },
    actions: {},
    getters: {
        getMessages(state) {
            return state.messages
        },
    },
}