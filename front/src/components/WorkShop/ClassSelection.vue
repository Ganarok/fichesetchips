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
                        :on-select-item="(v) => updateParsedSkills(v, index)"
                        :items="parsedSkills"
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

import Selector from '@/components/common/Selector.vue'
import ClassCard from '@/components/common/Cards/ClassCard.vue'
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
            parsedSkills: [],
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
            set_currentStep: "characters/set_currentStep",
        }),
        parseSkills(skills) {
            var parsedSkills = []

            skills.forEach(skill => parsedSkills.push({
                name: skill.name,
                value: skill.id
            }))

            this.parsedSkills = parsedSkills
        },
        updateParsedSkills(v, index) {
            this.skills[index] = v

            this.parsedSkills = this.parsedSkills.filter(skill => {
                return !this.skills.includes(skill.value)
            })
        },
        async chooseClass(selectedClass) {
            this.selectedClass = selectedClass
            this.parseSkills(selectedClass.skills)
            this.showModal = true
        },
        hasDuplicates(array) {
            return (new Set(array)).size !== array.length
        },
        async submitClass(id) {
            const toast = useToast()

            if (Object.keys(this.skills).length !== this.selectedClass.skill_nb) {
                toast.error('Veuillez sélectionner toutes vos compétences.')

                return
            }

            if (this.hasDuplicates(this.skills)) {
                toast.error('Vous ne pouvez pas sélectionner deux fois la même compétence.')

                return
            }

            this.character_creation.skills = this.skills
            this.character_creation.character.class_id = id
            this.set_character_creation(this.character_creation)
            this.set_currentStep('Characteristics')
        }
    }
}

</script>
