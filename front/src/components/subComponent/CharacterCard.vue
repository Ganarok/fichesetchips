<template>
    <div
        class="flex flex-col items-center max-w-xs max-h-[550px] border-2 border-fc-green p-2"
    >
        <div
            class="flex items-center justify-between w-full bg-fc-green p-2 text-xl font-bold"
            v-if="level || name"
        >
            <p>
                {{ name }}
            </p>

            <p class="text-fc-black opacity-60" v-if="level">
                Lvl. {{ level }}
            </p>
        </div>

        <div
            class="relative bg-fc-yellow w-full my-2"
            v-if="image"
        >
            <img
                src="../../assets/dragon.svg"
                class="object-contain"
                :style="grayed ? 'filter: grayscale(1)' : null" />
        </div>

        <div class="bg-fc-yellow h-80 w-full m-2" v-else/>

        <div class="w-full h-24 bg-fc-green p-2">
            <p class="text-sm text-ellipsis text-justify overflow-y-scroll pr-3 break-words h-3/4">
                Didier est née dans la valée des saucisses. Grand mage de
                l’école du Hot Dog 100% Pur Porc et maître de la cuisson vapeur,
                Dider est à quitter sa terre natale pour diversifier son
                enseignement et peut-être un jour devenir Archimage du BBQ.
            </p>

            <div
                class="flex flex-row items-center justify-end text-sm space-x-4 w-full h-1/4"
                v-if="owner || location"
            >
                <p>
                    {{ owner }}
                </p>

                <p>
                    {{ location }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        background: String,
        border: String,
        name: { type: String, default: '' },
        nick_under: Boolean,
        nick_size: { type: String, default: '2xl' },
        nick_bold: Boolean,
        image: { type: String, default: '' },
        level: { type: Number, default: null },
        owner: { type: String, default: '' },
        location: { type: String, default: '' },
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
