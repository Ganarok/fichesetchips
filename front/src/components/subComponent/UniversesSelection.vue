<template>
    <div
        class="flex flex-row w-[90%] items-center justify-between self-center bg-fc-black">
        <div class="absolute">
            <div
                style="z-index: -10"
                class="relative -left-6 -top-6 bg-fc-green w-12 h-12" />
        </div>

        <div class="flex flex-row py-3 items-center pl-6 space-x-6">
            <Selector
                :items="FILTERUNIVERSES"
                :defaultSelectedItem="$t('Filter')"
                :onSelectItem="(v) => this.updateFilter(v)" />

            <Selector
                :items="TYPEUNIVERSES"
                :defaultSelectedItem="$t('Type')"
                :onSelectItem="(v) => this.updateType(v)" />
        </div>

        <input
            class="grid1Col:w-[35%] w-[20%] px-2 h-full bg-fc-black-light font-bold outline-none"
            :class="search.length > 0 ? 'text-fc-yellow' : ''"
            :value="search"
            @input="(v) => (this.search = v.target.value)"
            placeholder="Rechercher..."
            type="text" />
    </div>
    <div class="px-20 py-10 grid grid-cols-3 gap-6 items-center tablet:grid-cols-2 tablet:px-10 tablet:py-5 grid1Col:grid-cols-1">
        <div v-for="universe in universes.universes" class="max-h-[302px] max-w-[480px] mobile:max-h-[490px]" v-on:click="getUniverseData(universe.id)">
            <img class="max-h-[192px] w-full" :src="universe.image">
            <div class="p-3 bg-fc-white h-full max-h-[109px] mobile:max-h-[119px]">
                <h3 class="text-fc-green font-bold">{{universe.name}}</h3>
                <p class="p-1 text-sm">{{universe.description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Selector from '@/components/subComponent/Selector.vue'
import ParamInput from '@/components/subComponent/ParamInput.vue'
import { FILTERUNIVERSES, TYPEUNIVERSES } from '@/utils/enums'

export default {
    components: {
        Selector,
        ParamInput,
    },
    methods: {
        updateFilter(filter) {
            this.selectedFilter = filter
            this.parseQueries('filter', filter)
        },
        updateType(type) {
            this.selectedType = type
            this.parseQueries('type', type)
        },
        parseQueries(queryType, queryToAdd) {
            const queryRank = this.query.search(`${queryType}=`)
            const queryNumber = (this.query.match('=') || []).length

            // If we don't find the query, we simply add it
            if (queryRank === -1)
                this.query += `${
                    queryNumber >= 1 ? '&' : ''
                }${queryType}=${queryToAdd}`
            else {
                // otherwise, we update it
                const cuttedQuery = this.query.split('&')

                // TODO: Update la query
                console.log(cuttedQuery)
            }
        },
        getRooms() {},
        getUniverseData(id) {
            console.log(id)
        }
    },
    data() {
        return {
            FILTERUNIVERSES,
            TYPEUNIVERSES,
            query: '?',
            search: '',
            selectedFilter: '',
            selectedType: '',
            apiRoute: 'universes',
            universes: { "universes": [
                {"image": "https://images.newscientist.com/wp-content/uploads/2019/06/14161814/jgn6kd1.jpg", "name": "Backroom", "description": "Lorem ipsum dolor  amet, consectetur adipiscing elit. In aliquet nulla amet nibh amet in."},
                {"image": "https://images.newscientist.com/wp-content/uploads/2019/06/14161814/jgn6kd1.jpg", "name": "Backroom", "description": "Lorem ipsum dolor  amet, consectetur adipiscing elit. In aliquet nulla amet nibh amet in."},
                {"image": "https://images.newscientist.com/wp-content/uploads/2019/06/14161814/jgn6kd1.jpg", "name": "Backroom", "description": "Lorem ipsum dolor  amet, consectetur adipiscing elit. In aliquet nulla amet nibh amet in."},
                {"image": "https://images.newscientist.com/wp-content/uploads/2019/06/14161814/jgn6kd1.jpg", "name": "Backroom", "description": "Lorem ipsum dolor  amet, consectetur adipiscing elit. In aliquet nulla amet nibh amet in."},
                {"image": "https://images.newscientist.com/wp-content/uploads/2019/06/14161814/jgn6kd1.jpg", "name": "Backroom", "description": "Lorem ipsum dolor  amet, consectetur adipiscing elit. In aliquet nulla amet nibh amet in."},
                {"image": "https://images.newscientist.com/wp-content/uploads/2019/06/14161814/jgn6kd1.jpg", "name": "Backroom", "description": "Lorem ipsum dolor  amet, consectetur adipiscing elit. In aliquet nulla amet nibh amet in."},
            ]}
        }
    },
}
</script>
