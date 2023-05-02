import { Scene } from "phaser"
import Phaser from "phaser"

import store from "@/store"
import templateBase from "@/phaser/maps/templateBase.json"
import template from "@/phaser/maps/template.json"

export default class GameScene extends Scene {
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
        this.isMovingPlayer = false
    }

    init({ map }) {
        // store.commit('phaser/resetStates')

        if (map) {
            this.mapId = map.data.id
            store.commit('game/updateState', { property: 'mapId', newState: this.mapId })
        }

        this.mapObject = map || undefined
    }

    preload() {
        // MANDATORY
        // store.commit('game/updateState', { property: 'isLoadingAssets', newState: true })

        if (this.mapObject) {
            const { data, title } = this.mapObject.data

            this.title = title
            store.commit('game/updateState', { property: 'title', newState: title })

            data.layers.forEach(layer => {
                // let binary = Buffer.from(layer.image.data, 'binary')
                // let imgData = new Blob([binary], { type: 'image/png' })
                // let url = URL.createObjectURL(imgData)

                console.log('Loading layer', layer.name)
                this.load.spritesheet(layer.name, `/phaser/desert_${layer.name}.png`,  { frameWidth: this.tiles_size, frameHeight: this.tiles_size })
            })

            this.load.tilemapTiledJSON('map', templateBase)
        } else {
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
        this._initPlayers()
        this._initListeners()
    }

    update() {
        this.handle_event()
    }

    // Handle players init
    _initPlayers() {
        const players = store.state.game.game_state.players

        players.forEach((player, index) => this.addPlayer(
            player.id,
            player.character.firstname,
            player.character?.x || 9 + index + index,
            player.character?.y || 15 + index
        ))
    }

    _initListeners() {
        store.watch(
            () => store.state.game.isMovingPlayer,
            (isMoving) => {
                this.isMovingPlayer = isMoving
                this._draw_cursor()
            }
        )

        store.watch(
            () => store.state.game.hasToUpdatePlayers,
            (hasToUpdate) => {
                if (hasToUpdate) {
                    this.players.forEach(player => player.destroy())
                    this.players = []
    
                    this._initPlayers()
                    store.commit('game/updateState', { property: 'hasToUpdatePlayers', newState: false })
                }
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

        // this.layers.forEach(layer => layer.setPosition(window.innerWidth / 2 - this.mapsize, 0))
    }

    // Draws the red cursor
    _draw_cursor() {
        if (this.marker)
            this.marker.destroy()

        this.marker = this.add.graphics()
        this.marker.fillRect(0, 0, this.tiles_size, this.tiles_size)
        this.marker.fillStyle(
            this.isMovingPlayer ? 0x4FEA74 : 0xFFFFFF, 
            0.5
        )
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

        const playerContainer = this.add.container(
            (this.tiles_size * x),
            (this.tiles_size * y)
            // 0,
            // 0
        )
        const playerRect = this.add.graphics()
        const playerText = this.add.text(
            6,
            6,
            name.slice(0, 2).toUpperCase(),
            {
                fontSize: 18,
                color: '#000000',
                align: 'center',
            }
        )
        const rectangleHitBox = this.add.rectangle(0, 0, this.tiles_size, this.tiles_size)

        playerRect.fillStyle(0xFFFFFF, 0.9)
        playerRect.fillRoundedRect(0, 0, this.tiles_size * 1, this.tiles_size * 1, 8)
        playerContainer.add(playerRect)
        playerContainer.add(playerText)
        playerContainer.add(rectangleHitBox)
        playerContainer.setInteractive(rectangleHitBox, Phaser.Geom.Rectangle.Contains)

        playerContainer.on('pointerover', () => {
            const playerContainerUi = this.add.container(0, 0)
            const playerUi = this.add.graphics()
            const playerUiTitle = this.add.text(
                this.tiles_size / 2,
                -this.tiles_size + 12,
                name || "Joueur",
                {
                    fontSize: 18,
                    color: '#1E1E1E',
                }
            )
            playerUiTitle.setOrigin(0.5, 0.5)
            playerUi.fillStyle(0xFFDB57, 0.9)
            playerUi.fillRoundedRect(-this.tiles_size * 2, -this.tiles_size - 6, this.tiles_size * 5, this.tiles_size, 0)

            playerContainerUi.name = `playerUi_${playerId}`
            
            playerContainerUi.add(playerUi)
            playerContainerUi.add(playerUiTitle)
            playerContainer.add(playerContainerUi)
        })

        playerContainer.on('pointerout', () => {
            const playerDiv = playerContainer.getByName(`playerUi_${playerId}`)

            if (playerDiv)
                playerDiv.destroy()
        })

        playerContainer.on('pointerdown', () => {
            const player = store.state.game.game_state.players.find(player => player.id === playerId)

            if (!player === undefined) { console.log('Player not found'); return }

            store.commit('game/updateState', {
                property: 'selectedPlayerFromPhaser',
                newState: player,
            })
        })

        playerContainer.name = playerId

        this.players.push(playerContainer)
    }

    // Updates a player object property.
    // Example: updatePlayer('playerId', 'x', 100)
    updatePlayer(playerId, property, value) {
        if (!playerId || !property || !value) { console.log('UpdatePlayer: missing props'); return }

        const player = this.players.find(player => player.name === playerId)

        if (!player) { console.log('UpdatePlayer: player not found'); return }
    
        if (property === 'x') {
            player.setPosition(
                (this.tiles_size * value),
                player.y
            )
        } else if (property === 'y') {
            player.setPosition(
                player.x,
                (this.tiles_size * value)
            )
        } else {
            player[property] = value
        }
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

        if (this.isMovingPlayer && this.input.manager.activePointer.isDown) {
            const player = store.state.game.selectedPlayerFromPhaser

            if (!Object.keys(player).length) {
                console.log('Cannot find the player in the game state')

                return
            }

            // TODO: check if the tile is walkable
            // TODO: check if the tile is not already occupied by another player or monster

            store.dispatch('game/update_game_state_player', {
                playerId: player.id,
                character: {
                    ...player.character,
                    x: pointerTileX,
                    y: pointerTileY
                }
            })

            this.updatePlayer(player.id, 'x', pointerTileX)
            this.updatePlayer(player.id, 'y', pointerTileY)

            store.commit('game/updateState', {
                property: 'notificationToEmit',
                newState: 'update_character_position'
            })

            store.commit('game/updateState', {
                property: 'contentToEmit',
                newState: {
                    roomId: store.state.game.roomId,
                    playerId: player.id,
                    character: player.character,
                    x: pointerTileX,
                    y: pointerTileY
                }
            })

            store.commit('game/updateState', {
                property: 'haveToEmit',
                newState: true
            })

            store.commit('game/updateState', {
                property: 'selectedPlayerFromPhaser',
                newState: {}
            })

            store.commit('game/updateState', {
                property: 'isMovingPlayer',
                newState: false
            })
        }
    }
}