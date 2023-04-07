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
                <!-- <Button
                    class="ml-4 sm:mx-12"
                    button-text="Publier"
                    textColor="text-fc-yellow"
                    color="fc-black"
                    :rounded="false"
                    :disabled="loading"
                    background-color="fc-black"
                    :onclick="handleSubmit"
                /> -->
            </div>

            <div
                class="flex flex-col h-full w-full pb-4 space-y-4 sm:space-y-0 sm:flex-row sm:overflow-y-auto sm:space-x-8"
            >
                <div
                    class="flex flex-col relative h-full w-full pb-4 bg-gradient-to-b from-gray-50 to-gray-100 t sm:w-3/4"
                >
                    <BlackGreenDiv
                        title="Description"
                        :right-green-div="false"
                        color="text-white"
                    />

                    <textarea
                        v-model="room.description"
                        class="scrollbar-hide flex h-screen text-justify pr-2 m-2 bg-transparent overflow-y-scroll outline-none resize-none sm:h-full sm:m-3 placeholder:italic"
                        placeholder="Entrez une description"
                    />
                    <BlackGreenDiv
                        title="Requirements"
                        :right-green-div="false"
                        color="text-white"
                    />

                    <textarea
                        v-model="room.requirements"
                        class="scrollbar-hide flex h-screen text-justify pr-2 m-2 bg-transparent overflow-y-scroll outline-none resize-none sm:h-full sm:m-3 placeholder:italic"
                        placeholder="Entrez une description"
                    />

                    <img
                        src="@/assets/cornerPixels.svg"
                        class="absolute bottom-0 right-0 w-12 -rotate-180 z-10 scale-x-[-1]"
                    >
                </div>

                <div class="flex flex-col w-full h-full space-y-4">
                    <BlackGreenDiv
                        title="Contenu de la partie"
                        :right-green-div="false"
                        color="text-white"
                    />

                    <div class="flex justify-evenly">
                        <div class="flex flex-col px-4 items-center justify-between">
                            <p class="font-bold">
                                {{ $t("Cartes") }}
                            </p>
    
                                <SelectorMultiple
                                    :items="maps"
                                    :isMultiple="false"
                                    :on-select-item="handleSelectedMaps.bind(this)"
                                    selector-class="flex flex-col relative text-fc-black cursor-pointer select-none"
                                />
                            </div>
                            <div class="flex flex-col px-4 items-center justify-between">
                                <p class="font-bold">
                                    {{ $t("Story") }}
                                </p>
                                <SelectorMultiple
                                    :items="stories"
                                    :isMultiple="false"
                                    :on-select-item="handleSelectedStory.bind(this)"
                                    selector-class="flex flex-col relative text-fc-black cursor-pointer select-none"
                                />
                            </div>
                        </div>
    
                        <!-- <div class="flex flex-col px-4 items-center justify-between">
                            <p class="font-bold">
                                {{ $t("Stories") }}
                            </p>
    
                            <SelectorMultiple
                                :items="stories"
                                :on-select-item="handleUpdateStyle"
                                selector-class="flex flex-col relative text-fc-black cursor-pointer select-none"
                            />
                        </div> -->
                    </div>

                    <BlackGreenDiv
                        title="Accessibilité du salon"
                        :right-green-div="false"
                        color="text-white"
                    />

                    <div class="flex w-full items-center justify-between px-4">
                        <p class="font-bold">
                            {{ $t("Mot de passe") }}
                        </p>

                        <CustomInput
                            :max-length="64"
                            :place-holder="$t('Mot de passe')"
                            :typeinput="'password'"
                            outline="fc-green"
                            :value="room.password"
                            @input="(v) => (room.password = v.target.value)"
                        />
                    </div>

                    <div class="flex w-full items-center justify-between px-4">
                        <p class="font-bold">
                            Max. de joueurs
                        </p>

                        <input
                            :max="64"
                            :min="0"
                            :placeholder="5"
                            type="number"
                            class="flex w-12 h-12 mr-5 text-center bg-fc-black text-fc-green placeholder:text-fc-yellow-trans text-lg font-bold outline-none"
                            outline="fc-green"
                            :value="room.players_nb_max"
                            @input="(v) => (room.players_nb_max = parseInt(v.target.value || 0))"
                        />
                    </div>

                    <BlackGreenDiv
                        title="Communication"
                        :right-green-div="false"
                        color="text-white"
                    />

                    <div class="flex w-full items-center justify-between px-4">
                        <p class="font-bold">
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
                this.$router.push(`/rooms/${this.room.id}`).then(() => toast.success(this.$t('Création de la room réalisée avec succès')))
            }
            this.loading = false

        },
    }}
</script>
