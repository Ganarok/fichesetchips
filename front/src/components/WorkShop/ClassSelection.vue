<template>
    <div>
        <div class="flex flex-wrap self-center justify-center items-center gap-2">
            <div
                v-for="class_ in stepInfo.data"
                :key="class_.id"
            >
                <ClassCard
                    :class_="class_"
                    :image="true"
                    class="hover:opacity-80 hover:cursor-pointer"
                    @click="chooseClass(class_)"
                />
            </div>

            <Modal
                v-show="showModal"
                title="Choisissez vos compétences"
                :class="'py-16'"
                @close-modal="showModal = false"
            >
                <div class="flex flex-col py-4 space-y-4">
                    <Selector
                        v-for="skill_nb, index in selectedClass.skill_nb"
                        :key="skill_nb"
                        selectorClass="flex flex-col relative text-white cursor-pointer select-none bg-fc-black-light"
                        :on-select-item="(v) => skills[index] = v"
                        :items="parseSkills(selectedClass.skills)"
                    />
                </div>

                <button
                    class="self-end text-5xl font-bold cursor-pointer"
                    @click="submitClass(selectedClass.id)"
                >
                    Go
                </button>
            </Modal>
        </div>
    </div>
</template>

<script>

import { mapState, mapMutations } from "vuex"
import { useToast } from "vue-toastification"

import Selector from '@/components/subComponent/Selector.vue'
import ClassCard from '@/components/subComponent/Cards/ClassCard.vue'
import Modal from '@/components/Modal.vue'

export default {
    components: {
        ClassCard,
        Modal,
        Selector
    },
    props: {
        stepInfo: {type: Object, default: new Object()}
    },
    data() {
        return {
            skills: [],
            selectedClass: {},
            showModal: false
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
        }),
        parseSkills(skills) {
            var parsedSkills = []

            skills.forEach(skill => parsedSkills.push({
                name: skill.name,
                value: skill.id
            }))

            return parsedSkills
        },
        async chooseClass(selectedClass) {
            this.selectedClass = selectedClass
            this.showModal = true
        },
        async submitClass(id) {
            const toast = useToast()

            if (Object.keys(this.skills).length !== this.selectedClass.skill_nb) {
                toast.error('Veuillez sélectionner toutes vos compétences.')

                return
            }

            this.character_creation.skills = this.skills
            this.character_creation.character.class_id = id
            this.set_character_creation(this.character_creation)
            this.$router.push({ name: 'CharacterCreate', query: {currentStep: 'Characteristics' }})
        }
    }
}

</script>
