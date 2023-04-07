<template>
    <SidebarLayout title="Rooms">
        <div
            class="flex flex-row w-[90%] items-center justify-between self-center bg-fc-black h-16"
        >
            <div class="absolute">
                <div
                    style="z-index: -10"
                    class="relative -left-6 -top-6 bg-fc-green w-12 h-12"
                />
            </div>

            <div class="flex flex-row items-center pl-6 space-x-6">
                <Selector
                    :items="ROOMSTATUS"
                    :default-selected-item="{
                        name: $t('status'),
                        value: ''
                    }"
                    :on-select-item="(v) => updateRoomStatus(v)"
                />

                <ParamInput
                    :input-text="'Full'"
                    input-type="checkbox"
                    :input-value="roomfull"
                    :on-value-changed="(v) => updateRoomFull(v.target.value)"
                />

                <ParamInput
                    :input-text="'Privée'"
                    input-type="checkbox"
                    :input-value="roomprivate"
                    :on-value-changed="(v) => updateRoomPrivate(v.target.value)"
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

        <Sheet
            :route="apiRoute"
            :search="query"
        />
    </SidebarLayout>
</template>

<script>
import SidebarLayout from "@/layouts/Sidebar.vue"
import Sheet from "@/components/Sheet.vue"
import Selector from "@/components/common/Selector.vue"
import ParamInput from "@/components/common/ParamInput.vue"
import { ROOMSTATUS, PLAYSTYLE } from "@/utils/enums"

export default {
    components: {
        SidebarLayout,
        Sheet,
        Selector,
        ParamInput,
    },
    data() {
        return {
            ROOMSTATUS,
            PLAYSTYLE,
            query: "?",
            search: "",
            selectedRoomStatus: "",
            selectedPlayStyle: "",
            apiRoute: "rooms",
            minLevel: 0,
            roomfull: false,
            roomprivate: false,
        }
    },
    methods: {
        updateRoomStatus(status) {
            this.selectedRoomStatus = status
            this.parseQueries("roomstatus", status)
        },
        updatePlayStyle(playStyle) {
            this.selectedPlayStyle = playStyle
            this.parseQueries("playstyle", playStyle)
        },
        updateMinLevel(level) {
            this.minLevel = level
            this.parseQueries("minlevel", level)
        },
        updateRoomFull(state) {
            this.roomfull = state
            this.parseQueries("roomfull", state)
        },
        updateRoomPrivate(state) {
            this.roomprivate = state
            this.parseQueries("roomprivate", state)
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
        getRooms() {},
    },
}
</script>
