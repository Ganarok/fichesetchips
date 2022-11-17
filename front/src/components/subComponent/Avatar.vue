<template>
    <div class="flex flex-col items-center">
        <h1
            v-if="!nick_under"
            :class="
                'text-' + nick_size + ' ' + (nick_bold ? 'font-bold' : null)
            ">
            {{ nickname }}
        </h1>
        <div
            class="rounded-full bg-fc-green border-[0.4em] md:border-[0.3em] border-fc-black md:h-36 sm:h-20 my-3"
            style="aspect-ratio: 1/1;" :style="grayed ? 'filter: grayscale(1)' : null"></div>
        <h1
            v-if="nick_under"
            :class="
                'text-' + nick_size + ' ' + (nick_bold ? 'font-bold' : null)
            ">
            {{ nickname }}
        </h1>
    </div>
</template>

<script>
export default {
    props: {
        background: String,
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
        backgroundColor: function () {
            if (this.filled == undefined) {
                return ''
            } else {
                return ' bg-' + this.color
            }
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

<!-- <Button buttonText="Exemple" color="fiche-green" v-on:click="test()" filled="fc-yellow" :image="require('../assets/icon.png')"/> -->
