<template>
    <div 
        class="flex flex-col w-full justify-between p-4 text-lg overflow-y-scroll text-white"
        :style="{
            height: 'calc(100vh - 64px )'
        }"
    >
        <div class="flex flex-col space-y-4">
            <p class="text-xl font-bold text-fc-yellow">
                {{ $t('MJ') }}
            </p>
        </div>

        <div 
            v-if="story"
            class="flex self-end"
        >
            <router-link
                target="_blank"
                :to="'/stories/' + story.id"
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
            story: state => state.story
        })
    }
}
</script>