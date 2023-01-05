<template>
    <div
        class="flex relative w-full px-4 items-center text-white font-bold select-none bg-fc-black border-t border-fc-green transition duration-250 ease-in-out z-50"
        :class="isOpened
            ? 'h-12'
            : 'h-1'
        "
    >
        <div
            v-if="layers && layers.length > 0"
            class="absolute w-full -top-6 left-0 z-0"
        >
            <div class="flex w-full space-x-4">
                <div
                    class="flex items-center justify-center bg-fc-black-light p-2"
                    @click="() => this.isOpened = !isOpened"
                >
                    <img
                        src="@/assets/selector.svg"
                        class="object-contain"
                        alt="Arrow"
                        :class="
                        isOpened
                            ? 'transition duration-250'
                            : 'transition duration-250 rotate-180'
                        "
                    />
                </div>

                <Layer
                    v-for="(layer, index) in layers"
                    :layer="layer"
                    :index="index"
                    :isSelected="selectedLayer === index"
                    @click="this.updateLayer(index)"
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

            this.selectedLayer = index
        }
    },
    data() {
        return {
            ...this.$store.state.phaser,
            isOpened: true
        }
    }
}
</script>