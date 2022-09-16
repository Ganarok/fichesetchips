<template>
    <SidebarLayout :title="$t('À Propos')">
        <p class="text-justify sm:w-[80%] sm:ml-[10%] lg:w-[70%]">
            Fiches&Chips est un projet étudiant proposant une plateforme web
            pour réaliser des parties de jeu de rôle.<br />
            Pour le moment basé sur D&D5, il vise à intégrer un moteur de
            création de campagne, d'univers ainsi qu'un système de création de
            personnages.
        </p>

        <div class="flex flex-wrap justify-center sm:pb-[3em]">
            <div
                v-for="(member, index) in members"
                :key="member"
                class="flex flex-col items-center bg-gray-100 rounded m-4 py-4 hover:bg-gray-200">
                <img
                    class="w-1/2"
                    :src="require(`../assets/${member}.svg`)"
                    :alt="member" />

                {{ names[index] }}
            </div>
        </div>

        <p
            class="text-right sm:w-[80%] sm:items-end sm:self-end sm:ml-[10%] sm:mr-[10%] lg:w-[70%]">
            Vous pouvez nous contacter à fichesetchips@gmail.com
        </p>
    </SidebarLayout>
</template>

<script>
import SidebarLayout from '~/layouts/Sidebar.vue'

export default {
    name: 'About',
    components: {
        SidebarLayout,
    },
    data() {
        const members = [
            'knight',
            'alchemy',
            'gunnery',
            'barbarian',
            'wizard',
            'dragon',
            'assassin',
            'adventurer',
            'thief',
        ]
        const names = [
            'Manon V',
            'Gabriel B',
            'Brayan P',
            'Clément L',
            'Théo A',
            'Pierre-Antoine L',
            'Arthur M',
            'Havane P',
            'Gabriel R',
        ]

        return {
            members,
            names,
        }
    },
}
</script>

<style></style>
