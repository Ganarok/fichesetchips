<template>
    <div
        class="flex px-2 py-1 bg-fc-black-light text-xs hover:cursor-pointer hover:opacity-80 hover:scale-105"
        :class="isSelected ? 'text-fc-yellow' : 'text-fc-green'"
    >
        <p>
            {{ layer.name || `Layer ${index}` }}
        </p>
    </div>
</template>

<script>
export default {
    name: "Layer",
    props: {
        layer: {
            type: Object,
            default() {}
        },
        isSelected: { type: Boolean, default: false },
        index: { type: Number, default: 0 },
    },
}
</script>
