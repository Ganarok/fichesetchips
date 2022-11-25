<template>
    <SidebarLayout>
        <div
            class="flex w-full h-full items-center justify-center" 
            v-if="loading"
        >
            <Loader />
        </div>
        
        <div class="flex flex-col h-full space-y-4 sm:space-y-8" v-else>
            <div class="flex justify-between">
                <BlackGreenDiv
                    :canEdit="true"
                    :onChange="handleTitleChange"
                    :title="room.title"
                    placeholder="Définir un titre"
                    color="text-fc-yellow"
                    height="h-16"
                />

                <Button 
                    class="ml-4 sm:mx-12"
                    buttonText="Publier"
                    color="fc-green"
                    :rounded="false"
                    :disabled="loading"
                    backgroundColor="fc-black"
                    :onclick="this.handleSubmit"
                />
            </div>

            <div class="flex flex-col h-full w-full pb-4 space-y-4 sm:space-y-0 sm:flex-row sm:overflow-y-auto sm:space-x-8">
                <div class="flex flex-col relative h-full w-full pb-4 bg-gradient-to-b from-gray-50 to-gray-100 t sm:w-3/4">
                    <BlackGreenDiv 
                        title="Description"
                        :rightGreenDiv="false"
                        color="text-white"
                    />

                    <textarea
                        class="flex h-screen text-justify pr-2 m-2 bg-transparent overflow-y-scroll outline-none resize-none sm:h-full sm:m-3 placeholder:italic"
                        placeholder="Entrez une description"
                        v-model="room.description"
                    />

                    <img 
                        src="@/assets/cornerPixels.svg"
                        class="absolute bottom-0 right-0 w-12 -rotate-180 z-10 scale-x-[-1]"
                    />
                </div>

                <div class="flex flex-col w-full h-full space-y-4">
                    <BlackGreenDiv
                        title="Style de partie"
                        :rightGreenDiv="false"
                        color="text-white"
                    />

                    <div class="flex px-4 items-center justify-evenly">
                        <div class="bg-gray-400 border-2 border-fc-black-light rounded-full w-24 h-24" />

                        <Selector 
                            :items="PLAYSTYLE"
                            defaultSelectedItem='Style'
                            :onSelectItem="handleUpdateStyle"
                            selectorClass="flex flex-col relative text-fc-black cursor-pointer select-none"
                        />
                    </div>

                    <BlackGreenDiv 
                        title="Accessibilité du salon"
                        :rightGreenDiv="false"
                        color="text-white"
                    />

                    <div class="flex w-full px-4 justify-evenly">
                        <div class="flex flex-col space-y-4">
                            <div class="flex items-center">
                                <p>
                                    {{ $t('Mot de passe') }}
                                </p>

                                <CustomInput
                                    :maxLength="64"
                                    :placeHolder="$t('Mot de passe')"
                                    type="password"
                                    outline="fc-green"
                                    @input="(v) => this.room.password = v.target.value"
                                />
                            </div>

                            <div class="flex items-center space-x-4">
                                <p>
                                    {{ $t('Expérience') }}
                                </p>

                                <Selector 
                                    :items="EXPERIENCE"
                                    defaultSelectedItem='Expérience'
                                    :onSelectItem="handleUpdateExp"
                                    selectorClass="flex flex-col relative text-fc-black cursor-pointer select-none"
                                />
                            </div>

                        </div>

                        <div class="flex flex-col justify-between space-y-4">
                            <div class="flex items-center space-x-4">
                                <p class="w-16">
                                    {{ $t('Niv. Min') }}
                                </p>

                                <ParamInput
                                    inputType="number"
                                    :placeholder="0"
                                    :inputValue="parseInt(this.room.levelGap.split('-')[0])"
                                    inputClass="outline-fc-yellow-trans"
                                    :onValueChanged="handleUpdateMinLvl" />
                            </div>

                            <div class="flex items-center space-x-4">
                                <p class="w-16">
                                    {{ $t('Niv. Max') }}
                                </p>

                                <ParamInput
                                    inputType="number"
                                    :placeholder="0"
                                    :max="99"
                                    :inputValue="parseInt(this.room.levelGap.split('-')[1])"
                                    inputClass="outline-fc-yellow-trans"
                                    :onValueChanged="handleUpdateMaxLvl" />
                            </div>
                        </div>
                    </div>

                    <BlackGreenDiv 
                        title="Communication"
                        :rightGreenDiv="false"
                        color="text-white"
                    />

                    <div class="flex flex-col px-4 space-y-4">
                        <div class="flex items-center justify-between space-x-4">
                            <p>
                                Contact
                            </p>

                            <CustomInput
                                :maxLength="254"
                                placeHolder='Contact'
                                type="text"
                                outline="fc-green"
                                @input="(v) => this.room.contact = v.target.value"
                            />
                        </div>

                        <div class="flex items-center justify-between space-x-4">
                            <p>
                                Information
                            </p>

                            <CustomInput
                                :maxLength="254"
                                placeHolder='Information'
                                type="text"
                                outline="fc-green"
                                @input="(v) => this.room.information = v.target.value"
                            />
                        </div>

                        <div class="flex space-x-4 justify-between py-4 sm:py-0">
                                <p>
                                    {{ $t('Langue') }}
                                </p>

                                <Selector 
                                    :items="LANGUAGES"
                                    :defaultSelectedItem="$t('Langue')"
                                    :onSelectItem="handleUpdateLang"
                                    selectorClass="flex flex-col relative text-fc-black cursor-pointer select-none"
                                />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SidebarLayout>
