<template>
    <div class="flex w-full h-full items-center justify-center">
        <Loader v-if="loading" />

        <div v-else class="font-bold text-fc-black-light">
            Pas de donnée pour le moment
        </div>
    </div>
</template>

<script>
import { apiCall } from '~/utils/apiCall'
import Loader from './Loader.vue'

export default {
    props: {
        route: String,
        search: String,
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
            if (route) {
                setTimeout(() => {
                    console.log('Simulating ApiCall')
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
                //     this.$toast.show("Error when requesting the data.", {
                //         theme: "toasted-primary",
                //         position: "top-right",
                //         duration : 4000
                //     })
                // } finally {
                //     this.loading = false
                // }
            } else {
                console.log('No route filled within props')
            }
        },
    },
    components: { Loader },
}
</script>
