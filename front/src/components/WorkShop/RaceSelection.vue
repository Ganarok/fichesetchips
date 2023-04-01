<template>
    <div>
        <div
            class="flex flex-wrap items-center justify-center gap-2"
        >
            <RaceCard
                v-for="race in stepInfo.data"
                :key="race.id"
                :character="{
                    ...race,
                    name: race.french_name,
                }"
                @click="chooseRace(race.id, race.languages, race.nb_free_standard_language, race.racial_bonus)"
            />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"

import { FILTERUNIVERSES, TYPEUNIVERSES } from "@/utils/enums"
import RaceCard from "../subComponent/Cards/RaceCard.vue"

export default {
    components: {
        RaceCard
    },
    props: {
        stepInfo: {type: Object, default: new Object()}
    },
    data() {
        return {
            FILTERUNIVERSES,
            TYPEUNIVERSES,
            query: "?",
            search: "",
            selectedFilter: "",
            selectedType: "",
        }
    },
    computed: {
        ...mapState("characters", {
            character_creation: (state) => state.character_creation,
        }),
    },
    methods: {
        ...mapMutations({
            set_character_creation: "characters/set_character_creation",
            set_racial: "characters/set_racial",
            set_currentStep: "characters/set_currentStep",
        }),
        async chooseRace(id, languages, nb_free_standard_language, racial_bonus) {
            this.set_racial(racial_bonus)

            console.log(this.character_creation.stats)

            this.character_creation.character.race_id = id
            this.character_creation.character.race_id
            this.character_creation.languages = []
            languages.map(language => {
                this.character_creation.languages.push(language.id)
            })
            // TODO calcul poid, taille, age
            this.character_creation.character.age = 10
            this.character_creation.character.weight = 10
            this.character_creation.character.height = 10
            this.set_character_creation(this.character_creation)
            if (nb_free_standard_language > 0) {
                this.set_currentStep('Language')
            } else {
                this.set_currentStep('Class')
            }
        },
    }
}

</script>
