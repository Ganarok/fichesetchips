<template>
    <SidebarLayout>
        <div class="flex flex-wrap">
            <ProfileWidget />
            <RecruitsWidget />
            <CampaignsWidget />
        </div>
    </SidebarLayout>
</template>

<script>
import SidebarLayout from "@/layouts/Sidebar.vue"
import ProfileWidget from "@/components/widgets/Profile.vue"
import CampaignsWidget from "@/components/widgets/Campaigns.vue"
import RecruitsWidget from "@/components/widgets/Recruits.vue"

export default {
    components: {
        SidebarLayout,
        ProfileWidget,
        CampaignsWidget,
        RecruitsWidget,
    },
}
</script>

<style></style>
