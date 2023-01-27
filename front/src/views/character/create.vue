<template>
    <SidebarLayout :title="currentTitle">
        <div class="flex flex-col items-center">
            <component :is="currentStep" />

            <CompletionBar
                :size="size"
                :completed="completed"
                class="mx-auto mt-[10px] py-4 mobile:hidden tablet:pb-2"
            />
        </div>
    </SidebarLayout>
</template>

<script>
import SidebarLayout from "@/layouts/Sidebar.vue"
import CompletionBar from "@/components/subComponent/completionBar.vue"
import Universe from "@/components/subComponent/UniversesSelection.vue"
import Class from "@/components/subComponent/ClassSelection.vue"

export default {
    name: "CharacterCreate",
    components: {
        SidebarLayout,
        CompletionBar,
        Universe,
        Class
    },
    data() {
        return {
            currentStep: "Class",
            currentTitle: `Choix de l'univers`,
            steps: ["Class"],
            stepsTitle: [`Choix de l'univers`],
            size: 5,
            completed: 1,
        }
    },
}
</script>
