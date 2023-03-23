<template>
    <SidebarLayout :title="$t('Cartes')">
        <div
            :class="`flex w-[90%] h-full self-center ${
                loading ? 'items-center justify-center' : 'justify-start'
            }`"
        >
            <Loader v-if="loading" />

            <div
                v-else
                class="flex flex-col flex-wrap sm:flex-row justify-center lg:justify-start items-start gap-4"
            >
                <div
                    class="flex flex-col w-80 transition hoverStyle"
                >
                    <div
                        class="flex items-center justify-around relative bg-fc-black h-48 p-4"
                        @click="() => $router.push('/mapmaker')"
                    >
                        <img
                            src="@/assets/icons/plus.svg"
                            alt="plus"
                        >
                    </div>

                    <div class="flex flex-col space-y-3 p-2 bg-gray-50">
                        <p class="text-fc-green font-bold">
                            Créer
                        </p>

                        <p class="ml-6 text-fc-black-light">
                            Créer une nouvelle carte
                        </p>
                    </div>
                </div>

                <MapPreview
                    v-for="map in maps.data"
                    :key="map.id"
                    :map="map"
                />
            </div>
        </div>
    </SidebarLayout>
</template>

<script>

import { apiCall } from "@/utils/apiCall"
import MapPreview from "@/components/common/MapPreview.vue"
import SidebarLayout from "@/layouts/Sidebar.vue"
import Loader from "@/components/common/Loader.vue"

export default {
    name: "Maps",
    components: {
        SidebarLayout,
        Loader,
        MapPreview
    },
    data() {
        return {
            loading: true,
            maps: [],
        }
    },
    mounted() {
        this.getMaps()
    },
    methods: {
        async getMaps() {
            this.maps = await apiCall({
                method: 'GET',
                route: '/maps'
            })

            console.log(this.maps)
            this.loading = false

            // setTimeout(() => {
            //     this.loading = false
            // }, 1000)
        },
    },
}
</script>
