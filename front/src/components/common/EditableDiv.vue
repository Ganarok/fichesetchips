<template>
    <div class="flex w-full">
        <label
            v-if="label"
            :for="value"
        >{{ label + ":" }}</label>
        <input
            v-show="isEditMode"
            ref="input"
            :value="value"
            class="flex p-2 px-1 placeholder-gray-700 shadow-inner outline-none placeholder-opacity-50"
            type="text"
            @keyup.enter="toggleEdit"
        >
        <div
            v-show="!isEditMode"
            :class="canEdit ? ' cursor-pointer ' : null"
            @click="toggleEdit"
        >
            {{ value }}
        </div>
    </div>
</template>

<script>
export default {
    name: "EditableDiv",
    props: {
        label: { type: String, default: '' },
        value: { type: String, default: '' },
        editMode: { type: Boolean, default: false },
        canEdit: { type: Boolean, default: false },
    },
    data() {
        return {
            edit: false,
        }
    },
    computed: {
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
