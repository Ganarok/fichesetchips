<template>
    <div>
        <div
            class="flex flex-col w-80 transition hoverStyle"
        >
            <div
                class="flex items-center justify-around relative bg-fc-black h-48 p-4"
                @click="() => $router.push(`/mapmaker?mapId=${encodeURIComponent(map.id)}`)"
            >
                <div class="relative h-28 w-28">
                    <img
                        src="@/assets/icons/diary_white.svg"
                        alt="Diary"
                        class="object-contain"
                    />
                </div>
            </div>

            <div class="flex flex-col space-y-3 p-2 bg-gray-50">
                <p class="text-fc-green font-bold">
                    Charger
                </p>

                <p class="ml-6 text-fc-black-light">
                    {{ map.title || 'Carte' }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "MapPreview",
    props: {
        map: {
            type: Object,
            required: true,
        }
    }
}
</script>