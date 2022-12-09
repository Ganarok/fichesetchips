import { Scene } from 'phaser'

export default class BootScene extends Scene {
    constructor() {
        super({ key: 'BootScene' })
    }

    preload() {
        // this.load.image('sky', sky)
        // this.load.image('bomb', bomb)
        // this.load.audio('thud', [thudMp3, thudOgg])
    }

    create() {
        this.scene.start('WorkshopTilemap')
    }
}