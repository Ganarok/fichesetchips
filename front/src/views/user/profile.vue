<template>
    <SidebarLayout>
        <div class="h-screen w-full p-8 overflow-hidden flex flex-col">
            <h1 class="text-[40px] font-bold ml-6 mt-4 mb-4">
                Bonjour [Pseudo]
            </h1>
            <div class="h-full w-full overflow-hidden flex">
                <div class="flex flex-col w-2/3 h-full space-y-4 mx-2">
                    <div class="flex h-full overflow-hidden">
                        <div
                            class="flex w-full h-full mx-2 border-2 border-fc-green p-6 text-xl overflow-y-auto items-center">
                            <div class="flex w-full justify-between">
                                <div>
                                    <div
                                        class="h-1/5 pb-8 flex font-bold text-xl text-fc-green items-center w-full">
                                        <h1>Profile</h1>
                                    </div>

                                    <EditableDiv
                                        label="Localisation"
                                        value="Paris" />
                                    <EditableDiv
                                        label="Pseudo"
                                        value="Galadows" />
                                    <EditableDiv label="Mail" value="Privé" />
                                    <EditableDiv
                                        label="Bio"
                                        value="Jeune elfe recherche un mage mortel" />

                                    <!-- <div>Pseudo: <span> [Pseudo] </span></div>
                                    <div>Mail: <span> Privé </span></div>
                                    <div>
                                        Bio:
                                        <span>
                                            Jeune elfe recherche un mage mortel
                                        </span>
                                    </div> -->
                                </div>
                                <div>
                                    <div
                                        class="h-1/5 pb-8 flex font-bold text-xl text-fc-green items-center w-full">
                                        <h1>
                                            Informations personelles privées
                                        </h1>
                                    </div>
                                    <EditableDiv
                                        label="Mail"
                                        value="fiche&chips@chips.com" />
                                    <EditableDiv
                                        label="Mot de passe"
                                        value="Ceciestunmotdepasse"
                                        password />
                                    <div
                                        class="h-1/5 flex text-[24px] justify-center items-center w-full">
                                        <button
                                            class="relative top-20 border-2 py-1 text-base text-fc-green border-fc-green rounded-full px-28">
                                            Voir mon profil public
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex h-full overflow-hidden">
                        <div
                            class="w-7/12 mx-2 h-full border-2 border-fc-black p-6 text-xl overflow-y-auto">
                            <div>
                                <div
                                    class="h-1/5 pb-8 flex font-bold text-xl text-fc-black items-center w-full">
                                    <h1>Statistiques</h1>
                                </div>
                                <div class="">
                                    Nombre de parties en tant que joueur:
                                    <span> 666 </span>
                                </div>
                                <div>
                                    Nombre de parties en tant que MJ:
                                    <span> 666 </span>
                                </div>
                                <div>
                                    Date d'inscription:
                                    <span> 01-01-01 </span>
                                </div>
                                <div>
                                    Dernière connexion:
                                    <span> 01-01-01 </span>
                                </div>
                                <div>
                                    Temps passé en campagne:
                                    <span> 100h </span>
                                </div>
                            </div>
                        </div>
                        <div
                            class="w-5/12 mx-2 border-2 border-fc-yellow p-6 text-xl overflow-y-auto">
                            <div>
                                <div
                                    class="h-1/5 pb-8 flex font-bold text-xl text-fc-yellow items-center w-full">
                                    <h1>Badges remportés</h1>
                                </div>
                                <div class="">
                                    1ère partie en tant que MJ <span> </span>
                                </div>
                                <div>100h dépassées: <span> </span></div>
                                <div>Finir une campagne <span> </span></div>
                                <div
                                    class="h-1/5 flex text-[24px] justify-center items-center w-full">
                                    <button
                                        class="relative top-10 border-2 py-1 text-base text-fc-yellow border-fc-yellow rounded-full px-28">
                                        Voir plus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex h-full overflow-hidden">
                        <div
                            class="w-6/12 h-full mx-2 border-2 border-fc-yellow p-6 text-xl overflow-y-auto">
                            <div>
                                <div
                                    class="h-1/5 pb-8 flex font-bold text-xl text-fc-yellow items-center w-full">
                                    <h1>Préférences</h1>
                                </div>
                                <div class="">
                                    Thème:
                                    <span> Light </span>
                                </div>
                                <div>
                                    Langue:
                                    <span> Français </span>
                                </div>
                                <div>
                                    Fréquence mail:
                                    <span> hebdomadaire </span>
                                </div>
                                <div>
                                    Alerte quand ami joue:
                                    <span> oui </span>
                                </div>
                            </div>
                        </div>

                        <div
                            class="w-full h-full mx-2 border-2 border-fc-green p-6 text-xl overflow-y-auto"></div>
                    </div>
                </div>
                <div class="w-1/3 mx-2">
                    <div
                        class="w-full h-full border-2 border-fc-black p-6 text-xl overflow-y-auto">
                        <div>
                            <div
                                class="h-1/5 pb-8 flex font-bold text-xl text-fc-black items-center w-full">
                                <h1>Dernières campagnes</h1>
                            </div>
                            <div class="mb-8">
                                <div class="">Le Chat Triste</div>
                                <div>04-01-01</div>
                                <div>John Doe</div>
                                <div>==> En cours</div>
                            </div>
                            <div class="mb-8">
                                <div class="">Le Chat Triste</div>
                                <div>03-01-01</div>
                                <div>John Doe</div>
                                <div>==> En cours</div>
                            </div>
                            <div class="mb-8">
                                <div class="">Le Chat Triste</div>
                                <div>02-01-01</div>
                                <div>John Doe</div>
                                <div>==> En cours</div>
                            </div>
                            <div class="mb-8">
                                <div class="">Le Chat Triste</div>
                                <div>01-01-01</div>
                                <div>John Doe</div>
                                <div>==> En cours</div>
                            </div>
                            <div
                                class="h-1/5 flex text-[24px] justify-center items-center w-full">
                                <button
                                    class="relative top-20 border-2 py-1 text-base text-fc-black border-fc-black rounded-full px-28">
                                    Voir plus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SidebarLayout>
</template>

<script>
import CustomTable from '@/components/subComponent/CustomTable.vue'
import EditableDiv from '@/components/subComponent/EditableDiv.vue'
import SidebarLayout from '@/layouts/Sidebar.vue'
import { apiCall } from '@/utils/apiCall'

export default {
    components: { CustomTable, EditableDiv, SidebarLayout },
    data() {
        return {
            profile: {},
            stats: {},
            prefs: {},
            campaignsHistory: [],
            badges: [],
        }
    },
}
</script>

<style></style>
