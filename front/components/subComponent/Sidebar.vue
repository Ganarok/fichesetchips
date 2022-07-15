<template>
    <div
        class="h-screen w-80 bg-[#1E1E1E] flex flex-col relative justify-center"
    >
        <div class="w-full absolute top-0 flex justify-center p-12">
            <NuxtLink to="/">
                <img
                    class="max-h-52"
                    src="../../static/logo.png"
                    alt="Fiche&Chips"
                />
            </NuxtLink>
        </div>

        <div class="flex flex-col items-center justify-center text-white">
            <h1 class="text-2xl">Dashboard</h1>
            <div class="w-20 h-[2px] rounded-md bg-white mt-[2px] mb-8"></div>
            <NuxtLink to="/" active-class="text-chips-yellow">Home</NuxtLink>
            <NuxtLink to="/Logout" active-class="text-chips-yellow"
                >Logout</NuxtLink
            >
        </div>
        <div
            class="h-full w-1 absolute right-5 flex flex-col place-content-evenly"
        >
            <div
                v-for="i in 15"
                :key="i"
                class="h-5 w-[2px]"
                :class="{
                    'bg-chips-yellow': i % 2 != 0,
                    'bg-fiche-green': i % 2 == 0,
                }"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
}
</script>

<style></style>
