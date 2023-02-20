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
                src="@/assets/greenpixels.svg"
                alt="Pixels"
            >
        </div>

        <img
            class="z-10 w-[50%] max-w-xs lg:m-4"
            src="@/assets/logo.png"
            alt="Fiche&Chips"
        >
        <div class="flex flex-col z-10 lg:absolute lg:right-16 lg:bottom-16 w-80">
            <div
                v-if="!loading"
                class="ml-5"
            >
                <h1 class="text-5xl">
                    {{ $t("Connexion") }}
                </h1>
                <router-link
                    class="underline text-xs opacity-70 cursor-pointer"
                    to="/register"
                >
                    {{ $t("Pas encore inscrit ? Cliquez ici") }}
                </router-link>
            </div>

            <div
                v-if="!loading"
                class="space-y-1 mt-4"
            >
                <CustomInput
                    :max-length="36"
                    :place-holder="$t('Identifiant')"
                    :has-error="credentialsError"
                    outline="fc-green"
                    :on-focus-out="() => handleFocusOut()"
                    :value="username"
                    @input="(v) => handleUsername(v.target.value)"
                />

                <CustomInput
                    :max-length="64"
                    :typeinput="'password'"
                    :place-holder="$t('Mot de passe')"
                    :has-error="credentialsError"
                    outline="fc-green"
                    :on-focus-out="() => handleFocusOut()"
                    :value="password"
                    @input="(v) => handlePassword(v.target.value)"
                />
                <p class="ml-5 mb-2 underline text-xs opacity-70 cursor-pointer">
                    <router-link to="/forgot-password">
                        {{ $t("Mot de passe oublié") }}
                    </router-link>
                </p>
            </div>

            <div
                v-else
                class="self-center my-16"
            >
                <Loader cube-color="fc-yellow" />
            </div>

            <div
                v-if="!loading"
                class="flex justify-between items-end"
            >
                <p class="flex ml-5 text-sm text-fc-red italic items-center">
                    {{ errorText }}
                </p>

                <button
                    class="mr-5 self-end text-5xl font-bold"
                    @click="handleLogin"
                >
                    Go
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import CustomInput from "@/components/subComponent/CustomInput.vue"
import Loader from "@/components/Loader.vue"
import { useToast } from "vue-toastification"
import { mapState, mapActions } from "vuex"

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
            password: "",
            credentialsError: false,
            errorText: "",
        }
    },
    computed: {
        ...mapState("errors", {
            errors: (state) => state.errors,
        }),
        ...mapState("user", {
            user: (state) => state.user,
        }),
    },
    methods: {
        ...mapActions({
            log_user: "user/log_user",
            update_error: "errors/update_error",
        }),
        handleUsername(v) {
            this.username = v
        },
        handlePassword(v) {
            this.password = v
        },
        async handleFocusOut() {
            this.errorText = ""
            this.credentialsError = false
            await this.update_error({ message: null })
        },
        async handleLogin() {
            const toast = useToast()
            if (this.username && this.password) {
                const hashed_password = CryptoJS.SHA256(this.password).toString(
                    CryptoJS.enc.Hex
                )
                await this.log_user({
                    username: this.username,
                    password: hashed_password,
                })
                if (this.errors.message) {
                    toast.error(this.errors.message)
                    this.credentialsError = true
                    this.errorText = this.$t("Les identifiants ne sont pas valides")
                    await this.update_error({ message: null })
                } else {
                    await this.$router.push("/user/dashboard")
                    setTimeout(
                        () =>
                            toast.success(`${this.$t("Bienvenue")} ${this.user.username} !`),
                        400
                    )
                }
            }
        },
    }}
</script>
