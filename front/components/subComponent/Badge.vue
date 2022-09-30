<template>
    <div
        class="rounded-full bg-fiche-green border-[0.2em] border-fc-black h-16 w-16">
        <div
            class="relative left-9 bottom-1 rounded-full border-[0.15em] border-white h-6 w-6 cursor-pointer"
            :class="displayFav ? 'bg-white' : null"
            @click="localFav = !localFav"></div>
    </div>
</template>

<script>
export default {
    data() {
        return { localFav: false }
    },
    props: {
        background: String,
        border: String,
        size: String,
        canFav: Boolean,
        isFav: { type: Boolean, default: null },
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
    computed: {
        displayFav: function () {
            if (this.isFav === null) return this.localFav
            else return this.isFav
        },
    },
}
</script>

<!-- <Button buttonText="Exemple" color="fiche-green" v-on:click="test()" filled="chips-yellow" :image="require('../assets/icon.png')"/> -->
