<template>
    <button
        class="border-[3px] rounded-full p-[2%] w-full font-barlow font-bold flex justify-center opacity-100 text-white hover:opacity-80"
        :class="'border-' + color + backgroundColor()"
        @click="callback($event)">
        {{ buttonText }}
        <img
            v-if="image != undefined"
            :src="image"
            class="w-[30px] h-[30px] ml-[5px]" />
    </button>
</template>

<script>
export default {
    props: {
        buttonText: String,
        color: {
            type: String,
            default: 'fc-green',
        },
        filled: String,
        image: String,
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
    },
}
</script>
