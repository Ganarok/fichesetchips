import { apiCall } from '@/utils/apiCall'
import { useToast } from 'vue-toastification'

export default {
    namespaced: true,
    state: {
        loading: false,
        completed: 0,
        characters: [],
        character: {},
        character_creation: {
            "character": {
                "firstname": "",
                "lastname": "",
                "sex": "",
                "eye_color": "",
                "hair_color": "",
                "skin_color": "",
                "clothing_color_1": "",
                "clothing_color_2": "",
                "bio": "",
                "alignment": "",
                "ideals": "",
                "flaws": "",
                "age": 0,
                "weight": 0,
                "height": 0,
                "hp": 0,
                "race_id": "",
                "class_id": "",
                "level_id": 1
            },
            "skills": [],
            "stats": {
                "racial": [] // { name: String, value: Number }
            },
            "languages": [],
            "character_characteristic": [],
            "equipment": [],
            "money": {
                "gold": 0,
                "silver": 0,
                "copper": 0
            }
        },
        currentStep: 'Universe',
        character_creation_steps: {}
    },
    mutations: {
        reset: (state, data) => (state = data),
        set_loading: (state, data) => (state.loading = data),
        set_completed: (state) => (state.completed === 0 ? 1 : state.completed += 1),
        set_characters: (state, data) => (state.characters = data),
        set_character: (state, data) => (state.character = data),
        set_stats: (state, data) => (state.character_creation.stats = {...state.character_creation.stats, ...data}),
        set_racial: (state, data) => (state.character_creation.stats = {...state.character_creation.stats, 'racial': data}),
        set_character_creation: (state, data) => (state.character_creation = data),
        set_currentStep: (state, data) => (state.currentStep = data),
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
                route: `/${rootState.universes.universe}/characters/${character_id}`,
                method: 'GET',
            })
                .catch((error) => console.log(JSON.stringify(error.message)))
            commit("set_character", data)
        },
        async fetch_character_creation_steps({ commit, rootState }) {
            commit("set_loading", true)

            const { data } = await apiCall({
                route: `/${rootState.universes.universe}/characters/creation`,
                method: 'GET',
            })

            if (!data) {
                const toast = useToast()
                const error = 'Error when fetching characters/creation data'
                
                console.log(error)
                toast.error(error)
            }

            commit("set_character_creation_steps", data)
        },
        async push_character({ commit, rootState }) {
            commit("set_loading", true)

            console.log(rootState.characters.character_creation)

            commit("set_loading", false)
        }
    },
    getters: {},
}