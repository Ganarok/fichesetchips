<template>
    <div
        class="flex flex-col relative justify-center items-center p-4 w-screen h-screen overflow-hidden lg:items-start lg:p-0 lg:justify-between">
        <img
            class="absolute hidden object-cover h-full w-full lg:flex"
            src="@/assets/index/background.jpg"
            alt="Background" />

        <div
            class="absolute -right-24 bottom-0 opacity-90 max-h-screen lg:right-0">
            <img src="../assets/yellowpixels.svg" alt="Pixels" />
        </div>

        <img
            class="z-10 w-[50%] max-w-xs lg:m-4"
            src="../static/logo.png"
            alt="Fiche&Chips" />
        <div
            class="flex flex-col z-10 lg:absolute lg:right-16 lg:bottom-16 w-96">
            <div class="ml-5">
                <h1 class="text-5xl">{{ $t('Inscription') }}</h1>
            </div>

            <div v-if="!loading" class="space-y-1 my-4">
                <CustomInput
                    :maxLength="36"
                    @input="(v) => this.handleUsername(v)"
                    :placeHolder="$t('Identifiant')" />
                <CustomInput
                    :maxLength="256"
                    @input="(v) => this.handleEmail(v)"
                    placeHolder="Email" />
                <CustomInput
                    :maxLength="64"
                    @input="(v) => this.handlePassword(v)"
                    typeInput="password"
                    :placeHolder="$t('Mot de passe')" />
                <CustomInput
                    :maxLength="64"
                    @input="(v) => this.handlePasswordConfirm(v)"
                    typeInput="password"
                    :placeHolder="$t('Mot de passe')" />
            </div>

            <div class="self-center my-12" v-else>
                <Loader />
            </div>

            <p class="ml-5 mt-0 underline text-xs opacity-70 cursor-pointer">
                <NuxtLink
                    class="underline text-xs opacity-70 cursor-pointer"
                    to="/login">
                    {{ $t('Annuler') }}
                </NuxtLink>
            </p>

            <button @click="handleGo" class="mr-5 self-end text-5xl font-bold">
                Go
            </button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import CustomInput from '~/components/subComponent/CustomInput.vue'
import subModalSignup from '~/components/subModals/signup.vue'
import { apiCall } from '~/utils/apiCall'
import bcrypt from 'bcryptjs'
import Loader from '@/components/Loader.vue'

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
            email: '',
            password: '',
            passwordConfirm: '',
        }
    },
    methods: {
        handleUsername(v) {
            this.username = v
        },
        isEmailMatching(email) {
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

            return this.email.match(regex) !== null
        },
        handleEmail(v) {
            this.email = v
        },
        handlePassword(v) {
            this.password = v
            // let saltRounds = parseInt(process.env.SALTROUNDS)
            // bcrypt.hash(v, saltRounds).then((result) => {
            //     this.password = result
            // })
        },
        handlePasswordConfirm(v) {
            this.passwordConfirm = v

            // if (this.password !== this.passwordConfirm) {

            // }
            // let saltRounds = parseInt(process.env.SALTROUNDS)
            // bcrypt.hash(v, saltRounds).then((result) => {
            //     this.password = result
            // })
        },
        handleGo() {
            if (this.username && this.email && this.password) {
                const { username: username, email, password } = this

                apiCall({
                    method: 'POST',
                    route: '/auth/signup',
                    body: JSON.stringify({
                        username,
                        password,
                        email,
                        avatar: '',
                    }),
                })
                    .then((res) => {
                        this.$toast.show(
                            this.$t('Inscription réalisée avec succès'),
                            {
                                theme: 'toasted-primary',
                                position: 'top-right',
                                duration: 4000,
                            }
                        )

                        this.$router.push('/login')
                    })
                    .catch((err) => {
                        this.$toast.show(err, {
                            theme: 'toasted-primary',
                            position: 'top-right',
                            duration: 4000,
                        })
                        console.log('err', err)
                    })
            }
        },
    },
})
</script>
