<template>
    <div
        class="flex flex-col items-center h-full border border-yellow-300 p-2"
        style="aspect-ratio: 0.6/1">
        <div
            class="w-full h-[8%] bg-fiche-green my-auto flex py-1 px-1 font-extrabold">
            <p>Didier</p>
            <p class="ml-auto text-white">lvl. 12</p>
        </div>
        <div class="h-[58%] bg-yellow-300 w-full my-auto"></div>
        <div class="w-full h-[26%] p-1 pt-4 bg-fiche-green my-auto">
            <p class="text-[0.6em]">
                Didier est née dans la valée des saucisses. Grand mage de
                l’école du Hot Dog 100% Pur Porc et maître de la cuisson vapeur,
                Dider est à quitter sa terre natale pour diversifier son
                enseignement et peut-être un jour devenir Archimage du BBQ.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        background: String,
        border: String,
        nickname: { type: String, default: null },
        nick_under: Boolean,
        nick_size: { type: String, default: '2xl' },
        nick_bold: Boolean,
    },
    methods: {
        callback: function (e) {
            this.$emit('click', e)
        },
        backgroundColor: function () {
            if (this.filled == undefined) {
                return ''
            } else {
                return ' bg-' + this.color
            }
        },
        borderColor: function () {
            if (this.border == undefined) {
                return ''
            } else {
                return ' bg-' + this.color
            }
        },
    },
}
</script>

<!-- <Button buttonText="Exemple" color="fiche-green" v-on:click="test()" filled="chips-yellow" :image="require('../assets/icon.png')"/> -->
