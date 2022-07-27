<template>
    <div class="flex">
        <SubComponentSidebar />
        <div class="h-screen w-full p-8 overflow-hidden flex flex-col">
            <h1 class="text-[40px] font-bold ml-6 mt-4 mb-4">
                Bonjour [Pseudo]
            </h1>
            <div class="flex flex-1 m-2 overflow-hidden">
                <div class="w-5/12 mx-2">
                    <custom-table
                        borderColor="border-chips-yellow"
                        textColor="text-chips-yellow"
                        :rows="[
                            [
                                'Kaamlott: La quête du graal',
                                'Puigs',
                                '10/06/2022 à 19h00',
                            ],
                            [
                                'Le tonnerre du roi des tempêtes',
                                'Puigs',
                                '01/07/2022 à 19h00',
                            ],
                            [
                                'La mine perdue de Phandelver',
                                'Puigs',
                                '05/07/2022 à 19h00',
                            ],
                            [
                                'Les fantômes de marais salé',
                                'Ganarok',
                                '22/07/2022 à 19h00',
                            ],
                            [
                                'La malédiction de Strahd',
                                'Galadows',
                                'A définir',
                            ],
                        ]"
                    />
                </div>
                <div class="w-7/12 border-2 border-black mx-2">
                    <div class="flex h-4/5 w-full">
                        <div
                            class="flex flex-col justify-center items-center w-1/6"
                            v-for="personnage in 6"
                            :key="personnage"
                        >
                            <div
                                class="h-1/5 w-full flex justify-center items-center"
                            >
                                <h1>Classe {{ personnage }}</h1>
                            </div>
                            <div class="h-3/5 w-full">
                                <img
                                    src="..\assets\CharPlaceholder.jpg"
                                    alt=""
                                />
                            </div>
                            <div
                                class="h-1/5 flex w-full justify-center items-center"
                            >
                                <h1>Personnage {{ personnage }}</h1>
                            </div>
                        </div>
                    </div>
                    <div
                        class="h-1/5 flex text-[24px] justify-center items-center w-full"
                    >
                        <button
                            class="border-2 border-black rounded-full px-28"
                        >
                            Voir plus
                        </button>
                    </div>
                </div>
            </div>

            <div class="flex m-2 flex-1 overflow-hidden">
                <div class="w-7/12 mx-2">
                    <custom-table
                        :labels="[
                            'Scenario',
                            'Niveau',
                            'Nombre de joueurs',
                            'Durée',
                        ]"
                        :rows="[
                            ['A la chasse aux gobs', 1, 4, '3h-4h'],
                            ['L\'Oeil de Gruumsh', 1, 4, '3h-4h'],
                            ['La tombe des rois serpents', 1, 4, '3h-4h'],
                            ['La tombe des rois serpents', 1, 4, '3h-4h'],
                            ['La secte du Crâne', 1, 4, '3h-4h'],
                        ]"
                    />
                </div>
                <div class="w-5/12 mx-2 border-2 border-fiche-green">
                    <div
                        class="h-1/5 pl-10 flex font-bold text-xl text-fiche-green items-center w-full"
                    >
                        <h1>Univers</h1>
                    </div>
                    <div class="flex h-4/5 w-full">
                        <div
                            class="flex justify-center items-center w-1/3"
                            v-for="univer in 3"
                            :key="univer"
                        >
                            <h1>Univer {{ univer }}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CustomTable from '~/components/subComponent/CustomTable.vue'

export default {
    components: { CustomTable },
}
</script>

<style></style>
