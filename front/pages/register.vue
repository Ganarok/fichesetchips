<template>
    <div
        class="flex flex-col relative justify-center items-center p-4 w-screen h-screen overflow-hidden lg:items-start lg:p-0 lg:justify-between">
        <img
            class="absolute hidden object-cover h-full w-full lg:flex"
            src="@/assets/index/background.jpg"
            alt="Background" />

        <div
            class="absolute -right-24 bottom-0 opacity-95 max-h-screen lg:right-0">
            <img src="../assets/yellowpixels.svg" alt="Pixels" />
        </div>

        <img
            class="z-10 w-[50%] max-w-xs lg:m-4"
            src="../static/logo.png"
            alt="Fiche&Chips" />
        <div
            class="flex flex-col z-10 lg:absolute lg:right-16 lg:bottom-16 w-80">
            <div v-if="!loading" class="ml-5">
                <h1 class="text-5xl">{{ $t('Inscription') }}</h1>

                <p
                    class="mb-4 mt-2 underline text-xs opacity-70 cursor-pointer">
                    <NuxtLink to="/login">
                        {{ $t('Annuler') }}
                    </NuxtLink>
                </p>
            </div>

            <div v-if="!loading" class="space-y-1">
                <CustomInput
                    :maxLength="36"
                    @input="(v) => this.handleUsername(v)"
                    :placeHolder="$t('Identifiant')"
                    :hasError="usernameError" />
                <CustomInput
                    :maxLength="256"
                    @input="(v) => this.handleEmail(v)"
                    placeHolder="Email"
                    :hasError="emailError"
                    :onFocusOut="() => this.handleEmailFocusOut()" />
                <CustomInput
                    :maxLength="64"
                    @input="(v) => this.handlePassword(v)"
                    typeInput="password"
                    :placeHolder="$t('Mot de passe')"
                    :hasError="passwordError"
                    :onFocusOut="() => this.handlePasswordFocusOut()" />
                <CustomInput
                    :maxLength="64"
                    @input="(v) => this.handlePasswordConfirm(v)"
                    typeInput="password"
                    :placeHolder="$t('Mot de passe')"
                    :hasError="passwordConfirmError"
                    :onFocusOut="() => this.handleConfirmFocusOut()" />
            </div>

            <div class="self-center my-16" v-else>
                <Loader />
            </div>

            <div class="flex justify-between items-start pt-4">
                <p class="flex ml-5 text-sm text-fc-red italic items-center">
                    {{ errorText }}
                </p>

                <button
                    v-if="!loading"
                    @click="handleGo"
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
            usernameError: false,
            emailError: false,
            passwordError: false,
            passwordConfirmError: false,
            errorText: '',
        }
    },
    methods: {
        handleUsername(v) {
            this.username = v
        },
        isEmailMatching() {
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

            return this.email.match(regex) !== null
        },
        isPasswordMatching() {
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

            return this.password.match(regex) !== null
        },
        handleErrors() {
            if (!this.isEmailMatching()) {
                this.emailError = true
                this.errorText = this.$t("L'email n'est pas valide")
            }
        },
        handleEmail(v) {
            this.email = v
        },
        handleEmailFocusOut() {
            if (!this.isEmailMatching()) {
                this.emailError = true
                this.errorText = this.$t("L'email n'est pas valide")
            } else {
                this.emailError = false
                this.errorText = ''
            }
        },
        handlePasswordFocusOut() {
            if (process.env.NODE_ENV !== 'production') {
                if (!this.isPasswordMatching()) {
                    this.passwordError = true
                    this.errorText = this.$t(
                        'Le mot de passe doit contenir au moins 1 majuscule, 1 chiffre et 8 charactères'
                    )
                } else {
                    this.passwordError = false
                    this.errorText = ''
                }
            }
        },
        handleConfirmFocusOut() {
            if (process.env.NODE_ENV !== 'production') {
                if (this.password !== this.passwordConfirm) {
                    this.passwordConfirmError = true
                    this.passwordError = true
                    this.errorText = this.$t(
                        'La confirmation doit correspondre au mot de passe'
                    )
                } else {
                    this.passwordConfirmError = false
                    if (this.isPasswordMatching()) {
                        this.passwordError = false
                        this.errorText = ''
                    } else {
                        if (this.password)
                            this.errorText = this.$t(
                                'Le mot de passe doit contenir au moins 1 majuscule, 1 chiffre et 8 charactères'
                            )
                    }
                }
            }
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
            if (this.handleErrors()) {
                const { username, email, password, passwordConfirm } = this

                if (username && email && password && passwordConfirm) {
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
            }
        },
    },
})
</script>
