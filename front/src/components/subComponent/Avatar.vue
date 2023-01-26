<template>
    <div class="flex flex-col items-center font-bold space-y-4">
        <h1 v-if="!username_under">
            {{ username }}
        </h1>

        <div class="relative">
            <img
                src="../../assets/avatar/character.png"
                class="object-contain rounded-full bg-fc-green border-8 border-fc-black"
                :style="grayed ? 'filter: grayscale(1)' : null"
            >
        </div>

        <h1 v-if="username_under">
            {{ username }}
        </h1>
    </div>
</template>

<script>
export default {
    props: {
        border: String,
        username: { type: String, default: null },
        username_under: Boolean,
        grayed: Boolean,
    },
    methods: {
        callback: function (e) {
            this.$emit("click", e)
        },
        borderColor: function () {
            if (this.border == undefined) {
                return ""
            } else {
                return " bg-" + this.color
            }
        },
    },
}
</script>
