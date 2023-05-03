<template>
    <SidebarLayout>
        <div
            v-if="loading"
            class="flex w-full h-full items-center justify-center"
        >
            <Loader />
        </div>

        <div
            v-else
            class="flex flex-col h-full space-y-4 sm:space-y-8"
        >
            <div class="flex justify-between">
                <BlackGreenDiv
                    :can-edit="true"
                    :on-change="handleTitleChange"
                    :title="room.title"
                    placeholder="Définir un titre"
                    :placeholderColor="'fc-gray-light'"
                    color="text-fc-yellow"
                    height="h-16"
                    :autofocus="true"
                />
                    
                <Button
                    class="ml-4 sm:mx-12"
                    button-text="Sauvegarder"
                    textColor="text-fc-yellow"
                    color="fc-black"
                    :rounded="false"
                    :disabled="loading"
                    background-color="fc-black"
                    :onclick="handleSubmit"
                />
            </div>

            <div class="flex flex-col h-full w-full sm:overflow-y-auto sm:space-x-8 sm:flex-row">
                <div class="flex flex-col relative h-full w-full pb-4 sm:w-3/4">
                    <BlackGreenDiv
                        title="Description"
                        :right-green-div="false"
                        color="text-white"
                    />
                    <div class="flex h-full overflow-y-scroll scrollbar-hide">
                        <textarea
                            v-model="room.description"
                            class="flex h-full overflow-y-scroll scrollbar-hide"
                            placeholder="Entrez une description"
                        />
                    </div>

                    <img
                        src="@/assets/cornerPixels.svg"
                        class="absolute bottom-4 right-0 w-12 -rotate-180 -z-10 scale-x-[-1]"
                    >
                </div>

                <div class="flex flex-col w-full h-full">
                    <BlackGreenDiv
                        title="Paramétrage"
                        :right-green-div="false"
                        color="text-white"
                    />
                
                    <div class="flex w-full h-full p-4 justify-evenly  sm:h-1/2">
                        <div class="flex flex-col space-y-4 sm:space-y-6">
                            <h3 class="flex font-bold items-center">
                                Prérequis:
                                <CustomInput
                                    :max-length="254"
                                    place-holder="Prérequis"
                                    type="text"
                                    outline="fc-green"
                                    :value="room.requirements"
                                    @input="(v) => handleUpdateRequirements(v.target.value)"
                                />
                            </h3>
                            <div class="flex">
                                <h3 class="flex font-bold items-center mx-2">
                                    Map:
    
                                    <SelectorMultiple
                                        :items="maps"
                                        :isMultiple="false"
                                        :on-select-item="handleSelectedMaps.bind(this)"
                                        selector-class="flex flex-col relative text-fc-black cursor-pointer select-none"
                                    />
                                </h3>
                                <h3 class="flex font-bold items-center">
                                    Story:
                                    <SelectorMultiple
                                        :items="stories"
                                        :isMultiple="false"
                                        :on-select-item="handleSelectedStory.bind(this)"
                                        selector-class="flex flex-col relative text-fc-black cursor-pointer select-none"
                                    />
                                </h3>
                            </div>
                            <h3 class="flex font-bold items-center">
                                Nombre de joueurs max:

                                <input
                                    :max="64"
                                    :min="0"
                                    :placeholder="5"
                                    type="number"
                                    class="flex w-12 h-12 mr-5 text-center bg-fc-black text-fc-green placeholder:text-fc-yellow-trans text-lg font-bold outline-none mx-2"
                                    outline="fc-green"
                                    :value="room.players_nb_max"
                                    @input="(v) => (room.players_nb_max = parseInt(v.target.value || 0))"
                                />
                            </h3>

                            <h3 class="flex font-bold">
                                Privé:
                                <input
                                    class="mx-2"
                                    :checked="room.is_private"
                                    type="checkbox"
                                    :onClick="(v) => set_is_private(v.target.checked)"
                                >
                            </h3>
                            <h3 class="flex font-bold items-center">
                                Mot de passe:
                                <CustomInput
                                    :max-length="64"
                                    :place-holder="$t('Mot de passe')"
                                    :typeinput="'password'"
                                    outline="fc-green"
                                    :value="room.password"
                                    @input="(v) => (room.password = v.target.value)"
                                />
                            </h3>
                        </div>
                    </div>

                    <div class="flex flex-col h-full">
                        <BlackGreenDiv
                            title="Communication"
                            :right-green-div="false"
                            color="text-white"
                        />

                        <div class="flex flex-col items-center justify-between p-4 space-x-2 sm:flex-row">
                            <p class="flex items-center space-x-4 font-bold">
                                Vocal
                            </p>

                            <CustomInput
                                :max-length="254"
                                place-holder="URL du vocal"
                                type="text"
                                outline="fc-green"
                                :value="room.vocal_url"
                                @input="(v) => (room.vocal_url = v.target.value)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SidebarLayout>
