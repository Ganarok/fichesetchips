<template>
    <div
        class="fixed top-0 bottom-0 left-0 right-0 flex justify-center bg-fc-yellow-trans"
        @click="$emit('close-modal')">
        <div
            class="bg-white h-[617px] w-[617px] mt-auto mb-auto justify-end my-[5%]"
            @click.stop>
            <div class="header p-5 h-[15%]">
                <h2 class="text-5xl">Inscription</h2>
                <button class="" @click="$emit('close-modal')">
                    <img src="../../assets/closecircle.svg" alt="" />
                </button>
            </div>
            <div class="flex flex-col justify-evenly m-auto p-[14%] h-[70%]">
                <CustomInput
                    :maxLength="36"
                    @input="(v) => this.handleId(v)"
                    placeHolder="Identifiant" />
                <CustomInput
                    :maxLength="254"
                    @input="(v) => this.handleMail(v)"
                    placeHolder="Adresse Mail" />
                <CustomInput
                    :maxLength="64"
                    @input="(v) => this.handlePassword(v)"
                    placeHolder="Mot de passe" />
            </div>
            <div class="header h-[15%]">
                <img src="../../assets/littlegreenpixels.svg" alt="" />
                <button @click="handleGo" class="mr-[5%]">
                    <h2 class="text-5xl">Go</h2>
                </button>
            </div>
        </div>
        <div class="close" @click="$emit('close-modal')" />
    </div>
</template>

<script>
import CustomInput from '~/components/subComponent/CustomInput.vue'
import { apiCall } from '~/utils/apiCall'

export default {
    components: { CustomInput },
    data() {
        return {
            identifiant: '',
            mail: '',
            password: '',
        }
    },
    methods: {
        handleGo() {
            console.log('go', this.identifiant, this.password)

            if (this.identifiant && this.mail && this.password) {
                const { identifiant: username, mail, password } = this

                apiCall({
                    method: 'POST',
                    route: '/auth/signup',
                    body: JSON.stringify({
                        username,
                        password,
                        avatar: '',
                    }),
                })
                    .then((res) => {
                        this.$emit('close-modal')
                    })
                    .catch((err) => {
                        console.log('err', err)
                    })
            }
        },
        handleId(value) {
            this.identifiant = value

            // TODO: Error handling
        },
        handleMail(value) {
            this.mail = value

            // TODO: Error handling
        },
        handlePassword(value) {
            this.password = value

            // TODO: Error handling
        },
    },
}
</script>

<style>
.header {
    display: flex;
    justify-content: space-between;
}
</style>
