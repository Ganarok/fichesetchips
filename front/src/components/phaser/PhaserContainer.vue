<template>
    <div :id="containerId" />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

let gameInstance = null
const containerId = 'game-container'
const mapmaker = await import(/* webpackChunkName: "mapmaker" */ '@/phaser/mapmaker')

// window.addEventListener('resize', () => {
//     gameInstance.scale.resize(window.innerWidth, window.innerHeight);
// })

onMounted(() => {
    gameInstance = mapmaker.launch(containerId)
})

onUnmounted(() => {
    gameInstance.destroy(false)
})

</script>
