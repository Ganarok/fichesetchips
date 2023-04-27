<template>
    <div class="flex flex-col">
        <div
            class="px-20 py-10 grid grid-cols-3 gap-6 items-center tablet:grid-cols-2 tablet:px-10 tablet:py-5 grid1Col:grid-cols-1"
        >
            <div
                v-for="universe in universes"
                :key="universe.id"
                class="max-h-[302px] max-w-[480px] mobile:max-h-[490px] cursor-pointer hoverStyle"
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
import { mapState, mapActions, mapMutations } from "vuex"

export default {
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
            set_currentStep: "characters/set_currentStep",
        }),
        async chooseUnivers(id) {
            this.set_universe(id)
            this.set_completed()
            this.set_currentStep('Race')
        },
    }
}

</script>
