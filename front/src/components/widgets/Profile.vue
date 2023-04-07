<template>
    <div
        class="flex relative p-4 border-4 space-x-4 border-fc-green w-full sm:max-w-[50%]"
    >
        <div class="flex flex-col items-center w-[40%] h-[50%]">
            <img
                :src="avatar"
                alt="Avatar"
                class="max-w-[80%]"
            >
        </div>

        <div class="flex flex-col w-[60%] h-[50%]">
            <div class="flex flex-col space-y-4 w-full h-full">
                <div class="flex">
                    <div class="flex bg-fc-green w-[10%] h-[20%] min-h-[5rem]" />

                    <div
                        class="flex items-center justify-center bg-fc-black w-[90%] h-[35%] min-h-[5rem]"
                    >
                        <h2 class="text-fc-yellow text-4xl font-bold">
                            {{ username }}
                        </h2>
                    </div>
                </div>

                <h3 class="self-center text-lg italic">
                    "{{ description ? description : $t("no_description") }}"
                </h3>

                <div class="flex pt-4 items-center justify-around font-bold">
                    <div
                        class="flex items-center justify-center p-4 bg-fc-black w-[80%] h-full"
                    >
                        <div class="flex flex-col items-center">
                            <p class="text-xl text-white">
                                {{ $t("games_played") }} :
                            </p>

                            <p class="text-white opacity-70 italic">
                                ({{ $t("player") }})
                            </p>
                        </div>
                    </div>

                    <p>
                        {{ gameAsPlayer }}
                    </p>
                </div>

                <div class="flex pb-4 items-center justify-around font-bold">
                    <div
                        class="flex flex-col items-center justify-center p-4 bg-fc-black w-[80%] h-full"
                    >
                        <p class="text-xl text-white font-bold">
                            {{ $t("games_played") }} :
                        </p>

                        <p class="text-white opacity-70 font-bold italic">
                            ({{ $t("gm") }})
                        </p>
                    </div>

                    <p>
                        {{ gameAsMJ }}
                    </p>
                </div>
            </div>
        </div>

        <div
            style="z-index: -10"
            class="absolute w-[6%] right-0 -bottom-0 rotate-90"
        >
            <img
                src="@/assets/cornerPixels.svg"
                alt="Pixels"
            >
        </div>
    </div>
</template>

<script>
export default {
    props: {
        description: {
            type: String,
            default: ''
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
            default: require("@/assets/avatar/avatar_default.svg"),
        },
        achievements: {
            type: Array,
            default() {
                return []
            },
        },
    },
    data() {
        const username = this.$store.state.user.username
            ? this.$store.state.user.username
            : "Profil"

        return {
            username,
        }
    },
}
</script>
