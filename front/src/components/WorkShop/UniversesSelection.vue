<template>
    <div class="flex flex-col">
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
                    :default-selected-item="{
                        name: $t('Filtre'),
                        value: ''
                    }"
                    :on-select-item="(v) => selectedFilter = v"
                />
            </div>

            <input
                class="flex grid1Col:w-[35%] w-[20%] px-2 h-full bg-fc-black-light font-bold outline-none"
                :class="search.length > 0 ? 'text-fc-yellow' : ''"
                :value="search"
                placeholder="Rechercher..."
                type="text"
                @input="(v) => (search = v.target.value)"
            >
        </div>

        <div
            class="px-20 py-10 grid grid-cols-3 gap-6 items-center tablet:grid-cols-2 tablet:px-10 tablet:py-5 grid1Col:grid-cols-1"
        >
            <div
                v-for="universe in universes"
                :key="universe.id"
                class="max-h-[302px] max-w-[480px] mobile:max-h-[490px] cursor-pointer"
                @click="chooseUnivers(universe.id)"
            >
                <img
                    class="max-h-[192px] w-full"
                    :src="universe.image"
                >
                <div class="p-3 bg-fc-white h-full max-h-[109px] mobile:max-h-[119px]">
                    <h3 class="text-fc-green font-bold">
                        {{ universe.name }}
                    </h3>
                    <p class="p-1 text-sm">
                        {{ universe.description }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Selector from "@/components/subComponent/Selector.vue"
import { FILTERUNIVERSES, TYPEUNIVERSES } from "@/utils/enums"
import { mapState, mapActions, mapMutations } from "vuex"

export default {
    components: {
        Selector,
    },
    data() {
        return {
            FILTERUNIVERSES,
            TYPEUNIVERSES,
            query: "?",
            search: "",
            selectedFilter: "",
            selectedType: ""
        }
    },
    computed: {
        ...mapState("universes", {
            universes: (state) => state.universes,
        }),
    },
    async mounted() {
        await this.fetch_universes()
    },
    methods: {
        ...mapActions({
            fetch_universes: "universes/fetch_universes",
        }),
        ...mapMutations({
            set_universe: "universes/set_universe",
            set_completed: "characters/set_completed",
        }),
        async chooseUnivers(id) {
            this.set_universe(id)
            this.set_completed()
            this.$router.push({ name: 'CharacterCreate', query: {currentStep: 'Race' }})
        },
    }
}

</script>
