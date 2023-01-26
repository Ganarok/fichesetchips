<template>
    <div
        name="MapEditor"
        class="h-screen"
    >
        <Topbar />

        <div class="absolute right-4 my-4 z-50 p-2 bg-fc-black-light transition">
            <div class="flex flex-col space-y-2">
                <div
                    id="selectedTile"
                    class="relative items-center justify-center h-8 w-8 border-fc-green border-2"
                />

                <img
                    src="@/phaser/assets/layer.svg"
                    :class="`h-8 w-8 transition ease-in-out hover:scale-110 ${
                        $store.state.phaser.isolateLayer ? 'grayscale-0' : 'grayscale'
                    } hover:cursor-pointer`"
                    alt="ChangeLayer"
                    @click="
                        () =>
                            $store.commit('updateState', {
                                property: 'isolateLayer',
                                newState: !$store.state.phaser.isolateLayer,
                            })
                    "
                >

                <img
                    src="@/phaser/assets/eraser.svg"
                    :class="`h-8 w-8 transition ease-in-out hover:scale-110 ${
                        $store.state.phaser.eraser ? 'grayscale-0' : 'grayscale'
                    } hover:cursor-pointer`"
                    alt="Eraser"
                    @click="
                        () =>
                            $store.commit('updateState', {
                                property: 'eraser',
                                newState: !$store.state.phaser.eraser,
                            })
                    "
                >
            </div>
        </div>

        <div class="absolute z-50 m-4">
            <div
                class="flex flex-col space-y-4 p-4 font-bold text-fc-green text-center transition bg-fc-black-light opacity-50 hover:opacity-100 delay-200 hover:delay-75"
            >
                <p>
                    Layer selectionné :<br>
                    <span class="text-fc-yellow">
                        {{
                            $store.state.phaser.layers[$store.state.phaser.selectedLayer].name
                        }}
                    </span>
                </p>
            </div>
        </div>

        <div class="absolute w-full z-50 bottom-0">
            <Layers />
        </div>

        <slot />
    </div>
</template>

<script>
import Topbar from "@/components/phaser/Topbar.vue"
import Layers from "@/components/phaser/Layers.vue"
// TODO: Ajouter le onclick pour changer le layer sélectionné enregistré dans le store
export default {
    name: "MapEditor",
    components: { Topbar, Layers },
    props: {},
    data() {
        return {
            ...this.$store.state.phaser,
        }
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
    },
}
</script>
