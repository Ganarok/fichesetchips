import { Scene, Tilemaps } from "phaser"
import Phaser from "phaser"

import store from "@/store"
import desert_grounds from "@/phaser/assets/desert_grounds.png"
import desert_items from "@/phaser/assets/desert_items.png"
import templateBase from "@/phaser/maps/templateBase.json"
import template from "@/phaser/maps/template.json"
import { exportMap } from "@/phaser/lib/exportMap"

export default class MapMakerScene extends Scene {
    constructor() {
        super({ key: "MapMakerScene" })

        this.layers = []
        this.tileSets = []
        this.tileSetsInfos = []
        this.brushSize = 1
        this.tiles = []
        this.map = null
        this.selectedTile = null
        this.controls = null
        this.marker = null
        this.shiftKey = null
        this.eKey = null
        this.iKey = null
        this.tabKey = null
        this.minusKey = null
        this.plusKey = null
        this.tiles_size = 32
        this.mapsize = 32 * 20
        this.selectedLayer = 0
        this.scaleLevel = 1
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
        this.load.json('mapJson', template)
        this.load.tilemapTiledJSON('map', templateBase)
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
        // Watch for the selected tile in the store
        store.watch(
            () => store.state.phaser.selectedTile,
            (newValue) => {
                this.selectedTile = newValue
            }
        )

        // Watch for the index of the selected tile
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

        // Watch for selected layer in the store
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

        // Watch for the isolateLayer state
        store.watch(
            () => store.state.phaser.isolateLayer,
            (isIsolated) => {
                if (isIsolated) {
                    this.layers.forEach((layer, index) => {
                        if (index !== this.selectedLayer) {
                            console.log(`Setting ${layer.layer.name} to visibilty false`)

                            layer.setVisible(false)
                        }
                    })
                } else {
                    this.layers.forEach((layer) =>
                        layer.setVisible(true)
                    )
                }
            }
        )

        store.watch(
            () => store.state.phaser.isExporting,
            (isExporting) => {
                if (isExporting) {
                    const map = this.prepareMapObject()

                    exportMap(map)
                    store.commit("phaser/updateState", {
                        property: "isExporting",
                        newState: false,
                    })
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
        this.minusKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.MINUS
        )
        this.plusKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.PLUS
        )
        this.zKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)
        this.uKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U)

        // Mouse Wheel / Touchpad
        this.input.on(
            "wheel",
            function(pointer, gameObjects, deltaX, deltaY) {
                this.cameras.main._x -= deltaX / 5
                this.cameras.main._y -= deltaY / 5
            }
        )

        // E Key
        this.eKey.on("down", () => {
            store.commit("phaser/updateState", {
                property: "eraser",
                newState: !store.state.phaser.eraser,
            })
        })

        // I Key
        this.iKey.on("down", () => {
            store.commit("phaser/updateState", {
                property: "isolateLayer",
                newState: !store.state.phaser.isolateLayer,
            })
        })

        // Tab Key
        this.tabKey.on("down", () => {
            store.commit("phaser/updateState", {
                property: "layerTab",
                newState: !store.state.phaser.layerTab,
            })
        })

        // Minus Key (-)
        this.uKey.on('down', () => {
            this.brushSize = Math.max(1, this.brushSize - 1)
            this._draw_cursor()
        })

        // Plus Key (+)        
        this.zKey.on('down', () => {
            this.brushSize = Math.min(5, this.brushSize + 1)
            this._draw_cursor()
        })

        // Zoom In
        this.plusKey.on('down', () => {
            if (this.scaleLevel < 5) { 
                if (this.scaleLevel < 1) {
                    this.scaleLevel *= 2
                } else {
                    this.scaleLevel += 1
                }
                
                // Refresh the map and the red cursor
                this.layers.forEach(layer => layer.setScale(this.scaleLevel))
                this.game.scale.setGameSize(this.map.widthInPixels * this.scaleLevel, this.map.heightInPixels * this.scaleLevel)
                this._draw_cursor()
            }
        })

