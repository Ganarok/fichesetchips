<template>
    <div class="">
        <router-link
            class="hover:text-fc-green"
            :to="`/user/stories/${story.id}`"
        >
            <p> {{ index }} - {{ story.title }}</p>
        </router-link>
    </div>
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