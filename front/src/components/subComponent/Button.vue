<template>
    <button
        :class="`flex justify-center border-4 border-${this.color} ${this.filled && 'bg-' + this.color} rounded-full p-4 font-barlow font-bold text-white select-none hover:opacity-80`"
        @click="callback($event)">
        {{ buttonText }}
        <img
            v-if="image !== undefined"
            :src="image"
            class="w-8 h-8 ml-[5px]" />
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
        filled: {
            type: [ String, Boolean ],
            default: true
        },
        image: String,
    },
    methods: {
        callback: function (e) {
            this.$emit('click', e)
        },
        backgroundColor() {
            const base = 'border-'
            if (!this.filled) {
                return base + this.color
            } else {
                console.log(`${base}${this.color} bg-${this.color}`);
                return `${base}${this.color} bg-${this.color}`
            }
        },
    },
    mounted() {
        const classes = {
                'fc-green': '#4FEA74',
                'fc-yellow': '#FFDB57',
                'fc-yellow-trans': '#FFDB57b3',
                'fc-black': '#1E1E1E',
                'fc-black-light': '#353535',
                'fc-red': '#F04E4E',
            }

        console.log(Object.keys(classes));
    }
}
</script>

<style>

</style>
