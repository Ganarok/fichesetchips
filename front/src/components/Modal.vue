<template>
    <transition
        name="modal-fade"
        class="fixed h-screen w-screen top-0 left-0 z-50"
    >
        <div class="flex w-full h-full items-center justify-center">
            <div class="flex flex-col relative space-y-3 p-4 ml-52 bg-white">
                <div class="flex justify-between items-end rounded-full space-x-4 lg:space-x-32">
                    <h1
                        v-if="title"
                        class="font-bold text-xl text-fc-black"
                    >
                        {{ title }}
                    </h1>

                    <div class="flex">
                        <img
                            src="@/assets/icons/plus.svg"
                            class="transform rotate-45 object-contain h-8 w-8 p-2 bg-fc-green rounded-full cursor-pointer hover:opacity-80 hover:-rotate-45"
                            alt="Fermer"
                            @click="$emit('close-modal')"
                        />
                    </div>
                </div>

                <slot />
            </div>
        </div>
    </transition>
</template>

<script>

export default {
    name: 'Modal',
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    emits: ['close-modal']
}
</script>

<style scoped>
.modal-fade-enter 
.modal-fade-leave-to {
    opacity: 0;
}
.modal-fade-enter-active{
    transition: opacity 0.5s ease;
}
.modal-fade-leave-active {
    transition: opacity 0.5s ease;
}
</style>
