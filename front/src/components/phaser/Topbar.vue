<template>
    <div
        class="flex relative w-full h-12 px-4 justify-between items-center text-white font-bold select-none bg-fc-black border-b border-fc-green z-10"
    >
        <div class="flex flex-col items-center relative z-50">
            <img
                src="@/assets/icons/option.svg"
                class="h-6 w-6 cursor-pointer transition ease-in-out hover:opacity-80 hover:rotate-90"
                alt="option"
                @click="() => optionsOpened = !optionsOpened"
            >

            <div
                v-if="optionsOpened"
                class="absolute left-10 items-center p-2 bg-fc-black-light text-fc-yellow whitespace-nowrap"
            >
                <div class="flex flex-col space-y-4">
                    <div
                        v-for="option in options"
                        :key="option.name"
                        class="flex flex-col"
                    >
                        <p
                            class="text-xs cursor-pointer hover:opacity-80"
                            @click="option.action"
                        >
                            {{ option.name }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex space-x-2 items-center">
            <h1>MapMaker</h1>

            <p>
                -
            </p>

            <div class="text-fc-green">
                <EditableDiv 
                    :modelValue="title"
                    :canEdit="true"
                />
            </div>
        </div>

        <img
            src="@/assets/icon.svg"
            class="h-7 w-7 cursor-pointer hover:opacity-80"
            alt="logo"
            :onclick="() => $router.push('/')"
        >
    </div>
</template>

<script>
import { mapState } from 'vuex'

import store from '@/store'
import EditableDiv from '@/components/subComponent/EditableDiv.vue'

export default {
    name: "Topbar",
    components: { EditableDiv },
    computed: {
        ...mapState("phaser", {
            title: (state) => state.title,
        }),
    },
    methods: {
        exportMap() {
            this.optionsOpened = false;
            console.log("Télécharger");
            store.commit("phaser/updateState", { property: "isExporting", newState: true });
        },
        saveMap() {
            this.optionsOpened = false;
            console.log("save");
        },
        loadMap() {
            this.optionsOpened = false;
            console.log("load");
        },
    },
    data() {
        return {
            optionsOpened: false,
            options: [
                {
                    name: "Télécharger la carte",
                    action: () => this.exportMap(),
                },
                {
                    name: "Sauvegarder la carte",
                    action: () => this.saveMap(),
                },
                {
                    name: "Charger une carte",
                    action: () => this.loadMap(),
                }
            ]
        };
    }
}
</script>
