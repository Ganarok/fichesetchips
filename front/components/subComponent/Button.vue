<template>
    <button class="border-[3px] rounded-full p-[2%] w-full font-barlow flex justify-center opacity-80 hover:opacity-100" :class="'text-'+color+' '+'border-'+color+' '+'bg-'+filled" @click="callback($event)">
        {{ buttonText }}
        <img v-if="image != undefined" :src="image" class="w-[30px] h-[30px] ml-[5px]">
    </button>
</template>
  
<script>
    export default {
        props: {
            buttonText: String,
            color: {
                type: String,
                default: 'fiche-green'
            },
            filled: String,
            image: String,
        },
        data() {
            return {
                bgColor: 'bg-'+this.filled,
            }
        },
        methods: {
            callback: function (e) {
            this.$emit("click", e);
            },
        },
    };
</script>

<!-- <Button buttonText="Exemple" color="fiche-green" v-on:click="test()" filled="chips-yellow" :image="require('../assets/icon.png')"/> -->