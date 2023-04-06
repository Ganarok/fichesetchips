import { apiCall } from "@/utils/apiCall"

export default {
    namespaced: true,
    state: {
        launched: false,
        title: 'Untitled',
        controls: null,
        isExporting: false,
        isSaving: false,
        layers: [{
                name: "grounds",
                asset: "desert_grounds",
            },
            {
                name: "items",
                asset: "desert_items",
            }
        ],
        selectedLayer: 0,
        brushSize: 1,
        scaleLevel: 1,
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
            state.isSaving = false
            state.brushSize = 1
            state.scaleLevel = 1
            state.layers = [{
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
    actions: {
        async save_map({ commit }, body) {
            const nb = Math.random() * 100
            const map = {
                title: `title-${nb}`,
                data: body.data
            }
            const assets = body.assets
            try {
                console.log('Saving the map on DB', map, commit)
                const { data } = await apiCall({
                    method: "POST",
                    route: "/maps",
                    body: map,
                })
                assets.map(async(asset) => {
                    console.log(`Saving the asset ${asset.name} on DB`, asset, commit)
                    await apiCall({
                        method: "POST",
                        route: `/maps/asset?map_id=${data.id}&name=${asset.name}`,
                        body: asset.image,
                        headers: {
                            'Content-Type': 'application/octet-stream'
                        },
                        isBuffer: true
                    })
                })
            } catch(error) {
                // commit("errors/set_error", { message: error.message }, { root: true })
                console.log(JSON.stringify(error.message))

                return false
            }

            return true
        }
    },
    getters: {
        getSelectedTile(state) {
            return state.selectedTile
        },
    },
}