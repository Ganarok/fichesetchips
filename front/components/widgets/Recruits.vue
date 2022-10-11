<template>
    <div
        class="flex flex-col relative space-x-4 w-full h-full sm:max-w-[50%] sm:max-h-[50%]">
        <div
            class="flex relative items-center justify-between text-white font-bold px-6 w-full bg-fc-black h-[15%] min-h-[3rem]">
            <div class="absolute left-0 w-4 h-full bg-fc-green" />

            <h3>{{ $t('Titre') }}</h3>
            <h3>{{ $t('Univers') }}</h3>
            <h3>{{ $t('MJ') }}</h3>
            <h3>{{ $t('Joueurs') }}</h3>
        </div>

        <div class="flex items-center justify-center w-full h-full">
            <Loader />
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader.vue'
import Button from '@/components/subComponent/Button.vue'

export default {
    components: {
        Loader,
        Button,
    },
}
</script>
