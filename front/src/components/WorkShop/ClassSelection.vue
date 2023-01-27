<template>
    <div class="flex flex-wrap self-center justify-center items-center gap-2">
        <div
            v-for="class_ in stepInfo.data"
            :key="class_.id"
        >
            <ClassCard
                :class_="class_"
                :image="true"
                class="hover:opacity-80 hover:cursor-pointer"
                @click="chooseClass(class_.id)"
            />
            <div v-if="class_id == class_.id">
                <select
                    v-for="skill_nb in class_.skill_nb"
                    :key="skill_nb"
                    v-model="skills[`${class_id}_${skill_nb}`]"
                >
                    <option
                        disabled
                        :value="`Choisissez votre compétence n°${skill_nb}`"
                    >
                        Choisissez une compétence
                    </option>
                    <option
                        v-for="skill in class_.skills"
                        :key="skill.id"
                        :value="skill.id"
                    >
                        {{ skill.name }}
                    </option>
                </select>

                <button
                    class="mr-5 self-end text-5xl font-bold cursor-pointer"
                    @click="submitClass(class_.id)"
                >
                    Go
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import ClassCard from '@/components/subComponent/Cards/ClassCard.vue'
import { mapState, mapMutations } from "vuex"

export default {
    components: { ClassCard },
    props: {
        stepInfo: {type: Object, default: new Object()}
    },
    data() {
        return {
            skills: {},
            class_id: null
        }
    },
    computed: {
        ...mapState("characters", {
            character_creation: (state) => state.character_creation,
        }),
    },
    async mounted() {
    },
    methods: {
        ...mapMutations({
            set_character_creation: "characters/set_character_creation",
        }),
        async chooseClass(id) {
            this.class_id = id
        },
        async submitClass(id) {
            this.character_creation.skills = []   
            this.character_creation.character.class_id = id
            Object.keys(this.skills).map(value => {
                const class_id = value.split("_")[0]
                const skill_nb = value.split("_")[1]
                if (class_id == id) {
                    this.character_creation.skills.push(this.skills[`${class_id}_${skill_nb}`])
                }
            })
            this.set_character_creation(this.character_creation)
            this.$router.push({ name: 'CharacterCreate', query: {currentStep: 'Characteristics' }})
        
        }
    }
}

</script>
