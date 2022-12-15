import Phaser from 'phaser'
import BootScene from '@/phaser/scenes/BootScene'
import WorkshopTilemap from '@/phaser/scenes/WorkshopTilemap'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

const launch = (containerId) => {
    return new Phaser.Game({
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: containerId,
        pixelArt: true,
        backgroundColor: "00000",
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        plugins: {
            scene: [{
                key: "rexuiplugin",
                plugin: RexUIPlugin,
                mapping: "rexUI"
            }]
        },
        scene: [BootScene, WorkshopTilemap]
    })
}

export {
    launch
}