<template>
    <div class="flex flex-wrap gap-4 justify-center">
        <Card 
            :character="defaultCard"
            class="max-w-[340px] min-w-[340px] max-h-[550px]"
        />
        <Card 
            v-for="character in characters"
            :key="character.id"
            :character="character"
            class="max-w-[340px] min-w-[340px] max-h-[550px]"
        />
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

import Card from "@/components/subComponent/Cards/CharacterCard.vue"

export default {
    name: "CharactersList",
    components: { Card },
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