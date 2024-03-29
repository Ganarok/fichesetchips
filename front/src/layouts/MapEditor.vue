<template>
    <div
        name="MapEditor"
        class="h-screen"
    >
        <Topbar />

        <div class="absolute right-4 my-4 z-10 p-2 bg-fc-black-light transition">
            <div class="flex flex-col space-y-2">
                <div
                    id="selectedTile"
                    class="relative items-center justify-center h-8 w-8 border-fc-green border-2"
                />

                <img
                    src="@/assets/icons/layer.svg"
                    :class="`h-8 w-8 transition ease-in-out hover:scale-110 ${
                        $store.state.phaser.isolateLayer ? 'grayscale-0' : 'grayscale'
                    } hover:cursor-pointer`"
                    alt="ChangeLayer"
                    @click="
                        () =>
                            $store.commit('phaser/updateState', {
                                property: 'isolateLayer',
                                newState: !$store.state.phaser.isolateLayer,
                            })
                    "
                >

                <img
                    src="@/assets/icons/eraser.svg"
                    :class="`h-8 w-8 transition ease-in-out hover:scale-110 ${
                        $store.state.phaser.eraser ? 'grayscale-0' : 'grayscale'
                    } hover:cursor-pointer`"
                    alt="Eraser"
                    @click="
                        () =>
                            $store.commit('phaser/updateState', {
                                property: 'eraser',
                                newState: !$store.state.phaser.eraser,
                            })
                    "
                >
            </div>
        </div>

        <div class="absolute m-4 mt-8 select-none">
            <div
                class="flex flex-col space-y-4 p-4 font-bold text-fc-green text-center transition bg-fc-black-light opacity-40 hover:opacity-100 delay-200 hover:delay-75"
            >
                <p class="text-fc-yellow text-2xl">
                    Outils
                </p>
                
                <div class="flex flex-col space-y-2">
                    <p class="text-fc-green">
                        Taille du pinceau
                    </p>
                    
                    <div class="flex items-center justify-between text-2xl">
                        <div 
                            class="flex items-center justify-center font-bold hoverStyle h-6 w-6 bg-fc-green text-fc-black-light"
                            @click="e => updateBrushSize(Math.max(1, brushSize - 1))"
                        >
                            -
                        </div>

                        <p class="font-bold text-fc-yellow">
                            {{ brushSize }}
                        </p>

                        <div 
                            class="flex items-center justify-center font-bold hoverStyle h-6 w-6 bg-fc-green text-fc-black-light"
                            @click="e => updateBrushSize(Math.min(5, brushSize + 1))"
                        >
                            +
                        </div>
                    </div>
                </div>

                <div class="flex flex-col space-y-2">
                    <p class="text-fc-green">
                        Zoom
                    </p>
                    
                    <div class="flex items-center justify-between text-2xl">
                        <div 
                            class="flex items-center justify-center font-bold hoverStyle h-6 w-6 bg-fc-green text-fc-black-light"
                            @click="e => updateScaleLevel(false)"
                        >
                            -
                        </div>

                        <p class="font-bold text-fc-yellow text-xl">
                            {{ scaleLevel * 100 }}%
                        </p>

                        <div 
                            class="flex items-center justify-center font-bold hoverStyle h-6 w-6 bg-fc-green text-fc-black-light"
                            @click="e => updateScaleLevel(true)"
                        >
                            +
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="absolute w-full z-10 bottom-0">
            <Layers />
        </div>

        <slot />
    </div>
</template>

<script>
import Topbar from "@/components/phaser/Topbar.vue"
import Layers from "@/components/phaser/Layers.vue"
import { mapState } from "vuex"
// TODO: Ajouter le onclick pour changer le layer sélectionné enregistré dans le store
export default {
    name: "MapEditor",
    components: { Topbar, Layers },
    computed: {
        ...mapState("phaser", {
            isolateLayer: (state) => state.isolateLayer,
            eraser: (state) => state.eraser,
            isExporting: (state) => state.isExporting,
            isSaving: (state) => state.isSaving,
            scaleLevel: (state) => state.scaleLevel,
            brushSize: (state) => state.brushSize,
            mapId: (state) => state.mapId
        })
    },
    methods: {
        createCanvas(id, gl, texture) {
            // Create a framebuffer backed by the texture
            var framebuffer = gl.createFramebuffer()
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,
                gl.COLOR_ATTACHMENT0,
                gl.TEXTURE_2D,
                texture,
                0
            )

            // Read the contents of the framebuffer
            var data = new Uint8Array(32 * 32 * 4)
            gl.readPixels(0, 0, 32, 32, gl.RGBA, gl.UNSIGNED_BYTE, data)

            gl.deleteFramebuffer(framebuffer)

            // Create a 2D canvas to store the result
            var canvas = document.createElement("canvas")
            canvas.width = 32
            canvas.height = 32
            canvas.id = id
            var context = canvas.getContext("2d")

            // Copy the pixels to a 2D canvas
            var imageData = context.createImageData(32, 32)
            imageData.data.set(data)
            context.putImageData(imageData, 0, 0)

            var img = new Image()
            img.src = canvas.toDataURL()
            img.width = 32
            img.height = 32
            img.id = id
            img.style = "cursor: pointer;"
            img.onclick = () => this.updateSelectedTile(id)

            return img
        },
        updateBrushSize(newValue) {
            this.$store.commit("phaser/updateState", {
                property: "brushSize",
                newState: newValue,
            })
        },
        updateScaleLevel(increasing) {
            let newValue = this.scaleLevel

            if (increasing) {
                if (this.scaleLevel < 5) { 
                    if (this.scaleLevel < 1) {
                        newValue *= 2
                    } else {
                        newValue += 1
                    }
                }
            } else {
                if (this.scaleLevel > 0.25) {
                    if (this.scaleLevel <= 1) {
                        newValue /= 2
                    } else {
                        newValue -= 1
                    }
                }
            }

            this.$store.commit("phaser/updateState", {
                property: "scaleLevel",
                newState: newValue,
            })
        },
    },
}
</script>
