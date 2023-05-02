<template>
    <div
        class="flex flex-col relative justify-center items-center p-4 w-screen h-screen overflow-hidden lg:items-start lg:p-0 lg:justify-between"
    >
        <img
            class="absolute hidden object-cover h-full w-full lg:flex"
            src="@/assets/index/background.jpg"
            alt="Background"
        >

        <div class="absolute -right-24 bottom-0 opacity-95 max-h-screen lg:right-0">
            <img
                src="../assets/yellowpixels.svg"
                alt="Pixels"
            >
        </div>

        <img
            class="z-10 w-[50%] max-w-xs lg:m-4"
            src="@/assets/fetc.png"
            alt="Fiche&Chips"
        >
        <div class="flex flex-col z-10 lg:absolute lg:right-16 lg:bottom-16 w-80">
            <div
                v-if="!loading"
                class="ml-5"
            >
                <h1 class="text-5xl">
                    {{ $t("Inscription") }}
                </h1>

                <p class="mb-4 mt-2 text-xs opacity-70">
                    Vous avez déjà un compte ? 
                    <router-link
                        class="underline cursor-pointer"
                        to="/login"
                    >
                        {{ $t("Connectez-vous") }}
                    </router-link>
                </p>
            </div>

            <div
                v-if="!loading"
                class="space-y-1"
            >
                <CustomInput
                    outline="fc-yellow-trans"
                    :max-length="36"
                    :place-holder="$t('Identifiant')"
                    :has-error="usernameError"
                    :value="username"
                    @input="(v) => handleUsername(v.target.value)"
                />
                <CustomInput
                    outline="fc-yellow-trans"
                    :max-length="256"
                    place-holder="Email"
                    :has-error="emailError"
                    :on-focus-out="() => handleEmailFocusOut()"
                    :value="email"
                    @input="(v) => handleEmail(v.target.value)"
                />
                <CustomInput
                    outline="fc-yellow-trans"
                    :max-length="64"
                    :place-holder="$t('Mot de passe')"
                    :has-error="passwordError"
                    :on-focus-out="() => handlePasswordFocusOut()"
                    :typeinput="'password'"
                    :value="password"
                    @input="(v) => handlePassword(v.target.value)"
                />
                <CustomInput
                    outline="fc-yellow-trans"
                    :max-length="64"
                    :place-holder="$t('Mot de passe')"
                    :has-error="passwordConfirmError"
                    :on-focus-out="() => handleConfirmFocusOut()"
                    :typeinput="'password'"
                    :value="passwordConfirm"
                    @input="(v) => handlePasswordConfirm(v.target.value)"
                />
            </div>

            <div
                v-else
                class="self-center my-16"
            >
                <Loader />
            </div>

            <div class="flex justify-between items-start pt-4">
                <p class="flex ml-5 text-sm text-fc-red italic items-center">
                    {{ errorText }}
                </p>

                <button
                    v-if="!loading"
                    class="mr-5 self-end text-5xl font-bold hover:opacity-70"
                    @click="handleGo"
                >
                    Go
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useToast } from "vue-toastification"
import { mapState, mapActions } from "vuex"

import CustomInput from "@/components/common/CustomInput.vue"
import Loader from "@/components/common/Loader.vue"
import { isEmailValid, isPasswordValid } from "@/utils/validations"
const CryptoJS = require("crypto-js")

export default {
    name: "Login",
    components: { CustomInput, Loader },
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
            usernameError: false,
            emailError: false,
            passwordError: false,
            passwordConfirmError: false,
            errorText: "",
        }
    },
    computed: {
        ...mapState("errors", {
            errors: (state) => state.errors,
        }),
    },
    methods: {
        ...mapActions({
            register_user: "user/register_user",
            update_error: "errors/update_error",
        }),
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
                this.errorText = ""
            }
        },
        handlePasswordFocusOut() {
            if (process.env.NODE_ENV !== "production") {
                if (!isPasswordValid(this.password)) {
                    this.passwordError = true
                    this.errorText = this.$t(
                        "Le mot de passe doit contenir au moins 1 majuscule, 1 chiffre et 8 charactères"
                    )
                } else {
                    this.passwordError = false
                    this.errorText = ""
                }
            }
        },
        handleConfirmFocusOut() {
            if (process.env.NODE_ENV !== "production") {
                if (this.password !== this.passwordConfirm) {
                    this.passwordConfirmError = true
                    this.passwordError = true
                    this.errorText = this.$t(
                        "La confirmation doit correspondre au mot de passe"
                    )
                } else {
                    this.passwordConfirmError = false
                    if (isPasswordValid(this.password)) {
                        this.passwordError = false
                        this.errorText = ""
                    } else {
                        if (this.password)
                            this.errorText = this.$t(
                                "Le mot de passe doit contenir au moins 1 majuscule, 1 chiffre et 8 charactères"
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
        async handleGo() {
            if (this.handleErrors()) {
                const toast = useToast()

                if (this.username && this.password && this.email) {
                    const hashed_password = CryptoJS.SHA256(this.password).toString(
                        CryptoJS.enc.Hex
                    )
                    await this.register_user({
                        username: this.username,
                        password: hashed_password,
                        email: this.email,
                    })
                    if (this.errors.message) {
                        toast.error(this.errors.message)
                        await this.update_error({ message: null })
                    } else {
                        toast.success(this.$t("Inscription réalisée avec succès"))

                        this.$router.push("/user/profile")
                    }
                }
            }
        },
    }}
</script>
