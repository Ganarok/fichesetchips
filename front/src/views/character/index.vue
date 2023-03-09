<template>
    <SidebarLayout
        title="Mes personnages"
    >
        <div 
            v-if="!characters.length"
            class="flex flex-col items-center justify-center w-full h-2/3 space-y-4"
        >
            <p class="text-xl font-bold">
                Vous n'avez pas encore de personnages
            </p>
            
            <router-link
                to="/characters/create"
                class="font-bold undeline p-2 px-4 bg-fc-green hover:opacity-80"
            >
                Créer un personnage
            </router-link>
        </div>
    
        <CharactersList v-else />
    </SidebarLayout>
</template>

<script>
import SidebarLayout from '@/layouts/Sidebar.vue'
import CharactersList from '@/components/subComponent/Characters.vue'

export default {
    name: 'Characters',
    components: {
        SidebarLayout,
        CharactersList
    },
    data() {
        return {
            characters: ["a",]
        }
    }
}
</script>