<template>
    <div
        class="flex flex-col items-center max-w-xs max-h-[550px] border-2 border-fc-green p-2 hover:opacity-80 hover:cursor-pointer"
    >
        <div
            v-if="name"
            class="flex items-center justify-between w-full bg-fc-green p-2 text-xl font-bold"
        >
            <p>
                {{ name }}
            </p>
        </div>

        <div
            class="relative bg-fc-yellow w-full my-2"
        >
            <img
                src="@/assets/dragon.svg"
                class="object-contain"
                :style="grayed ? 'filter: grayscale(1)' : null"
            >
        </div>

        <div class="flex w-full h-24 justify-between bg-fc-green p-2">
            <div 
                v-if="racial_bonus.length"
                class="grid grid-cols-2 gap-2 text-start text-xs whitespace-nowrap w-full"
            >
                <p 
                    v-for="bonus, index in racial_bonus"
                    :key="index"
                >
                    {{ `${bonus.characteristic.name.slice(0, 3)}: +${bonus.racial_bonus}` }}
                </p>
            </div>

            <div
                v-if="size || languages"
                class="flex flex-col items-end justify-between text-sm space-x-4 w-full"
            >
                <div class="flex flex-col space-y-1 text-end">
                    <p
                        v-for="language, index in languages"
                        :key="index"
                    >
                        {{ language.name }}
                    </p>
                </div>

                <p>
                    {{ size }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RaceCard',
    props: {
        character: {type: Object, default: new Object()},
        border: {type: String, default: ""},
        grayed: { type: Boolean, default: false }
    },
    data() {
        return {
            ...this.character
        }
    }
}
</script>
