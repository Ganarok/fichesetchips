<template>
    <div>
        <div class="flex flex-row w-[90%] items-center justify-between self-center bg-fc-black h-16">
            <div class="absolute">
                <div
                    style="z-index: -10"
                    class="relative -left-6 -top-6 bg-fc-green w-12 h-12"
                />
            </div>
            <div class="flex flex-row items-center pl-6 space-x-6">
                <Selector 
                    :items="ClassList"
                    :default-selected-item="{
                        name: $t('Class'),
                        value: ''
                    }"
                    :on-select-item="(v) => updateClass(v)"
                />
            </div>
            <input
                class="w-[20%] px-2 h-full bg-fc-black-light font-bold outline-none"
                :class="search.length > 0 ? 'text-fc-yellow' : ''"
                :value="search"
                placeholder="Rechercher..."
                type="text"
                @input="(v) => (search = v.target.value)"
            >
        </div>
        
        <div class="flex justify-between flex-row gap-x-2 gap-y-2 flex-wrap mt-4">
            <Card 
                :character="defaultCard"
                class="max-w-[340px] min-w-[340px] max-h-[550px]"/>
            <Card 
                v-for="character in characters"
                :key="character.id"
                :character="character"
                class="max-w-[340px] min-w-[340px] max-h-[550px]"
            />
        </div>
    </div>
</template>

<script>
import Card from "@/components/subComponent/Cards/CharacterCard.vue"
import Selector from "@/components/subComponent/Selector.vue"
import { mapState, mapActions } from "vuex"

export default {
    name: "CharactersList",
    components:{
        Card,
        Selector,
    },
    data() {
        return {
            ClassList: [{name: "Barbare", value:"barbare"},
                {name: "Druide", value:"druide"},
                {name: "Ensorceleur", value:"ensorceleur"},
                {name: "Guerrier", value:"guerrier"},
                {name: "Mage", value:"mage"},
                {name: "Paladin", value:"paladin"},
                {name: "Prêtre", value:"pretre"},
                {name: "Voleur", value:"voleur"}],
            selectedClass: "",
            query: "?",
            search: "",
            defaultCard: {"firstname": "????????", "lastname": "", "id": "create", "bio": "Nouveau personnage"}
        }
    },
    computed: {
        ...mapState("characters", {
            characters: (state) => state.characters,
        })
    },
    methods: {
        ...mapActions({
            fetch_characters: "characters/fetch_characters"
        }),
        updateClass(status){
            this.selectedClass = status
            this.parseQueries("Class", status)
        },
        parseQueries(queryType, queryToAdd) {
            const queryRank = this.query.search(`${queryType}=`)
            const queryNumber = (this.query.match("=") || []).length

            // If we don't find the query, we simply add it
            if (queryRank === -1)
                this.query += `${
                    queryNumber >= 1 ? "&" : ""
                }${queryType}=${queryToAdd}`
            else {
                // otherwise, we update it
                const cuttedQuery = this.query.split("&")

                // TODO: Update la query
                console.log(cuttedQuery)
            }
        },
    }
}
</script>

<style>

.container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    row-gap: .5em;
    flex-wrap: wrap;
    margin-top: 1em;
    
    
}

    
</style>