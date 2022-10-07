<template>
    <div class="w-screen h-screen flex relative">
        <div class="absolute right-0 bottom-0">
            <img
                class="object-scale-down max-h-screen"
                src="../assets/greenpixels.svg"
                alt="" />
        </div>
        <img
            class="mt-12 ml-12 max-h-52"
            src="../static/logo.png"
            alt="Fiche&Chips" />
        <div
            action=""
            class="flex flex-col lg:absolute lg:right-32 lg:bottom-32 lg:w-96">
            <div class="ml-5 mb-4">
                <h1 class="text-5xl">Connexion</h1>
                <p
                    class="underline text-xs opacity-70 cursor-pointer"
                    @click="showModal = true">
                    Pas encore inscrit ? Cliquez ici
                </p>
            </div>
            <div class="space-y-1">
                <CustomInput
                    :maxLength="36"
                    @input="(v) => this.handleUsername(v)"
                    placeHolder="Identifiant" />
                <CustomInput
                    :maxLength="64"
                    @input="(v) => this.handlePassword(v)"
                    typeInput="password"
                    placeHolder="Mot de passe" />
            </div>
            <p class="ml-5 mt-0 underline text-xs opacity-70 cursor-pointer">
                Mot de passe oublié
            </p>

            <button @click="handleLogin" class="mr-5 self-end text-5xl">
                Go
            </button>
        </div>
        <Modal v-show="showModal" @close-modal="showModal = false">
            <subModalSignup
                v-show="showModal"
                @close-modal="showModal = false" />
        </Modal>
    </div>
</template>

<script>
import Vue from 'vue'
import Modal from '~/components/Modal.vue'
import CustomInput from '~/components/subComponent/CustomInput.vue'
import subModalSignup from '~/components/subModals/signup.vue'
import { apiCall } from '~/utils/apiCall'
import bcrypt from 'bcryptjs'

export default Vue.extend({
    name: 'Login',
    components: { Modal, subModalSignup, CustomInput },
    data() {
        return {
            showModal: false,
            username: '',
            password: '',
        }
    },
    methods: {
        handleUsername(v) {
            this.username = v
        },
        handlePassword(v) {
            this.password = v
            // let saltRounds = parseInt(process.env.SALTROUNDS)
            // bcrypt.hash(v, saltRounds).then((result) => {
            //     this.password = result
            // })
        },
        handleLogin() {
            const { username, password } = this

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
                    })
            }
        },
    },
})
</script>
