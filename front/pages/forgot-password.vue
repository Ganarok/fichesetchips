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
            class="flex flex-col z-10 lg:absolute lg:right-16 lg:bottom-16 w-96">
            <div v-if="!loading" class="ml-5">
                <h1 class="text-5xl">
                    {{ $t('Vous avez perdu quelque chose') }} ?
                </h1>

                <p class="my-4 underline text-xs opacity-70 cursor-pointer">
                    <NuxtLink to="/login">
                        {{ $t('Finalement non') }} !
                    </NuxtLink>
                </p>
            </div>

            <div v-if="!loading" class="space-y-1">
                <CustomInput
                    :maxLength="256"
                    @input="(v) => this.handleEmail(v)"
                    placeHolder="Email"
                    :hasError="emailError"
                    :onFocusOut="() => this.handleEmailFocusOut()" />
            </div>

            <div class="self-center my-12" v-else>
                <Loader cubeColor="fc-yellow" />
            </div>

            <div v-if="!loading" class="flex justify-between items-start mt-4">
                <p
                    class="flex ml-5 h-6 text-sm text-fc-red italic items-center">
                    {{ errorText }}
                </p>

                <button
                    @click="handleEmail"
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
            email: '',
            errorText: '',
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
            if (!this.isEmailMatching()) {
                this.emailError = true
                this.errorText = this.$t("L'email n'est pas valide")
            } else {
                this.emailError = false
                this.errorText = ''
            }
        },
        handleSend() {
            const { email } = this

            if (email) {
                //TODO : Send a mail for updating password
                // apiCall({
                //     method: 'POST',
                //     route: // TODO: ENDPOINT MAIL,
                //     body: JSON.stringify({
                //         username,
                //         password,
                //     }),
                // })
                //     .then(async (res) => {
                //         this.$store.commit('setUser', {
                //             ...res.user,
                //             access_token: res.access_token,
                //         })
                //         await this.$router.push('/user/dashboard')
                //         setTimeout(
                //             () =>
                //                 this.$toast.show(
                //                     `${this.$t('Bienvenue')} ${
                //                         res.user.username
                //                     } !`,
                //                     {
                //                         theme: 'toasted-primary',
                //                         position: 'top-right',
                //                         duration: 4000,
                //                     }
                //                 ),
                //             400
                //         )
                //     })
                //     .catch((err) => {
                //     this.$toast.show(err, {
                //         theme: 'toasted-primary',
                //         position: 'top-right',
                //         duration: 4000,
                //     })
                //
                //     this.emailError = true
                //     this.errorText = this.$t('Une erreur est survenue')
                //     console.log('err', err)
                // })
            }
        },
    },
})
</script>
