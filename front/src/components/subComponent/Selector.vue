<template>
    <div
        v-click-outside="closeSelector"
        :class="selectorClass"
        @click="switchOpened()"
        ref="openedBox"
    >
        <div class="flex space-x-2 p-2">
            <option
                class="font-bold"
                default
            >
                {{ selectedItem }}
            </option>

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
                v-for="(item, index) in computedItems"
                :key="index"
                :class="
                    item === selectedItem
                        ? optionClass + ' text-fc-green'
                        : optionClass + ' text-white'
                "
                @click="
                    () => {
                        selectedItem = item?.name
                        onSelectItem(item?.value);
                    }
                "
            >
                {{ item?.name }}
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
                return {
                    name: "Selectionner",
                    value: null
                }
            },
        },
        image: {
            type: String,
            default: require("@/assets/selector.svg"),
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
        console.log(this.defaultSelectedItem);
        const test = [ this.defaultSelectedItem, ...this.items ]


        return {
            computedItems: test,
            isOpened: this.opened,
            selectedItem: this.defaultSelectedItem.name,
            openedStyles: {}
        }
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
            this.openedStyles.marginTop = this.$refs.openedBox.clientHeight + 'px';

            console.log(this.$refs.openedBox.clientHeight + 'px');
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.handleHeight()
        })
    }
}
</script>
