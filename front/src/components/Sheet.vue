<template>
    <div class="flex w-full h-full items-center justify-center">
        <Loader v-if="loading" />

        <div
            v-else
            class="font-bold text-fc-black-light"
        >
            Pas de donnée pour le moment
        </div>
    </div>
</template>

<script>
import Loader from "./common/Loader.vue"
// import { useToast } from 'vue-toastification'

export default {
    components: { Loader },
    props: {
        route: {
            type: String,
            default: ''
        },
        search: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            data: {
                type: Array,
                default: [],
            },
            loading: {
                type: Boolean,
                default: true,
            },
        }
    },
    watch: {
        async route(newRoute) {
            this.loading = true

            this.fetchRoute(newRoute)
        },
        search(v) {
            console.log(v)
        },
    },
    created() {
        this.fetchRoute(this.route)
    },
    methods: {
        async fetchRoute(route) {
            // const toast = useToast()

            if (route) {
                setTimeout(() => {
                    console.log("Simulating ApiCall")
                    this.loading = false
                }, 100)

                // try {
                //     const res = await apiCall({
                //         method: 'GET',
                //         route,
                //     })
                //     if (!res.ok)
                //         throw new Error()
                //     this.data = await res.json()
                // } catch (error) {
                //     console.log(error)
                //     toast.error("Error when requesting the data.")
                // } finally {
                //     this.loading = false
                // }
            } else {
                console.log("No route filled within props")
            }
        },
    },
}
</script>
