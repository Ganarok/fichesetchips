
<template>
    <MapEditorLayout>
        <Suspense>
            <PhaserContainer />
            
            <template #fallback>
                <div class="flex h-screen w-screen justify-center items-center">
                    <Loader />
                </div>
            </template>
        </Suspense>
    </MapEditorLayout>
</template>

<script setup>
import PhaserContainer from "@/components/phaser/PhaserContainer"
import Loader from "@/components/Loader.vue"
import MapEditorLayout from "@/layouts/MapEditor.vue"

</script>

<script>
    export default {
        name: "tilemapEditor",
    }
</script>
