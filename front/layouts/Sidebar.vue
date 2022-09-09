<template>
    <div name="SidebarLayout" class="flex">
        <Sidebar />

        <div v-if="topRightPixels" class="absolute top-0 right-0">
            <img src="../assets/topRightPixels.svg" alt="pixels" />
        </div>

        <div
            class="flex flex-col w-full p-4 z-10 space-y-4 h-screen overflow-auto">
            <h1
                class="font-bold text-xl p-6 self-center sm:self-start sm:text-2xl md:px-8 lg:px-10 lg:text-3xl xl:text-5xl">
                {{ title }}
            </h1>

            <slot />
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/subComponent/Sidebar.vue'

export default {
    name: 'SidebarLayout',
    props: {
        title: {
            type: String,
            default: 'Title',
        },
        topRightPixels: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        Sidebar,
    },
}
</script>
