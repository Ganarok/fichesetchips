<template>
    <div class="flex">
        <h3 class="font-bold mr-2">
            {{ name }}
        </h3>
        <p>
            {{ value }}
        </p>
    </div>
</template>

<script>
export default {
    name: "ParamétrageDiv",
    components: {
    },
    props: {
        name: {
            type: String,
            default: ""
        },
        value: {
            type: String,
            default: ""
        }
    }
}
</script>