<template>
    <SidebarLayout
        :title="$t('Cartes')"
    >
        <div
            class="flex flex-row w-[90%] items-center justify-between self-center bg-fc-black h-16">
            <div class="absolute">
                <div
                    style="z-index: -10"
                    class="relative -left-6 -top-6 bg-fc-green w-12 h-12" />
            </div>
        </div>

        <div :class="`flex w-[90%] h-full self-center ${loading ? 'items-center justify-center' : 'justify-start'}`">
            <Loader v-if="loading" />

            <div 
                class="flex flex-col flex-wrap sm:flex-row items-start"
                v-else
            >
                <div class="flex flex-col w-80 transition hover:cursor-pointer hover:scale-105">
                    <div 
                        class="flex items-center justify-around relative bg-fc-black h-48 p-4"
                        @click="() => this.$router.push('/tilemap/editor')"
                    >
                        <img
                            src="@/assets/plus.svg"
                            alt="plus"
                        />

                        <!-- <img
                            src="@/assets/import.svg"
                            alt="plus"
                            class="transition hover:cursor-pointer hover:scale-105"
                        /> -->
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
            </div>
        </div>
    </SidebarLayout>
</template>

<script>
import SidebarLayout from '@/layouts/Sidebar.vue'
import Loader from '@/components/Loader.vue'

export default {
    name: 'Maps',
    components: {
        SidebarLayout,
        Loader
    },
    data() {
        return {
            loading: true,
            maps: []
        };
    },
    methods: {
        getMaps() {
            setTimeout(() => {
                this.loading = false;
            }, 1000)
        }
    },
    mounted() {
        this.getMaps()
    }
};

</script>