<template>
    <router-link
        class="flex flex-col w-80 transition hoverStyle"
        :to="`/user/stories/${story.id}`"
    >
        <div class="flex items-center justify-around relative bg-fc-black h-48 p-4">
            <div class="relative h-28 w-28">
                <img
                    src="@/assets/icons/file.svg"
                    alt="File"
                    class="object-contain"
                />
            </div>
        </div>

        <div class="flex flex-col space-y-3 p-2 bg-gray-50">
            <p class="text-fc-green font-bold">
                Voir
            </p>

            <p class="ml-6 text-fc-black-light">
                {{ story.title || 'Story' }}
            </p>
        </div>
    </router-link>
</template>

<script>


export default {
    name: 'Story',
    components: {
    },
    props: {
        story: {},
        index: {type: Number}
    },
    data () {
        return {
            url: '',
            name: ''
        }
    },
    async mounted() {
    },
    methods: {
    }
}
</script>