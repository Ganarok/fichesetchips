import Phaser from "phaser"
import BootScene from "@/phaser/scenes/Game/BootScene"
import GameScene from "@/phaser/scenes/Game/GameScene"

const launch = (containerId) => {
    return new Phaser.Game({
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: containerId,
        pixelArt: true,
        backgroundColor: "#1E1E1E",
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 300 },
                debug: false,
            },
        },
        plugins: {},
        scene: [BootScene, GameScene],
    })
}

export { launch }
