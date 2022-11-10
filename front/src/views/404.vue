<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <div class="flex flex-col items-center justify-center space-y-2">
            <img src="@/assets/logo.png" alt="Logo" class="h-32" />
            <h1 class="text-4xl font-bold text-fc-black">
                404
            </h1>
            <p class="text-fc-black opacity-70 font-bold italic">
                {{ $t('Page introuvable') }}
            </p>

            <Button 
                :filled="true"
                class="w-1/2 self-center"
                :buttonText="$t('Retour')"
                @click="() => this.handleBack()"
            />
        </div>
    </div>
</template>

<script>
import Button from '@/components/subComponent/Button.vue'

export default {
    name: 'NotFound',
    components: {
        Button,
    },

    methods: {
        handleBack() {
            if (this.$store.getters.connected)
                this.$router.push('/user/dashboard')
            else
                this.$router.push('/')
        }
    }
}
</script>
