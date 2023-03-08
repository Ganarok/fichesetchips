<template>
    <div class="flex w-full h-full">
        <div
            v-if="loading"
            class="flexitems-center justify-center"
        >
            <Loader />
        </div>


        <div
            v-else 
            class="flex flex-col relative items-center h-screen bg-black w-72"
        >
            <div class="absolute right-4 h-6 w-6 rounded-r-xl bg-fc-green" />

            <div class="flex h-16 w-full items-center justify-evenly bg-fc-green">

                <div 
                    class="relative h-10 w-10"
                    @click="selectedOption = 'chat'"
                >
                    <img
                        src="@/assets/icons/chat.svg"
                        class="object-contain"
                        alt="Chat"
                    />
                </div>

                <div
                    class="relative h-10 w-10"
                    @click="selectedOption = 'diary'"
                >
                    <img
                        src="@/assets/icons/diary.svg"
                        class="object-contain"
                        alt="Chat"
                    />
                </div>

                <div 
                    class="relative h-10 w-10"
                    @click="selectedOption = 'options'"
                >
                    <img
                        src="@/assets/icons/option_black.svg"
                        class="object-contain"
                        alt="Chat"
                    />
                </div>
            </div>
    
            {{ getSelectedComponent() }}
        </div>


        <slot />
    </div>

</template>

<script>
export default {
    name: "GameLayout",
    components: {},
    props: {
        loading: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            selectedOption: 'chat'
        }
    },
    methods: {
        getSelectedComponent() {
            switch (this.selectedOption) {
                case 'chat':
                    return (
                            'Chat'
                    )

                case 'diary':
                    return (
                            'Diary'
                    )

                case 'options':
                    return (
                            'Options'
                    )
            
                default:
                    break
            }
        }
    }
}
</script>
