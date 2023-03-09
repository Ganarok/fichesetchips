<template>
    <SidebarLayout>
        <div 
            v-if="loading"
            class="flex w-full h-full items-center justify-center"
        >
            <Loader />
        </div>

        <div
            v-else
            class="flex flex-col"
        >
            <!-- TODO: afficher le character -->
            {{ character }}
        </div>
    </SidebarLayout>
</template>

<script>
import { mapState, mapActions } from "vuex"

import Loader from "@/components/Loader.vue"
import SidebarLayout from "@/layouts/Sidebar.vue"

export default {
    name: "CharacterDetails",
    components: {
        Loader,
        SidebarLayout
    },
    data() {
        return {
            loading: true
        }
    },
    computed: {
        ...mapState("characters", {
            character: (state) => state.character,
        }),
    },
    async mounted() {
        const { id } = this.$route.params

        try {
            await this.fetch_character(id)
        } catch (error) {
            console.log(error);
        } finally {
            this.loading = false
        }
    },
    methods: {
        ...mapActions({
            fetch_character: "characters/fetch_character",
        }),
    }
}
</script>