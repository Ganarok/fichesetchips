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
            src="@/assets/logo.png"
            alt="Fiche&Chips" />
        <div
            class="flex flex-col z-10 lg:absolute lg:right-16 lg:bottom-16 w-80">
            <div v-if="!loading" class="ml-5">
                <h1 class="text-5xl">{{ $t('Inscription') }}</h1>

                <p
                    class="mb-4 mt-2 underline text-xs opacity-70 cursor-pointer">
                    <router-link to="/login">
                        {{ $t('Annuler') }}
                    </router-link>
                </p>
            </div>

            <div v-if="!loading" class="space-y-1">
                <CustomInput
                    outline="fc-yellow-trans"
                    :maxLength="36"
                    @input="(v) => this.handleUsername(v.target.value)"
                    :placeHolder="$t('Identifiant')"
                    :hasError="usernameError" />
                <CustomInput
                    outline="fc-yellow-trans"
                    :maxLength="256"
                    @input="(v) => this.handleEmail(v.target.value)"
                    placeHolder="Email"
                    :hasError="emailError"
                    :onFocusOut="() => this.handleEmailFocusOut()" />
                <CustomInput
                    outline="fc-yellow-trans"
                    :maxLength="64"
                    @input="(v) => this.handlePassword(v.target.value)"
                    :placeHolder="$t('Mot de passe')"
                    :hasError="passwordError"
                    :onFocusOut="() => this.handlePasswordFocusOut()"
                    type="password" />
                <CustomInput
                    outline="fc-yellow-trans"
                    :maxLength="64"
                    @input="(v) => this.handlePasswordConfirm(v.target.value)"
                    :placeHolder="$t('Mot de passe')"
                    :hasError="passwordConfirmError"
                    :onFocusOut="() => this.handleConfirmFocusOut()"
                    type="password" />
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
import CustomInput from '@/components/subComponent/CustomInput.vue'
import subModalSignup from '@/components/subModals/signup.vue'
import { apiCall } from '@/utils/apiCall'
import Loader from '@/components/Loader.vue'
import { isEmailValid, isPasswordValid } from '@/utils/validations'
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
        handleErrors() {
            if (!isEmailValid(this.email)) {
                this.emailError = true
                this.errorText = this.$t("L'email n'est pas valide")

                return false
            }

            return true
        },
        handleEmail(v) {
            this.email = v
        },
        handleEmailFocusOut() {
            if (!isEmailValid(this.email)) {
                this.emailError = true
                this.errorText = this.$t("L'email n'est pas valide")
            } else {
                this.emailError = false
                this.errorText = ''
            }
        },
        handlePasswordFocusOut() {
            if (process.env.NODE_ENV !== 'production') {
                if (!isPasswordValid(this.password)) {
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
                    if (isPasswordValid(this.password)) {
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
        },
        handlePasswordConfirm(v) {
            this.passwordConfirm = v
        },
        handleGo() {
            if (this.handleErrors()) {
                const { username, email } = this
                const toast = useToast()

                const password = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex)

                if (username && email && password) {
                    apiCall({
                        method: 'POST',
                        route: '/auth/register',
                        body: JSON.stringify({
                            username,
                            password,
                            email,
                            avatar: '',
                        }),
                    })
                        .then((res) => {
                            toast.success(
                                this.$t('Inscription réalisée avec succès'))

                            this.$router.push('/login')
                        })
                        .catch((err) => {
                            toast.error( typeof err === 'object' ? err.message : err)
                            console.log('err', err)
                        })
                }
            }
        },
    },
}
</script>
