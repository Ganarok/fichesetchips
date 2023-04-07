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
            src="@/assets/fetc.png"
            alt="Fiche&Chips"
        >
        <div class="flex flex-col z-10 lg:absolute lg:right-16 lg:bottom-16 w-96">
            <div
                v-if="!loading"
                class="ml-5"
            >
                <h1 class="text-5xl">
                    {{ $t("forgotten_password_title") }} ?
                </h1>

                <p class="my-4 underline text-xs opacity-70">
                    <router-link
                        class="cursor-pointer"
                        to="/login"
                    >
                        {{ $t("forgotten_password_cancel") }} !
                    </router-link>
                </p>
            </div>

            <div
                v-if="!loading"
                class="space-y-1"
            >
                <CustomInput
                    :max-length="256"
                    place-holder="Email"
                    :has-error="emailError"
                    :on-focus-out="() => handleEmailFocusOut()"
                    :value="email"
                    @input="(v) => handleEmail(v.target.value)"
                />
            </div>

            <div
                v-else
                class="self-center my-12"
            >
                <Loader cube-color="fc-yellow" />
            </div>

            <div
                v-if="!loading"
                class="flex justify-between items-start mt-4"
            >
                <p class="flex ml-5 h-6 text-sm text-fc-red italic items-center">
                    {{ errorText }}
                </p>

                <button
                    class="mr-5 self-end text-5xl font-bold"
                    @click="handleEmail"
                >
                    Go
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import CustomInput from "@/components/common/CustomInput.vue"
import Loader from "@/components/common/Loader.vue"
import { isEmailValid } from "@/utils/validations"

export default {
    name: "Login",
    components: {
        CustomInput,
        Loader,
    },
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            email: "",
            errorText: "",
            emailError: false,
        }
    },
    methods: {
        handleEmail(v) {
            this.email = v
        },
        isEmailMatching() {
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

            return this.email.match(regex) !== null
        },
        handleEmailFocusOut() {
            if (!isEmailValid(this.email)) {
                this.emailError = true
                this.errorText = this.$t("invalid_email")
            } else {
                this.emailError = false
                this.errorText = ""
            }
        },
        handleSend() {
            const { email } = this

            if (email) {
                //TODO : Send a mail for updating password
            }
        },
    },
}
</script>
