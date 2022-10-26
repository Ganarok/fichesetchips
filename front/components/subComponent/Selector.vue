<template>
    <div :class="selectorClass" @click="() => this.switchOpened()">
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

        <div
            v-if="isOpened"
            class="absolute pt-[20%] top-0 w-full"
            tabindex="0">
            <option
                v-for="(item, index) in computedItems"
                @click="
                    (v) => {
                        selectedItem = v.target.value
                        onSelectItem(v.target.value)
                    }
                "
                :class="optionClass"
                :key="index">
                <p class="z-10">
                    {{ item }}
                </p>
            </option>

            <img
                class="absolute bottom-0 right-0 rotate-180 h-12 scale-x-[-1] opacity-60"
                src="@/assets/topRightPixels.svg" />
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
                'flex flex-col relative text-white cursor-pointer select-none w-32',
        },
        optionClass: {
            type: String,
            default:
                'hover:font-bold relative px-4 py-2 bg-fc-black hover:bg-fc-black-light',
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
            computedItems: { default: 'Selectionner', ...this.items },
            isOpened: this.opened,
            selectedItem: this.defaultSelectedItem,
        }
    },
    methods: {
        switchOpened() {
            this.isOpened = !this.isOpened
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
