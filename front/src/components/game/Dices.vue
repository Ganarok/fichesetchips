<template>
    <div 
        class="flex flex-col w-full justify-between space-y-4 p-4 overflow-y-scroll text-white"
        :style="{
            height: 'calc(100vh - 64px)'
        }"
    >
        <div class="flex flex-col space-y-4">
            <p class="text-xl font-bold text-fc-yellow">
                Dés
            </p>

            <div 
                class="flex space-x-2 hoverStyle"
                @click="throwDice(100)"
            >
                <div class="relative h-6 w-6">
                    <img
                        src="@/assets/yellow_dice.svg"
                        class="object-contain"
                        alt="Dice"
                    />
                </div>

                <p class="font-bold">
                    Lancer un D100
                </p>
            </div>

            <div 
                class="flex space-x-2 hoverStyle"
                @click="throwDice(20)"
            >
                <div class="relative h-6 w-6">
                    <img
                        src="@/assets/yellow_dice.svg"
                        class="object-contain"
                        alt="Dice"
                    />
                </div>

                <p class="font-bold">
                    Lancer un D20
                </p>
            </div>

            <div 
                class="flex space-x-2 hoverStyle"
                @click="throwDice(10)"
            >
                <div class="relative h-6 w-6">
                    <img
                        src="@/assets/yellow_dice.svg"
                        class="object-contain"
                        alt="Dice"
                    />
                </div>

                <p class="font-bold">
                    Lancer un D10
                </p>
            </div>

            <div 
                class="flex space-x-2 hoverStyle"
                @click="throwDice(6)"
            >
                <div class="relative h-6 w-6">
                    <img
                        src="@/assets/yellow_dice.svg"
                        class="object-contain"
                        alt="Dice"
                    />
                </div>

                <p class="font-bold">
                    Lancer un D6
                </p>
            </div>

            <div 
                class="flex space-x-2 hoverStyle"
                @click="throwDice(4)"
            >
                <div class="relative h-6 w-6">
                    <img
                        src="@/assets/yellow_dice.svg"
                        class="object-contain"
                        alt="Dice"
                    />
                </div>

                <p class="font-bold">
                    Lancer un D4
                </p>
            </div>
            
            <div 
                class="flex space-x-2 items-center text-center"
                :class="announcement ? 'text-fc-yellow' : 'opacity-50'"
            >
                <input
                    v-model="announcement"
                    type="checkbox"
                    class=" h-5 w-5 text-fc-yellow"
                />

                <p>
                    Annoncer mon résultat aux autres joueurs
                </p>
            </div>
        </div>

        <div 
            v-if="lastDice"
            class="flex flex-col space-y-2"
        >
            <p class="text-lg font-bold text-fc-green">
                Dernier résultat
            </p>

            <div class="flex space-x-2">
                <p>
                    {{ `D${lastDice.type}` }}:
                </p>

                <p class="font-bold text-fc-yellow underline">
                    {{ lastDice.result }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'


export default {
    name: "Dices",
    components: {
    },
    props: {
        socket: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            announcement: true
        }
    },
    computed: {
        ...mapState('game', {
            vocal_url: state => state.vocal_url,
            gm: state => state.gm,
            is_gm: state => state.diary.is_gm,
            lastDice: state => state.diary.lastDice,
        })
    },
    methods: {
        ...mapMutations({
            updateDiceResult: 'game/updateDiceResult'
        }),
        throwDice(diceMaxValue = 6) {
            const dicesResults = Math.floor(Math.random() * diceMaxValue) + 1

            this.updateDiceResult({
                type: diceMaxValue,
                result: dicesResults
            })

            if (this.announcement) {
                // TODO: Emit une update
                // this.socket.emit()

                // TODO: Push un message dans nos message en local ?
            }
        },
    }
}

</script>