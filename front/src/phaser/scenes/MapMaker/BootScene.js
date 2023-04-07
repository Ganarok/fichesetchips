import { Scene } from "phaser"
import { useToast } from "vue-toastification"

import { apiCall } from "@/utils/apiCall"

export default class BootScene extends Scene {
    constructor() {
        super({ key: "BootScene" })

        this.mapId = ''
    }

    init() {
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (target, name) => target.get(name)
        })

        this.mapId = params.mapId || ''
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
                this.scene.start("MapMakerScene", { map })
            } catch (error) {
                toast.error("Error while loading map", error)
                // TODO : redirect to home
                this.scene.start("MapMakerScene", {})
            }
        } else {
            this.scene.start("MapMakerScene", {})
        }
    }
}
