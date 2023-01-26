<template>
    <div class="flex w-full">
        <label
            v-if="label"
            :for="value"
        >{{ label + ":" }}</label>
        <input
            v-show="isEditMode"
            ref="input"
            v-model="newValue"
            :name="value"
            class="flex flex-grow h-[1.4em] placeholder-gray-700 shadow-inner outline-none placeholder-opacity-50"
            :placeholder="displayValue"
            :type="password ? 'password' : 'text'"
            @keyup.enter="toggleEdit"
        >
        <div
            v-show="!isEditMode"
            :class="canEdit ? ' cursor-pointer' : null"
            @click="toggleEdit"
        >
            {{ displayValue }}
        </div>
    </div>
</template>

<script>
export default {
    name: "EditableDiv",
    props: {
        label: { type: String, default: '' },
        modelValue: { type: String, default: '' },
        password: { type: Boolean, default: false },
        editMode: { type: Boolean, default: false },
        canEdit: { type: Boolean, default: false },
    },
    data() {
        return {
            edit: false,
            newValue: null,
        }
    },
    computed: {
        displayValue() {
            if (this.password) return "*********"
            else return this.newValue || this.value || this.modelValue
        },
        isEditMode() {
            return this.editMode || this.edit
        },
    },
    methods: {
        toggleEdit() {
            if (this.canEdit) {
                this.edit = !this.edit
                if (this.edit) this.$refs.input.focus()
            }
        },
    },
}
</script>