</template>

<script>
import { useToast } from "vue-toastification"
import { mapState, mapActions, mapMutations } from "vuex"

import SidebarLayout from "@/layouts/Sidebar.vue"
import BlackGreenDiv from "@/components/common/BlackGreenDiv.vue"
import Button from "@/components/common/Button.vue"
import SelectorMultiple from '@/components/common/SelectorMultiple.vue'
import CustomInput from "@/components/common/CustomInput.vue"
import Loader from "@/components/common/Loader.vue"
import { PLAYSTYLE, EXPERIENCE, LANGUAGES } from "@/utils/enums"
import { apiCall } from "@/utils/apiCall"
import store from "@/store"

export default {
    name: "CreateRoom",
    components: {
        SidebarLayout,
        BlackGreenDiv,
        Button,
        SelectorMultiple,
        CustomInput,
        Loader,
    },
    data() {
        store.commit("room/set_room", {
            title: "",
            description:"",
            password: "",
            players_nb_max: 5,
            requirements: "",
            mj: {},
            players: [],
            vocal_url: "",
            isPrivate: false,
        })

        return {
            loading: false,
            maps: [],
            selectedMaps: "",
            selectedStory: "",
            stories: [],
            PLAYSTYLE,
            EXPERIENCE,
            LANGUAGES
        }
    },
    computed: {
        ...mapMutations("room", {
            set_room: "set_room",
        }),
        ...mapState("errors", {
            errors: (state) => state.errors,
        }),
        ...mapState("room", {
            room: (state) => state.room,
        }),
        ...mapState("user", {
            user: (state) => state.user,
        }),
    },
    async beforeMount() {
        const toast = useToast()

        try {
            const mapRes = await apiCall({
                method: 'GET',
                route: '/maps'
            })

            this.maps = mapRes.data.reduce((maps, curMap) => {
                return [
                    ...maps,
                    {
                        name: curMap.title,
                        value: curMap.id
                    }
                ]
            }, [])

            const storyRes = await apiCall({
                method: 'GET',
                route: '/stories'
            })

            this.stories = storyRes.data.reduce((stories, curStory) => {
                return [
                    ...stories,
                    {
                        name: curStory.title,
                        value: curStory.id
                    }
                ]
            }, [])
        } catch (error) {
            toast.error(error)
        }
    },
    methods: {
        ...mapActions({
            create_room: "room/create_room",
            update_error: "errors/update_error",
        }),
        handleTitleChange(v) {
            this.room.title = v.target.value
        },
        handleSelectedStory(v) {
            this.selectedStory = v
        },
        handleSelectedMaps(v) {
            this.selectedMaps = v
        },
        handleUpdateExp(v) {
            this.room.experience = v
        },
        handleUpdateLang(v) {
            this.room.language = v
        },
        set_is_private(v) {
            this.room.is_private = v
        },
        handleUpdateRequirements(v) {
            this.room.requirements = v
        },
        handleUpdateMinLvl(v) {
            let maxLvl = this.room.levelGap.split("-")[1]

            if (parseInt(maxLvl) < parseInt(v.target.value))
                this.room.levelGap = `${v.target.value}-${v.target.value}`
            else this.room.levelGap = `${v.target.value}-${maxLvl}`
        },
        handleUpdateMaxLvl(v) {
            let minLvl = this.room.levelGap.split("-")[0]

            if (parseInt(minLvl) > parseInt(v.target.value))
                this.room.levelGap = `${v.target.value}-${v.target.value}`
            else this.room.levelGap = `${minLvl}-${v.target.value}`
        },
        handleSubmit() {
            const toast = useToast()
            let canBeSubmitted = true
            if (this.room.password) this.room.isPrivate = true

            if (!this.room.title) {
                toast.error("Titre obligatoire")
                canBeSubmitted = false
            }

            if (!this.room.description)
                this.room.description = ''

            if (!this.room.requirements)
                this.room.requirements = ''

            this.room.gm = this.user
            this.room.game = {
                universe: 'cem',
                story_id: this.selectedStory,
                map_id: this.selectedMaps,
            }
            if (canBeSubmitted) {
                this.submitRoom()
            }
        },
        async submitRoom() {
            const toast = useToast()

            this.loading = true
            await this.create_room(this.room)
            if (this.errors.message) {
                console.log(this.errors)
                toast.error(this.errors.message)
                this.update_error({ message: null })
            } else {
                this.$router.push(`/rooms`).then(() => toast.success(this.$t('Création de la room réalisée avec succès')))
            }
            this.loading = false

        },
    }}
</script>
