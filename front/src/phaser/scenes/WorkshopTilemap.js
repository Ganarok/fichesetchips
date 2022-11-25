import { Scene } from 'phaser'
import tiles from "@/phaser/assets/desert_tiles.png"
import map_tiled from "@/phaser/assets/desert.json"
import red_chest from "@/phaser/assets/bomb.png"
import tile_icon from "@/phaser/assets/bomb.png"
import monster_icon from "@/phaser/assets/bomb.png"
import object_icon from "@/phaser/assets/bomb.png"



const COLOR_PRIMARY = 0x1E1E1E;
const COLOR_LIGHT = 0x7a7a7a;
const COLOR_DARK = 0xFFDB57;

let controls;
let marker;
let map;
let shiftKey;
let selectedTile;

const tiles_size = 32
const mapsize = tiles_size * 20


const Random = Phaser.Math.Between;

export default class WorkshopTilemap extends Scene {
    constructor() {
        super({ key: 'WorkshopTilemap' })
    }

    preload() {
        // tilemap
        this.load.image('tiles', tiles);
        this.load.tilemapTiledJSON('map', map_tiled);

        //menu icon
        this.load.image("red_chest", red_chest)
        this.load.image("tile_icon", tile_icon)
        this.load.image("monster_icon", monster_icon)
        this.load.image("object_icon", object_icon)
    }

    create() {

        this._draw_map()
            // this.cameras.main.setPosition(window.innerWidth / 2 - mapsize, 0)
        this._draw_interface(300, 500)
        this._draw_cursor()
    }

    update(time, delta) {
        this.handle_event()
    }

    _draw_cursor() {
        selectedTile = map.getTileAt(2, 3);
        marker = this.add.graphics();
        marker.lineStyle(2, 0xff0000, 1);
        marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

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
        map = this.make.tilemap({ key: 'map' });
        var tileset = map.addTilesetImage('Desert', 'tiles');
        var layer = map.createLayer('Ground', tileset, 0, 0);
        layer.setPosition(window.innerWidth / 2 - mapsize, 0)
    }

    // draw elements of interface such as menu, buttons....
    _draw_interface(width, height) {
        var scrollMode = 0; // 0:vertical, 1:horizontal
        const padding = {
            "left": 10,
            "top": -20
        }

        // left-top menu creation
        var gridTable = this.rexUI.add.gridTable({
                x: width / 2 + padding.left,
                y: height / 2 + padding.top,
                width: width,
                height: height / 2,
                scrollMode: 0, // vertical

                // left menu background
                background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

                // table menu 
                table: {
                    cellWidth: (scrollMode === 0) ? undefined : 60,
                    cellHeight: (scrollMode === 0) ? 60 : undefined,

                    columns: 3,

                    mask: {
                        padding: 2,
                    },

                    reuseCellContainer: true,
                },

                slider: {
                    track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                    thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
                },

                mouseWheelScroller: {
                    focus: false,
                    speed: 0.1
                },

                header: this.rexUI.add.label({
                    width: (scrollMode === 0) ? undefined : 30,
                    height: (scrollMode === 0) ? 30 : undefined,

                    orientation: scrollMode,
                    background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                    text: this.add.text(0, 0, 'Tile textures', { fontSize: 20, color: COLOR_PRIMARY, padding: { left: 10 } }),
                    icon: this.add.image(0, 0, 'tile_icon'),
                }),

                space: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,

                    table: 10,
                    header: 10,
                    footer: 10,
                },

                //  cell content
                createCellContainerCallback: function(cell, cellContainer) {
                    var scene = cell.scene,
                        width = cell.width,
                        height = cell.height,
                        item = cell.item,
                        index = cell.index;
                    if (cellContainer === null) {
                        cellContainer = scene.rexUI.add.label({
                            width: width,
                            height: height,

                            orientation: scrollMode,
                            background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                            icon: scene.add.image(0, 0, "red_chest"),
                            text: scene.add.text(0, 0, 'chest'),

                            space: {
                                icon: 10,
                                left: (scrollMode === 0) ? 15 : 0,
                                top: (scrollMode === 0) ? 0 : 15,
                            }
                        });
                        console.log(cell.index + ': create new cell-container');
                    } else {
                        console.log(cell.index + ': reuse cell-container');
                    }

                    // Set properties from item value
                    cellContainer.setMinSize(width, height); // Size might changed in this demo
                    cellContainer.getElement('text').setText(item.id); // Set text of text object
                    // cellContainer.getElement('icon').setFillStyle(item.color); // Set fill color of round rectangle object
                    cellContainer.getElement('background').setStrokeStyle(2, COLOR_DARK).setDepth(0);
                    return cellContainer;
                },
                items: CreateItems(100)
            })
            .layout()


