<template>
    <div
        :class="selectorClass"
        @click="switchOpened()"
        v-click-outside="closeSelector">
        <div class="flex">
            <option class="font-bold" default>{{ selectedItem }}</option>

            <div :class="imageClass">
                <img
                    v-if="image !== undefined"
                    :class="
                        isOpened
                            ? 'transition duration-250 rotate-180'
                            : 'transition duration-250'
                    "
                    :src="image" />
            </div>
        </div>

        <div v-if="isOpened" class="absolute pt-[20%] top-4 w-32">
            <option
                v-for="(item, index) in computedItems"
                @click="
                    (v) => {
                        selectedItem = v.target.value
                        onSelectItem(v.target.value)
                    }
                "
                :class="
                    item === selectedItem
                        ? optionClass + ' text-fc-green'
                        : optionClass
                "
                :key="index">
                {{ item }}
            </option>

            <img
                class="absolute -bottom-6 -right-6 rotate-180 h-12 scale-x-[-1]"
                src="@/assets/cornerPixels.svg" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: [Array, Object],
            default: [],
        },
        onSelectItem: {
            type: Function,
            default: () => {},
        },
        defaultSelectedItem: {
            type: String,
            default: 'Selectionner',
        },
        image: {
            type: String,
            default: require('@/assets/selector.svg'),
        },
        selectorClass: {
            type: String,
            default:
                'flex flex-col relative text-white cursor-pointer select-none',
        },
        optionClass: {
            type: String,
            default:
                'hover:font-bold relative px-4 py-2 bg-fc-black-light hover:bg-fc-black',
        },
        imageClass: {
            type: String,
            default: 'self-end pb-1',
        },
        opened: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            computedItems: { default: this.defaultSelectedItem, ...this.items },
            isOpened: this.opened,
            selectedItem: this.defaultSelectedItem,
        }
    },
    methods: {
        switchOpened() {
            this.isOpened = !this.isOpened
        },
        closeSelector(value) {
            this.isOpened = false
        },
        handleFocus() {
            console.log('focus')
        },
        handleFocusOut() {
            console.log('focus out')

            this.isOpened = false
        },
    },
}
</script>
