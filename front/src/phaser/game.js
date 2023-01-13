import Phaser from "phaser";
import BootScene from "@/phaser/scenes/BootScene";
import WorkshopTilemap from "@/phaser/scenes/WorkshopTilemap";

const launch = (containerId) => {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight - 48,
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
    scene: [BootScene, WorkshopTilemap],
  });
};

export { launch };
