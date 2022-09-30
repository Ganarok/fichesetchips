<template>
    <div class="flex w-full">
        <label v-if="label" :for="value">{{ label + ':' }}</label>
        <input
            ref="input"
            :name="value"
            v-model="newValue"
            v-show="edit"
            class="flex flex-grow ml-1 h-[1.4em] border placeholder-gray-700 shadow-inner outline-none placeholder-opacity-50"
            :placeholder="displayValue"
            :type="password ? 'password' : 'text'"
            @keyup.enter="toggleEdit" />
        <div @click="toggleEdit" class="ml-1" v-show="!edit">
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
            this.edit = !this.edit
            if (this.edit) this.$refs.input.focus()
        },
    },
    computed: {
        displayValue() {
            if (this.password) return '*********'
            else return this.newValue || this.value
        },
    },
}
</script>
