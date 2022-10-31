<template>
    <div name="SidebarLayout" class="flex mobile:flex-col">
        <div class="fixed">
            <Sidebar/>
        </div>
        
        <div v-if="topRightPixels" class="absolute top-0 right-0 mobile:top-[80px] mobile:w-12 z-[-2]">
                <img src="../assets/topRightPixels.svg" alt="pixels" class="w-full h-full -z-10 relative" />
        </div>

        <div
            class="flex flex-col space-y-4 w-full h-screen mobile:h-[calc(100vh-80px)] ml-[220px] mobile:ml-0 mobile:mt-[80px] z-[-1]"
            :class="{ 'p-4' : isBorder}">
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
        isBorder: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        Sidebar,
    },
}
</script>
