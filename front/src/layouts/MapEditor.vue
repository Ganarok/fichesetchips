<template>
    <div
        name="MapEditor"
    >
        <Topbar />

        <slot />
    </div>
</template>

<script>
import Topbar from '@/components/phaser/Topbar.vue'

export default {
    name: 'MapEditor',
    props: {},
    components: { Topbar },
}
</script>
