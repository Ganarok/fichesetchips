export default {
    state: {
        controls: null,
        layers: [
            {
                name: 'ground',
                asset: 'ground_tiles'
            },
            {
                name: 'items',
                asset: 'items_tiles'
            }
        ],
        selectedLayer: 0,
        selectedTile: null,
        tilesSize: 32,
        mapSize: 32 * 20
    },
    mutations: {
        updateState(state, payload) {
            const { property, newState } = payload

            state[property] = newState
        },
        initLayers(state, layers) {
            state.layers = layers
        }
    },
    actions: {},
    getters: {
        getSelectedTile(state) {
            return state.selectedTile
        }
    }
}
