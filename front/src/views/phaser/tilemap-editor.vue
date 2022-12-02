<script setup>
import PhaserContainer from "@/components/PhaserContainer";
</script>


<template>
  <Suspense>
    <PhaserContainer />

    <template #fallback>
      <div class="placeholder">Downloading ...</div>
    </template>
  </Suspense>
</template>

<script>
export default {
  name: "tilemapEditor",
};
</script>
