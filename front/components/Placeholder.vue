<!-- Please remove this file from your project -->
<template>
    <div
        class="relative flex flex-col items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
    >
        <link
            href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css"
            rel="stylesheet"
        />
        <div class="mx-auto">
            <img class="max-h-52" src="../static/logo.png" alt="Fiche&Chips" />
        </div>
        <div class="flex text-xl text-black font-extrabold place-content-evenly p-4 w-80">
            <NuxtLink class="hover:text-fiche-green" to="/login">Login</NuxtLink>
            <NuxtLink class="hover:text-chips-yellow" to="/main">Main</NuxtLink>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NuxtTutorial',
}
</script>
