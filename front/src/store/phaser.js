export default {
    state: {
        controls: null,
        layers: [
            {
                name: 'grounds',
                asset: 'desert_grounds'
            },
            {
                name: 'items',
                asset: 'desert_items'
            }
        ],
        selectedLayer: 0,
        selectedTile: null,
        isolateLayer: false,
        tileSets: [],
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
