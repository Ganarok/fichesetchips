<template>
    <div
        class="flex relative w-full px-4 items-center text-white font-bold select-none bg-fc-black border-t border-fc-green transition-all duration-150 ease-in-out z-50"
        :class="$store.state.phaser.layerTab ? 'h-12' : 'h-1'"
    >
        <div
            v-if="layers && layers.length > 0"
            class="absolute w-full -top-6 left-0 z-0"
        >
            <div class="flex w-full space-x-4">
                <div
                    class="flex items-center justify-center bg-fc-black-light p-2"
                    @click="
                        () =>
                            $store.commit('phaser/updateState', {
                                property: 'layerTab',
                                newState: !$store.state.phaser.layerTab,
                            })
                    "
                >
                    <img
                        src="@/assets/selector.svg"
                        class="object-contain"
                        alt="Arrow"
                        :class="
                            $store.state.phaser.layerTab
                                ? 'transition duration-250'
                                : 'transition duration-250 rotate-180'
                        "
                    >
                </div>

                <Layer
                    v-for="(layer, index) in layers"
                    :key="index"
                    :layer="layer"
                    :index="index"
                    :is-selected="selectedLayer === index"
                    @click="updateLayer(index)"
                />
            </div>
        </div>

        <div
            v-if="isLoadingAssets"
            class="flex w-full self-center justify-center"
        >
            <Loader :size="15" />
        </div>

        <div
            v-else
            id="canvasContainer"
            class="flex w-full items-center space-x-2 overflow-x-scroll py-2 scrollbar-hide"
            :class="$store.state.phaser.layerTab ? '' : 'hidden'"
        >
            <img
                v-for="(img, index) in $store.state.phaser.tilesPics[selectedLayer]"
                :id="`canvas_${index}`"
                :key="index"
                class="w-8 h-8 cursor-pointer object-contain border border-fc-green hoverStyle"
                :class="img?.src ? '' : 'hidden'"
                :src="img.src"
                :alt="img.alt"
                @click="() => updateSelectedTile(index)"
            >
        </div>
    </div>
</template>

<script>
import Layer from "@/components/phaser/Layer.vue"
import Loader from "@/components/common/Loader.vue"
import { mapState } from "vuex"

export default {
    name: 'Layers',
    components: { Layer, Loader },
    data() {
        return {
            ...this.$store.state.phaser,
            loadingAssets: true,
            gl: null
        }
    },
    computed: {
        ...mapState("phaser", {
            isLoadingAssets: (state) => state.isLoadingAssets,
        })
    },
    mounted() {
        this.$store.watch(
            (state) => state.phaser.isLoadingAssets,
            (isLoading) => {
                if (!isLoading) {
                    this.initLayers()
                    this.loadingAssets = false
                }
            }
        )
    },
    methods: {
        createCanvas(id, gl, texture, x = 0, y = 0) {
            // Create a framebuffer backed by the texture
            var framebuffer = gl.createFramebuffer()
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

            // Read the contents of the framebuffer
            var data = new Uint8Array(32 * 32 * 4)
            gl.readPixels(x, y, 32, 32, gl.RGBA, gl.UNSIGNED_BYTE, data)

            gl.deleteFramebuffer(framebuffer)

            // Create a 2D canvas to store the result 
            var canvas = document.createElement('canvas')
            canvas.width = 32
            canvas.height = 32
            canvas.id = id
            var context = canvas.getContext('2d')

            // Copy the pixels to a 2D canvas
            var imageData = context.createImageData(32, 32)
            imageData.data.set(data)
            context.putImageData(imageData, 0, 0)

            var img = new Image()
            img.src = canvas.toDataURL()
            img.width = 32
            img.height = 32
            img.id = id
            img.style = 'cursor: pointer;'
            img.onclick = () => this.updateSelectedTile(id)
            
            return img
        },
        updateSelectedTile(index) {
            const { selectedLayer, tilesPics } = this.$store.state.phaser

            const selectedTileContainer = document.getElementById('selectedTile')
            const img = tilesPics[selectedLayer][index]

            img.onClick = () => {}
            img.style = ''
            img.id = 'selectedTileImg'

            if (selectedTileContainer.children.length)
                selectedTileContainer.replaceChildren(img)
            else
                selectedTileContainer.appendChild(img)

            this.$store.commit('phaser/updateState', {
                property: 'selectedTileIndex',
                newState: index + selectedLayer
            })
        },
        updateLayer(index) {
            this.$store.commit('phaser/updateState', {
                property: 'selectedLayer',
                newState: index
            })

            this.selectedLayer = index
        },
        initLayers() {
            setTimeout(() => {
                const { tileSetsInfos, layers } = this.$store.state.phaser
                const map = document.getElementsByTagName('canvas')[0]
                const gl = map.getContext('webgl')
                let pictures = {}

                // Pour chaque layers, on définit ses tiles en fonctin du tileset
                layers.map((layers, layerIndex) => {
                    const pics = [] 

                    //Pour chaque frame du tileset, on crée une image
                    tileSetsInfos[layerIndex].texCoordinates.forEach((coords, index) => {
                        if (index === coords.length) // Out of Index
                            return
    
                        var img = this.createCanvas(
                            index,
                            gl,
                            tileSetsInfos[layerIndex].glTexture,
                            coords.x,
                            coords.y
                        ) 
                        // const canvasContainer = document.getElementById(`canvasContainer`)
                        // canvasContainer?.appendChild(img)

                        pics.push(img)
                    })

                    pictures[layerIndex] = pics
                })
                
                this.$store.commit('phaser/updateState', {
                    property: 'tilesPics',
                    newState: pictures
                })

                this.updateSelectedTile(0)
            })
        },
    },
}
</script>