        // Zoom Out
        this.minusKey.on('down', () => {
            if (this.scaleLevel > 0.25) {
                if (this.scaleLevel <= 1) {
                    this.scaleLevel /= 2
                } else {
                    this.scaleLevel -= 1
                }
    
                // Refresh the map and the red cursor
                this.layers.forEach(layer => layer.setScale(this.scaleLevel))
                this.game.scale.setGameSize(this.map.widthInPixels * this.scaleLevel, this.map.heightInPixels * this.scaleLevel)
                this._draw_cursor()
            }
        })
    }

    // Draw tilemap, add tileset to map object, set position of layer(s)
    _draw_map() {
        // let { layers } = store.state.phaser
        const jsonFile = this.cache.json.get("mapJson")
        const layers = jsonFile.layers

        this.map = this.make.tilemap({ key: 'map' })

        layers.forEach((layer, index) => {
            this.tileSets[index] = this.map.addTilesetImage(layer.name)
            this.tileSetsInfos[index] = {
                texCoordinates: this.tileSets[index].texCoordinates,
                glTexture: this.tileSets[index].glTexture,
            }

            this.layers[index] = this.map.createBlankLayer(
                `${layer.name}_layer`,
                this.tileSets[index],
                0,
                0
            )

            if (jsonFile.layers[index].data) {
                jsonFile.layers[index].data.forEach((tile, tileIndex) => {
                    const x = tileIndex % jsonFile.width
                    const y = Math.floor(tileIndex / jsonFile.width)

                    if (tile !== 0) {
                        this.layers[index].putTileAt(tile, x, y)
                    }
                })
            } else {
                console.log(`No data in layer ${layer.name}, filling with Tile at index 0 from tileset ${index}`)
                this.layers[index].randomize(0, 0, this.map.width, this.map.height, [0])
            }
        })

        store.commit("phaser/updateState", {
            property: "tileSetsInfos",
            newState: this.tileSetsInfos,
        })

        // this.layers.forEach(layer => layer.setPosition(window.innerWidth / 2 - this.mapsize, 0))
    }

    _draw_cursor() {
        if (this.marker)
            this.marker.destroy()

        this.marker = this.add.graphics()
        this.marker.lineStyle(2, 0xf04e4e, 1)
        this.marker.strokeRect(0, 0, (this.map.tileWidth * this.brushSize) * this.scaleLevel, (this.map.tileHeight * this.brushSize) * this.scaleLevel)

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

    prepareMapObject() {
        const map = {}

        map.height = 40
        map.layers = this.layers.map(layerValues => {
            const layer = {}

            layer.height = 40
            layer.name = layerValues.layer.name.split('_')[0]
            layer.opacity = 1
            layer.type = "tilelayer"
            layer.visible = true
            layer.width = 40
            layer.x = 0
            layer.y = 0

            // For each layer, return the index of each tile. The index is the number of the tile used in the tileset.
            // This works as this example : 
            // [0, 1, 1, 0] => This line === an horizontal line of tiles
            // [0, 1, 1, 0] => 0 is an index among a tileset of ... whatever texture you need, 0 representing the index of the texture
            // [0, 1, 1, 0]
            // [0, 1, 1, 0]
            // So here, for each horizontal line, we return the index of each tile. Flatmap is used to flatten the array.
            layer.data = layerValues.layer.data.flatMap(horizontalTiles => horizontalTiles.map(tile => tile.index))

            return layer
        })
        map.orientation = "orthogonal"
        map.properties = {}
        map.tileheight = this.tiles_size
        map.tilesets = this.tileSets.map((tileset, index) => {
            const tilesetObject = {}

            // Data used by each Tileset. You can see an example of the tileset object here : 
            // https://doc.mapeditor.org/en/stable/reference/json-map-format/#tileset
            tilesetObject.firstgid = index
            tilesetObject.image = tileset.name
            tilesetObject.imageheight = tileset.glTexture.height
            tilesetObject.imagewidth = tileset.glTexture.width
            tilesetObject.margin = tileset.tileMargin
            tilesetObject.name = tileset.name
            tilesetObject.properties = tileset.tileProperties
            tilesetObject.spacing = tileset.tileSpacing
            tilesetObject.tileheight = tileset.tileHeight
            tilesetObject.tilewidth = tileset.tileWidth

            return tilesetObject
        })
        map.tilewidth = this.tiles_size
        map.version = 1
        map.width = 40

        return map
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

        const tile = this.map.getTileAtWorldXY(pointerTileX, pointerTileY)
        const startX = tile.x - Math.floor(this.brushSize / 2)
        const startY = tile.y - Math.floor(this.brushSize / 2)

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
                // Supprimer la ou les tiles selon la taille du brush
                for (let x = startX; x < startX + this.brushSize; x++) {
                    for (let y = startY; y < startY + this.brushSize; y++) {
                        this.layers[this.selectedLayer].removeTileAt(
                            (pointerTileX + x + Math.floor(this.brushSize / 2)) * this.scaleLevel,
                            pointerTileY + y + Math.floor(this.brushSize / 2),
                            true,
                            true
                        )
                    }
                }
            } else {
                // Applique une texture sur toutes les tiles du brush
                for (let x = startX; x < startX + this.brushSize; x++) {
                    for (let y = startY; y < startY + this.brushSize; y++) {
                        this.layers[this.selectedLayer].putTileAt(
                            this.selectedTile,
                            (pointerTileX + x + Math.floor(this.brushSize / 2)) * this.scaleLevel,
                            (pointerTileY + y + Math.floor(this.brushSize / 2)) * this.scaleLevel,
                            true,
                            layerName
                        )
                    }
                }
            }
        }
    }

}