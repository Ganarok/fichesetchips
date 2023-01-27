<template>
    <SidebarLayout 
        :title="character_creation_steps[currentStep] ?
            character_creation_steps[currentStep].title
            : 'Choix de l\'Univers'"
    >
        <p v-if="character_creation_steps[currentStep]">
            {{ character_creation_steps[currentStep].message }}
        </p>
        <div class="flex flex-col items-center">
            <component
                :is="currentStep"
                :stepInfo="character_creation_steps[currentStep]"
            />
            <CompletionBar
                :size="size"
                :completed="completed"
                class="mx-auto mt-[10px] py-4 mobile:hidden tablet:pb-2"
            />
        </div>
        <!-- TODO : rajouter previous & next step -->
    </SidebarLayout>
</template>

<script>
import SidebarLayout from '@/layouts/Sidebar.vue'
import CompletionBar from '@/components/subComponent/completionBar.vue'
import Universe from '@/components/WorkShop/UniversesSelection.vue'
import Race from '@/components/WorkShop/RaceSelection.vue'
import Language from '@/components/WorkShop/LanguageSelection.vue'
import Class from '@/components/WorkShop/ClassSelection.vue'
import { mapState, mapActions } from "vuex"

export default {
    name: "CharacterCreate",
    components: {
        SidebarLayout,
        CompletionBar,
        Universe,
        Race,
        Language,
        Class
    },
    props: {
        currentStep: {type: String, default: "Universe"}
    },
    data() {
        return {
            size: 5,
            completed: 1,
        }
    },
    computed: {
        ...mapState("characters", {
            character_creation_steps: (state) => state.character_creation_steps,
            character_creation: (state) => state.character_creation,
        }),
    },
    async mounted() {
        await this.fetch_character_creation_steps()
        console.log(this.character_creation)
    },
    methods: {
        ...mapActions({
            fetch_character_creation_steps: "characters/fetch_character_creation_steps",
        }),
    }
    
}
</script>
