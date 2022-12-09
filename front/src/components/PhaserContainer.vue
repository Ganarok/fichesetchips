<template>
    <MapEditorLayout>
        <div :id="containerId" />
    </MapEditorLayout>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

let gameInstance = null
const containerId = 'game-container'
const game = await import(/* webpackChunkName: "game" */ '@/phaser/game')
const MapEditorLayout = await import('@/layouts/MapEditor.vue')

onMounted(() => {
    gameInstance = game.launch(containerId)
})

onUnmounted(() => {
    gameInstance.destroy(false)
})

</script>
