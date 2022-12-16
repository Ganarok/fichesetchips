<template>
    <div class="flex relative w-full h-12 px-4 items-center text-white font-bold select-none bg-fc-black border-t border-fc-green z-50">
        <div
            v-if="layers && layers.length > 0"
            class="absolute w-full -top-6 left-0 z-0"
        >
            <div class="flex w-full space-x-4">
                <Layer
                    v-for="(layer, index) in layers"
                    :layer="layer"
                    :index="index"
                    :isSelected="selectedLayer === index"
                    :onClick="this.updateLayer(index)"
                />
            </div>
        </div>

    </div>
</template>

<script>
import Layer from '@/components/phaser/Layer.vue'

export default {
    name: 'Layers',
    components: { Layer },
    methods: {
        updateLayer(index) {
            this.$store.commit('updateState', {
                property: 'selectedLayer',
                newState: index
            })
        }
    },
    data() {
        return {
            ...this.$store.state.phaser
        }
    }
}
</script>