</template>

<script>
import SidebarLayout from '@/layouts/Sidebar.vue'
import Room from '@/components/Room.vue'
import BlackGreenDiv from '@/components/subComponent/BlackGreenDiv.vue'
import Button from '@/components/subComponent/Button.vue'
import Selector from '@/components/subComponent/Selector.vue'
import CustomInput from '@/components/subComponent/CustomInput.vue'
import ParamInput from '@/components/subComponent/ParamInput.vue'
import Loader from '@/components/Loader.vue'
import { useToast } from 'vue-toastification'
import { PLAYSTYLE, EXPERIENCE, LANGUAGES } from '@/utils/enums'
import { apiCall } from '@/utils/apiCall'

export default {
    name: 'Create_Room',
    components: {
        SidebarLayout,
        Room,
        BlackGreenDiv,
        Button,
        Selector,
        CustomInput,
        ParamInput,
        Loader
    },
    methods: {
        handleTitleChange(v) {
            this.room.title = v.target.value
        },
        handleUpdateStyle(v) {
            this.room.style = v
        },
        handleUpdateExp(v) {
            this.room.experience = v
        },
        handleUpdateLang(v) {
            this.room.language = v
        },
        handleUpdateMinLvl(v) {
            let maxLvl = this.room.levelGap.split('-')[1]

            if (parseInt(maxLvl) < parseInt(v.target.value))
                this.room.levelGap = `${v.target.value}-${v.target.value}`
            else
                this.room.levelGap = `${v.target.value}-${maxLvl}`
        },
        handleUpdateMaxLvl(v) {
            let minLvl = this.room.levelGap.split('-')[0]

            if (parseInt(minLvl) > parseInt(v.target.value))
                this.room.levelGap = `${v.target.value}-${v.target.value}`
            else
                this.room.levelGap = `${minLvl}-${v.target.value}`
        },
        handleSubmit(e) {
            if (this.room.password)
                this.room.isPrivate = true
            
            if (!this.room.title)
                this.room.title = `Room de ${this.$store.state?.user?.username}`
            
            if (!this.room.description)
                this.room.description = this.$t('Pas de description')
            
            this.room.mj = {
                username: this.$store.state.user.username
            }

            console.log(this.room);
            this.submitRoom()
        },
        async submitRoom() {
            const toast = useToast()

            try {
                const res = await apiCall({
                    route: '/rooms',
                    method: 'POST',
                    body: JSON.stringify(this.room)
                })
                    
                //TODO: this.$router.push(`/rooms/${res.id}`).then(() => toast.success(this.$t('Création de la room réalisée avec succès')))
            } catch (error) {
                console.log(error)
                toast.error(typeof error === 'object' ? error.message : error)
            } finally {
                this.loading = false
            }

        }
    },
    data() {
        return {
            loading: false,
            room: {
                title: "",
                description: "",
                universe: "",
                style: "",
                experience: "",
                levelGap: "",
                language: "",
                mj: {},
                players: [],
                vocal: '',
                password: '',
                information: '',
                contact: '',
                isPrivate: false
            },
            PLAYSTYLE,
            EXPERIENCE,
            LANGUAGES
        }
    }
}
</script>
