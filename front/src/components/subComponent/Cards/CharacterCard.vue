<template>
    <div
        class="flex flex-col items-center max-w-xs max-h-[550px] border-2 border-fc-green p-2 hover:cursor-pointer"
    >
        <router-link
            :to="`/user/character/${character.id}`"
        >
            <div
                v-if="level || firstname"
                class="flex items-center justify-between w-full bg-fc-green p-2 text-xl font-bold"
            >
                <p>
                    {{ `${firstname} ${lastname}` }}
                </p>

                <p
                    v-if="level"
                    class="text-fc-black opacity-60"
                >
                    Lvl. {{ level }}
                </p>
            </div>

            <div
                v-if="!image"
                class="relative bg-fc-yellow w-full my-2"
            >
                <img
                    src="@/assets/dragon.svg"
                    class="object-contain"
                    :style="grayed ? 'filter: grayscale(1)' : null"
                >
            </div>

            <div
                v-else
                class="bg-fc-yellow h-80 w-full m-2"
            />

            <div class="w-full h-24 bg-fc-green p-2">
                <p
                    class="text-sm text-ellipsis text-justify overflow-y-scroll pr-3 break-words h-3/4"
                    :class="owner || location ? 'h-3/4' : 'h-full'"
                >
                    {{ bio }}
                </p>

                <div
                    v-if="owner || location"
                    class="flex flex-row items-center justify-end text-sm space-x-4 w-full h-1/4"
                >
                    <p>
                        {{ owner }}
                    </p>

                    <p>
                        {{ location }}
                    </p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        character: {type: Object, default: new Object()},
        border: {type: String, default: ""},
        grayed: { type: Boolean, default: false }
    },
    data() {
        return {
            id: this.character.id,
            "firstname": this.character.firstname,
            "lastname": this.character.lastname,
            bio: this.character.bio,
            level: this.character.level_id,
        }
    },
    methods: {
        backgroundColor: function () {
            if (this.filled == undefined) {
                return ""
            } else {
                return " bg-" + this.color
            }
        },
        borderColor: function () {
            if (this.border == undefined) {
                return ""
            } else {
                return " bg-" + this.color
            }
        },
    }
}
</script>
