<template>
  <div
    class="flex relative w-full h-12 px-4 justify-between items-center text-white font-bold select-none bg-fc-black border-b border-fc-green z-50"
  >
    <img
      src="@/assets/option.svg"
      class="h-6 w-6 cursor-pointer transition ease-in-out hover:opacity-80 hover:rotate-90"
      alt="option"
    />

    <h1>MapMaker</h1>

    <img
      src="@/assets/icon.svg"
      class="h-7 w-7 cursor-pointer hover:opacity-80"
      alt="logo"
      :onclick="() => $router.push('/')"
    />
  </div>
</template>

<script>
export default {
  name: "Topbar",
};
</script>
