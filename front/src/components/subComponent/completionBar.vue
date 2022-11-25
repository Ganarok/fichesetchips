<template>
    <div class='inline-flex gap-x-4'>
        <div v-for="n in size">
            <div class="h-[20px] w-[20px] bg-fc-yellow" :class="{'bg-fc-green': n<= completed}"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        size: Number,
        completed: {
            type: Number,
            default: 1,
        },
    },
}
</script>

<style>
.test {

}
</style>