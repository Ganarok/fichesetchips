<template>
    <div class="w-screen h-screen flex relative">
        <div class="absolute right-0 bottom-0">
            <img class="object-scale-down max-h-screen" src="../assets/greenpixels.svg" alt="" />
        </div>
        <img
            class="mt-12 ml-12 max-h-52"
            src="../static/logo.png"
            alt="Fiche&Chips"
        />
        <form
            action=""
            class="flex flex-col lg:absolute lg:right-32 lg:bottom-32 lg:w-96"
        >
            <div class="ml-5 mb-4">
                <h1 class="text-5xl">Connexion</h1>
                <p class="underline text-xs opacity-70" @click="showModal = true">
                    Pas encore inscrit ? Cliquez ici
                </p>
            </div>
            <div class="space-y-1">
                <subComponent-CustomInput placeHolder="Identifiant" />
                <subComponent-CustomInput placeHolder="Mot de passe" />
            </div>
            <p class="ml-5 mt-0 underline text-xs opacity-70">
                Mot de passe oublié
            </p>

            <button class="mr-5 self-end text-5xl">Go</button>
        </form>
        <Modal v-show="showModal" @close-modal="showModal = false">
            <subModalSignup  v-show="showModal" @close-modal="showModal = false" />
        </Modal> 
    </div>
</template>

<script>
import Vue from 'vue'
import Modal from '~/components/Modal.vue'
import subModalSignup from '~/components/subModals/signup.vue'
export default Vue.extend({
    name: 'Login',
    components: { Modal, subModalSignup }, 
    data() {
        return {
            showModal: false
        }
    }
})
</script>
