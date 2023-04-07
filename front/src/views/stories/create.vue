<template>
    <SidebarLayout 
        :title="'Import de scénario'"
        description="Vous pouvez importer un .pdf depuis votre ordinateur. Ce fichier servira de base pour votre scénario."
    >
        <div class="flex flex-col cursor pl-6 space-y-6">
            <p>Importez votre fichier ici : </p>

            <input
                type="file"
                accept="application/pdf"
                @change="onFileChange"
            >

            <p>Et choisissez un titre !</p>

            <CustomInput
                :max-length="254"
                place-holder="Titre de la story"
                type="text"
                outline="fc-green"
                :value="title"
                class="max-w-xs"
                @input="(v) => (title = v.target.value)"
            />

            <Button
                :button-text="$t('import')"
                class="px-4 py-2 text-base w-36 bg-gra"
                :class="file === null || title === '' ? 'cursor-not-allowed' : 'cursor-pointer'"
                textColor="text-fc-black"
                :color="file === null || title === '' ? 'gray-200' : 'fc-green'"
                :backgroundColor="file === null || title === '' ? 'gray-200' : 'fc-green'"
                :rounded="false"
                :disabled="file === null || title === ''"
                @click="uploadFile"
            />
        </div>
    </SidebarLayout>
</template>

<script>
import { mapActions } from "vuex"
import { useToast } from "vue-toastification"

import Button from "@/components/common/Button.vue"
import SidebarLayout from '@/layouts/Sidebar.vue'
import CustomInput from "@/components/common/CustomInput.vue"

export default {
    name: "StoryCreate",
    components: {
        SidebarLayout,
        Button,
        CustomInput
    },
    props: {
    },
    data() {
        return {
            file: null,
            title: ''
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
