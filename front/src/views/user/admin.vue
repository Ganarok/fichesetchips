<template>
    <SidebarLayout title="Administration">
        <div
            class="flex flex-row w-[90%] items-center justify-between self-center bg-fc-black h-16">
            <div class="absolute">
                <div
                    style="z-index: -10"
                    class="relative -left-6 -top-6 bg-fc-green w-12 h-12" />
            </div>

            <div class="flex flex-row pl-6 space-x-6">
                <p
                    v-for="(categorie, index) in categories"
                    :id="categorie.name"
                    :key="index"
                    class="relative text-lg font-bold p-2 select-none hover:cursor-pointer xl:text-xl"
                    :class="isSelected(categorie.name)"
                    @click="updateSelected(categorie.name)">
                    {{ categorie.name }}
                </p>
            </div>

            <input
                class="w-[20%] px-2 h-full bg-fc-black-light font-bold outline-none"
                :class="query.length > 0 ? 'text-fc-yellow' : ''"
                :value="query"
                placeholder="Rechercher..."
                type="text"
                @input="(v) => (query = v.target.value)" />
        </div>

        <Sheet :route="selectedCategorie.route" :search="query" />
    </SidebarLayout>
</template>

<script>
import SidebarLayout from '@/layouts/Sidebar.vue'
import Sheet from '@/components/Sheet.vue'

export default {
    components: {
        SidebarLayout,
        Sheet,
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
            selectedCategorie: { name: 'Reports', route: '/admin/reports' },
            query: '',
        }
    },
    methods: {
        isSelected(name) {
            return this.selectedCategorie.name === name
                ? 'text-fc-green'
                : 'text-fc-yellow-trans'
        },
        updateSelected(name) {
            this.selectedCategorie = this.categories.find(
                (categorie) => categorie.name === name
            )
        },
    },
}
</script>
