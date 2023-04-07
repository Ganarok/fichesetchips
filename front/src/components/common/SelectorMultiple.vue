<template>
    <div
        ref="openedBox"
        v-click-outside="closeSelector"
        :class="selectorClass"
        @click="switchOpened()"
    >
        <div 
            v-if="selectedItem.length"
            class="flex space-x-2 p-2"
        >
            <div :class="selectedItem.length > 1 ? 'grid grid-cols-2 gap-4' : ''">
                <div
                    v-for="item in selectedItem"
                    :key="item.value"
                    class="text-xs bg-fc-black self-center text-center truncate text-fc-green p-1 px-2 font-bold"
                    :style="{
                        maxWidth: '80px'
                    }"
                >
                    {{ item }}
                </div>
            </div>

            <div :class="imageClass">
                <img
                    v-if="image !== undefined"
                    :class="
                        isOpened
                            ? 'transition duration-250 rotate-180'
                            : 'transition duration-250'
                    "
                    :src="image"
                >
            </div>
        </div>

        <div 
            v-else
            class="flex space-x-2 p-2"
        >
            <p class="text-fc-black">
                Sélectionner
            </p>

            <div :class="imageClass">
                <img
                    v-if="image !== undefined"
                    :class="
                        isOpened
                            ? 'transition duration-250 rotate-180'
                            : 'transition duration-250'
                    "
                    :src="image"
                >
            </div>
        </div>

        <div
            v-if="isOpened"
            id="openedBox"
            class="absolute w-36 z-50"
            :style="openedStyles"
        >
            <option
                v-for="(item, index) in items"
                :key="index"
                :class="
                    item.name === selectedItem
                        ? optionClass + ' text-fc-green'
                        : optionClass + ' text-white'
                "
                @click="
                    () => {
                        selectedItem.push(item?.name ? item?.name : item.value)
                        onSelectItem(item?.value);
                    }
                "
            >
                {{ item?.name || item.value }}
            </option>

            <img
                class="absolute -bottom-6 -right-6 rotate-180 h-12 scale-x-[-1]"
                src="@/assets/cornerPixels.svg"
            >
        </div>
    </div>
</template>

<script>

export default {
    name: 'SelectorMultiple',
    props: {
        items: {
            type: [Object, Array],
            default() { return {} }
        },
        onSelectItem: {
            type: Function,
            default: () => {},
        },
        defaultSelectedItem: {
            type: Object,
            default() {
                return {}
            },
        },
        image: {
            type: String,
            default: require("@/assets/selector_black.svg"),
        },
        selectorClass: {
            type: String,
            default: "flex flex-col relative text-white cursor-pointer select-none",
        },
        optionClass: {
            type: String,
            default:
                "hover:font-bold relative px-4 py-2 bg-fc-black-light hover:bg-fc-black",
        },
        imageClass: {
            type: String,
            default: "self-end pb-1",
        },
        opened: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isOpened: this.opened,
            selectedItem: [],
            openedStyles: {}
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.handleHeight()
        })
    },
    methods: {
        switchOpened() {
            this.isOpened = !this.isOpened
        },
        closeSelector() {
            this.isOpened = false
        },
        handleFocus() {
            console.log("focus")
        },
        handleFocusOut() {
            console.log("focus out")

            this.isOpened = false
        },
        handleHeight() {
            this.openedStyles.marginTop = this.$refs.openedBox.clientHeight + 'px'
        }
    }
}
</script>
