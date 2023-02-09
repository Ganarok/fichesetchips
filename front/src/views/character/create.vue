<template>
    <SidebarLayout 
        :title="character_creation_steps[currentStep] ?
            character_creation_steps[currentStep].title
            : 'Choix de l\'Univers'"
        :description="character_creation_steps[currentStep]?.message"
    >
        <div 
            v-if="loading"
            class="flex flex-col h-full justify-between items-center"
        >
            <component
                :is="currentStep"
                :stepInfo="character_creation_steps[currentStep]"
                class="flex flex-col w-full"
            />

            <CompletionBar
                :size="size"
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
        Characteristics
    },
    props: {
        currentStep: {
            type: String,
            default: "Universe"
        }
    },
    data() {
        return {
            size: 5
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
    },
    methods: {
        ...mapActions({
            fetch_character_creation_steps: "characters/fetch_character_creation_steps",
        }),
    }
}
</script>
