<template>
    <div
        class="fixed top-0 bottom-0 left-0 right-0 flex justify-center bg-chip-yellow-trans"
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
                <CustomInput placeHolder="Identifiant" />
                <CustomInput placeHolder="Adresse Mail" />
                <CustomInput placeHolder="Mot de passe" />
            </div>
            <div class="header h-[15%]">
                <img src="../../assets/littlegreenpixels.svg" alt="" />
                <button @click="$emit('close-modal')" class="mr-[5%]">
                    <h2 class="text-5xl">Go</h2>
                </button>
            </div>
        </div>
        <div class="close" @click="$emit('close-modal')"></div>
    </div>
</template>

<script>
import CustomInput from '~/components/subComponent/CustomInput.vue'
export default {
    components: { CustomInput },
}
</script>

<style>
.header {
    display: flex;
    justify-content: space-between;
}
</style>
