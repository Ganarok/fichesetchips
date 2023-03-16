// Used to export a Phaser map to a JSON file
export const exportMap = (map, name = 'Map') => {
    const jsonFile = new Blob([(JSON.stringify(map))], { type: 'text/json' })
    const element = document.createElement('a')

    element.setAttribute('href', URL.createObjectURL(jsonFile))
    element.setAttribute('download', name + '.json')

    element.click()
}