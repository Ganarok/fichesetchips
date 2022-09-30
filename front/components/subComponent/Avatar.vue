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
            class="rounded-full bg-fiche-green border-[0.4em] border-fc-black h-40 w-40 my-3"></div>
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

<!-- <Button buttonText="Exemple" color="fiche-green" v-on:click="test()" filled="chips-yellow" :image="require('../assets/icon.png')"/> -->
