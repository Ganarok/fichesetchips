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
                <h1 class="text-5xl">
                    {{ $t('Vous avez perdu quelque chose') }} ?
                </h1>
            </div>

            <div v-if="!loading" class="space-y-1 my-4">
                <CustomInput
                    :maxLength="256"
                    @input="(v) => this.handleUsername(v)"
                    placeHolder="Email" />
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

            <button
                @click="handleEmail"
                class="mr-5 self-end text-5xl font-bold">
                Go
            </button>
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
        }
    },
    methods: {
        handleEmail(v) {
            this.email = v
        },
        handleSend() {
            const { email } = this

            if (email) {
                //TODO : Send a mail for updating password
                // apiCall({
                //     method: 'POST',
                //     route: '/auth/login',
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
                //     console.log('err', err)
                // })
            }
        },
    },
})
</script>
