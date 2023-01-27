<template>
    <div
        class="flex flex-col items-center max-w-xs max-h-[550px] border-2 border-fc-green p-2 hover:cursor-pointer"
    >
        <div
            class="flex items-center justify-between w-full bg-fc-green p-2 text-xl font-bold"
        >
            <p>
                {{ `${class_.french_name}` }}
            </p>
        </div>

        <div
            v-if="!image"
            class="relative bg-fc-yellow w-full my-2"
        >
            <img
                src="@/assets/dragon.svg"
                class="object-contain"
                :style="grayed ? 'filter: grayscale(1)' : null"
            >
        </div>

        <div
            v-else
            class="bg-fc-yellow h-80 w-full m-2"
        />

        <div class="w-full h-24 bg-fc-green p-2">
            <p
                class="text-sm text-ellipsis text-justify overflow-y-scroll pr-3 break-words h-3/4"
            >
                {{ class_.languages }}
            </p>

            <div
                class="flex flex-row items-center justify-end text-sm space-x-4 w-full h-1/4"
            >
                <p>
                    {{ class_.size }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        class_: {type: Object, default: new Object()},
        border: {type: String, default: ""},
        grayed: { type: Boolean, default: false }
    },
    data() {
        return {}
    },
    methods: {
        backgroundColor: function () {
            if (this.filled == undefined) {
                return ""
            } else {
                return " bg-" + this.color
            }
        },
        borderColor: function () {
            if (this.border == undefined) {
                return ""
            } else {
                return " bg-" + this.color
            }
        },
    }
}
</script>
