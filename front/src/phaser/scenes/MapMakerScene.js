import { Scene, Tilemaps } from "phaser"
import store from "@/store"
import desert_grounds from "@/phaser/assets/desert_grounds.png"
import desert_items from "@/phaser/assets/desert_items.png"
import template from "@/phaser/maps/template.json"
import Phaser from "phaser"

export default class MapMakerScene extends Scene {
    constructor() {
        super({ key: "MapMakerScene" })

        this.layers = []
        this.tileSets = []
        this.tileSetsInfos = []
        this.tiles = []
        this.map = null
        this.selectedTile = null
        this.controls = null
        this.marker = null
        this.shiftKey = null
        this.eKey = null
        this.iKey = null
        this.tabKey = null
        this.tiles_size = 32
        this.mapsize = 32 * 20
        this.selectedLayer = 0
    }

    init() { // props : (data)
        // TODO : La data envoyée depuis BootScene arrive ici, dans l'object data
        // console.log(data)
        store.commit('phaser/resetStates')
    }

    preload() {
        // tilemap
        this.load.spritesheet('grounds', desert_grounds, { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('items', desert_items, { frameWidth: 32, frameHeight: 32 })
        this.load.tilemapTiledJSON('map', template)
        this.load.spritesheet("grounds", desert_grounds, {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet("items", desert_items, {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.tilemapTiledJSON("map", template)
    }

    create() {
        this._draw_map()
        this._draw_cursor()
        this._initKeys()
        this._initListeners()
    }

    update() { // props: (time, delta)
        this.handle_event()
    }

    _initListeners() {
        store.watch(
            () => store.state.phaser.selectedTile,
            (newValue) => {
                this.selectedTile = newValue
            }
        )

        store.watch(
            () => store.state.phaser.selectedTileIndex,
            (index) => {
                this.selectedTile = new Tilemaps.Tile(
                    this.selectedLayer,
                    index,
                    5,
                    5,
                    32,
                    32,
                    32,
                    32
                )
            }
        )

        store.watch(
            () => store.state.phaser.selectedLayer,
            (newValue, oldValue) => {
                this.selectedLayer = newValue

                if (store.state.phaser.isolateLayer) {
                    this.layers[oldValue].setVisible(false)
                    this.layers[newValue].setVisible(true)
                }
            }
        )

        store.watch(
            () => store.state.phaser.isolateLayer,
            (isIsolated) => {
                if (isIsolated) {
                    this.layers.forEach((layer, index) => {
                        if (index !== this.selectedLayer) {
                            console.log(`Setting ${this.layers[index].layer.name} to visibilty false`)
                            this.layers[index].setVisible(false)
                        }
                    })
                } else {
                    console.log('on set tout à true')
                    this.layers.forEach((layer, index) =>
                        this.layers[index].setVisible(true)
                    )
                }
            }
        )
    }

    _initKeys() {
        this.shiftKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SHIFT
        )
        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        this.iKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I)
        this.tabKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.TAB
        )

        this.input.on(
            "wheel",
            function(pointer, gameObjects, deltaX, deltaY) {
                this.cameras.main._x -= deltaX / 5
                this.cameras.main._y -= deltaY / 5
            }
        )

        this.eKey.on("down", () => {
            store.commit("phaser/updateState", {
                property: "eraser",
                newState: !store.state.phaser.eraser,
            })
        })

        this.iKey.on("down", () => {
            store.commit("phaser/updateState", {
                property: "isolateLayer",
                newState: !store.state.phaser.isolateLayer,
            })
        })

        this.tabKey.on("down", () => {
            store.commit("phaser/updateState", {
                property: "layerTab",
                newState: !store.state.phaser.layerTab,
            })
        })
    }

    // draw tilemap, add tileset to map object, set position of layer(s)
    _draw_map() {
        let { layers } = store.state.phaser

        this.map = this.make.tilemap({ key: "map" })

        layers.forEach((layer, index) => {
            this.tileSets[index] = this.map.addTilesetImage(layer.name)
            this.layers[index] = this.map.createBlankLayer(
                `${layer.name}_layer`,
                this.tileSets[index],
                0,
                0
            )
            this.tileSetsInfos[index] = {
                texCoordinates: this.tileSets[index].texCoordinates,
                glTexture: this.tileSets[index].glTexture,
            }

            if (index === 0) {
                this.layers[0].randomize(0, 0, this.map.width, this.map.height, [29])
                this.selectedTile = this.layers[0].getTileAt(0, 0)
                store.commit("phaser/updateState", {
                    property: "selectedTile",
                    newState: 0,
                })
            }

            if (index === 1) {
                this.layers[1].randomize(0, 0, this.map.width, this.map.height, [1])
            }
        })

        store.commit("phaser/updateState", {
            property: "tileSetsInfos",
            newState: this.tileSetsInfos,
        })

        // this.layers.forEach(layer => layer.setPosition(window.innerWidth / 2 - this.mapsize, 0))
    }

    _draw_cursor() {
        this.marker = this.add.graphics()
        this.marker.lineStyle(2, 0xf04e4e, 1)
        this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight)

        this.cameras.main.setBounds(
            0,
            0,
            this.map.widthInPixels,
            this.map.heightInPixels
        )

        const cursors = this.input.keyboard.createCursorKeys()

        this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5,
        })
    }

    // handle selection of tiles
    handle_event() {
        const { layers, eraser } = store.state.phaser
        const layerName = layers[this.selectedLayer].name
        const worldPoint = this.input.activePointer.positionToCamera(
            this.cameras.main
        )

        // Rounds down to nearest tile
        var pointerTileX = this.map.worldToTileX(
            worldPoint.x,
            true,
            this.cameras.main,
            layerName
        )
        var pointerTileY = this.map.worldToTileY(
            worldPoint.y,
            true,
            this.cameras.main,
            layerName
        )

        // Snap to tile coordinates, but in world space
        this.marker.x = this.map.tileToWorldX(
            pointerTileX,
            this.cameras.main,
            layerName
        )
        this.marker.y = this.map.tileToWorldY(
            pointerTileY,
            this.cameras.main,
            layerName
        )

        if (this.input.manager.activePointer.isDown) {
            if (this.shiftKey.isDown) {
                this.selectedTile = this.layers[this.selectedLayer].getTileAt(
                    pointerTileX,
                    pointerTileY,
                    false,
                    layerName
                )
                store.commit("phaser/updateState", {
                    property: "selectedTile",
                    newState: this.selectedTile,
                })
            } else if (eraser) {
                this.layers[this.selectedLayer].removeTileAt(
                    pointerTileX,
                    pointerTileY,
                    true,
                    true
                )
            } else {
                this.layers[this.selectedLayer].putTileAt(
                    this.selectedTile,
                    pointerTileX,
                    pointerTileY,
                    true,
                    layerName
                )
            }
        } else {
            this.layers.forEach((layer, index) =>
                this.layers[index].setVisible(true)
            )
        }
    }

}