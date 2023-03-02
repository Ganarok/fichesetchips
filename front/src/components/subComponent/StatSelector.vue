<template>
    <div class="flex flex-col">
        <div 
            class="flex items-center justify-center space-x-2 font-bold text-xl text-center"
        >
            <p
                v-if="name"
                class="uppercase"
            >
                {{ name.length > 5 ? name.substring(0, 5) : name }}
            </p>

            <img
                v-if="randomize"
                class="flex h-4 w-4 transition ease-in-out duration-200 hover:rotate-180 hover:cursor-pointer"
                src="@/assets/yellow_dice.svg"
                alt="randomize"
                @click="handleRandomize"
            >
        </div>

        <div class="flex relative border p-2 border-fc-green">
            <img
                class="absolute h-2 top-0 left-0 -rotate-90"
                src="@/assets/cornerPixels.svg"
                alt="pixels"
            >
    
            <img
                class="absolute h-2 top-0 right-0"
                src="@/assets/cornerPixels.svg"
                alt="pixels"
            >

            <input 
                type="number"
                class="flex text-center text-fc-yellow placeholder:text-fc-yellow-trans text-2xl font-bold w-24 outline-none"
                max="99"
                min="1"
                placeholder="0"
                :value="value"
                @change="onChange"
            >
    
            <img
                class="absolute h-2 bottom-0 left-0 -rotate-180"
                src="@/assets/cornerPixels.svg"
                alt="pixels"
            >
    
            <img
                class="absolute h-2 bottom-0 right-0 rotate-90"
                src="@/assets/cornerPixels.svg"
                alt="pixels"
            >
        </div>
    </div>
</template>

<script>

export default {
    name: 'StatSelector',
    props: {
        name: {
            type: String,
            default: ''
        },
        randomize: {
            type: Boolean,
            default: true
        },
        handleRandomize: {
            type: Function,
            default: () => {}
        },
        onChange: {
            type: Function,
            default: () => {}
        },
        value: {
            type: Number,
            default: null
        }
    },
}

</script>
