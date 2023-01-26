<template>
  <div
    class="flex flex-col relative p-2 space-x-4 w-full h-full sm:max-w-[50%] sm:max-h-[50%]"
  >
    <div
      class="flex relative items-center justify-between text-white font-bold px-6 w-full bg-fc-black h-[15%] min-h-[3rem]"
    >
      <div class="absolute left-0 w-4 h-full bg-fc-green" />

      <h3>{{ $t("Campagne en cours") }}</h3>
      <h3>{{ $t("MJ") }}</h3>
      <h3>{{ $t("Lancée le") }}</h3>
    </div>

    <div class="flex items-center justify-center w-full h-full">
      <Loader v-if="loading" />
      <p v-else class="font-bold">No data</p>
    </div>

    <div class="flex space-x-4">
      <Button button-text="Rejoindre" filled="true" color="fc-black" />

      <Button button-text="Créer" filled="true" color="fc-black" />
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import Button from "@/components/subComponent/Button.vue";

export default {
  components: {
    Loader,
    Button,
  },
  data() {
    return {
      loading: {
        type: Boolean,
        default: true,
      },
    };
  },
  created() {
    setTimeout(() => (this.loading = false), 1000);
  },
};
</script>
