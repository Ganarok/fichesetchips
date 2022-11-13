<template>
    <div class="flex w-full">
        <label v-if="label" :for="value">{{ label + ':' }}</label>
        <input
            ref="input"
            :name="value"
            v-model="newValue"
            v-show="isEditMode"
            class="flex flex-grow h-[1.4em] placeholder-gray-700 shadow-inner outline-none placeholder-opacity-50"
            :placeholder="displayValue"
            :type="password ? 'password' : 'text'"
            @keyup.enter="toggleEdit"
            @input="onInput()" />
        <div
            @click="toggleEdit"
            class="ml-1"
            :class="canEdit ? ' cursor-pointer' : null"
            v-show="!isEditMode">
            {{ displayValue }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditableDiv',
    props: {
        label: { type: String },
        value: { type: String },
        password: { type: Boolean },
        editMode: { type: Boolean },
        canEdit: { type: Boolean },
        inputClass: {},
        placeHolderClass: {},
        labelClass: {},
    },
    data() {
        return {
            edit: false,
            newValue: null,
        }
    },
    methods: {
        toggleEdit() {
            if (this.canEdit) {
                this.edit = !this.edit
                if (this.edit) this.$refs.input.focus()
            }
        },
        onInput() {
            this.$emit('input', this.newValue)
        },
    },
    computed: {
        displayValue() {
            if (this.password) return '*********'
            else return this.newValue || this.value
        },
        isEditMode() {
            return this.editMode || this.edit
        },
    },
}
</script>
