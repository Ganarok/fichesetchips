<template>
    <div name="SidebarLayout" class="flex mobile:flex-col">
            <Sidebar/>
        
        <div v-if="topRightPixels" class="absolute top-0 right-0 mobile:top-[80px] mobile:w-12 z-[-1]">
                <img src="../assets/topRightPixels.svg" alt="pixels" class="w-full h-full -z-10 relative" />
        </div>

        <div
            class="flex flex-col w-full p-4 space-y-4 h-screen overflow-auto mobile:h-[calc(100vh-80px)]">
            <h1
                class="font-bold text-xl p-6 self-center sm:self-start sm:text-2xl md:px-8 lg:px-10 lg:text-3xl xl:text-5xl"
                v-if="title">
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
            default: '',
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
