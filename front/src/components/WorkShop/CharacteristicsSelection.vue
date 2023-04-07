<template>
    <div class="flex flex-col gap-8">
        <div class="flex flex-wrap justify-center items-center gap-4">
            <StatSelector
                v-for="characteristic in stepInfo.data"
                :key="characteristic.id"
                :name="characteristic.name"
                :onChange="(v) => character_creation.stats[characteristic.name] = {
                    value: parseInt(v.target.value),
                    characteristic_id: characteristic.id
                }"
                :value="character_creation.stats[characteristic.name]?.value"
                :handleRandomize="() => handleRandomize({name: characteristic.name, id: characteristic.id})"
            />
        </div>

        <div class="flex flex-col">
            <div class="flex flex-wrap justify-center items-center gap-4">
                <StatPreview
                    v-for="characteristic in stepInfo.data"
                    :key="characteristic.id"
                    :name="characteristic.name"
                    :base="character_creation.stats[characteristic.name]?.value"
                    :racial="stats.racial.find(race => race.characteristic.name === characteristic.name)?.racial_bonus || 0"
                />
            </div>
        </div>

        <button
            class="relative self-end right-12 text-5xl font-bold cursor-pointer"
            @click="chooseCharacteristics()"
        >
            Go
        </button>
    </div>
</template>

<script>
import StatSelector from "@/components/common/StatSelector.vue"
import StatPreview from "@/components/common/StatPreview.vue"

import { useToast } from "vue-toastification"
import { mapState, mapMutations } from "vuex"

export default {
    components: {
        StatSelector,
        StatPreview
    },
    props: {
        stepInfo: {type: Object, default: new Object()}
    },
    computed: {
        ...mapState("characters", {
            character_creation: (state) => state.character_creation,
            stats: (state) => state.character_creation.stats
        }),
    },
    mounted() {
        console.log(this.stats)
    },
    methods: {
        ...mapMutations({
            set_character_creation: "characters/set_character_creation",
            set_stats: "characters/set_stats",
            set_currentStep: "characters/set_currentStep",
        }),
        handleRandomize({name = '', id, diceMaxValue = 6, dices = 4, valuesNb = 3}) {
            let dicesResults = []
            let result = 0

            if (valuesNb > dices)
                dices = valuesNb
            
            // Throw X random dices and push the returned value into values
            // It randomize a value between 0 & 1, and * it with the max value.
            // The multiplied value is rounded to minor
            for (let i = 0; i < dices; i++) {
                dicesResults.push(Math.floor(Math.random() * diceMaxValue) + 1)
            }

            console.log("dicesResults", dicesResults)

            // Get the "valuesNb" highest values. Adds it to a result
            for (let i = 0; i < valuesNb; i++) {
                let value = Math.max(...dicesResults)
                let valueIndex = dicesResults.findIndex(v => v === value)
                dicesResults.splice(valueIndex, 1)

                result += value
            }

            console.log('result', result)

            this.character_creation.stats[name] = {characteristic_id: id, value: result}
        },
        async chooseCharacteristics() {
            const toast = useToast()
            
            if (Object.keys(this.character_creation.stats).length <= this.stepInfo.data.length) {
                toast.error('Veuillez définir toutes vos caractéristiques')

                return
            }
            
            this.set_stats(this.character_creation.stats)
            this.set_currentStep('Description')
        },
    },
}

</script>
