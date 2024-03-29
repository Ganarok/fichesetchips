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
                        name: $t('Statut'),
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
        <div
            v-if="loading"
            class="pl-6 space-x-6"
        >
            <div v-if="gm_rooms.length > 0 || published_rooms.length > 0 || player_rooms.length > 0 || unpublished_rooms.length > 0">
                <div v-if="unpublished_rooms.length > 0">
                    <h1 class="font-bold text-xl">
                        Vos rooms qui n'attendent qu'à être publiées !
                    </h1>
                    <RoomSub :rooms="unpublished_rooms" />
                </div>
                <div v-if="gm_rooms.length > 0">
                    <h1 class="font-bold text-xl">
                        Rooms dont vous êtes le Maître du jeu
                    </h1>
                    <RoomSub :rooms="gm_rooms" />
                </div>
                <div v-if="player_rooms.length > 0">
                    <h1 class="font-bold text-xl">
                        Rooms dont vous êtes Player
                    </h1>
                    <RoomSub :rooms="player_rooms" />
                </div>
                <div v-if="published_rooms.length > 0">
                    <h1 class="font-bold text-xl">
                        Rooms que vous pouvez rejoindre
                    </h1>
                    <RoomSub :rooms="published_rooms" />
                </div>
            </div>
            <div
                v-else
                class="font-bold text-fc-black-light"
            >
                Pas de donnée pour le moment
            </div>
        </div>
    </SidebarLayout>
</template>

<script>
import SidebarLayout from "@/layouts/Sidebar.vue"
import RoomSub from "@/components/RoomSub.vue"
import Selector from "@/components/common/Selector.vue"
import ParamInput from "@/components/common/ParamInput.vue"
import { ROOMSTATUS, PLAYSTYLE } from "@/utils/enums"
import { mapState, mapActions } from "vuex"

export default {
    components: {
        SidebarLayout,
        RoomSub,
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
            loading: false
        }
    },
    computed: {
        ...mapState("room", {
            gm_rooms: (state) => state.gm_rooms,
            published_rooms: (state) => state.published_rooms,
            player_rooms: (state) => state.player_rooms,
            unpublished_rooms: (state) => state.unpublished_rooms,
        }),
        ...mapState("user", {
            user: (state) => state.user
        })
    },
    async mounted() {
        await this.fetch_rooms()
        this.loading = true
    },
    methods: {
        ...mapActions({
            fetch_rooms: "room/fetch_rooms"
        }),
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
    },
}
</script>
