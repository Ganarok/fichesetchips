<template>
    <div 
        :class="`flex w-full relative ${maxWidth} items-center justify-center bg-fc-black py-4 ${height}`"
    >
        <div v-if="leftGreenDiv" class="absolute left-0 bg-fc-green h-full w-3 sm:w-8" />

        <p 
            v-if="!canEdit"
            :class="`flex text-ellipsis text-xl font-bold ${color} sm:${getTextSize()}`"
        >
            {{ title }}
        </p>

        <input
            v-else
            :class="`flex text-center self-center sm:w-1/2 w-full bg-transparent outline-none font-bold placeholder:font-normal placeholder:text-fc-yellow placeholder:italic ${color} ${maxWidth} ${height}`"
            type="text"
            :value="title"
            :placeholder="placeholder"
            @change="onChange"
        />

        <div v-if="rightGreenDiv" class="absolute right-0 bg-fc-green h-full w-3 sm:w-8" />
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
        },
        canEdit: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
        onChange: {
            type: Function,
            default: () => {}
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
