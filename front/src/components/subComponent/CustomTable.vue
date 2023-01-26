<template>
    <div
        class="w-full h-full border-2 p-4 text-xl overflow-y-auto"
        :class="borderColor"
    >
        <table class="min-w-full">
            <thead
                class="sticky top-0 bg-white"
                :class="textColor"
            >
                <tr>
                    <th
                        v-for="(rowItem, index) in labels"
                        :key="index"
                    >
                        {{ rowItem }}
                    </th>
                </tr>
            </thead>

            <tbody class="font-extralight space-y-10">
                <tr
                    v-for="(row, index) in rows"
                    :key="index"
                    class=""
                >
                    <th
                        v-for="(rowItem, index) in row"
                        :key="index"
                        class="font-light p-5"
                    >
                        {{ rowItem }}
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "CustomTable",
    props: {
        labels: {
            type: Array,
            default: () => ["Campagne en cours", "Mj", "Prochaine séance"],
        },
        rows: {
            type: Array,
            default: () => [
                ["Kaamlot: La quête du graal", "Puigs", "10/06/2022 à 19h00"],
            ],
        },
        borderColor: { type: String, default: "border-black" },
        textColor: { type: String, default: "text-black" },
        width: { type: Number },
        height: { type: Number },
    },
}
</script>
