import { Scene } from 'phaser'
import { COLORS } from '@/utils/enums'
import store from '@/store'
import ground_tiles from "@/phaser/assets/desert_tiles.png"
import items_tiles from "@/phaser/assets/desert_plants.png"
import map_tiled from "@/phaser/assets/desert.json"

let controls
let marker;
let shiftKey;
let selectedTile;

let tiles_size = 32
let mapsize = tiles_size * 20

const Random = Phaser.Math.Between;

export default class WorkshopTilemap extends Scene {
    constructor() {
        super({ key: 'WorkshopTilemap' })

        this.layers = []
        this.map = null
    }

    init(data) {
        // TODO : La data envoyée depuis BootScene arrive ici, dans l'object data

        // console.log(data)
    }

    preload() {
        // tilemap
        this.load.image('ground_tiles', ground_tiles);
        this.load.image('items_tiles', items_tiles);
        this.load.tilemapTiledJSON('map', map_tiled);
    }

    create() {
        this._draw_map()
        this._draw_cursor()
        this._initListeners()
    }

    update(time, delta) {
        this.handle_event()
    }

    _initListeners() {
        this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
            this.cameras.main._x -= (deltaX / 5)
            this.cameras.main._y -= (deltaY / 5)
        })
    }

    _draw_cursor() {
        selectedTile = this.map.getTileAt(0, 0);

        marker = this.add.graphics();
        marker.lineStyle(2, 0xff0000, 1);
        marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        var cursors = this.input.keyboard.createCursorKeys();
        var controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        };
        controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
        shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    }

    // draw tilemap, add tileset to map object, set position of layer(s)
    _draw_map() {
        let { layers, selectedLayer } = store.state.phaser

        this.map = this.make.tilemap({ key: 'map' });

        layers.forEach((layer, index) => {
            this.layers[index] = this.map.createLayer(layer.name, this.map.addTilesetImage(layer.name, layer.asset), 0, 0)
        })

        this.layers[0].setPosition(window.innerWidth / 2 - mapsize, 0)

        // store.commit('initLayers')
    }

    // handle selection of tiles
    handle_event() {
        var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

        // Rounds down to nearest tile
        var pointerTileX = this.map.worldToTileX(worldPoint.x);
        var pointerTileY = this.map.worldToTileY(worldPoint.y);

        // Snap to tile coordinates, but in world space
        marker.x = this.map.tileToWorldX(pointerTileX);
        marker.y = this.map.tileToWorldY(pointerTileY);

        if (this.input.manager.activePointer.isDown) {
            if (shiftKey.isDown) {
                selectedTile = this.map.getTileAt(pointerTileX, pointerTileY);
            } else {
                this.map.putTileAt(selectedTile, pointerTileX, pointerTileY);
            }
        }
    }
}

// 1) Definir un array d'image ainsi que leur nom/index dans une style
// 2) Afficher dans le composant les images
// 3) Afficher

// methods to implement:
// - draw interface
// - bind element
// - scale element
// - getElemtexture