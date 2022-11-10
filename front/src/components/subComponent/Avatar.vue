<template>
    <div class="flex flex-col items-center font-bold space-y-4">
        <h1
            v-if="!username_under"
        >
            {{ username }}
        </h1>
        <div
            class="rounded-full bg-fc-green border-[0.2em] md:border-[0.3em] border-fc-black h-32 my-3"
            style="aspect-ratio: 1/1;" :style="grayed ? 'filter: grayscale(1)' : null"></div>
        <h1
            v-if="username_under"
        >
            {{ username }}
        </h1>
    </div>
</template>

<script>
export default {
    props: {
        border: String,
        nickname: { type: String, default: null },
        nick_under: Boolean,
        nick_size: { type: String, default: '2xl' },
        nick_bold: Boolean,
        grayed: Boolean,
    },
    methods: {
        callback: function (e) {
            this.$emit('click', e)
        },
        borderColor: function () {
            if (this.border == undefined) {
                return ''
            } else {
                return ' bg-' + this.color
            }
        },
    },
}
</script>
