<template>
    <SidebarLayout 
        :title="'Import de scénario'"
    >
        <div class="flex flex-row items-center pl-6 space-x-6">
            <div
                class=""
            >
                <p>Importez votre fichier ici : </p>
                <input
                    type="file"
                    @change="onFileChange"
                >
                <p>Et choisissez un titre !</p>
                <input
                    type="text" 
                    :value="title"
                    placeholder="Titre..."
                    @input="(v) => (title = v.target.value)"
                >
                <Button button-text="Importer" @click="uploadFile">
                </Button>
            </div>
        </div>
    </SidebarLayout>
</template>

<script>
import { mapState, mapActions } from "vuex"
import ParamInput from "@/components/subComponent/ParamInput.vue"
import Button from "@/components/subComponent/Button.vue"
import { useToast } from "vue-toastification"

import SidebarLayout from '@/layouts/Sidebar.vue'

export default {
    name: "StoryCreate",
    components: {
        SidebarLayout,
        ParamInput,
        Button,
    },
    props: {
    },
    data() {
        return {
            file: null,
            title: ""
        }
    },
    computed: {
    },
    async mounted() {
    },
    methods: {
        ...mapActions({
            create_story: "stories/create_story",
        }),
        onFileChange(event) {
            this.file = event.target.files[0]
        },
        onTitleChange(event) {
            this.title = event.target.title[0]
        },
        async uploadFile() {
            const toast = useToast()
            if (this.title != "") {
                const formData = new FormData()
                formData.append(this.title, this.file)
                const story_id = await this.create_story({pdf: formData, title: this.title})
                this.$router.push(`/user/stories/${story_id}`)
            } else {
                toast.error("Wrong title")
            }
        }
    }
}
</script>
