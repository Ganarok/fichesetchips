<template>
    <SidebarLayout title="Rooms">
        <div
            class="flex flex-row w-[90%] items-center justify-between self-center bg-fc-black h-16">
            <div class="absolute">
                <div
                    style="z-index: -10"
                    class="relative -left-6 -top-6 bg-fc-green w-12 h-12" />
            </div>

            <div class="flex flex-row pl-6 space-x-6">
                <Selector
                    :items="ROOMSTATUS"
                    :onSelectItem="(v) => this.updateRoomStatus(v)" />

                <Selector
                    :items="PLAYSTYLE"
                    :onSelectItem="(v) => this.updatePlayStyle(v)" />
            </div>

            <input
                class="w-[20%] px-2 h-full bg-fc-black-light font-bold outline-none"
                :class="search.length > 0 ? 'text-fc-yellow' : ''"
                :value="search"
                @input="(v) => (this.search = v.target.value)"
                placeholder="Rechercher..."
                type="text" />
        </div>

        <Sheet :route="apiRoute" :search="query" />
    </SidebarLayout>
</template>

<script>
import SidebarLayout from '~/layouts/Sidebar.vue'
import Sheet from '@/components/Sheet.vue'
import Selector from '@/components/subComponent/Selector.vue'
import { ROOMSTATUS, PLAYSTYLE } from '~/utils/enums'

export default {
    components: {
        SidebarLayout,
        Sheet,
        Selector,
    },
    methods: {
        updateRoomStatus(status) {
            this.selectedRoomStatus = status
            this.parseQueries('roomStatus', status)
        },
        updateMinLevel() {},
        updateExperience() {},
        updatePlayStyle(playStyle) {
            this.selectedPlayStyle = playStyle
            this.parseQueries('playstyle', playStyle)
        },
        parseQueries(queryType, queryToAdd) {
            const queryRank = this.query.search(`${queryType}=`)
            const queryNumber = (this.query.match('=') || []).length

            console.log('number', queryNumber)

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
    },
    data() {
        return {
            query: '?',
            ROOMSTATUS,
            PLAYSTYLE,
            search: '',
            selectedRoomStatus: '',
            selectedPlayStyle: '',
            apiRoute: 'rooms',
        }
    },
}
</script>
