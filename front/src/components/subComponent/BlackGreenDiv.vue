<template>
    <div 
        :class="`flex w-full relative ${maxWidth} items-center justify-center bg-fc-black py-4 ${height}`"
    >
        <div class="absolute left-0 bg-fc-green h-full w-3 sm:w-8" v-if="leftGreenDiv" />

        <p 
            :class="`flex font-bol text-ellipsis text-xl font-bold ${color} sm:${this.getTextSize()}`"
        >
            {{ title }}
        </p>

        <div class="absolute right-0 bg-fc-green h-full w-3 sm:w-8" v-if="rightGreenDiv" />
    </div>
</template>

<script>
export default {
    name: 'BlackGreenDiv',
    props: {
        title: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: 'text-fc-yellow'
        },
        height: {
            type: String,
            default: 'h-12'
        },
        maxWidth: {
            type: String,
            default: 'max-w-full'
        },
        leftGreenDiv: {
            type: [ Boolean, String ],
            default: true
        },
        rightGreenDiv: {
            type: [ Boolean, String ],
            default: true
        },
        class: {
            type: String,
            default: ''
        }
    },
    methods: {
        getTextSize() {
            switch (this.height) {
                case 'h-12':
                    return 'text-4xl'

                case 'h-16':
                    return 'text-4xl'
                    
                default:
                    return 'text-3xl'
            }
        }
    }
}
</script>
