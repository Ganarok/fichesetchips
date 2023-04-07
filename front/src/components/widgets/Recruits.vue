<template>
    <div
        class="flex flex-col relative p-2 space-x-4 w-full h-full sm:max-w-[50%] sm:max-h-[50%]"
    >
        <div
            class="flex relative items-center justify-between text-white font-bold px-6 w-full bg-fc-black h-[15%] min-h-[3rem]"
        >
            <div class="absolute left-0 w-4 h-full bg-fc-green" />

            <h3>{{ $t("title") }}</h3>
            <h3>{{ $t("universe") }}</h3>
            <h3>{{ $t("gm") }}</h3>
            <h3>{{ $t("players") }}</h3>
        </div>

        <div class="flex items-center justify-center w-full h-full">
            <Loader v-if="loading" />
            <p
                v-else
                class="font-bold"
            >
                {{ $t('no_data') }}
            </p>
        </div>
    </div>
</template>

<script>
import Loader from "@/components/common/Loader.vue"
// import Button from '@/components/common/Button.vue'

export default {
    components: {
        Loader,
        // Button,
    },
    data() {
        return {
            loading: {
                type: Boolean,
                default: true,
            },
        }
    },
    created() {
        setTimeout(() => (this.loading = false), 1000)
    },
}
</script>
