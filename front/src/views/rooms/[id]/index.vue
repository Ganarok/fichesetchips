<template>
    <SidebarLayout>
        <div
            v-if="loading"
            class="flex w-full h-full items-center justify-center"
        >
            <Loader />
        </div>
        
        <Room :room="room" />
    </SidebarLayout>
</template>

<script>
import SidebarLayout from "@/layouts/Sidebar.vue"
import Loader from "@/components/common/Loader.vue"
import Room from "@/components/Room.vue"
import { useToast } from "vue-toastification"
import { mapState, mapActions } from "vuex"

export default {
    components: {
        SidebarLayout,
        Loader,
        Room,
    },
    data() {
        const { id } = this.$route.params

        return {
            id,
            loading: true,
        }
    },
    computed: {
        ...mapState("errors", {
            errors: (state) => state.errors,
        }),
        ...mapState("room", {
            room: (state) => state.room,
        }),
    },
    mounted() {
        this.getRoomData()
    },
    methods: {
        ...mapActions({
            fetch_room: "room/fetch_room",
            update_error: "errors/update_error",
        }),
        async getRoomData() {
            const { id } = this.$route.params

            console.log(this.$route)
            await this.fetch_room(id)
            const toast = useToast()
            if (this.errors.message) {
                console.log(this.errors.message)
                toast.error(this.errors.message)
            }
            this.update_error({ message: null })
            this.loading = false
        },
    }}
</script>
