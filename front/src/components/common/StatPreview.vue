<template>
    <div class="flex flex-col relative w-80 font-bold">
        <div class="flex justify-center bg-fc-black text-fc-yellow uppercase p-2">
            {{ name }}
        </div>

        <div class="flex flex-col justify-between text-lg space-y-8 mx-2 mb-2">
            <div class="flex flex-col">
                <div class="flex justify-between">
                    <p>
                        Base
                    </p>
    
                    <p class="mr-6">
                        {{ base }}
                    </p>
                </div>

                <div
                    v-if="bonus"
                    class="flex justify-between"
                >
                    <p>
                        Bonus
                    </p>
    
                    <p class="mr-6 text-fc-green">
                        {{ bonus }}
                    </p>
                </div>
    
                <div class="flex justify-between">
                    <p>
                        Racial
                    </p>
    
                    <p class="text-fc-yellow mr-6">
                        {{ racial }}
                    </p>
                </div>
            </div>

            <div class="flex justify-between">
                <p class="underline">
                    Total
                </p>

                <p class="mr-6">
                    {{ base + racial + bonus }}
                </p>
            </div>
        </div>

        <img
            class="absolute h-6 bottom-0 right-0 rotate-90"
            src="@/assets/cornerPixels.svg"
            alt="pixels"
        >
    </div>
</template>

<script>

export default {
    name: 'StatPreview',
    props: {
        name: {
            type: String,
            default: ''
        },
        base: {
            type: Number,
            default: 0
        },
        bonus: {
            type: Number,
            default: 0
        },
        racial: {
            type: Number,
            default: 0
        }
    }
}
</script>
