export default {
    namespaced: true,
    state: {
        connected: false,
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