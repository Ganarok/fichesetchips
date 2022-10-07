<template>
    <div class="flex border-4 border-fc-green p-4 sm:max-w-[50%]">
        <div class="flex flex-col items-center w-[50%] h-[50%]">
            <!-- Avatar et succes -->
            <img :src="avatar" alt="Avatar" class="max-w-[70%]" />
        </div>

        <div class="flex flex-col w-[50%] h-[50%]">
            <!-- Pseudo, description parties jouées -->

            <div class="flex w-full h-full">
                <div class="flex bg-fc-green w-[10%] h-[20%] sm:min-h-[50px]" />

                <div
                    class="flex items-center justify-center bg-fc-black w-[90%] h-[20%] sm:min-h-[50px]">
                    <h2 class="text-fc-yellow text-4xl font-bold">
                        {{ username }}
                    </h2>
                </div>

                <div style="z-index: -10" class="absolute bottom-0 right-0">
                    <img
                        src="@/assets/cornerPixels.svg"
                        alt="Pixels"
                        class="relative h-12 rotate-90" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        username: {
            type: String,
            default: 'Profil',
        },
        description: {
            type: String,
            default: 'Pas de description',
        },
        gameAsPlayer: {
            type: Number,
            default: 0,
        },
        gameAsMJ: {
            type: Number,
            default: 0,
        },
        avatar: {
            type: String,
            default: require('@/assets/avatar/avatar_default.svg'),
        },
        // achievements: {
        //     type: Array,
        //     default: []
        // }
    },
}
</script>
