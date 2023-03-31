<template>
    <SidebarLayout
        :title="story.title"
    >
        <button
            class="text-gray-600 hover:text-red-500"
            @click="showModal = true"
        >
            Supprimer
        </button>

        <div 
            v-if="loaded"
            class="relative"
        >
            <PDFViewer
                :pdf="pdf"
            />

            <div 
                class="absolute top-16 left-0 p-4 z-50"
            >
                <Button
                    :button-text="$t('Retour')"
                    class="px-6 py-2 transition duration-150 opacity-30 hover:opacity-100"
                    color="fc-green"
                    @click="() => $router.push('/user/stories')"
                />
            </div>

            <div 
                class="absolute top-32 left-0 p-4 z-50"
            >
                <Button
                    :button-text="$t('Supprimer')"
                    class="px-6 py-2 transition duration-150 opacity-30 hover:opacity-100"
                    color="fc-red"
                    @click="showModal = true"
                />
            </div>
        </div>

        <Modal
            v-show="showModal"
            @close-modal="showModal = false"
        >
            <div
                class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-fc-yellow-trans"
            >
                <div
                    class="bg-white h-1/3 w-1/3 flex flex-col justify-center items-center text-red-500 font-bold text-xl space-y-10"
                >
                    <div class="text-center">
                        <div>Voulez-vous vraiment supprimer ce scénario ?</div>
                        <div class="text-sm">
                            Attention, cette action est irreversible et toute vos donnée
                            serons perdues définitivement
                        </div>
                    </div>
                    <div class="flex justify-center items-center w-full space-x-16">
                        <button
                            class="bg-red-500 text-white h-[2.5em] p-1"
                            style="aspect-ratio: 1/1"
                            @click="deleteStory"
                        >
                            Oui
                        </button>
                        <button
                            class="bg-fc-green text-white h-[2.5em] p-1"
                            style="aspect-ratio: 1/1"
                            @click="showModal = false"
                        >
                            Non
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    </SidebarLayout>
</template>

<script>
import SidebarLayout from '@/layouts/Sidebar.vue'
import { mapState, mapActions, mapMutations } from "vuex"
import Button from "@/components/subComponent/Button.vue"
import PDFViewer from "@/components/subComponent/PDFViewer.vue"

export default {
    name: 'StoryDetails',
    components: {
        SidebarLayout,
        Button,
        PDFViewer
    },
    props: {
    },
    data () {
        return {
            showModal: false,
            story_id: "",
            loaded: false
        }
    },
    computed: {
        ...mapState("stories", {
            story: (state) => state.story,
        }),
    },
    methods: {
        ...mapActions({
            fetch_story: "stories/fetch_story",
            delete_story: "stories/delete_story",
        }),
        async deleteStory() {
            await this.delete_story(this.story_id)
            await this.$router.push('/user/stories')
        },
    },
    async mounted() {
        this.story_id = this.$route.params.id
        await this.fetch_story(this.story_id)
        this.loaded = true
    }
}
</script>