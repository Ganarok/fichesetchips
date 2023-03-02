import { apiCall } from "@/utils/apiCall"

export default {
    namespaced: true,
    state: {
        room: {
            title: "Blablabla",
            description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            universe: "Caves & Monstres",
            style: "Serieux",
            experience: "Novice",
            levelGap: "1-10",
            language: "Francais",
            mj: {
                username: "Ganarok",
                avatar: "",
                gamePlayedAsMj: 240,
            },
            players: [
                {
                    username: "Ganarok",
                    avatar: "",
                },
                {
                    username: "Ganarok",
                    avatar: "",
                },
                {
                    username: "Ganarok",
                    avatar: "",
                },
                {
                    username: "Ganarok",
                    avatar: "",
                },
            ],
            vocal: "Discord",
            isPrivate: false,
        },
    },
    mutations: {
        set_room(state, room) {
            state.room = room
        },
    },
    actions: {
        async fetch_room({ commit }, room_id) {
            try {
                const response = await apiCall({
                    method: "GET",
                    route: `/rooms/${room_id}`,
                })
                commit("set_room", response)
            } catch (error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        async create_room({ commit }, body) {
            try {
                const response = await apiCall({
                    method: "POST",
                    route: `/rooms`,
                    body: body,
                })
                commit("set_room", response)
            } catch (error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
    },
    getters: {},
}
