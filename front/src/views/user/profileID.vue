<template>
    <SidebarLayout :is-border="false">
        <div class="h-screen w-full flex flex-col font-barlow">
            <div class="flex md:flex-row flex-col md:h-[60%] p-12">
                <Avatar />

                <div class="flex flex-col h-full ml-8">
                    <h1 class="text-3xl font-bold text-fc-green">
                        {{ visited_user.username }}
                    </h1>

                    <h1 class="text-fc-yellow">
                        Dernière connexion:

                        <span class="font-bold">{{
                            getDateSince(visited_user.last_connection)
                        }}</span>
                    </h1>

                    <p class="font-bold italic">
                        {{ visited_user.description }}
                    </p>

                    <!-- <h1 class="mt-auto">{{ visited_user.location }}</h1> -->

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
import moment from "moment"

import Avatar from "@/components/common/Avatar.vue"
import Badge from "@/components/common/Badge.vue"
import SidebarLayout from "@/layouts/Sidebar.vue"
import { mapState, mapActions } from "vuex"

export default {
    components: { SidebarLayout, Avatar, Badge },
    data() {
        return {
            stats: {},
            badges: [],
        }
    },
    computed: {
        ...mapState("user", {
            visited_user: (state) => state.visited_user,
        }),
    },
    async mounted() {
        this.badgeGenerator()
        await this.fetch_user(this.$route.params.username)
    },
    methods: {
        ...mapActions({
            fetch_user: "user/fetch_user",
        }),
        getDateSince(date) {
            return moment(date).fromNow()
        },
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
    },
}
</script>

<style></style>
