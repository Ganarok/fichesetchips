<template>
    <div class="flex items-center space-x-2">
        <p :class="inputTextClass">
            {{ inputText }}
        </p>

        <input
            :type="inputType"
            :value="inputValue"
            v-on:focusout="onValueChanged"
            :class="defaultInputClass"
            max="20"
            min="0" />
    </div>
</template>

<script>
export default {
    props: {
        inputText: {
            type: String,
            default: '',
        },
        inputTextClass: {
            type: String,
            default: 'text-white text-xs font-bold lg:text-sm',
        },
        inputType: {
            type: String,
            default: 'checkbox',
        },
        inputClass: {
            type: String,
            default: 'select-none text-fc-black font-bold',
        },
        onValueChanged: {
            type: Function,
            default: () => {},
        },
        inputValue: {
            type: [String, Number, Boolean],
            default: '',
        },
    },
    methods: {
        getDefaultValue() {
            switch (this.inputType) {
                case 'checkbox':
                    return false

                case 'number':
                    return 0

                default:
                    return false
            }
        },
    },
    beforeMount() {
        switch (this.inputType) {
            case 'checkbox':
                this.defaultInputClass = ` ${this.inputClass}`
                break

            case 'number':
                this.defaultInputClass = ` ${this.inputClass}`
                break

            default:
                break
        }
    },
    data() {
        return {
            defaultInputClass: '',
        }
    },
}
</script>
