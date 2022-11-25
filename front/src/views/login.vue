<template>
    <div
        class="flex flex-col relative justify-center items-center p-4 w-screen h-screen overflow-hidden lg:items-start lg:p-0 lg:justify-between">
        <img
            class="absolute hidden object-cover h-full w-full lg:flex"
            src="@/assets/index/background.jpg"
            alt="Background" />

        <div
            class="absolute -right-24 bottom-0 opacity-95 max-h-screen lg:right-0">
            <img src="@/assets/greenpixels.svg" alt="Pixels" />
        </div>

        <img
            class="z-10 w-[50%] max-w-xs lg:m-4"
            src="@/assets/logo.png"
            alt="Fiche&Chips" />
        <div
            class="flex flex-col z-10 lg:absolute lg:right-16 lg:bottom-16 w-80">
            <div v-if="!loading" class="ml-5">
                <h1 class="text-5xl">{{ $t('Connexion') }}</h1>
                <router-link
                    class="underline text-xs opacity-70 cursor-pointer"
                    to="/register">
                    {{ $t('Pas encore inscrit ? Cliquez ici') }}
                </router-link>
            </div>

            <div v-if="!loading" class="space-y-1 mt-4">
                <CustomInput
                    :maxLength="36"
                    @input="(v) => this.handleUsername(v.target.value)"
                    :placeHolder="$t('Identifiant')"
                    :hasError="credentialsError"
                    outline="fc-green"
                    :onFocusOut="() => this.handleFocusOut()" />

                <CustomInput
                    :maxLength="64"
                    @input="(v) => this.handlePassword(v.target.value)"
                    type="password"
                    :placeHolder="$t('Mot de passe')"
                    :hasError="credentialsError"
                    outline="fc-green"
                    :onFocusOut="() => this.handleFocusOut()" />
                <p
                    class="ml-5 mb-2 underline text-xs opacity-70 cursor-pointer">
                    <router-link to="/forgot-password">
                        {{ $t('Mot de passe oublié') }}
                    </router-link>
                </p>
            </div>

            <div class="self-center my-16" v-else>
                <Loader cubeColor="fc-yellow" />
            </div>

            <div v-if="!loading" class="flex justify-between items-end">
                <p class="flex ml-5 text-sm text-fc-red italic items-center">
                    {{ errorText }}
                </p>

                <button
                    @click="handleLogin"
                    class="mr-5 self-end text-5xl font-bold">
                    Go
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import CustomInput from '@/components/subComponent/CustomInput.vue'
import subModalSignup from '@/components/subModals/signup.vue'
import Loader from '@/components/Loader.vue'
import { apiCall } from '@/utils/apiCall'
import { useToast } from 'vue-toastification'
const CryptoJS = require("crypto-js");


export default {
    name: 'Login',
    components: { subModalSignup, CustomInput, Loader },
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            username: '',
            password: '',
            credentialsError: false,
            errorText: '',
        }
    },
    methods: {
        handleUsername(v) {
            this.username = v
        },
        handlePassword(v) {
            this.password = v
        },
        handleFocusOut() {
            this.errorText = ''
            this.credentialsError = false
        },
        handleLogin() {
            const { username } = this
            let { password } = this
            const toast = useToast()
            password = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex)

            if (username && password) {
                apiCall({
                    method: 'POST',
                    route: '/auth/login',
                    body: JSON.stringify({
                        username,
                        password: password,
                    }),
                })
                    .then(async (res) => {
                        this.$store.commit('setUser', {
                            ...res.user,
                            access_token: res.access_token,
                        })

                        await this.$router.push('/user/dashboard')

                        setTimeout(
                            () =>
                                toast.success(
                                    `${this.$t('Bienvenue')} ${
                                        res.user.username
                                    } !`),
                            400
                        )
                    })
                    .catch((err) => {
                        toast.error( typeof err === 'object' ? err.message : err)
                        console.log('err', err)

                        this.credentialsError = true
                        this.errorText = this.$t(
                            'Les identifiants ne sont pas valides'
                        )
                    })
            }
        },
    },
}
</script>
