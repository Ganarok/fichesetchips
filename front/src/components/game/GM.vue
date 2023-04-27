<template>
    <div 
        class="flex flex-col justify-between w-full p-4 text-lg overflow-y-scroll text-white"
        :style="{
            height: 'calc(100vh - 64px )'
        }"
    >
        <div class="flex flex-col space-y-2">
            <div class="flex flex-col pb-4">
                <p class="text-xl font-bold text-fc-yellow">
                    {{ $t('MJ') }}
                </p>
            </div>

            <p class="text-xl font-bold text-fc-green">
                {{ $t('Joueurs') }}
            </p>

            <div
                v-for="(player, index) in players"
                :key="index"
                class="flex flex-col space-y-1"
            >
                <router-link 
                    :to="`/user/profile/${player.user.id}`"
                    target="_blank"
                    class="font-bold hoverStyle"
                >
                    {{ player.user.username }}
                </router-link>

                <router-link 
                    :to="`/characters/${player.character.id}`"
                    target="_blank"
                    class="hoverStyle"
                >
                    {{ `${player.character.firstname} ${player.character.lastname}` }}
                </router-link>
            </div>
        </div>

        <div 
            v-if="story"
            class="flex self-end"
        >
            <router-link
                target="_blank"
                :to="'user/stories/' + story.id"
                class="flex font-bold hoverStyle bg-fc-yellow text-fc-black p-3"
            >
                <p class="text-base">
                    Voir mon histoire
                </p>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'GM',
    computed: {
        ...mapState('game', {
            story: state => state.story,
            players: state => state.diary.players
        })
    }
}
</script>