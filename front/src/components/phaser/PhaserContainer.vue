<template>
    <div :id="containerId" />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

let gameInstance = null
const containerId = 'game-container'
const game = await import(/* webpackChunkName: "game" */ '@/phaser/game')

window.addEventListener('resize', () => {
    gameInstance.scale.resize(window.innerWidth, window.innerHeight);
})

onMounted(() => {
    gameInstance = game.launch(containerId)
})

onUnmounted(() => {
    gameInstance.destroy(false)
})

</script>
