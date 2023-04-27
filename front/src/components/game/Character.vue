<template>
    <div 
        class="flex flex-col w-full h-full justify-between space-y-4 p-4 text-lg overflow-y-scroll text-white"
        :style="{
            height: 'calc(100vh - 64px)'
        }"
    >
        <div class="flex flex-col space-y-4">
            <div class="flex flex-col">
                <p class="text-xl font-bold text-fc-yellow">
                    Vous êtes
                </p>
    
                <p class="text-xl font-bold text-fc-green truncate"> 
                    {{ `${my_character.firstname} ${my_character.lastname}` }}
                </p>
            </div>
    
            <div class="flex font-bold justify-between">
                <div class="flex space-x-2">
                    <p>
                        {{ $t('Niveau') }} : {{ my_character.level_id }}
                    </p>
                </div>
    
                <div class="flex space-x-2">    
                    <p>
                        {{ `${my_character.experience_points}/${my_character.next_level_experience_points}` }} EXP.
                    </p>
                </div>
            </div>
    
            <div class="flex font-bold space-x-2">
                <p>
                    {{ my_character.hp }}
                </p>
    
                <p>
                    {{ $t('PV') }}
                </p>
            </div>
    
            <p class="italic">
                "{{ my_character.bio }}"
            </p>
        </div>

        <div class="flex self-end">
            <router-link
                target="_blank"
                :to="'/characters/' + my_character.id"
                class="flex font-bold hoverStyle bg-fc-yellow text-fc-black p-3"
            >
                <p class="text-base">
                    Voir mon personnage
                </p>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Character',
    computed: {
        ...mapState({
            my_character: state => state.game.diary.my_character
        })
    }
}

</script>