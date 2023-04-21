import { apiCall } from "@/utils/apiCall"

export default {
    namespaced: true,
    state: {
        room: {},
        gm_rooms: [],
        published_rooms: [],
        player_rooms: []
    },
    mutations: {
        set_title(state, title) {
            state.room.title = title
        },
        set_description(state, description) {
            state.room.description = description
        },
        set_requirements(state, req) {
            state.room.requirements = req
        },
        set_vocal_url(state, voc_url) {
            state.room.vocal_url = voc_url
        },
        set_status(state, status) {
            state.room.game.status = status
        },
        set_is_private(state, is_private) {
            state.room.is_private = is_private
        },
        set_is_published(state, is_published) {
            state.room.is_published = is_published
        },
        set_password(state, password) {
            state.room.password = password
        },
        set_players_nb_max(state, players_max) {
            state.room.players_nb_max = players_max
        },
        set_story_id(state, story_id) {
            state.room.game.story_id = story_id
        },
        set_map_id(state, map_id) {
            state.room.game.tilemap.id = map_id
        },
        set_universe(state, universe) {
            state.room.game.universe = universe
        },
        set_room(state, room) {
            state.room = room
        },
        set_gm_rooms(state, gm_rooms) {
            state.gm_rooms = gm_rooms
        },
        set_published_rooms(state, published_rooms) {
            state.published_rooms = published_rooms
        },
        set_player_rooms(state, player_rooms) {
            state.player_rooms = player_rooms
        },
        set_unpublished_rooms(state, unpublished_rooms) {
            state.unpublished_rooms = unpublished_rooms
        },
        remove_room(state) {
            state.room = null
        },
    },
    actions: {
        async fetch_rooms({ commit }) {
            try {
                const { data } = await apiCall({
                    method: "GET",
                    route: `/rooms`,
                })
                commit("set_gm_rooms", data.gm_rooms)
                commit("set_published_rooms", data.published_rooms)
                commit("set_player_rooms", data.player_rooms)
                commit("set_unpublished_rooms", data.unpublished_rooms)
            } catch(error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
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
                const { data } = await apiCall({
                    method: "POST",
                    route: `/rooms`,
                    body: body,
                })
                commit("set_room", data)
            } catch(error) {
                commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))
            }
        },
        clear_room({ commit }) {
            commit("remove_room")
        }
    },
    getters: {},
}