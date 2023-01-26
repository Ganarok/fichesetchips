<template>
    <div class="inline-flex gap-x-4">
        <div
            v-for="(n, index) in size"
            :key="index"
        >
            <div
                class="h-5 w-5 bg-fc-yellow"
                :class="{ 'bg-fc-green': n <= completed }"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 1
        },
        completed: {
            type: Number,
            default: 1,
        },
    },
}
</script>
