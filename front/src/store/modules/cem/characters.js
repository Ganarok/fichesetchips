import { apiCall } from '@/utils/apiCall'

export default {
    namespaced: true,
    state: {
        characters: [],
        character: {},
        character_creation: {
            "character": {
                "firstname": "toset",
                "lastname": "toset",
                "sex": "toset",
                "eye_color": "toset",
                "hair_color": "toset",
                "skin_color": "toset",
                "clothing_color_1": "toset",
                "clothing_color_2": "toset",
                "bio": "toset",
                "alignment": "toset",
                "ideals": "toset",
                "flaws": "toset",
                "age": 0,
                "weight": 0,
                "height": 0,
                "hp": 0,
                "race_id": "toset",
                "class_id": "toset",
                "level_id": 0
            },
            "skills": [],
            "languages": [],
            "character_characteristic": [],
            "equipment": [],
            "money": {
                "gold": 0,
                "silver": 0,
                "copper": 0
            }
        },
        character_creation_steps: {}
    },
    mutations: {
        set_characters: (state, data) => (state.characters = data),
        set_character: (state, data) => (state.character = data),
        set_character_creation: (state, data) => (state.character_creation = data),
        set_character_creation_steps: (state, data) => (state.character_creation_steps = data),
    },
    actions: {
        async fetch_characters({ commit, rootState }) {
            const { data } = await apiCall({
                route: `/${rootState.universes.universe}/characters`,
                method: 'GET',
            })
                .catch((error) => console.log(JSON.stringify(error.message)))
            commit("set_characters", data)
        },
        async fetch_character({ commit, rootState }, character_id) {
            const { data } = await apiCall({
                route: `/${rootState.universes.universe}/characters/${character_id}
                        `,
                method: 'GET',
            })
                .catch((error) => console.log(JSON.stringify(error.message)))
            commit("set_character", data)
        },
        async fetch_character_creation_steps({ commit, rootState }) {
            const { data } = await apiCall({
                route: `/${rootState.universes.universe}/characters/creation`,
                method: 'GET',
            })
                .catch((error) => console.log(JSON.stringify(error.message)))
            commit("set_character_creation_steps", data)
        },
    },
    getters: {},
}