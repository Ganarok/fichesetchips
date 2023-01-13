<template>
    <div class="flex items-center space-x-2">
        <p :class="inputTextClass">
            {{ inputText }}
        </p>

        <input
            :type="inputType"
            :value="inputValue"
            :placeholder="placeholder"
            :class="defaultInputClass"
            :max="max"
            :min="min"
            @focusout="onValueChanged" />
    </div>
</template>

<script>
export default {
    props: {
        inputText: {
            type: String,
            default: '',
        },
        placeholder: {
            type: [ String, Number ],
            default: ''
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
            default: 'select-none font-bold',
        },
        onValueChanged: {
            type: Function,
            default: () => {},
        },
        inputValue: {
            type: [ String, Number, Boolean ],
            default: '',
        },
        max: {
            type: [ String, Number ],
            default: 10
        },
        min: {
            type: [ String, Number ],
            default: 0
        }
    },
    data() {
        return {
            defaultInputClass: '',
        }
    },
    beforeMount() {
        switch (this.inputType) {
            case 'checkbox':
                this.defaultInputClass = ` ${this.inputClass}`
                break

            case 'number':
                this.defaultInputClass = ` text-center text-fc-yellow bg-fc-black-light p-2 placeholder:text-fc-yellow-trans ${this.inputClass}`
                break

            default:
                break
        }
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
}
</script>
