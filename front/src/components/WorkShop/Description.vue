<template>
    <div class="flex flex-row w-full h-full">
        <div class="flex flex-col items-center gap-4">
            <div class="flex flex-row w-full justify-evenly items-center">
                <div class="relative h-24 w-24 sm:h-48 sm:w-48">
                    <img
                        src="@/assets/adventurer.svg"
                        alt="adventurer"
                        class="object-contain"
                    />
                </div>

                <div class="flex flex-col items-center space-y-4">
                    <div class="flex relative items-start w-full py-1 bg-fc-black">
                        <div class="absolute right-0 top-0 h-full bg-fc-green w-[12%]" />

                        <Selector
                            :items="ALIGNMENT"
                            :default-selected-item="{
                                name: $t('Alignement'),
                                value: ''
                            }"
                            :on-select-item="(v) => this.character_creation.character.alignment = v"
                        />
                    </div>

                    <CustomInput 
                        :placeHolder="$t('Prénom')"
                        outline="fc-green"
                        :max-length="52"
                        @input="v => this.character_creation.character.firstname = v.target.value"
                        class="w-full"
                    />

                    <CustomInput 
                        :placeHolder="$t('Nom')"
                        outline="fc-green"
                        :max-length="52"
                        @input="v => this.character_creation.character.lastname = v.target.value"
                        class="w-full"
                    />
                </div>
            </div>

            <div class="flex flex-row justify-center items-center">
                <Selector
                    :items="SEXTYPE"
                    :default-selected-item="{
                        name: 'Genre',
                        value: ''
                    }"
                    selector-class="flex flex-col w-72 relative bg-fc-black text-white cursor-pointer select-none"
                    :on-select-item="(v) => this.character_creation.character.sex = v.target.value"
                />

                <CustomInput 
                    placeHolder="Poids"
                    outline="fc-green"
                    @input="v => this.character_creation.character.weight = v.target.value"
                    class="w-full"
                />

                <CustomInput 
                    placeHolder="Taille"
                    outline="fc-green"
                    @input="v => this.character_creation.character.height = v.target.value"
                    class="w-full"
                />
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
                    v-model="this.character_creation.character.bio"
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
                @click="chooseDescription()"
            >
                Go
            </button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import CustomInput from '@/components/subComponent/CustomInput.vue'
import BlackGreenDiv from '@/components/subComponent/BlackGreenDiv.vue'
import Selector from '@/components/subComponent/Selector.vue'
import { ALIGNMENT, SEXTYPE } from '@/utils/enums'

export default {
    name: 'Description',
    components: {
        CustomInput,
        BlackGreenDiv,
        Selector
    },
    computed: {
        ...mapState("characters", {
            character_creation: (state) => state.character_creation,
        }),
    },
    data() {
        return {
            ALIGNMENT,
            SEXTYPE,
        }
    },
    methods: {
        ...mapMutations({
            set_character_creation: "characters/set_character_creation",
        }),
        chooseDescription() {
            this.$router.push({ name: 'CharacterCreate', query: {currentStep: 'Validation' }})
        }
    }
}
</script>