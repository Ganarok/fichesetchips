<template>
    <div
        name="MapEditor"
    >
        <Topbar />

        <div class="absolute right-4 my-4 z-50 p-2 bg-fc-black-light">
            <div class="flex flex-col space-y-2">
                <div class="h-8 w-8 border-fc-green border-2" />

                <img
                    src="@/phaser/assets/layer.svg"
                    class="h-8 w-8 transition ease-in-out hover:scale-110 hover:opacity-80 hover:cursor-pointer"
                    alt="ChangeLayer"
                    @click="() => this.updateSelectedLayer()"
                />
            </div>
        </div>

        <div class="absolute z-50 m-4">
            <div class="flex flex-col space-y-4 p-4 font-bold text-fc-green text-center transition bg-fc-black-light opacity-50 hover:opacity-100">
                <p>
                    Layer selectionné :<br>
                    <p class="text-fc-yellow">
                        {{ layers[selectedLayer].name }}
                    </p>    
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
import Topbar from '@/components/phaser/Topbar.vue'
import Layers from '@/components/phaser/Layers.vue'
// TODO: Ajouter le onclick pour changer le layer sélectionné enregistré dans le store
export default {
    name: 'MapEditor',
    props: {},
    components: { Topbar, Layers },
    methods: {
        updateSelectedLayer() {
            const newValue = this.selectedLayer < (this.layers.length - 1) ? 
                this.selectedLayer + 1
                : 0
            
            this.$store.commit('updateState', {
                property: 'selectedLayer',
                newState: 0
            })
        }
    },
    data() {
        return {
            ...this.$store.state.phaser
        }
    },
}
</script>
