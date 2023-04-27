<template>
    <SidebarLayout 
        :title="character_creation_steps[currentStep] ?
            character_creation_steps[currentStep].title
            : 'Es-tu sûr de toi ?'"
        :description="character_creation_steps[currentStep]?.message"
        class="relative"
    >
        <div
            v-if="!loading"
            class="absolute top-0 self-end"
        >
            <Button 
                :button-text="$t('Réinitialiser')"
                class="px-6 py-2 hoverStyle"
                color="fc-red"
                :rounded="false"
                @click="handleReset()"
            />
        </div>

        <div 
            v-if="!loading"
            class="flex flex-col relative h-full justify-between items-center"
        >
            <component
                :is="currentStep"
                :stepInfo="character_creation_steps[currentStep]"
            />

            <CompletionBar
                v-if="currentStep !== 'Universe' && currentStep !== 'Validation'"
                :size="Object.keys(character_creation_steps).length"
                class="flex mx-auto mt-[10px] my-4 py-4 mobile:hidden tablet:pb-2"
            />
        </div>

        <div
            v-else
            class="flex h-full items-center justify-center"
        >   
            <Loader />
        </div>
    </SidebarLayout>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex"

import SidebarLayout from '@/layouts/Sidebar.vue'
import Universe from '@/components/WorkShop/UniversesSelection.vue'
import CompletionBar from '@/components/common/completionBar.vue'
import Race from '@/components/WorkShop/RaceSelection.vue'
import Language from '@/components/WorkShop/LanguageSelection.vue'
import Class from '@/components/WorkShop/ClassSelection.vue'
import Characteristics from "@/components/WorkShop/CharacteristicsSelection.vue"
import Description from "@/components/WorkShop/Description.vue"
import Validation from "@/components/WorkShop/Validation.vue"
import Loader from '@/components/common/Loader.vue'
import Button from "@/components/common/Button.vue"

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
        Validation,
        Button
    },
    computed: {
        ...mapState("characters", {
            loading: (state) => state.loading,
            completed: (state) => state.completed,
            character_creation_steps: (state) => state.character_creation_steps,
            character_creation: (state) => state.character_creation,
            currentStep: (state) => state.currentStep
        }),
    },
    async mounted() {
        this.set_loading(true)
        await this.fetch_character_creation_steps()

        if (!this.currentStep)
            this.set_currentStep('Universe')

        this.set_loading(false)
    },
    methods: {
        ...mapActions({
            fetch_character_creation_steps: "characters/fetch_character_creation_steps",
            reset_creation: "characters/reset_creation",
        }),
        ...mapMutations({
            set_currentStep: "characters/set_currentStep",
            set_loading: "characters/set_loading",
            update_completed: "characters/update_completed",
        }),
        handleReset() {
            this.reset_creation()
            this.set_currentStep('Universe')
            this.update_completed()
            this.$router.push({ name: "CharacterCreate" })
        }
    }
}
</script>
