<template>
    <div class="flex flex-col">
        <div
            name="title"
            class="flex border-t-2 border-b-2 border-chips-yellow items-center h-10 px-3"
        >
            <h1>Title</h1>
            <div class="h-5 w-[2px] bg-chips-yellow mx-4"></div>
            <h1>Title</h1>
            <div class="h-5 w-[2px] bg-chips-yellow mx-4"></div>
            <h1>Title</h1>
            <div class="h-5 w-[2px] bg-chips-yellow mx-4"></div>
            <h1>Title</h1>
            <div class="h-5 w-[2px] bg-chips-yellow mx-4"></div>
            <h1>Title</h1>
            <div class="h-5 w-[2px] bg-chips-yellow mx-4"></div>
            <h1>Title</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CustomTable',
    props: {
        labels: { type: Array },
        Rows: { type: Array },
    },
}
</script>
