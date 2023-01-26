<template>
  <SidebarLayout :title="currentTitle">
    <div class="flex flex-col items-center">
      <component :is="currentStep"></component>
      <CompletionBar
        :size="size"
        :completed="completed"
        class="mx-auto mt-[10px] mobile:hidden tablet:pb-2"
      ></CompletionBar>
    </div>
  </SidebarLayout>
</template>

<script>
import SidebarLayout from "@/layouts/Sidebar.vue";
import CompletionBar from "@/components/subComponent/completionBar.vue";
import Universe from "@/components/subComponent/UniversesSelection.vue";

export default {
  name: "CharacterCreate",
  components: {
    SidebarLayout,
    CompletionBar,
    Universe,
  },
  data() {
    return {
      currentStep: "Universe",
      currentTitle: `Choix de l'univers`,
      steps: ["Universe"],
      stepsTitle: [`Choix de l'univers`],
      size: 5,
      completed: 1,
    };
  },
};
</script>
