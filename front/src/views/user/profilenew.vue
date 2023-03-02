<template>
    <SidebarLayout :is-border="false">
        <div class="h-screen w-full flex flex-col font-barlow">
            <div class="flex md:flex-row flex-col md:h-[60%] p-12">
                <Avatar />

                <div class="flex flex-col h-full ml-8">
                    <h1 class="text-3xl font-bold text-fc-green">
                        {{ user.username }}
                    </h1>

                    <h1 class="text-fc-yellow">
                        Dernière connexion:

                        <span class="font-bold">{{ user.lastConnection }}</span>
                    </h1>

                    <p class="font-bold italic">
                        {{ user.description }}
                    </p>

                    <h1 class="mt-auto">
                        {{ user.location }}
                    </h1>

                    <h1>Privé</h1>
                </div>

                <div class="flex flex-col flex-grow h-full ml-8">
                    <div class="flex mt-auto">
                        <div class="">
                            Nombre de partie (Joueur):
                        </div>
                        <div class="ml-auto">
                            666
                        </div>
                    </div>
                    <div class="flex">
                        <div class="">
                            Nombre de partie (MJ):
                        </div>
                        <div class="ml-auto">
                            666
                        </div>
                    </div>
                    <div class="flex">
                        <div class="">
                            Temp passé en campagne:
                        </div>
                        <div class="ml-auto">
                            666
                        </div>
                    </div>
                    <div class="flex">
                        <div class="">
                            Date d'inscription:
                        </div>
                        <div class="ml-auto">
                            666
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="flex w-full md:h-60 h-40 items-center justify-evenly space-x-2 bg-fc-yellow overflow-auto"
            >
                <Badge
                    v-for="badge in badges"
                    :key="badge.id"
                    size="l"
                    :completion="badge.completion"
                />
            </div>
        </div>
    </SidebarLayout>
</template>

<script>
import Avatar from "@/components/subComponent/Avatar.vue"
import Badge from "@/components/subComponent/Badge.vue"
import SidebarLayout from "@/layouts/Sidebar.vue"
import { apiCall } from "@/utils/apiCall"

export default {
    components: { SidebarLayout, Avatar, Badge },
    data() {
        return {
            user: {
                id: 0,
                username: "John Doe",
                email: "JohnDoe@mail.com",
                location: "FarFarAway Kingdom, Farlands",
                avatar: "",
                description: "“Jeune elfe recherche un mage mortel ...”",
                lastConnection: "il y a 1 heure",
                createdAt: "",
            },
            stats: {},
            badges: [],
        }
    },
    mounted() {
        this.badgeGenerator()
    },
    methods: {
        badgeGenerator(badgeNbr = 5) {
            for (let index = 0; index < badgeNbr; index++) {
                this.badges.push({
                    id: badgeNbr + "-" + index,
                    isFav: false,
                    completion: this.randomIntFromInterval(0, 100),
                })
            }
        },
        randomIntFromInterval(min, max) {
            // min and max included
            return Math.floor(Math.random() * (max - min + 1) + min)
        },
        setupUserInfos() {
            this.user = this.getUser()

            // if (this.user) {
            // }
        },
        getUser(username) {
            apiCall({
                method: "GET",
                route: "/user/" + username,
            })
                .then((res) => {
                    this.friends = res.friends
                })
                .catch((err) => {
                    console.log("err", err)
                })
        },
    },
}
</script>

<style></style>
