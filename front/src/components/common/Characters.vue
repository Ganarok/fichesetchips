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
            <div class="flex flex-col items-center max-w-xs max-h-[550px] border-2 border-fc-green p-2 hover:cursor-pointer">
                <router-link :to="`/user/character/create`">
                    <div
                        class="flex items-center justify-between w-full bg-fc-green p-2 text-xl font-bold"
                    >
                        <p>
                            ????????
                        </p>
                    
                        <p
                            class="text-fc-black opacity-60"
                        >
                            Lvl. 0
                        </p>
                    </div>
            
                    <div
                        v-if="!image"
                        class="relative bg-fc-yellow w-full my-2"
                    >
                        <img
                            src="@/assets/unknowCharacter.svg"
                            class="object-contain"
                            :style="grayed ? 'filter: grayscale(1)' : null"
                        >
                    </div>
                    
                    <div class="flex items-center justify-center w-full h-24 bg-fc-green p-2">
                        <p class="text-xl font-bold opacity-60 text-center pr-3">
                            Nouveau personnage
                        </p>
                    </div>
                </router-link>
            </div>

            <Card 
                v-for="character in characters"
                :key="character.id"
                :character="character"
            />
        </div>
    </div>
</template>

<script>
import Card from "@/components/common/Cards/CharacterCard.vue"
import Selector from "@/components/common/Selector.vue"

export default {
    name: "CharactersList",
    components:{
        Card,
        Selector,
    },
    props:{
        characters: {
            type: Array,
            default: () => []
        } 
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
        }
    },
    methods: {
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