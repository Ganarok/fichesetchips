<template>
    <div class="flex flex-wrap justify-between gap-2 m-4">
        <Avatar
            v-for="friendship in friends"
            :key="friendship.id"
            :grayed="false"
            :username="getFriendUsername(friendship)"
            class="w-36"
        />
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import Avatar from "@/components/common/Avatar.vue"
export default {
    name: "FriendsList",
    components: {
        Avatar,
    },
    data() {
        return {
            selectedClass: "",
            query: "?",
            search: "",
        }
    },
    computed: {
        ...mapState("friends", {
            friends: (state) => state.my_friends,
        }),
        ...mapState("user", {
            user: (state) => state.user,
        })
    },
    async mounted() {
        await this.fetch_my_friends()
    },
    methods: {  
        ...mapActions({
            fetch_my_friends: "friends/fetch_my_friends",
            patch_user: "user/patch_user",
        }),
        getFriendUsername(friendship) {
            if (this.user.username == friendship.user_asked.username) {
                return friendship.user_answered.username
            } else {
                return friendship.user_asked.username
            }
        },
    }
}
</script>