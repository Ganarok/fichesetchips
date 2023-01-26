<template>
    <button
        :class="`flex justify-center items-center border-4 ${
            backgroundColor ? 'bg-' + backgroundColor : 'bg-' + color
        } border-${color} ${
            rounded && 'rounded-full'
        } p-4 font-bold ${textColor} select-none hover:opacity-80 ${customClass}`"
        @click="callback($event)"
    >
        {{ buttonText }}
        <img
            v-if="image !== undefined"
            :src="image"
            class="w-8 h-8 ml-[5px]"
        >
    </button>
</template>

<script>
export default {
    props: {
        buttonText: String,
        color: {
            type: String,
            default: "fc-green",
        },
        backgroundColor: {
            type: String,
            default: "",
        },
        textColor: {
            type: String,
            default: "text-white",
        },
        rounded: {
            type: Boolean,
            default: true,
        },
        customClass: {
            type: String,
            default: "",
        },
        image: String,
    },
    methods: {
        callback: function (e) {
            this.$emit("click", e)
        },
    },
}
</script>

<style></style>
