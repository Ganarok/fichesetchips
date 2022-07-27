<template>
    <div
        class="h-screen w-[220px] bg-[#1E1E1E] flex flex-col relative justify-center"
    >
        <div class="w-full absolute top-0 flex justify-center p-6">
            <NuxtLink to="/">
                <img src="../../assets/fetc.png" alt="Fiche&Chips" />
            </NuxtLink>
        </div>

        <div
            class="flex flex-col items-center justify-center text-white space-y-8"
        >
            <NuxtLink
                to="/dashboard"
                class="font-bold text-xl"
                active-class="underline"
                >Dashboard</NuxtLink
            >
            <NuxtLink
                to="/profile"
                class="font-bold text-xl"
                active-class="underline"
                >Profile</NuxtLink
            >
            <NuxtLink
                to="/Logout"
                class="font-bold text-xl"
                active-class="text-chips-yellow"
                >Logout</NuxtLink
            >
        </div>
        <!-- <div
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
        </div> -->
        <div
            class="flex flex-col w-full justify-center items-center relative top-[32%]"
        >
            <img src="..\..\assets\icon.png" class="w-2/4" alt="F&C logo" />
            <p class="text-white text-[10px]">made with love by fiche&chips</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
}
</script>

<style></style>