        gridTable
            .on('cell.down', function(cellContainer, cellIndex, pointer) {
                console.log('pointer-down ' + cellIndex + ': ' + cellContainer.text + '\n');
            }, this)
            .on('cell.up', function(cellContainer, cellIndex, pointer) {
                console.log('pointer-up ' + cellIndex + ': ' + cellContainer.text + '\n');
            }, this)
            .on('cell.over', function(cellContainer, cellIndex, pointer) {
                cellContainer.getElement('background')
                    .setStrokeStyle(2, COLOR_LIGHT)
                    .setDepth(1);
            }, this)
            .on('cell.out', function(cellContainer, cellIndex, pointer) {
                cellContainer.getElement('background')
                    .setStrokeStyle(2, COLOR_DARK)
                    .setDepth(0);
            }, this)
            .on('cell.click', function(cellContainer, cellIndex, pointer) {
                console.log('click ' + cellIndex + ': ' + cellContainer.text + '\n');

                var nextCellIndex = cellIndex + 1;
                var nextItem = gridTable.items[nextCellIndex];
                if (!nextItem) {
                    return;
                }
                nextItem.color = 0xffffff - nextItem.color;
                gridTable.updateVisibleCell(nextCellIndex);

            }, this)
            .on('cell.1tap', function(cellContainer, cellIndex, pointer) {
                console.log('1 tap (' + cellIndex + ': ' + cellContainer.text + ')\n');
            }, this)
            .on('cell.2tap', function(cellContainer, cellIndex, pointer) {
                console.log('2 taps (' + cellIndex + ': ' + cellContainer.text + ')\n');
            }, this)
            .on('cell.pressstart', function(cellContainer, cellIndex, pointer) {
                console.log('press-start (' + cellIndex + ': ' + cellContainer.text + ')\n');
            }, this)
            .on('cell.pressend', function(cellContainer, cellIndex, pointer) {
                console.log('press-end (' + cellIndex + ': ' + cellContainer.text + ')\n');
            }, this)
            .on('cell.swiperight', function(cellContainer, cellIndex, pointer) {
                console.log('swipe-right (' + cellIndex + ': ' + cellContainer.text + ')\n');
            }, this)
            .on('cell.swipeleft', function(cellContainer, cellIndex, pointer) {
                console.log('swipe-left (' + cellIndex + ': ' + cellContainer.text + ')\n');
            }, this)
            .on('cell.swipeup', function(cellContainer, cellIndex, pointer) {
                console.log('swipe-up (' + cellIndex + ': ' + cellContainer.text + ')\n');
            }, this)
            .on('cell.swipedown', function(cellContainer, cellIndex, pointer) {
                console.log('swipe-down (' + cellIndex + ': ' + cellContainer.text + ')\n');
            }, this)







