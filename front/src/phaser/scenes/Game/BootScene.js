import { Scene } from "phaser"
import { useToast } from "vue-toastification"

import store from "@/store"
import { apiCall } from "@/utils/apiCall"

export default class BootScene extends Scene {
    constructor() {
        super({ key: "BootScene" })

        this.mapId = ''
    }

    init() {
        // const params = new Proxy(new URLSearchParams(window.location.search), {
        //     get: (target, name) => target.get(name)
        // })

        // this.mapId = params.mapId || ''

        this.mapId = store.state.game.starter_map_id || ''
    }

    async create() {
        if (this.mapId) {
            const toast = useToast()

            try {
                const map = await apiCall({
                    method: "GET",
                    route: `/maps/${this.mapId}`,
                })
                
                console.log(`Retreived map ${map.data.title}, launching it...`)
                store.commit("game/updateState", {
                    property: "current_map_title",
                    newState: map.data.title
                })
                this.scene.start("GameScene", { map })
            } catch (error) {
                toast.error(`Error while loading map : ${error.message}`)

                this.scene.start("GameScene", {})
            }
        } else {
            this.scene.start("GameScene", {})
        }
    }
}
