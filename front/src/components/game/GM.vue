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
                    class="font-bold text-fc-yellow-trans hoverStyle underline"
                >
                    {{ player.user.username }}
                </router-link>

                <button 
                    class="flex flex-col hoverStyle"
                    @click="handleSelectPlayer(player)"
                >
                    <p>
                        {{ `${player.character.firstname} ${player.character.lastname}` }}
                    </p>

                    <p>
                        {{ player.character.hp <= 0 ? 'Mort' : `${game_state.players?.find(p => p.id === player.id)?.character.hp}
                            /
                            ${player.character.max_hp} HP` 
                        }} 
                        - 
                        {{ `${game_state.players?.find(p => p.id === player.id)?.character.experience_points}/${player.character.next_level_experience_points}` }} EXP.
                    </p>
                </button>
            </div>
        </div>

        <div 
            v-if="story"
            class="flex self-end"
        >
            <router-link
                target="_blank"
                :to="'/user/stories/' + story.id"
                class="flex font-bold hoverStyle bg-fc-yellow text-fc-black p-3"
            >
                <p class="text-base">
                    Voir mon histoire
                </p>
            </router-link>
        </div>

        <Modal
            v-if="selectedPlayer.character"
            v-show="showModal"
            :title="`${selectedPlayer?.character?.firstname || ''} ${selectedPlayer?.character?.lastname || ''}`"
            @close-modal="showModal = false;"
        >
            <div class="flex flex-col py-4 space-y-4">
                <p class="text-fc-black font-bold">
                    {{ selectedPlayer.character.hp <= 0 ? 'Mort' : `${selectedPlayerHp}/${selectedPlayer.character.hp} HP` }} - {{ `${selectedPlayer.character.experience_points}/${selectedPlayer.character.next_level_experience_points}` }} EXP.
                </p>
            </div>

            <div class="flex justify-evenly">
                <div 
                    class="flex items-center justify-center font-bold hoverStyle h-6 w-6 bg-fc-green text-fc-black-light select-none"
                    @click="e => updateSelectedPlayerHp(selectedPlayerHp - 1)"
                >
                    -
                </div>
    
                <p class="font-bold text-fc-yellow text-xl">
                    {{ selectedPlayerHp }}/{{ selectedPlayer.character.hp }} HP
                </p>
    
                <div 
                    class="flex items-center justify-center font-bold hoverStyle h-6 w-6 bg-fc-green text-fc-black-light select-none"
                    @click="e => updateSelectedPlayerHp(selectedPlayerHp + 1)"
                >
                    +
                </div>
            </div>

            <div class="flex justify-evenly">
                <div 
                    class="flex items-center justify-center font-bold hoverStyle h-6 w-6 bg-fc-green text-fc-black-light select-none"
                    @click="e => updateSelectedPlayerXp(selectedPlayerXp - 10)"
                >
                    -
                </div>
    
                <p class="font-bold text-fc-yellow text-xl">
                    {{ selectedPlayerXp }}/{{ selectedPlayer.character.next_level_experience_points }} EXP.
                </p>
    
                <div 
                    class="flex items-center justify-center font-bold hoverStyle h-6 w-6 bg-fc-green text-fc-black-light select-none"
                    @click="e => updateSelectedPlayerXp(selectedPlayerXp + 10)"
                >
                    +
                </div>
            </div>


            <div class="flex gap-2">
                <router-link
                    :to="`/characters/${selectedPlayer.character.id}`"
                    target="_blank"
                    class="self-end p-2 bg-fc-yellow hoverStyle"
                >
                    <p class="text-base font-bold">
                        Voir la fiche personnage
                    </p>
                </router-link>
    
                <Button
                    :button-text="$t('Mettre à jour')"
                    class="bg-fc-green p-0 text-base hoverStyle"
                    color="fc-green"
                    :rounded="false"
                    @click="updateSelectedPlayer()"
                />
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Modal from '@/components/Modal.vue'
import Button from '@/components/common/Button.vue'

export default {
    name: 'GM',
    components: { Modal, Button },
    props: {
        socket: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            showModal: false,
            selectedPlayer: {},
            selectedPlayerHp: 0,
            selectedPlayerXp: 0,
            selectedPlayerPos: {
                x: 0,
                y: 0
            }
        }
    },
    computed: {
        ...mapState('game', {
            story: state => state.story,
            players: state => state.diary.players,
            game_state: state => state.game_state,
            roomId: state => state.roomId
        }),
        ...mapState('user', {
            user: state => state.user
        }),
    },
    mounted() {
        console.log('state', this.game_state)
    },
    methods: {
        ...mapActions({
            update_game_state_player: 'game/update_game_state_player'
        }),
        handleSelectPlayer(player) {
            this.selectedPlayer = player
            this.selectedPlayerHp = player.character.hp
            this.selectedPlayerXp = player.character.experience_points
            this.showModal = true
        },
        updateSelectedPlayerHp(value) {
            this.selectedPlayerHp = value < 0 ? 0 : value
        },
        updateSelectedPlayerXp(value) {
            this.selectedPlayerXp = value < 0 ? 0 : value
        },
        async updateSelectedPlayer() {            
            await this.update_game_state_player({
                playerId: this.selectedPlayer.id,
                character: {
                    ...this.selectedPlayer.character,
                    hp: this.selectedPlayerHp,
                    experience_points: this.selectedPlayerXp
                }
            })

            if (this.socket) {
                this.socket.emit('update', {
                    roomId: this.roomId,
                    type: 'character',
                    playerId: this.selectedPlayer.id,
                    character: {
                        ...this.selectedPlayer.character,
                        hp: this.selectedPlayerHp,
                        experience_points: this.selectedPlayerXp
                    }
                })

                if (this.selectedPlayer.character.hp !== this.selectedPlayerHp) {
                    this.socket.emit('update_character_life', {
                        roomId: this.roomId,
                        senderName: this.user.username,
                        firstname: this.selectedPlayer.character.firstname,
                        lastname: this.selectedPlayer.character.lastname,
                        update: this.selectedPlayerHp
                    })
                }
    
                if (this.selectedPlayer.character.experience_points !== this.selectedPlayerXp) {
                    this.socket.emit('update_character_xp', {
                        roomId: this.roomId,
                        senderName: this.user.username,
                        firstname: this.selectedPlayer.character.firstname,
                        lastname: this.selectedPlayer.character.lastname,
                        update: this.selectedPlayerXp
                    })
                }
            }

            // Reset values & close modal
            this.showModal = false
            this.selectedPlayer = {}
            this.selectedPlayerHp = 0
            this.selectedPlayerXp = 0
        }
    }
}
</script>