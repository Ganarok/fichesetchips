<template>
    <div
        :class="
            'relative rounded-full bg-fc-green border-[0.2em] border-fc-black ' +
            badgeSize.badge
        "
        style="aspect-ratio: 1/1">

      <div class="absolute flex items-center justify-center rounded-full left-0 w-full h-full overflow-hidden">
        <img class="h-2/3" src="../../assets/icons/star.svg" alt="Etoile">
      </div>
        <div class="absolute rounded-full left-0 w-full h-full overflow-hidden">
            <div
                :style="{'backdrop-filter': 'grayscale(1)', height: (100 - completion).toString() + '%',}" />
        </div>

        <div
            v-if="canFav"
            :class="(displayFav ? 'bg-fc-yellow ' : 'bg-white ' ) + 'relative bottom-1 rounded-full border-[0.15em] border-fc-yellow cursor-pointer ' + badgeSize.favButton"
            style="aspect-ratio: 1/1"
            @click="handleFav" />
    </div>
</template>

<script>
export default {
    data() {
        return { localFav: false }
    },
    props: {
        background: {type:String, default: '../../assets/icons/star.svg'},
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
                    return {badge:'h-10 md:h-10',favButton:'h-4 left-6'}
                case 'm':
                    return {badge:'h-10 md:h-10',favButton:'h-4 left-6'}
                case 'l':
                    return {badge:'h-4/5',favButton:'h-4 left-6'}
                default:
                    return null
            }
        },
    },
}
</script>
