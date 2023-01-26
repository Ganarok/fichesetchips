export default {
    namespaced: true,
    state: {
        controls: null,
        layers: [{
            name: "grounds",
            asset: "desert_grounds",
        },
        {
            name: "items",
            asset: "desert_items",
        },
        ],
        selectedLayer: 0,
        eraser: false,
        selectedTile: undefined,
        selectedTileIndex: undefined,
        isolateLayer: false,
        layerTab: true,
        tileSetsInfos: [],
        tilesPics: {},
        tilesSize: 32,
        mapSize: 32 * 20,
    },
    mutations: {
        updateState(state, payload) {
            const { property, newState } = payload

            state[property] = newState
        },
        initLayers(state, layers) {
            state.layers = layers
        },
    },
    actions: {},
    getters: {
        getSelectedTile(state) {
            return state.selectedTile
        },
    },
}