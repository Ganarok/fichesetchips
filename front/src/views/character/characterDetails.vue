<template>
    <div>
        {{ character }}
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
    name: "CharacterDetails",
    data() {
        return {
        }
    },
    computed: {
        ...mapState("characters", {
            character: (state) => state.character,
        }),
    },
    async mounted() {
        const { id } = this.$route.params
        await this.fetch_character(id)
    },
    methods: {
        ...mapActions({
            fetch_character: "characters/fetch_character",
        }),}}
</script>