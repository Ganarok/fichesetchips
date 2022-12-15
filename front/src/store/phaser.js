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
        shiftKey: null,
        tilesSize: 32,
        mapSize: 32 * 20,
        title: 'titre pas cool'
    },
    mutations: {
        addTilesSize(state) {
            state.tilesSize += 1
        },
        setSelectedTile(state, tile) {
            state.selectedTile = tile
        },
        initLayers(state, layers) {
            state.layers = layers
        }
    },
    actions: {},
    getters: {}
}
