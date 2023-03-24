<template>
    <SidebarLayout
        title="Mes Scénarios"
    >
        <div class="flex flex-row items-center pl-6 space-x-6">
            <div 
                v-if="!stories.length"
                class=""
            >
                <p class="text-xl font-bold">
                    Vous n'avez pas encore de scénarios
                </p>
            </div>
            <div v-else>
                <div
                    v-for="(story, index) in stories"
                    :key="index"
                    :story="story"
                >
                    <Story
                        :story="story"
                        :index="index + 1"
                    ></Story>
                </div>
            </div>
            <router-link
                to="/user/stories/create"
                class="font-bold undeline p-2 px-4 bg-fc-green hover:opacity-80"
            >
                Créer un scénario
            </router-link>
        </div>
    </SidebarLayout>
</template>

<script>
import SidebarLayout from '@/layouts/Sidebar.vue'
import { mapState, mapActions, mapMutations } from "vuex"
import Story from '@/components/subComponent/Story.vue'


export default {
    name: 'Stories',
    components: {
        SidebarLayout,
        Story
    },
    data() {
        return {}
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
    },
}
</script>