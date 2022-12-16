import { Scene } from 'phaser'
import { COLORS } from '@/utils/enums'
import store from '@/store'
import ground_tiles from "@/phaser/assets/desert_tiles.png"
import items_tiles from "@/phaser/assets/desert_plants.png"
import map_tiled from "@/phaser/maps/desert.json"

export default class WorkshopTilemap extends Scene {
    constructor() {
        super({ key: 'WorkshopTilemap' })

        this.layers = []
        this.map = null
        this.selectedTile = null
        this.controls = null
        this.marker = null
        this.shiftKey = null
        this.tiles_size = 32
        this.mapsize = 32 * 20
        this.selectedLayer = 0
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

        store.watch(() => store.state.phaser.selectedTile, (newValue, oldValue) => {
            console.log('NOUVELLE TILE OMG', newValue)
            this.selectedTile = newValue
        })

        store.watch(() => store.state.phaser.selectedLayer, (newValue, oldValue) => {
            console.log('NOUVEAU LAYER OMG', newValue)
            this.selectedLayer = newValue
        })
    }

    // draw tilemap, add tileset to map object, set position of layer(s)
    _draw_map() {
        let { layers } = store.state.phaser

        this.map = this.make.tilemap({ key: 'map' });

        layers.forEach((layer, index) => {
            this.layers[index] = this.map.createLayer(layer.name, this.map.addTilesetImage(layer.name, layer.asset), 0, 0)
        })

        this.layers[this.selectedLayer].setPosition(window.innerWidth / 2 - this.mapsize, 0)
    }

    _draw_cursor() {
        const { layers } = store.state.phaser

        this.selectedTile = this.map.getTileAt(0, 0, false, layers[this.selectedLayer].name)
        store.commit('updateState', {
            property: 'selectedTile',
            newState: this.selectedTile
        })

        this.marker = this.add.graphics()
        this.marker.lineStyle(2, 0xff0000, 1)
        this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight)

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)

        const cursors = this.input.keyboard.createCursorKeys()

        this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        })
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
    }

    // handle selection of tiles
    handle_event() {
        const { layers } = store.state.phaser
        const layerName = layers[this.selectedLayer].name
        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main)

        // Rounds down to nearest tile
        var pointerTileX = this.map.worldToTileX(worldPoint.x, true, this.cameras.main, layerName)
        var pointerTileY = this.map.worldToTileY(worldPoint.y, true, this.cameras.main, layerName)

        // Snap to tile coordinates, but in world space
        this.marker.x = this.map.tileToWorldX(pointerTileX, this.cameras.main, layerName)
        this.marker.y = this.map.tileToWorldY(pointerTileY, this.cameras.main, layerName)

        if (this.input.manager.activePointer.isDown) {
            if (this.shiftKey.isDown) {
                this.selectedTile = this.map.getTileAt(pointerTileX, pointerTileY, false, layerName)
                store.commit('updateState', {
                    property: 'selectedTile',
                    newState: this.selectedTile
                })
            } else {
                this.map.putTileAt(this.selectedTile, pointerTileX, pointerTileY, false, layerName)
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