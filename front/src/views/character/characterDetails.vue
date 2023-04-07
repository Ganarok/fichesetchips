<template>
    <sidebar-layout>
        <div class="mx-8 my-6">
            <div class="flex flex-col">
                <div class="flex flex-col xl:flex-row justify-around">
                    <div class="flex flex-col xl:w-5/12">
                        <div class="flex">
                            <BlackGreenDiv
                            :title="character.firstname ? (character.firstname+' '+character.lastname) : 'John Smith'"
                            :right-green-div="false"
                            />

                            <span class="mx-3">
                                <img v-if="character.sex === 'Female'" src="@/assets/pictoSexFemale.svg">
                                <img v-else-if="character.sex === 'Male'" src="@/assets/pictoSexMale.svg">
                                <img v-else src="@/assets/pictoSexOther.svg">
                            </span>
                        </div>
                        
                        <div class="flex">
                            <img src="../../assets/wizard.svg" alt="Magicien" >
                            <div class="flex flex-col text-xl space-y-8 pt-8">
                                <div>
                                    <span class="font-bold">Level:</span> {{ character.firstname ? character.level_id : 12 }}
                                </div>
                                <div>
                                    <span class="font-bold">Univers:</span> {{ character.firstname ? character.level_id : 'Cave et monstres' }}
                                </div>
                                <div>
                                    <span class="font-bold">Race:</span> {{ character.firstname ? character.race_id : 'Humain' }}
                                </div>
                                <div>
                                    <span class="font-bold">Classe:</span> {{ character.firstname ? character.class_id : 'Mage' }}
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div class="flex flex-wrap justify-center mt-3 gap-4 max-w-screen-sm xl:w-6/12">
                        <div v-for="characteristic, i in character?.character_characteristics || new Array(6)" :key="i " class="w-40">
                            <BlackGreenDiv
                                :title="characteristic?.characteristic?.name.substring(0, 3).toUpperCase() || '???'"
                                :right-green-div="false"
                                :left-green-div="false"
                            />
                            <div class="border-fc-green border-[5px] border-t-0 h-16 w-full flex justify-center items-center text-2xl">
                                {{ characteristic?.value || 0 }}
                            </div>
                        </div>
                        <!-- <div class="w-32">
                            <BlackGreenDiv
                                title="DEX"
                                :right-green-div="false"
                                :left-green-div="false"
                            />
                            <div class="border-fc-green border-2 border-t-0 h-16 w-full flex justify-center items-center text-2xl">
                                {{ character?.stats?.dex || 0 }}
                            </div>
                        </div>
                        <div class="w-32">
                            <BlackGreenDiv
                                title="CON"
                                :right-green-div="false"
                                :left-green-div="false"
                            />
                            <div class="border-fc-green border-2 border-t-0 h-16 w-full flex justify-center items-center text-2xl">
                                {{ character?.stats?.con || 0 }}
                            </div>
                        </div>
                        <div class="w-32">
                            <BlackGreenDiv
                                title="INT"
                                :right-green-div="false"
                                :left-green-div="false"
                            />
                            <div class="border-fc-green border-2 border-t-0 h-16 w-full flex justify-center items-center text-2xl">
                                {{ character?.stats?.int || 0 }}
                            </div>
                        </div>
                        <div class="w-32">
                            <BlackGreenDiv
                                title="SAG"
                                :right-green-div="false"
                                :left-green-div="false"
                            />
                            <div class="border-fc-green border-2 border-t-0 h-16 w-full flex justify-center items-center text-2xl">
                                {{ character?.stats?.sag || 0 }}
                            </div>
                        </div>
                        <div class="w-32">
                            <BlackGreenDiv
                                title="CHA"
                                :right-green-div="false"
                                :left-green-div="false"
                            />
                            <div class="border-fc-green border-2 border-t-0 h-16 w-full flex justify-center items-center text-2xl">
                                {{ character?.stats?.cha || 0 }}
                            </div>
                        </div> -->
                    </div>
                </div>
                <div class="flex flex-col-reverse  xl:flex-row justify-around">
                        <div class="relative bio xl:w-5/12" >
                        {{ character.firstname ? character.bio : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Aliquam aspernatur atque autem esse harum impedit iure labore numquam, quam quasi sequi similique vero voluptate.Maxime necessitatibus quam quas quidem recusandae! Lorem ipsum dolor sit amet, consectetur adipisicing elit.Ad animi architecto asperiores cupiditate distinctio esse eum facere fuga harum itaque iusto minus mollitia nostrum pariatur, perspiciatis possimus praesentium provident vitae.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Aperiam atque blanditiis cumque dignissimos et expedita facere fuga illum impedit magnam mollitia nihil quas repudiandae rerum, saepe soluta vel veniam voluptatum.' }}
                    </div>
                    <div class="flex justify-between my-3 xl:w-6/12">
                        <div class="w-5/12 ">
                                <BlackGreenDiv title="FLAW" />
                            <div class="p-2">
                                <h1 class="font-bold">
                                    {{ skill?.name || 'Skill title' }}
                                </h1>
                                <p class="pl-4">
                                    {{ skill?.description || 'Skill description' }}
                                </p>
                                <h2 class="font-bold pl-2">
                                    Skill rule
                                </h2>
                                <p class="pl-4">
                                    {{ skill?.rule || 'Skill rule description' }}
                                </p>
                            </div>
                        </div>

                        <div class="w-5/12">
                            <BlackGreenDiv title="SKILLS" />
                            <div class="p-2">
                                <h1 class="font-bold">
                                    {{ skill?.name || 'Skill title' }}
                                </h1>
                                <p class="pl-2">
                                    {{ skill?.description || 'Skill description' }}
                                </p>
                                <h2 class="font-bold pl-2">
                                    Skill rule
                                </h2>
                                <p class="pl-4">
                                    {{ skill?.rule || 'Skill rule description' }}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </sidebar-layout>
</template>

<script>
import { mapState, mapActions } from "vuex"

import BlackGreenDiv from "@/components/common/BlackGreenDiv"
import SidebarLayout from "@/layouts/Sidebar"
import StatSelector from "@/components/common/StatSelector.vue";

export default {
    name: "CharacterDetails",
    components: { SidebarLayout, BlackGreenDiv, StatSelector },
    computed: {
        ...mapState("characters", {
            character: (state) => state.character,
        }),
    },
    async mounted() {
        // const { id } = this.$route.params
        //await this.fetch_character(id)
    },
    methods: {
        ...mapActions({
            fetch_character: "characters/fetch_character",
        }),
    },
}
</script>

<style scoped>

.bio::after{
    content: "";
    position: absolute;
    bottom: 1em;
    right: 0;
    left: auto;
    width: 2em;
    height: 1em;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0) 50%,#4FEA74 51%, #4FEA74 100%);
    z-index: 1;

}
.bio::before{
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    left: auto;
    width: 2em;
    height: 1em;
    background: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0) 50%,#4FEA74 51%, #4FEA74 100%);
    z-index: 1;

}
</style>