<template>
  <sidebar-layout>
    <div class="mx-8 my-6">
      <div class="parent">
        <div class="div1">
          <BlackGreenDiv :title="character.firstname ? (character.firstname+' '+character.lastname) : 'John Smith'" :right-green-div="false"/>
          <div class="flex row">
            <img :src="wizard" alt="">
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
          <div class="flex flex-col">

            <BlackGreenDiv title="Bio" :right-green-div="false" :left-green-div="false"/>
            <div class="py-2"  style="overflow-y: auto; max-height: 250px">
              {{ character.firstname ? character.bio : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.Aliquam aspernatur atque autem esse harum impedit iure labore numquam, quam quasi sequi similique vero voluptate.Maxime necessitatibus quam quas quidem recusandae! Lorem ipsum dolor sit amet, consectetur adipisicing elit.Ad animi architecto asperiores cupiditate distinctio esse eum facere fuga harum itaque iusto minus mollitia nostrum pariatur, perspiciatis possimus praesentium provident vitae.Lorem ipsum dolor sit amet, consectetur adipisicing elit.Aperiam atque blanditiis cumque dignissimos et expedita facere fuga illum impedit magnam mollitia nihil quas repudiandae rerum, saepe soluta vel veniam voluptatum.' }}
            </div>
          </div>
        </div>
        <div class="div2"></div>
        <div class="div3 mt-16">
          <BlackGreenDiv title="DEFAULT"/>
          <div style="overflow-y: auto">
            <div >
              <h1 class="font-bold">{{ skill?.name || 'Skill title' }}</h1>
              <p class="pl-4">{{ skill?.description || 'Skill description' }}</p>
              <h2 class="font-bold pl-2">Skill rule</h2>
              <p class="pl-4">{{ skill?.rule || 'Skill rule description' }}</p>
            </div>
          </div>
        </div>
        <div class="div4 mt-16">
          <BlackGreenDiv title="SKILLS"/>
          <div style="overflow-y: auto">
            <div>
              <h1 class="font-bold">{{ skill?.name || 'Skill title' }}</h1>
              <p class="pl-2">{{ skill?.description || 'Skill description' }}</p>
              <h2 class="font-bold pl-2">Skill rule</h2>
              <p class="pl-4">{{ skill?.rule || 'Skill rule description' }}</p>
            </div>
          </div>
        </div>
        <div class="statGrid">
          <div class="w-32">
            <BlackGreenDiv title="FOR" :right-green-div="false" :left-green-div="false"/>
            <div class="border-fc-green border-2 border-t-0 h-16 w-full flex justify-center items-center text-2xl">
              {{ character?.stats?.for || 0}}
            </div>
          </div>
          <div class="w-32">
            <BlackGreenDiv title="DEX" :right-green-div="false" :left-green-div="false"/>
            <div class="border-fc-green border-2 border-t-0 h-16 w-full flex justify-center items-center text-2xl">
              {{ character?.stats?.dex || 0}}
            </div>
          </div>
          <div class="w-32">
            <BlackGreenDiv title="CON" :right-green-div="false" :left-green-div="false"/>
            <div class="border-fc-green border-2 border-t-0 h-16 w-full flex justify-center items-center text-2xl">
              {{ character?.stats?.con || 0}}
            </div>
          </div>
          <div class="w-32">
            <BlackGreenDiv title="INT" :right-green-div="false" :left-green-div="false"/>
            <div class="border-fc-green border-2 border-t-0 h-16 w-full flex justify-center items-center text-2xl">
              {{ character?.stats?.int || 0}}
            </div>
          </div>
          <div class="w-32">
            <BlackGreenDiv title="SAG" :right-green-div="false" :left-green-div="false"/>
            <div class="border-fc-green border-2 border-t-0 h-16 w-full flex justify-center items-center text-2xl">
              {{ character?.stats?.sag || 0}}
            </div>
          </div>
          <div class="w-32">
            <BlackGreenDiv title="CHA" :right-green-div="false" :left-green-div="false"/>
            <div class="border-fc-green border-2 border-t-0 h-16 w-full flex justify-center items-center text-2xl">
              {{ character?.stats?.cha || 0 }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </sidebar-layout>
</template>

<script>
import { mapState, mapActions } from "vuex"
import BlackGreenDiv from "@/components/subComponent/BlackGreenDiv";
import StatSelector from "@/components/subComponent/StatSelector.vue"
import StatPreview from "@/components/subComponent/StatPreview.vue"
import SidebarLayout from "@/layouts/Sidebar";

export default {
    name: "CharacterDetails",
  components: {SidebarLayout, StatSelector,BlackGreenDiv},

  data() {
        return {
          wizard:require('../../assets/wizard.svg'),
          charData: {
            "character": {
              "firstname": "",
              "lastname": "",
              "sex": "",
              "eye_color": "",
              "hair_color": "",
              "skin_color": "",
              "clothing_color_1": "",
              "clothing_color_2": "",
              "bio": "",
              "alignment": "",
              "ideals": "",
              "flaws": "",
              "age": 0,
              "weight": 0,
              "height": 0,
              "hp": 0,
              "race_id": "",
              "class_id": "",
              "level_id": 1
            },
            "skills": [],
            "stats": {
              "racial": [] // { name: String, value: Number }
            },
            "languages": [],
            "character_characteristic": [],
            "equipment": [],
            "money": {
              "gold": 0,
              "silver": 0,
              "copper": 0
            }
          },
        }
    },
    computed: {
        ...mapState("characters", {
            character: (state) => state.character,
        }),
    },
    async mounted() {
        const { id } = this.$route.params
        //await this.fetch_character(id)
    },
    methods: {
        ...mapActions({
            fetch_character: "characters/fetch_character",
        }),}}
</script>

<style scoped>
.parent {
  display: grid;
  grid-template-columns: repeat(2, 1fr) 1.4fr 0 1.4fr;
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 0px;
}

.div1 { grid-area: 1 / 1 / 6 / 3; }
.div2 { grid-area: 1 / 3 / 3 / 6; }
.div3 { grid-area: 3 / 3 / 6 / 4; }
.div4 { grid-area: 3 / 5 / 6 / 6; }
.statGrid {
  place-items: center;
  grid-area: 1 / 3 / 3 / 6;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 30px;
}
</style>