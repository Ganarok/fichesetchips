// import { apiCall } from "@/utils/apiCall"

export default {
    namespaced: true,
    state: {
        messages: [],
        players: [],
        maps: [],
        gm: {},
        diary: {
            is_gm: false,
            my_character: {}, 
            characters: [],
            places: [],
            players: [],
            notes: '',
        },
        starter_map_id: '',
        current_map_title: '',
        vocal_url: ''
    },
    mutations: {
        updateState(state, payload) {
            const { property, newState } = payload

            state[property] = newState
        },
        pushMessage(state, message) {
            state.messages = [...state.messages, message]
        },
        resetMessages(state) {
            state.messages = []
        }
    },
    actions: {
        async init_session({ commit, dispatch, state }, room) {
            try {
                const data = {
                    "id": "4380045a-3d92-433f-b5a9-5b0c3c321a8b",
                    "title": "Room",
                    "description": "A nice room",
                    "requirements": "Blabla",
                    "vocal_url": "blabla",
                    "is_private": false,
                    "is_published": false,
                    "password": "password",
                    "players_nb_max": 5,
                    "created_at": "2023-04-13T09:00:05.821Z",
                    "updated_at": "2023-04-13T09:00:05.821Z",
                    "game": {
                        "id": "30208ae8-95b3-4d3e-aa0f-e0a6c15509b1",
                        "status": "planned",
                        "universe": "cem",
                        "map_id": "b517fc2f-f310-4852-a333-4bc463415eaf",
                        "tilemap": null,
                        "story": null,
                        "players": [
                            {
                                "id": "429cf332-c0b9-415a-b6ac-6c4f4ecd4f19",
                                "state": "not implemented",
                                "user": {
                                    "id": "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
                                    "email": "user@email.com",
                                    "username": "user",
                                    "password": "$2b$10$K0oH.iyWccc/O16hKiY13ONt8D6YpN5afheqIE7SMWnh0VG3b7re6",
                                    "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
                                    "role": "USER",
                                    "preference_id": "3a9975f8-f34c-4a07-bbff-ab8a9b2e6309",
                                    "last_connection": "2023-04-13T13:04:25.320Z",
                                    "created_at": "2022-06-24T11:29:59.619Z",
                                    "updated_at": "2023-04-13T13:04:25.325Z"
                                },
                                "character": {
                                    "id": "c565b74d-eace-4d66-b995-13d748845427",
                                    "user_id": "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
                                    "firstname": "firstname",
                                    "lastname": "lastname",
                                    "sex": "Female",
                                    "eye_color": "BLUE",
                                    "hair_color": "BLACK",
                                    "skin_color": "BROWN",
                                    "clothing_color_1": "RED",
                                    "clothing_color_2": "BLACK",
                                    "bio": "Vive la raclette",
                                    "alignment": "NEUTRAL GOOD",
                                    "ideals": "I love cheese",
                                    "flaws": "I'm used to fart too loud",
                                    "age": 25,
                                    "weight": 80,
                                    "height": 170,
                                    "hp": 20,
                                    "race_id": "4d6889bb-bfd7-4934-9625-7c250c7fcafc",
                                    "class_id": "fcfd78b9-161c-4ac4-9035-7a8189242d24",
                                    "level_id": 1,
                                    "experience_points": 0,
                                    "next_level_experience_points": 300,
                                    "created_at": "2023-04-13T12:47:18.763Z",
                                    "updated_at": "2023-04-13T12:47:18.763Z"
                                }
                            }
                        ]
                    },
                    "gm": {
                        "id": "edf1dc34-3534-4cd7-85cf-a9488f1279f9",
                        "email": "user@email.com",
                        "username": "user",
                        "password": "$2b$10$K0oH.iyWccc/O16hKiY13ONt8D6YpN5afheqIE7SMWnh0VG3b7re6",
                        "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png",
                        "role": "USER",
                        "preference_id": "3a9975f8-f34c-4a07-bbff-ab8a9b2e6309",
                        "last_connection": "2023-04-13T09:16:17.653Z",
                        "created_at": "2022-06-24T11:29:59.619Z",
                        "updated_at": "2023-04-13T09:16:17.659Z"
                    }
                }

                // const { data } = await apiCall({
                //     method: "GET",
                //     route: `/rooms/${room}`,
                // })
                // commit('setRoom', data)
                // dispatch('init_diary', data)
                // dispatch('init_players', data)
                // dispatch('init_maps', data)

                console.log('init_session', dispatch, state, room)

                state.players = data.game.players
                state.gm = data.gm
                state.vocal_url = data.vocal_url
                state.starter_map_id = data.game.map_id
                state.diary.players = data.game.players
                state.diary.my_character = data.game.players[0].character
                state.diary.is_gm = data.game.players[0].character.user_id === data.gm.id
                state.story = {
                    id: '9c9bfccd-7023-4d72-bc14-45d07eb2b855',
                    title: 'The story',
                }

                return data
            } catch (error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                throw new Error(error.message)
            }
        }
    },
    getters: {},
}