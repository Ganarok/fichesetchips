<template>
    <SidebarLayout>
        <div
            class="flex w-full h-full items-center justify-center" 
            v-if="loading"
        >
            <Loader />
        </div>

        <Room :room="room" />
    </SidebarLayout>
</template>

<script>
import SidebarLayout from '@/layouts/Sidebar.vue'
import Loader from '@/components/Loader.vue'
import Room from '@/components/Room.vue'
import { apiCall } from '@/utils/apiCall'
import { useToast } from 'vue-toastification'

export default {
    components: {
        SidebarLayout,
        Loader,
        Room
    },
    methods: {
        async getRoomData() {
            const { id } = this.$route.params

            try {
                const res = await apiCall({
                    route: `/rooms/${id}`,
                    method: 'GET'
                })

                this.room = res
            } catch (error) {
                const toast = useToast()

                console.log(error)
                // toast.error(typeof error === 'object' ? error.message : error)
            } finally {
                this.loading = false
            }
        }
    },
    mounted() {
        this.getRoomData()
    },
    data() {
        const { id } = this.$route.params

        return {
            id,
            loading: true,
            room: {
                title: "Ta race l'orc",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                universe: "Caves & Monstres",
                style: "Serieux",
                experience: "Novice",
                levelGap: "1-10",
                language: "Francais",
                mj: {
                    username: "Ganarok",
                    avatar: "",
                    gamePlayedAsMj: 240
                },
                players: [
                    {
                        username: "Ganarok",
                        avatar: ""
                    }
                ],
                isPrivate: false
            }
        }
    }
}
</script>
