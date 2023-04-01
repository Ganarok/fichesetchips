<template>
    <div class="flex w-full h-full space-x-4">
        <div class="flex flex-col space-y-8 w-1/2">
            <div class="flex w-64">
                <BlackGreenDiv
                    :title="`${character_creation.character?.firstname} ${character_creation.character?.lastname}`"
                    :right-green-div="false"
                    className=""
                />
            </div>

            <div class="flex space-x-4">
                <div class="relative h-24 w-24 sm:h-48 sm:w-48">
                    <img
                        src="@/assets/adventurer.svg"
                        alt="adventurer"
                        class="object-contain"
                    />
                </div>

                <div class="flex flex-col space-y-2">
                    <p>
                        Classe: {{ character_creation_steps.Race.data.find(race => race.id === character_creation.character.race_id).name }}
                    </p>

                    <p>
                        Classe: {{ character_creation_steps.Class.data.find(classe => classe.id === character_creation.character.class_id).name }}
                    </p>

                    <p>
                        Sexe: {{ character_creation.character.sex }}
                    </p>
                </div>
            </div>

            <div class="flex flex-wrap self-center items-center justify-center gap-4">
                <StatSelector 
                    v-for="stat, index in character_creation_steps.Characteristics.data"
                    :key="index"
                    :name="stat.name"
                    :value="character_creation.stats[stat.name].value"
                    :randomize="false"
                />
            </div>
        </div>

        <div class="flex flex-col w-1/2 space-y-4 px-2">
            <div class="flex flex-col h-full bg-gradient-to-b from-gray-50 to-gray-100">
                <BlackGreenDiv
                    title="Description"
                    :right-green-div="false"
                    color="text-white"
                />
    
                <textarea
                    v-model="character_creation.character.bio"
                    :disabled="true"
                    class="flex text-justify pr-2 m-2 bg-transparent overflow-y-scroll outline-none resize-none sm:m-3 placeholder:italic"
                    placeholder="Entrez une description"
                />
    
                <img
                    src="@/assets/cornerPixels.svg"
                    class="absolute bottom-0 right-0 w-12 -rotate-180 z-10 scale-x-[-1]"
                >
            </div>

            <button
                class="self-end text-5xl font-bold cursor-pointer"
                @click="validation()"
            >
                Valider
            </button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { useToast } from 'vue-toastification'

import BlackGreenDiv from '@/components/subComponent/BlackGreenDiv.vue'
import StatSelector from '@/components/subComponent/StatSelector.vue'
import { apiCall } from '@/utils/apiCall'

export default {
    name: 'Validation',
    components: {
        BlackGreenDiv,
        StatSelector
    },
    computed: {
        ...mapState("characters", {
            character_creation: (state) => state.character_creation,
            character_creation_steps: (state) => state.character_creation_steps,
        }),
    },
    methods: {
        ...mapMutations({
            push_character: "characters/push_character",
        }),
        parseStats() {
            let keys = Object.keys(this.character_creation.stats)
            keys.shift()

            if (!keys)
                return

            let stats = []

            keys.map(key => stats.push({
                characteristic_id: this.character_creation.stats[key].characteristic_id,
                value: this.character_creation.stats[key].value,
            }))

            this.character_creation.character_characteristic = stats
        },
        async validation() {
            const toast = useToast()
            this.parseStats()

            console.log(this.character_creation)

            try {
                await apiCall({
                    route: '/cem/characters/creation',
                    method: 'POST',
                    body: this.character_creation
                })

                await this.$router.push('/characters')
                    .then(() => toast.success('Personnage créé avec succès'))
            } catch (error) {
                toast.error(error)
            }
        }
    }
}
</script>