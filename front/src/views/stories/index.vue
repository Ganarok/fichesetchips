<template>
    <SidebarLayout
        title="Mes scénarios"
    >
        <div
            v-if="loading"
            class="flex items-center h-full justify-center"
        >
            <Loader />
        </div>

        <div 
            v-else
            class="flex flex-wrap gap-4 pl-6"
        >
            <router-link
                class="flex flex-col w-80 transition hoverStyle"
                :to="'/user/stories/create'"
            >
                <div class="flex items-center justify-around relative bg-fc-black h-48 p-4">
                    <div class="relative h-28 w-28">
                        <img
                            src="@/assets/icons/plus.svg"
                            alt="File"
                            class="object-contain"
                        />
                    </div>
                </div>

                <div class="flex flex-col space-y-3 p-2 bg-gray-50">
                    <p class="text-fc-green font-bold">
                        Créer
                    </p>

                    <p class="ml-6 text-fc-black-light">
                        Créer un scénario
                    </p>
                </div>
            </router-link>

            <Story
                v-for="(story, index) in stories"
                :key="index"
                :story="story"
                :index="index + 1"
            />
        </div>
    </SidebarLayout>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex"

import SidebarLayout from '@/layouts/Sidebar.vue'
import Loader from "@/components/Loader.vue"
import Story from '@/components/subComponent/Story.vue'

export default {
    name: 'Stories',
    components: {
        SidebarLayout,
        Loader,
        Story
    },
    data() {
        return {
            loading: true
        }
    },
    computed: {
        ...mapState("stories", {
            stories: (state) => state.stories,
        }),
    },
    methods: {
        ...mapActions({
            fetch_stories: "stories/fetch_stories",
        }),
        ...mapMutations({
            set_story: "stories/set_story"
        }),
    },
    async mounted() {
        await this.fetch_stories()

        this.loading = false
    },
}
</script>