        // left-middle menu creation
        var gridTable = this.rexUI.add.gridTable({
                x: width / 2 + padding.left,
                y: height / 2 + padding.top + 260,
                width: width,
                height: height / 2,
                scrollMode: 0, // vertical

                // left menu background
                background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

                // table menu 
                table: {
                    cellWidth: (scrollMode === 0) ? undefined : 60,
                    cellHeight: (scrollMode === 0) ? 60 : undefined,

                    columns: 3,

                    mask: {
                        padding: 2,
                    },

                    reuseCellContainer: true,
                },

                slider: {
                    track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                    thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
                },

                mouseWheelScroller: {
                    focus: false,
                    speed: 0.1
                },

                header: this.rexUI.add.label({
                    width: (scrollMode === 0) ? undefined : 30,
                    height: (scrollMode === 0) ? 30 : undefined,

                    orientation: scrollMode,
                    background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                    text: this.add.text(0, 0, 'Object', { fontSize: 20, color: COLOR_PRIMARY, padding: { left: 10 } }),
                    icon: this.add.image(0, 0, 'object_icon'),
                }),

                space: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,

                    table: 10,
                    header: 10,
                    footer: 10,
                },

                //  cell content
                createCellContainerCallback: function(cell, cellContainer) {
                    var scene = cell.scene,
                        width = cell.width,
                        height = cell.height,
                        item = cell.item,
                        index = cell.index;
                    if (cellContainer === null) {
                        cellContainer = scene.rexUI.add.label({
                            width: width,
                            height: height,

                            orientation: scrollMode,
                            background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                            icon: scene.add.image(0, 0, "red_chest"),
                            text: scene.add.text(0, 0, 'chest'),

                            space: {
                                icon: 10,
                                left: (scrollMode === 0) ? 15 : 0,
                                top: (scrollMode === 0) ? 0 : 15,
                            }
                        });
                        console.log(cell.index + ': create new cell-container');
                    } else {
                        console.log(cell.index + ': reuse cell-container');
                    }

                    // Set properties from item value
                    cellContainer.setMinSize(width, height); // Size might changed in this demo
                    cellContainer.getElement('text').setText(item.id); // Set text of text object
                    // cellContainer.getElement('icon').setFillStyle(item.color); // Set fill color of round rectangle object
                    cellContainer.getElement('background').setStrokeStyle(2, COLOR_DARK).setDepth(0);
                    return cellContainer;
                },
                items: CreateItems(100)
            })
            .layout()

        // left-bottom menu creation
        var gridTable = this.rexUI.add.gridTable({
                x: width / 2 + padding.left,
                y: height / 2 + padding.top + 520,
                width: width,
                height: height / 2,
                scrollMode: 0, // vertical

                // left menu background
                background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

                // table menu 
                table: {
                    cellWidth: (scrollMode === 0) ? undefined : 60,
                    cellHeight: (scrollMode === 0) ? 60 : undefined,

                    columns: 3,

                    mask: {
                        padding: 2,
                    },

                    reuseCellContainer: true,
                },

                slider: {
                    track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                    thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
                },

                mouseWheelScroller: {
                    focus: false,
                    speed: 0.1
                },

                header: this.rexUI.add.label({
                    width: (scrollMode === 0) ? undefined : 30,
                    height: (scrollMode === 0) ? 30 : undefined,

                    orientation: scrollMode,
                    background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                    text: this.add.text(0, 0, 'Entities', { fontSize: 20, color: COLOR_PRIMARY, padding: { left: 10 } }),
                    icon: this.add.image(0, 0, 'monster_icon'),
                }),

                space: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,

                    table: 10,
                    header: 10,
                    footer: 10,
                },

                //  cell content
                createCellContainerCallback: function(cell, cellContainer) {
                    var scene = cell.scene,
                        width = cell.width,
                        height = cell.height,
                        item = cell.item,
                        index = cell.index;
                    if (cellContainer === null) {
                        cellContainer = scene.rexUI.add.label({
                            width: width,
                            height: height,

                            orientation: scrollMode,
                            background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                            icon: scene.add.image(0, 0, "red_chest"),
                            text: scene.add.text(0, 0, 'chest'),

                            space: {
                                icon: 10,
                                left: (scrollMode === 0) ? 15 : 0,
                                top: (scrollMode === 0) ? 0 : 15,
                            }
                        });
                        console.log(cell.index + ': create new cell-container');
                    } else {
                        console.log(cell.index + ': reuse cell-container');
                    }

                    // Set properties from item value
                    cellContainer.setMinSize(width, height); // Size might changed in this demo
                    cellContainer.getElement('text').setText(item.id); // Set text of text object
                    // cellContainer.getElement('icon').setFillStyle(item.color); // Set fill color of round rectangle object
                    cellContainer.getElement('background').setStrokeStyle(2, COLOR_DARK).setDepth(0);
                    return cellContainer;
                },
                items: CreateItems(100)
            })
            .layout()

        this._draw_buttons(width, height)
    }

    // draw standalone buttons on interface
    _draw_buttons(width, height) {
        const padding = {
            "left": 10,
            "top": 80
        }

        var buttons = this.rexUI.add.buttons({
                x: width / 2 + padding.left,
                y: 85,

                orientation: 'x',
                background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK),
                buttons: [
                    createButton(this, 'Save').setOrigin(0.5, 1),
                    createButton(this, 'Option').setOrigin(0.5, 1),
                    createButton(this, 'Import').setOrigin(0.5, 1),
                ],

                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
                    item: 6
                }

            })
            .setOrigin(0.5, 1)
            .layout()

        buttons.getElement('buttons').forEach(function(button) {
            button.popUp(1000, undefined, 'Back');
        })

        buttons
            .on('button.click', function(button, index, pointer, event) {
                button.scaleYoyo(500, 1.2);
            })
    }

    // handle selection of tiles
    handle_event() {
        var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

        // Rounds down to nearest tile
        var pointerTileX = map.worldToTileX(worldPoint.x);
        var pointerTileY = map.worldToTileY(worldPoint.y);

        // Snap to tile coordinates, but in world space
        marker.x = map.tileToWorldX(pointerTileX);
        marker.y = map.tileToWorldY(pointerTileY);

        if (this.input.manager.activePointer.isDown) {
            if (shiftKey.isDown) {
                selectedTile = map.getTileAt(pointerTileX, pointerTileY);
            } else {
                map.putTileAt(selectedTile, pointerTileX, pointerTileY);
            }
        }
    }



}

const CreateItems = function(count) {
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push({
            id: i,
            color: Random(0, 0xffffff)
        });
    }
    return data;
}

// tmp loading images
// import cobble from "@/phaser/assets/cobble.png"
// import grass from "@/phaser/assets/grass.png"
// import sand from "@/phaser/assets/sand.png"
// import water from "@/phaser/assets/water.png"

function getImages() {}




var createButton = function(scene, text) {
    return scene.rexUI.add.label({
        width: 60,
        height: 60,
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),
        align: 'center',
        space: {
            left: 10,
            right: 10,
        }
    });
}




// 1) Definir un array d'image ainsi que leur nom/index dans une style
// 2) Afficher dans le composant les images
// 3) Afficher

// methods to implement:
// - draw interface
// - bind element
// - scale element
// - getElemtexture