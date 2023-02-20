<template>
    <SidebarLayout 
        :title="character_creation_steps[currentStep] ?
            character_creation_steps[currentStep].title
            : 'Es-tu sûr de toi ?'"
        :description="character_creation_steps[currentStep]?.message"
    >
        <div 
            v-if="loading"
            class="flex flex-col h-full justify-between items-center"
        >
            <component
                :is="currentStep"
                :stepInfo="character_creation_steps[currentStep]"
            />

            <CompletionBar
                :size="Object.keys(character_creation_steps).length"
                :completed="completed"
                class="flex mx-auto mt-[10px] my-4 py-4 mobile:hidden tablet:pb-2"
            />
        </div>

        <div
            v-else
            class="flex h-full items-center justify-center"
        >   
            <Loader />
        </div>
        <!-- TODO : rajouter previous & next step -->
    </SidebarLayout>
</template>

<script>
import { mapState, mapActions } from "vuex"

import SidebarLayout from '@/layouts/Sidebar.vue'
import Universe from '@/components/WorkShop/UniversesSelection.vue'
import CompletionBar from '@/components/subComponent/completionBar.vue'
import Race from '@/components/WorkShop/RaceSelection.vue'
import Language from '@/components/WorkShop/LanguageSelection.vue'
import Class from '@/components/WorkShop/ClassSelection.vue'
import Characteristics from "@/components/WorkShop/CharacteristicsSelection.vue"
import Description from "@/components/WorkShop/Description.vue"
import Validation from "@/components/WorkShop/Validation.vue"
import Loader from '@/components/Loader.vue'

export default {
    name: "CharacterCreate",
    components: {
        SidebarLayout,
        CompletionBar,
        Universe,
        Race,
        Language,
        Loader,
        Class,
        Characteristics,
        Description,
        Validation
    },
    props: {
        currentStep: {
            type: String,
            default: "Universe"
        }
    },
    computed: {
        ...mapState("characters", {
            loading: (state) => state.loading,
            completed: (state) => state.completed,
            character_creation_steps: (state) => state.character_creation_steps,
            character_creation: (state) => state.character_creation,
        }),
    },
    async mounted() {
        await this.fetch_character_creation_steps()

        console.log('steps', this.character_creation_steps)
    },
    methods: {
        ...mapActions({
            fetch_character_creation_steps: "characters/fetch_character_creation_steps",
        }),
    }
}
</script>
