<template>
    <div class="inline-flex gap-x-4">
        <div
            v-for="(n, index) in size"
            :key="index"
        >
            <div
                class="h-5 w-5"
                :class=" n <= completed ? 'bg-fc-green' : 'bg-fc-yellow'"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        size: {
            type: Number,
            default: 1
        },
    },
    computed: {
        ...mapState('characters', {
            completed: state => state.completed,
        })
    }
}
</script>
