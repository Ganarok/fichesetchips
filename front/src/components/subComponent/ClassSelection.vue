<template>
    <div class="flex flex-wrap self-center justify-center items-center gap-2">
        <CharacterCard
            v-for="(classe, index) in classes"
            :key="index"
            :name="classe.name"
            :image="true"
            class="hover:opacity-80 hover:cursor-pointer"
            @click="() => classSelected = index"
        />
    </div>
</template>

<script>
import CharacterCard from '@/components/subComponent/CharacterCard.vue'

export default {
    name: 'ClassSelection',
    components: { CharacterCard },
    props: {
        classes: {
            type: Array,
            default() { return [
                {
                    name: "Guerrier"
                },
                {
                    name: "Mage"
                },
                {
                    name: "Voleur"
                },
                {
                    name: "Druide"
                },
                {
                    name: "Paladin"
                },
                {
                    name: "Archer"
                },
                {
                    name: "Pretre"
                },
                {
                    name: "Berserker"
                },
            ] }
        }
    },
    data() {
        return {
            classSelected: null
        }
    }
}
</script>