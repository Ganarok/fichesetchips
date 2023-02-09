<template>
    <div class="flex flex-col px-4">
        <p>
            Vos langues déjà apprises :
        </p>

        <div
            v-for="language in stepInfo.data"
            :key="language.id"
            class="max-h-[302px] max-w-[480px] mobile:max-h-[490px]"
        >
            <div
                v-for="language_learned in character_creation.languages"
                :key="language_learned"
                class="text-fc-green font-bold space-x-2"
            >
                <p v-if="language_learned == language.id">
                    {{ language.name }}
                </p>
            </div>
        </div>

        <div
            class="px-20 py-10 grid grid-cols-3 gap-6 items-center tablet:grid-cols-2 tablet:px-10 tablet:py-5 grid1Col:grid-cols-1"
        >
s            <div
                v-for="language in languages"
                :key="language.id"
                @click="chooseLanguage(language.id)"
            >
                <div class="p-3 bg-fc-white h-full">
                    <h3 class="text-fc-green font-bold p-4 bg-fc-black-light cursor-pointer hover:opacity-80">
                        {{ language.name }}
                    </h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Selector from "@/components/subComponent/Selector.vue"
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
            languages: []
        }
    },
    computed: {
        ...mapState("characters", {
            character_creation: (state) => state.character_creation,
        }),
    },
    mounted() {
        const data = this.stepInfo.data.filter(dataLang => this.character_creation.languages.some(cLangId => !(cLangId === dataLang.id)))

        this.languages = data

        // this.stepInfo.data.reduce(dataLang => this.character_creation.languages.some(cLangId => !(cLangId === dataLang.id)))
    },
    methods: {
        ...mapMutations({
            set_character_creation: "characters/set_character_creation",
        }),
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
