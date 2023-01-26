<template>
    <button
        :class="`flex justify-center items-center border-4 ${
            backgroundColor ? 'bg-' + backgroundColor : 'bg-' + color
        } border-${color} ${
            rounded && 'rounded-full'
        } p-4 font-bold ${textColor} select-none hover:opacity-80 ${customClass}`"
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
        buttonText: {
            type: String,
            default: ''
        },
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
        image: {
            type: String,
            default: ''
        },
    },
}
</script>

<style></style>
