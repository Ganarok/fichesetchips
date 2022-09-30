<template>
    <SidebarLayout title="Administration">
        <div class="flex flex-row w-[85%] self-center bg-fc-black-light h-16">
            <li :v-for="categorie in this.categories">
                {{ categorie.name }}
            </li>
        </div>
    </SidebarLayout>
</template>

<script>
import SidebarLayout from '~/layouts/Sidebar.vue'

export default {
    components: {
        SidebarLayout,
    },
    data() {
        return {
            categories: [
                {
                    name: 'Reports',
                    route: '/admin/reports',
                },
                {
                    name: 'Users',
                    route: '/admin/users',
                },
            ],
            selectedCategorie: [],
        }
    },
}
</script>
