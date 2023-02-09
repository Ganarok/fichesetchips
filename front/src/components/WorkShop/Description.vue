<template>
    <div class="flex flex-wrap md:flex-row justify-evenly w-full h-full">
        <div class="flex flex-col justify-between items-center">
            <div class="flex items-center">
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
                            :on-select-item="(v) => this.alignment = v"
                        />
                    </div>
    
                    <CustomInput 
                        :placeHolder="$t('Prénom')"
                        outline="fc-green"
                        :max-length="52"
                        @input="v => this.firstname = v.target.value"
                        class="w-full"
                    />
    
                    <CustomInput 
                        :placeHolder="$t('Nom')"
                        outline="fc-green"
                        :max-length="52"
                        @input="v => this.lastname = v.target.value"
                        class="w-full"
                    />
                </div>
            </div>

            <div class="flex flex-col space-y-4 h-full justify-evenly items-center">
                <CustomInput 
                    placeHolder="Poids"
                    outline="fc-green"
                    @input="v => this.weight = v.target.value"
                    class="w-full"
                />

                <CustomInput 
                    placeHolder="Taille"
                    outline="fc-green"
                    @input="v => this.size = v.target.value"
                    class="w-full"
                />
            </div>
        </div>

        <div class="flex flex-col w-1/2 h-full bg-gradient-to-b from-gray-50 to-gray-100">
            <BlackGreenDiv
                title="Description"
                :right-green-div="false"
                color="text-white"
            />

            <textarea
                v-model="bio"
                class="flex text-justify pr-2 m-2 bg-transparent overflow-y-scroll outline-none resize-none sm:m-3 placeholder:italic"
                placeholder="Entrez une description"
            />

            <img
                src="@/assets/cornerPixels.svg"
                class="absolute bottom-0 right-0 w-12 -rotate-180 z-10 scale-x-[-1]"
            >
        </div>
    </div>
</template>

<script>
import CustomInput from '@/components/subComponent/CustomInput.vue'
import BlackGreenDiv from '@/components/subComponent/BlackGreenDiv.vue'
import Selector from '@/components/subComponent/Selector.vue'
import { ALIGNMENT } from '@/utils/enums'

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
            firstname: this.$t('Prénom'),
            lastname: this.$t('Nom'),
            bio: '',
            weight: 0,
            size: 0
        }
    },
}
</script>