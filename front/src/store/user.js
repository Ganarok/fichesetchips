export default {
    state: {
        user: {
            id: null,
            username: null,
            email: null,
            token: null,
            role: null,
            avatar: null,
            createdAt: null,
            updatedAt: null,
            access_token: null,
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        logout(state) {
            const properties = Object.keys(state.user)

            properties.forEach(property => {
                state.user[property] = null
            })
        },
    },
    actions: {},
    getters: {
        connected(state) {
            if (state.user.access_token !== null) return true
            else return false
        },
    }
}