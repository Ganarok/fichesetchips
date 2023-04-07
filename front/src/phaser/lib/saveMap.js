import { useToast } from "vue-toastification"

import store from "@/store"

// Used to save a Phaser map to a database
export const saveMap = async(map, name = '') => {
    const toast = useToast()

    // TODO: Make a loop to dynamically add assets
    // map.tilesets.forEach(async tileset => {
    //     const file = await fetch('/phaser/' + tileset.name + '.png')
    //     const fileBlob = await file.blob()

    //     assets.push({
    //         name: tileset.name,
    //         file: fileBlob,
    //     })
    // })
    console.log(map)
    const grounds = await fetch('/phaser/desert_grounds.png')
    const groundsBlob = await grounds.blob()
    const groundsByteArray = await groundsBlob.arrayBuffer()

    const items = await fetch('/phaser/desert_items.png')
    const itemsBlob = await items.blob()
    const itemsByteArray = await itemsBlob.arrayBuffer()

    const mapObject = {
        title: name,
        data: map, // JSON (ou file)
        assets: [{
                name: "grounds",
                image: groundsByteArray,
            },
            {
                name: "items",
                image: itemsByteArray
            },
        ]
    }

    const mapId = store.state.phaser.mapId
    let isOkay = null

    if(mapId) {
        isOkay = await store.dispatch('phaser/update_map', {...mapObject, mapId })
    } else {
        isOkay = await store.dispatch('phaser/save_map', mapObject)
    }

    if(!isOkay) {
        toast.error("Error while saving map")
        return
    } else {
        toast.success(`Map ${name} ${mapId ? 'updated': 'saved'} !`)
    }

}