<template>
    <div
        name="MapEditor"
    >
        <Topbar />

        <div class="absolute right-4 my-4 z-50 p-2 rounded-xl bg-fc-black-light">
            <div class="h-8 w-8 border-fc-red border-2" />
        </div>

        <div class="absolute z-50 m-4">
            <div class="flex flex-col space-y-4 p-4 font-bold rounded-xl text-fc-green transition bg-fc-black-light opacity-50 hover:opacity-100">
                <div class="flex flex-col p-2 rounded-xl bg-fc-black">
                    <p>Tiles disponibles</p>
                </div>

                <div class="flex flex-col p-2 rounded-xl bg-fc-black">
                    <p>Items disponibles</p>
                </div>
            </div>
        </div>

        <slot />

    </div>
</template>

<script>
import Topbar from '@/components/phaser/Topbar.vue'

export default {
    name: 'MapEditor',
    props: {},
    components: { Topbar },
    data() {
        return {
            ...this.$store.state.phaser
        }
    },
}
</script>
