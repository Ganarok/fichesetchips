import { Scene } from "phaser"

export default class BootScene extends Scene {
    constructor() {
        super({ key: "BootScene" })
    }

    init() {
    // TODO: Faire les calls API en DB pour récupérer les assets avec les tilemaps
    }

    preload() {
    // this.load.image('sky', sky)
    // this.load.image('bomb', bomb)
    // this.load.audio('thud', [thudMp3, thudOgg])
    }

    create() {
    // TODO: dans le .start() en deuxième argument l'object avec les assets

        this.scene.start("WorkshopTilemap", {})
    }
}
