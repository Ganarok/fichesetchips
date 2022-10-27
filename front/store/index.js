export const state = () => ({
    user: {
        id: '',
        username: '',
        email: '',
        avatar: '',
        role: '',
        createdAt: '',
        updatedAt: '',
        access_token: '12',
    },
})

export const mutations = {
    setUser(state, user) {
        state.user = user
    },
    logout(state) {
        state.user.id = ''
        state.user.username = ''
        state.user.email = ''
        state.user.avatar = ''
        state.user.role = ''
        state.user.createdAt = ''
        state.user.updatedAt = ''
        state.user.access_token = ''
    },
}

export const getters = {
    connected(state) {
        if (state.user.access_token !== '') return true
        else return false
    },
}
