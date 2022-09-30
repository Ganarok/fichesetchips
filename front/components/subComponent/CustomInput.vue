<template>
    <div class="flex flex-col m-5">
        <label v-if="label" for="">{{ label }}</label>
        <input
            class="w-full h-12 p-3 border placeholder-gray-700 shadow-inner outline-none placeholder-opacity-50"
            :placeholder="placeHolder"
            @input="$emit('input', $event.target.value)"
            :maxlength="maxLength"
            :type="typeInput" />
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
    },
}
</script>
