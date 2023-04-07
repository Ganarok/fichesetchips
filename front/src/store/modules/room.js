import { apiCall } from "@/utils/apiCall"

export default {
    namespaced: true,
    state: {
        room: {
            title: "",
            description: "",
            password: "",
            player_nb_max: 5,
            mj: {},
            players: [],
            vocal_url: "",
            isPrivate: false,
        },
        "user_rooms": [],
        "public_rooms": [{
            "id": "52a3d2c6-13ed-4759-be26-657fb0c5aa09",
            "title": "Room",
            "description": "A nice room",
            "requirements": "Blabla",
            "vocal_url": "blabla",
            "is_private": true,
            "is_published": true,
            "password": "password",
            "players_nb_max": 5,
            "created_at": "2023-04-07T13:22:06.245Z",
            "updated_at": "2023-04-07T13:22:06.245Z",
            "gm": {
                "id": "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
                "email": "user@email.com",
                "username": "user",
                "password": "$2b$10$K0oH.iyWccc/O16hKiY13ONt8D6YpN5afheqIE7SMWnh0VG3b7re6",
                "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
                "role": "USER",
                "preference_id": "3a9975f8-f34c-4a07-bbff-ab8a9b2e6309",
                "last_connection": "2023-04-07T13:22:39.655Z",
                "created_at": "2022-06-24T11:29:59.619Z",
                "updated_at": "2023-04-07T13:22:39.660Z"
            },
            "game": {
                "id": "6171aaad-5a3c-4371-b233-b94d8004fcfb",
                "status": "planned",
                "universe": "cem",
                "players": [{
                    "id": "429cf332-c0b9-415a-b6ac-6c4f4ecd4f19",
                    "state": "not implemented"
                }]
            }
        }]
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
            } catch(error) {
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
            } catch(error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
    },
    getters: {},
}