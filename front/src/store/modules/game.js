export default {
    namespaced: true,
    state: {
        messages: [],
        diary: {
            characters: [],
            places: [],
            players: [],
            notes: ''
        }
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
    getters: {},
}