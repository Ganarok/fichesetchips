<template>
    <div
        :class="
            'relative rounded-full bg-fiche-green border-[0.2em] border-fc-black overflow-hidden ' +
            badgeSize
        "
        style="aspect-ratio: 1/1">
        <div
            :class="'absolute left-0 w-full'"
            :style="{
                'backdrop-filter': 'grayscale(1)',
                height: (100 - completion).toString() + '%',
            }" />
        <div
            v-if="canFav"
            class="relative left-9 md:left-6 bottom-1 rounded-full border-[0.15em] border-chips-yellow h-4 cursor-pointer"
            style="aspect-ratio: 1/1"
            :class="displayFav ? 'bg-chips-yellow' : 'bg-white'"
            @click="handleFav"></div>
    </div>
</template>

<script>
import { numberLiteralTypeAnnotation } from '@babel/types'

export default {
    data() {
        return { localFav: false }
    },
    props: {
        background: String,
        border: String,
        size: { type: String, default: null },
        canFav: Boolean,
        isFav: { type: Boolean, default: null },
        completion: { type: Number, default: 0 },
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
        handleFav() {
            this.localFav = !this.localFav
            this.$emit('favorite', this.displayFav)
        },
    },
    computed: {
        displayFav: function () {
            if (this.isFav === null) return this.localFav
            else return this.isFav
        },
        badgeSize() {
            switch (this.size) {
                case 's':
                    return 'h-16 md:h-10'
                    break
                case 'm':
                    return 'h-16 md:h-10'
                    break
                case 'l':
                    return 'h-4/5'
                    break
                default:
                    return null
                    break
            }
        },
    },
}
</script>

<!-- <Button buttonText="Exemple" color="fiche-green" v-on:click="test()" filled="chips-yellow" :image="require('../assets/icon.png')"/> -->
