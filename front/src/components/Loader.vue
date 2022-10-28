<template>
    <div
        :class="'flex items-center justify-center animate-spin bg-' + cubeColor"
        :style="{ width: `${size / 16}rem`, height: `${size / 16}rem` }">
        <div
            :class="
                'flex items-center justify-center animate-ping bg-' +
                miniCubeColor
            "
            :style="{
                width: `${(size / 16) * 0.4}rem`,
                height: `${(size / 16) * 0.4}rem`,
            }" />
        <!-- <div class="bg-fc-yellow" :style="{ 'width': `${(size / 16) * 0.1}rem`, 'height': `${(size / 16) * 0.1}rem` }" />
        </div> -->
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 50,
        },
        cubeColor: {
            type: String,
            default: 'fc-green',
        },
        miniCubeColor: {
            type: String,
            default: 'fc-black-light',
        },
    },
}
</script>
