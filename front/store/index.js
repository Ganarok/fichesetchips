export const state = () => ({
    user: {
        id: '',
        username: '',
        email: '',
        avatar: '',
        role: '',
        createdAt: '',
        updatedAt: '',
        access_token: '',
    },
})

export const mutations = {
    setUser(state, user) {
        state.user = user
    },
}
