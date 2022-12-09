<template>
    <div class="flex fixed w-full h-12 px-4 justify-between items-center text-white font-bold bg-fc-black z-50">
        <img
            src="@/assets/logoUperbar.png"
            class="h-6 w-6 cursor-pointer hover:opacity-80"
            alt="bar"
            :onclick="() => {}"
        />

        <h2>
            MapMaker
        </h2>

        <img
            src="@/assets/icon.svg"
            class="h-6 w-6 cursor-pointer hover:opacity-80"
            alt="logo"
            :onclick="() => this.$router.push('/')"
        />
    </div>
</template>

<script>

export default {
    name: 'Topbar',
}

</script>