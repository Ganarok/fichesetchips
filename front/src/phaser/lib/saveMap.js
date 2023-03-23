import { useToast } from "vue-toastification"

import store from "@/store"

// Used to save a Phaser map to a database
export const saveMap = async (map, name = 'Map') => {
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

    const grounds = await fetch('/phaser/desert_grounds.png')
    const groundsFile = await grounds.blob()

    const items = await fetch('/phaser/desert_items.png')
    const itemsFile = await items.blob()
    
    const mapObject = {
        title: name,
        data: map, // Json (ou file)
        created_at: new Date().toISOString(),
        created_by: store.state.user.user.id || '',
        assets: [
            {
                name: "grounds",
                file: groundsFile,
            },
            {
                name: "items",
                file: itemsFile
            },
        ]
    }

    const isOkay = await store.dispatch('phaser/save_map', mapObject)

    if (!isOkay) {
        toast.error("Error while saving map")
        return
    } else {
        toast.success(`Map ${name} saved !`)
    }
}