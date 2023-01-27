<template>
    <div>
        <div
            class="flex flex-row w-[90%] items-center justify-between self-center bg-fc-black"
        >
            <div class="absolute">
                <div
                    style="z-index: -10"
                    class="relative -left-6 -top-6 bg-fc-green w-12 h-12"
                />
            </div>

            <div class="flex flex-row py-3 items-center pl-6 space-x-6">
                <Selector
                    :items="FILTERUNIVERSES"
                    :default-selected-item="$t('Filtre')"
                    :on-select-item="(v) => updateFilter(v)"
                />

                <Selector
                    :items="TYPEUNIVERSES"
                    :default-selected-item="'Type'"
                    :on-select-item="(v) => updateType(v)"
                />
            </div>

            <input
                class="grid1Col:w-[35%] w-[20%] px-2 h-full bg-fc-black-light font-bold outline-none"
                :class="search.length > 0 ? 'text-fc-yellow' : ''"
                :value="search"
                placeholder="Rechercher..."
                type="text"
                @input="(v) => (search = v.target.value)"
            >
        </div>
        <p>Vos langues déjà apprises :</p>
        <div
            v-for="language in stepInfo.data"
            :key="language.id"
            class="max-h-[302px] max-w-[480px] mobile:max-h-[490px]"
        >
            <div
                v-for="language_learned in character_creation.languages"
                :key="language_learned"
                class="max-h-[302px] max-w-[480px] mobile:max-h-[490px]"
            >
                <p v-if="language_learned == language.id">
                    {{ language.name }}
                </p>
            </div>
        </div>
        <div
            class="px-20 py-10 grid grid-cols-3 gap-6 items-center tablet:grid-cols-2 tablet:px-10 tablet:py-5 grid1Col:grid-cols-1"
        >
            <!-- TODO : pas possible de choisir une langue déjà apprise -->
            <div
                v-for="language in stepInfo.data"
                :key="language.id"
                class="max-h-[302px] max-w-[480px] mobile:max-h-[490px] cursor-pointer"
                @click="chooseLanguage(language.id)"
            >
                <div class="p-3 bg-fc-white h-full max-h-[109px] mobile:max-h-[119px]">
                    <h3 class="text-fc-green font-bold">
                        {{ language.name }}
                    </h3>
                    <p class="p-1 text-sm">
                        {{ language }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Selector from "@/components/subComponent/Selector.vue"
import { FILTERUNIVERSES, TYPEUNIVERSES } from "@/utils/enums"
import { mapState, mapMutations } from "vuex"

export default {
    components: {
        Selector,
    },
    props: {
        stepInfo: {type: Object, default: new Object()}
    },
    data() {
        return {
            FILTERUNIVERSES,
            TYPEUNIVERSES,
            query: "?",
            search: "",
            selectedFilter: "",
            selectedType: "",
        }
    },
    computed: {
        ...mapState("characters", {
            character_creation: (state) => state.character_creation,
        }),
    },
    async mounted() {
    },
    methods: {
        ...mapMutations({
            set_character_creation: "characters/set_character_creation",
        }),
        updateFilter(filter) {
            this.selectedFilter = filter
            this.parseQueries("filter", filter)
        },
        updateType(type) {
            this.selectedType = type
            this.parseQueries("type", type)
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
        async chooseLanguage(id) {
            this.character_creation.languages.push(id)
            const languages_distinct = new Set(this.character_creation.languages)
            this.character_creation.languages = [...languages_distinct]
            this.set_character_creation(this.character_creation)
            await this.$router.push({ name: 'CharacterCreate', query: {currentStep: 'Class' }})
        },
    }
}

</script>
