<template>
    <div class="flex">
        <SubComponentSidebar />
        <div class="h-screen max-w-full p-5">
            <SubComponentCustomTable />
        </div>
    </div>
</template>

<script lang="js">
import Vue from 'vue'

export default Vue.extend({
    name: 'Mainpage',
})
</script>
