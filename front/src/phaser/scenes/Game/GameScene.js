import { Scene } from "phaser"
import Phaser from "phaser"

import store from "@/store"
import templateBase from "@/phaser/maps/templateBase.json"
import template from "@/phaser/maps/template.json"

export default class MapMakerScene extends Scene {
    constructor() {
        super({ key: "GameScene" })

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
        this.mapId = ''
        this.players = []
    }

    init({ map }) {
        store.commit('phaser/resetStates')

        if (map) {
            this.mapId = map.data.id
            store.commit('phaser/updateState', { property: 'mapId', newState: this.mapId })
        }

        this.mapObject = map || undefined
    }

    preload() {
        // MANDATORY
        store.commit('phaser/updateState', { property: 'isLoadingAssets', newState: true })

        if (this.mapObject) {
            const { data, title } = this.mapObject.data


            this.title = title
            store.commit('phaser/updateState', { property: 'title', newState: title })

            data.layers.forEach(layer => {
                // let binary = Buffer.from(layer.image.data, 'binary')
                // let imgData = new Blob([binary], { type: 'image/png' })
                // let url = URL.createObjectURL(imgData)

                console.log('Loading layer', layer.name)
                this.load.spritesheet(layer.name, `/phaser/desert_${layer.name}.png`,  { frameWidth: this.tiles_size, frameHeight: this.tiles_size })
            })

            this.load.tilemapTiledJSON('map', templateBase)
        } else {
            this.title = 'Untitled'
            store.commit('phaser/updateState', { property: 'title', newState: this.title })

            this.load.spritesheet('grounds', '/phaser/desert_grounds.png', { frameWidth: 32, frameHeight: 32 })
            this.load.spritesheet('items', '/phaser/desert_items.png', { frameWidth: 32, frameHeight: 32 })
            this.load.json('mapJson', template)
            this.load.tilemapTiledJSON('map', templateBase)
        }
    }

    create() {
        this._draw_map()
        this._draw_cursor()
        this._initKeys()
        this._initListeners()
        this._initPlayers()
    }

    update() {
        this.handle_event()
    }

    // Handle players init
    _initPlayers() {
        const players = store.state.game.diary.players

        console.log(players)

        players.forEach((player, index) => {
            this.addPlayer(player.name, player.name, 0 + index, 0 + index)
        })

        this.addPlayer('player1', 'salut', 10, 10)
        this.addPlayer('player1', 'EZ', 22, 2)
    }

    _initListeners() {
        store.watch(
            (state) => state.game.diary.players,
            (newPlayers) => {
                //TODO: update players
                console.log(newPlayers)
            }
        )
    }

    // Init input keys
    _initKeys() {
        // Mouse Wheel / Touchpad
        this.input.on(
            "wheel",
            (pointer, gameObjects, deltaX, deltaY) => {
                this.cameras.main._x -= deltaX / 5
                this.cameras.main._y -= deltaY / 5
            }
        )
    }

    // Draw tilemap, add tileset to map object, set position of layer(s)
    _draw_map() {
        var jsonFile 
        if (this.mapObject) {
            jsonFile = this.mapObject.data.data
        } else jsonFile = this.cache.json.get("mapJson")

        const layers = jsonFile.layers

        this.map = this.make.tilemap({ key: 'map' })

        store.commit("phaser/updateState", {
            property: "isLoadingAssets",
            newState: false,
        })

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

    // Draws the red cursor
    _draw_cursor() {
        if (this.marker)
            this.marker.destroy()

        this.marker = this.add.graphics()
        this.marker.fillRect(0, 0, this.tiles_size, this.tiles_size)
        this.marker.fillStyle(0xFFFFFF, 0.5)
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

    // Adds a player object to the map
    addPlayer(playerId, name = '', x, y) {
        if (!playerId || !x || !y) { console.log('AddPlayer: missing props'); return }

        const playerContainer = this.add.container((this.tiles_size * x) - (this.tiles_size / 10), (this.tiles_size * y) - (this.tiles_size / 10))
        const playerRect = this.add.graphics()
        const playerText = this.add.text(
            6,
            6,
            name.slice(0, 2).toUpperCase(),
            {
                fontSize: 18,
                color: '#000000',
                align: 'center',
                padding: { x: 3, y: 5 }
            }
        )

        playerRect.fillStyle(0xFFFFFF, 0.9)
        playerRect.fillRoundedRect(0, 0, this.tiles_size * 1.2, this.tiles_size * 1.2, 8)
        playerContainer.add(playerRect)
        playerContainer.add(playerText)

        playerContainer.name = playerId
        this.players.push(playerContainer)
    }

    // Updates a player object property.
    // Example: updatePlayer('playerId', 'x', 100)
    updatePlayer(playerId, property, value) {
        if (!playerId || !property || !value) { console.log('UpdatePlayer: missing props'); return }

        const player = this.players.find(player => player.name === playerId)

        if (!player) { console.log('UpdatePlayer: player not found'); return }

        player[property] = value
    }

    // Destroy the player object
    destroyPlayer(playerId) {
        if (!playerId) { console.log('DestroyPlayer: missing playerId'); return }

        const player = this.players.find(player => player.name === playerId)

        if (!player) { console.log('DestroyPlayer: player not found'); return }

        this.players = this.players.filter(player => player.name !== playerId)
        player.destroy()
    }

    // Prepare the map object to be exported as a JSON file
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
            layer.data = layerValues.layer.data.flatMap(horizontalTiles => horizontalTiles.map(tile => {
                return tile.index
            }))

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
        const { layers } = store.state.phaser
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
    }

}