<template>
    <div
        class="flex flex-col relative justify-center items-center p-4 w-screen h-screen overflow-hidden lg:items-start lg:p-0 lg:justify-between">
        <img
            class="absolute hidden object-cover h-full w-full lg:flex"
            src="@/assets/index/background.jpg"
            alt="Background" />

        <div
            class="absolute -right-24 bottom-0 opacity-95 max-h-screen lg:right-0">
            <img src="../assets/greenpixels.svg" alt="Pixels" />
        </div>

        <img
            class="z-10 w-[50%] max-w-xs lg:m-4"
            src="../static/logo.png"
            alt="Fiche&Chips" />
        <div
            class="flex flex-col z-10 lg:absolute lg:right-16 lg:bottom-16 w-80">
            <div v-if="!loading" class="ml-5">
                <h1 class="text-5xl">{{ $t('Connexion') }}</h1>
                <NuxtLink
                    class="underline text-xs opacity-70 cursor-pointer"
                    to="/register">
                    {{ $t('Pas encore inscrit ? Cliquez ici') }}
                </NuxtLink>
            </div>

            <div v-if="!loading" class="space-y-1 mt-4">
                <CustomInput
                    :maxLength="36"
                    @input="(v) => this.handleUsername(v)"
                    :placeHolder="$t('Identifiant')"
                    :hasError="credentialsError"
                    :onFocusOut="() => this.handleFocusOut()" />

                <CustomInput
                    :maxLength="64"
                    @input="(v) => this.handlePassword(v)"
                    typeInput="password"
                    placeHolder="Mot de passe" />
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
import Vue from 'vue'
import CustomInput from '~/components/subComponent/CustomInput.vue'
import subModalSignup from '~/components/subModals/signup.vue'
import Loader from '@/components/Loader.vue'
import { apiCall } from '~/utils/apiCall'
import bcrypt from 'bcryptjs'

export default Vue.extend({
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
            let saltRounds = parseInt(process.env.SALTROUNDS)
            bcrypt.hash(v, saltRounds).then((result) => {
                this.password = result
            })
        },
        handleLogin() {
            const { username } = this
            let { password } = this

            let saltRounds = parseInt(process.env.SALTROUNDS)
            password = bcrypt.hashSync(this.password, saltRounds)

            if (username && password) {
                apiCall({
                    method: 'POST',
                    route: '/auth/login',
                    body: JSON.stringify({
                        username,
                        password,
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
                                this.$toast.show(
                                    `${this.$t('Bienvenue')} ${
                                        res.user.username
                                    } !`,
                                    {
                                        theme: 'toasted-primary',
                                        position: 'top-right',
                                        duration: 4000,
                                    }
                                ),
                            400
                        )
                    })
                    .catch((err) => {
                        this.$toast.show(err, {
                            theme: 'toasted-primary',
                            position: 'top-right',
                            duration: 4000,
                        })
                        console.log('err', err)

                        this.credentialsError = true
                        this.errorText = this.$t(
                            'Les identifiants ne sont pas valides'
                        )
                    })
            }
        },
    },
})
</script>
