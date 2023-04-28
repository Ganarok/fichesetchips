<template>
    <div 
        class="flex flex-col w-full justify-between space-y-4 p-4 overflow-y-scroll text-white"
        :style="{
            height: 'calc(100vh - 64px)'
        }"
    >
        <div class="flex flex-col space-y-4">
            <p class="self-start font-bold text-fc-yellow text-xl">
                Options
            </p>

            <div
                v-if="vocal_url"
                class="flex flex-col"
            >
                <p class="font-bold text-lg">
                    Vocal
                </p>

                <p class="underline italic">
                    {{ vocal_url }}
                </p>
            </div>

            <div class="flex flex-col">
                <p class="font-bold text-lg">
                    MJ
                </p>

                <p>
                    {{ gm.username }}
                </p>
            </div>

            <Button
                :button-text="$t('Vider les messages')"
                class="bg-fc-green p-3 text-base self-center hoverStyle"
                textColor="text-fc-black"
                color="fc-yellow"
                :rounded="false"
                @click="resetMessages()"
            />
        </div>

        <div class="flex space-x-2 justify-evenly">
            <Button
                v-if="is_gm"
                :button-text="$t('Pauser la partie')"
                class="bg-fc-green p-3 text-base hoverStyle"
                textColor="text-fc-black"
                color="fc-yellow"
                :rounded="false"
                @click="handlePause()"
            />

            <Button
                :button-text="$t('Quitter la partie')"
                class="bg-fc-red p-3 text-base hoverStyle"
                textColor="text-fc-black"
                color="fc-red"
                :rounded="false"
                @click="leaveGame()"
            >
                <p class="text-base">
                    Quitter la partie 
                </p>
            </Button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { useToast } from 'vue-toastification'

import Button from '@/components/common/Button.vue'
import { GAMESTATUS } from '@/utils/enums'

export default {
    name: "Options",
    components: {
        Button
    },
    props: {
        socket: {
            type: Object,
            default: null
        }
    },
    computed: {
        ...mapState('game', {
            vocal_url: state => state.vocal_url,
            gm: state => state.gm,
            is_gm: state => state.diary.is_gm,
            roomId: state => state.roomId,
            my_character: state => state.diary.my_character
        }),
        ...mapState('user', {
            userId: state => state.user.id
        })
    },
    methods: {
        ...mapMutations('game', [
            'resetMessages'
        ]),
        ...mapActions({
            update_game_state: 'game/update_game_state'
        }),
        async handlePause() {
            const toast = useToast()
            
            try {
                await this.update_game_state({
                    status: GAMESTATUS.PAUSED,
                    state: {}
                })

                if (this.socket) {
                    this.socket.emit('update', {
                        room_id: this.roomId,
                        gamestatus: GAMESTATUS.PAUSED
                    })
                }
                
                toast.success('La partie a été mise en pause')
            } catch (error) {
                toast.error('Une erreur est survenue')
                console.log(error)
            }
        },
        leaveGame() {
            const toast = useToast()

            if (this.socket) {
                this.socket.emit('leaving_room', {
                    room_id: this.roomId,
                    name: this.ig_gm ? 
                        'Le GM'
                        : `${this.my_character?.firstname} ${this.my_character?.lastname}` || 'Un joueur',
                    userId: this.userId
                })
            }

            this.$router.push('/rooms').then(() => {
                toast.success('Vous avez quitté la partie')
            })
        }
    }
}

</script>