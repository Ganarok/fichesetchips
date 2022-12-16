<template>
    <div class="flex flex-col relative mx-5">
        <label v-if="label" for="">{{ label }}</label>
        <input
            class="w-full h-12 p-3 border placeholder-gray-700 shadow-inner outline-none placeholder-opacity-50"
            :placeholder="placeHolder"
            :maxlength="maxLength"
            :type="typeInput"
            :disabled="disabled"
            v-on:focusout="onFocusOut" />

        <div v-if="hasError" class="absolute right-0 bg-fc-red h-full w-[2%]" />
    </div>
</template>

<script>
export default {
    name: 'CustomInput',
    props: {
        label: {
            type: String,
        },
        placeHolder: { type: String },
        typeInput: {
            type: String,
            default: 'text',
        },
        inputClass: {},
        placeHolderClass: {},
        labelClass: {},
        maxLength: { type: Number },
        hasError: {
            type: Boolean,
            default: false,
        },
        onFocusOut: {
            type: Function,
            default: () => {},
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
}
</script>
