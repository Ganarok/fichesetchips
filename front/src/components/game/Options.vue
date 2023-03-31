<template>
    <div 
        class="flex flex-col w-full h-full justify-between space-y-4 p-4 text-xl text-white"
        :style="{
            height: 'calc(100vh - 64px )'
        }"
    >
        <div class="flex flex-col space-y-4">
            <p class="self-start font-bold text-fc-yellow">
                Options
            </p>
        </div>

        <div class="flex justify-center">
            <router-link
                to="/rooms"
                class="flex font-bold hoverStyle bg-fc-yellow text-fc-black p-3"
            >
                <p class="text-base">
                    Quitter la partie 
                </p>
            </router-link>
        </div>
    </div>
</template>

<script>

export default {
    name: "Options",
}

</script>