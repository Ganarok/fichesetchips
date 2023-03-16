export default {
    namespaced: true,
    state: {
        launched: false,
        title: 'Untitled',
        controls: null,
        isExporting: false,
        layers: [
            {
                name: "grounds",
                asset: "desert_grounds",
            },
            {
                name: "items",
                asset: "desert_items",
            }
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
        resetStates(state) {
            state.launched = false
            state.controls = null
            state.isExporting = false
            state.layers = [
                {
                    name: "grounds",
                    asset: "desert_grounds",
                },
                {
                    name: "items",
                    asset: "desert_items",
                }
            ],
            state.selectedLayer = 0
            state.eraser = false
            state.selectedTile = undefined
            state.selectedTileIndex = undefined
            state.isolateLayer = false
            state.layerTab = true
            state.tileSetsInfos = []
            state.tilesPics = {}
            state.tilesSize = 32
            state.mapSize = 32 * 20
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