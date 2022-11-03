<template>
    <router-view />
</template>

<script>
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'

export default {
    name: 'App',
    setup() {
        const { t } = useI18n() // call `useI18n`, and spread `t` from  `useI18n` returning
        const toast = useToast()

        return {
            t,
            toast,
        }
    },
}
</script>
