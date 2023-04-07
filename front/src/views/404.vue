<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <div class="flex flex-col items-center justify-center space-y-4">
            <img
                src="@/assets/logo.png"
                alt="Logo"
                class="h-32"
            >

            <h1 class="text-4xl font-bold text-fc-black">
                404
            </h1>

            <p class="text-fc-black opacity-70 font-bold text-xl italic">
                {{ $t("not_found") }}
            </p>

            <Button
                :button-text="$t('back')"
                class="bg-fc-green w-1/2 self-center px-4 py-2"
                textColor="text-fc-black"
                color="fc-green"
                :rounded="false"
                @click="() => handleBack()"
            />
        </div>
    </div>
</template>

<script>
import Button from "@/components/common/Button.vue"

export default {
    name: "NotFound",
    components: {
        Button,
    },

    methods: {
        handleBack() {
            if (this.$store.getters.connected) this.$router.push("/user/dashboard")
            else this.$router.push("/")
        },
    },
}
</script>
