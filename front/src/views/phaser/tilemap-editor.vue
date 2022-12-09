<script setup>
import PhaserContainer from "@/components/PhaserContainer"
import Loader from "@/components/Loader.vue"
</script>

<template>
    <Suspense>
        <PhaserContainer />

        <template #fallback>
            <div class="flex h-screen w-screen justify-center items-center">
                <Loader />
            </div>
        </template>
    </Suspense>
</template>

<script>
    export default {
        name: "tilemapEditor",
    }
</script>
