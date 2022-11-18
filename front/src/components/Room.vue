<template>
    <div
        class="flex flex-col h-full items-center justify-center font-bold text-xl"
        v-if="!room">

        {{$t("Cette room n'existe pas")}}

        <div class="my-4">
            <Button 
                :buttonText="$t('Retour')" 
                filled="true"
                class="px-6 py-2"
                color="fc-green"
                @click="() => this.$router.push('/rooms')"
            />
        </div>
    </div>

    <div
        class="flex flex-col h-full space-y-4 sm:space-y-8" 
        v-else>
        <div class="flex justify-between">
            <div class="flex w-full max-w-[80%] relative items-center justify-center bg-fc-black h-16">
                <div class="absolute left-0 bg-fc-green h-full w-3 sm:w-8" />
    
                <p class="flex font-bold text-fc-yellow text-ellipsis text-xl sm:text-4xl">
                    {{ room.title }}
                </p>
    
                <div class="absolute right-0 bg-fc-green h-full w-3 sm:w-8" />
            </div>

            <Button 
                class="ml-4 sm:mx-12"
                buttonText="Rejoindre"
                color="fc-yellow"
                :filled="true"
            />
        </div>

        <div class="flex flex-col h-full w-full overflow-y-auto sm:flex-row">
            <div class="flex flex-col relative h-full w-full sm:w-3/4">
                <div class="flex flex-row relative items-center justify-center h-12 p-4 bg-fc-black">
                    <div class="absolute left-0 bg-fc-green h-full w-2 sm:w-6" />

                    <p class="font-bold text-white text-xl sm:text-2xl">
                        {{ $t('Description') }}
                    </p>

                    <div class="absolute right-0 bg-fc-green h-full w-2 sm:w-6 sm:hidden" />
                </div>

                <div class="flex h-full overflow-y-scroll">
                    <p class="flex text-justify p-2 sm:p-4">
                        {{ room.description }}
                    </p>
                </div>

                <img 
                    src="@/assets/cornerPixels.svg"
                    class="absolute bottom-0 right-0 w-12 -rotate-180 -z-10 scale-x-[-1]"
                />
            </div>

            <div class="flex w-full">

            </div>
        </div>
    </div>
</template>

<script>
import Button from '@/components/subComponent/Button.vue'

export default {
    name: 'Room',
    components: {
        Button  
    },
    props: {
        room: Object
    },
    mounted() {
        console.log(this.$props.room);
    }
}
</script>
