<template>
    <div
        v-if="!room"
        class="flex flex-col h-full items-center justify-center font-bold text-xl"
    >
        {{ $t("room_not_found") }}

        <div class="my-4">
            <Button
                :button-text="$t('back')"
                class="px-6 py-2"
                color="fc-green"
                @click="() => $router.push('/rooms')"
            />
        </div>
    </div>

    <div
        v-else
        class="flex flex-col h-full space-y-4 sm:space-y-8"
    >
        <div class="flex justify-between">
            <BlackGreenDiv
                :title="room.title || ''"
                :right-green-div="false"
                color="text-fc-yellow"
                height="h-16"
            />

            <Button
                class="ml-4 sm:mx-12"
                button-text="Rejoindre"
                color="fc-green"
                :rounded="false"
                background-color="fc-black"
            />
        </div>

        <div
            class="flex flex-col h-full w-full sm:overflow-y-auto sm:space-x-8 sm:flex-row"
        >
            <div class="flex flex-col relative h-full w-full pb-4 sm:w-3/4">
                <BlackGreenDiv
                    title="Description"
                    :right-green-div="false"
                    color="text-white"
                />

                <div class="flex h-full overflow-y-scroll">
                    <p class="flex text-justify pr-2 m-2 sm:m-3">
                        {{ room.description || "Pas de description" }}
                    </p>
                </div>

                <img
                    src="@/assets/cornerPixels.svg"
                    class="absolute bottom-4 right-0 w-12 -rotate-180 -z-10 scale-x-[-1]"
                >
            </div>

            <div class="flex flex-col w-full">
                <div class="flex w-full h-full p-4 justify-between items-end sm:h-1/2">
                    <div class="flex flex-col space-y-4 sm:space-y-6">
                        <div class="bg-gray-400 rounded-full w-24 h-24" />

                        <h3 class="flex font-bold">
                            Style:
                            <p class="font-normal">
                                {{ room.style || $t('none') }}
                            </p>
                        </h3>

                        <h3 class="flex font-bold">
                            Vocal:
                            <p class="font-normal">
                                {{ room.vocal || $t('undefined') }}
                            </p>
                        </h3>
                    </div>

                    <div class="flex flex-col space-y-4 sm:space-y-6">
                        <h3 class="flex font-bold">
                            {{ $t('experience') }}:
                            <p class="font-normal">
                                {{ room.experience || $t('undefined') }}
                            </p>
                        </h3>

                        <h3 class="flex font-bold">
                            Tranche de niveau:
                            <p class="font-normal">
                                {{ room.levelGap || $t('undefined') }}
                            </p>
                        </h3>

                        <h3 class="flex font-bold">
                            {{ $t('language') }}:
                            <p class="font-normal">
                                {{ room.language || $t('undefined') }}
                            </p>
                        </h3>
                    </div>
                </div>

                <div class="flex flex-col h-full">
                    <BlackGreenDiv
                        :title="$t('gm_full')"
                        :right-green-div="false"
                        color="text-white"
                    />

                    <div
                        class="flex flex-col items-center justify-between p-4 space-x-2 sm:flex-row"
                    >
                        <div class="flex items-center space-x-4">
                            <div
                                class="bg-gray-400 border-2 border-fc-black-light rounded-full w-24 h-24"
                            />

                            <p class="text-xl font-bold">
                                {{ room?.mj?.username || "MJ" }}
                            </p>
                        </div>

                        <p>{{ $t('success') }}</p>

                        <p class="font-bold">
                            {{
                                `${room?.mj?.gamePlayedAsMj} ` + $t('x_games_saved')|| $t('no_game_saved')
                            }}
                        </p>
                    </div>

                    <BlackGreenDiv
                        :title="$t('players_list')"
                        :right-green-div="false"
                        color="text-white"
                    />

                    <div class="flex flex-wrap items-center justify-center p-4">
                        <div
                            v-for="(player, index) in room.players"
                            :key="index"
                            class="flex text-xl font-bold items-center p-2"
                        >
                            <div
                                class="bg-gray-400 border-2 border-fc-black-light rounded-full mr-4 w-20 h-20"
                            />

                            {{ player.username || $t('username') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from "@/components/common/Button.vue"
import BlackGreenDiv from "@/components/common/BlackGreenDiv.vue"

export default {
    name: "Room",
    components: {
        Button,
        BlackGreenDiv,
    },
    props: {
        room: {
            type: Object,
            default() { return {} }
        }
    },
}
</script>
