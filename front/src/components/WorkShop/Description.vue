<template>
    <div class="flex flex-row justify-evenly w-full h-full">
        <div class="flex flex-col items-center gap-4">
            <div class="flex flex-row w-full justify-evenly items-center">
                <div class="flex flex-col items-center space-y-4">
                    <div class="flex relative items-start w-full py-1 bg-fc-black">
                        <div class="absolute right-0 top-0 h-full bg-fc-green w-[12%]" />

                        <Selector
                            :items="ALIGNMENT"
                            :default-selected-item="{
                                name: $t('Alignement'),
                                value: ''
                            }"
                            :on-select-item="(v) => character.alignment = v"
                        />
                    </div>

                    <CustomInput 
                        :placeHolder="$t('Prénom')"
                        outline="fc-green"
                        :max-length="52"
                        :value="character?.firstname"
                        class="w-full"
                        @input="v => character.firstname = v.target.value"
                    />

                    <CustomInput 
                        :placeHolder="$t('Nom')"
                        outline="fc-green"
                        :max-length="52"
                        :value="character?.lastname"
                        class="w-full"
                        @input="v => character.lastname = v.target.value"
                    />
                </div>
            </div>

            <div class="flex flex-col justify-center items-center gap-4">
                <div class="flex relative items-start w-full py-1 bg-fc-black">
                    <div class="absolute right-0 top-0 h-full bg-fc-green w-[12%]" />

                    <Selector
                        :items="SEXTYPE"
                        :default-selected-item="getDefaultGenre()"
                        selector-class="flex flex-col relative bg-fc-black text-white cursor-pointer select-none"
                        :on-select-item="(v) => character.sex = v"
                    />
                </div>

                <div class="flex items-center">
                    <CustomInput 
                        placeHolder="Poids"
                        outline="fc-green"
                        :max-length="12"
                        typeinput="number"
                        :value="character?.weight"
                        class="w-full"
                        @input="v => character.weight = v.target.value"
                    />

                    <p class="w-12 font-bold">
                        KGs
                    </p>
                </div>

                <div class="flex items-center">
                    <CustomInput 
                        placeHolder="Taille"
                        outline="fc-green"
                        :max-length="12"
                        typeinput="number"
                        :value="character?.height"
                        class="w-full"
                        @input="v => character.height = v.target.value"
                    />

                    <p class="w-12 font-bold">
                        cm
                    </p>
                </div>
            </div>
        </div>

        <div class="flex flex-col space-y-4 px-2 w-1/2">
            <div class="flex flex-col h-full bg-gradient-to-b from-gray-50 to-gray-100">
                <BlackGreenDiv
                    title="Description"
                    :right-green-div="false"
                    color="text-white"
                />
    
                <textarea
                    v-model="character.bio"
                    placeholder="Entrez une description"
                    class="flex text-justify h-full w-full pr-2 m-2 bg-transparent overflow-y-scroll outline-none resize-none sm:m-3 placeholder:italic"
                />
            </div>

            <button
                class="self-end text-5xl font-bold cursor-pointer hoverStyle"
                @click="chooseDescription()"
            >
                Go
            </button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import CustomInput from '@/components/common/CustomInput.vue'
import BlackGreenDiv from '@/components/common/BlackGreenDiv.vue'
import Selector from '@/components/common/Selector.vue'
import { ALIGNMENT, SEXTYPE } from '@/utils/enums'

export default {
    name: 'Description',
    components: {
        CustomInput,
        BlackGreenDiv,
        Selector
    },
    data() {
        return {
            ALIGNMENT,
            SEXTYPE,
        }
    },
    computed: {
        ...mapState("characters", {
            character: (state) => state.character_creation['character'],
        }),
    },
    methods: {
        ...mapMutations({
            set_character_creation: "characters/set_character_creation",
            set_currentStep: "characters/set_currentStep",
            update_completed: "characters/update_completed"
        }),
        chooseDescription() {
            this.set_currentStep('Validation')
            this.update_completed()
        },
        getDefaultAlignment() {
            const defaultAlignment = this.character.alignment

            if (defaultAlignment) {
                return {
                    name: ALIGNMENT.find(al => al.value === defaultAlignment).name,
                    value: defaultAlignment
                }
            }

            return {
                name: this.$t('Alignement'),
                value: ''
            }
        },
        getDefaultGenre() {
            const defaultSex = this.character?.sex

            if (defaultSex && defaultSex !== 'toset') {
                return {
                    name: SEXTYPE.find(sex => sex.value === defaultSex).name,
                    value: defaultSex
                }
            }

            return {
                name: 'Genre',
                value: ''
            }
        }
    }
}
</script>