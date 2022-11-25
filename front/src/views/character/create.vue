<template>
    <SidebarLayout :title=currentTitle>
        <div class='h-full flex flex-col justify-between'>
            <Universe :is="currentStep"></Universe>
            <CompletionBar :size=size :completed=completed class="mx-auto mt-[10px] mobile:hidden"></CompletionBar>
        </div>
    </SidebarLayout>
</template>

<script>
import SidebarLayout from '@/layouts/Sidebar.vue'
import CompletionBar from '@/components/subComponent/completionBar.vue';
// import Universe from '@components/characterCreation/universe.vue'

export default {
    name: 'CharacterCreate',
    components: {
    SidebarLayout,
    CompletionBar
},
    data() {
        return {
            currentStep: 'Universe',
            currentTitle: `Choix de l'univers`,
            steps: ['Universe'],
            stepsTitle: [`Choix de l'univers`],
            size: 5,
            completed: 1
        }
    }
}
</script>