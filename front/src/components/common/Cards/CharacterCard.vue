<template>
    <div class="border-2 border-fc-green p-2 hover:cursor-pointer">
        <router-link
            class="h-full w-full flex flex-col items-center"
            :to="urlSelection(character.id)"
        >
            <div
                v-if="level || firstname"
                class="flex items-center justify-between w-full bg-fc-green p-2 text-xl font-bold h-[9%]"
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

            <div class="bg-fc-yellow w-full my-2 min-h-[50%] flex flex-col justify-end items-center">
                <div v-if="!image && id != &quot;create&quot;">
                    <img
                        src="@/assets/dragon.svg"
                        class="object-contain"
                        :style="grayed ? 'filter: grayscale(1)' : null"
                    >
                </div>
                <div v-else-if="id == &quot;create&quot;">
                    <img
                        src="@/assets/unknowCharacter.svg"
                        class="object-contain"
                        :style="grayed ? 'filter: grayscale(1)' : null"
                    >
                </div>
                <div v-else>
                </div>
            </div>
            
            <div
                v-if="id != &quot;create&quot;"
                class="w-full bg-fc-green p-2 flex-1"
            >
                <p
                    class="text-sm text-ellipsis text-justify overflow-y-scroll pr-3 break-words h-full"
                    :class="owner || location ? 'h-3/4' : 'h-full'"
                >
                    {{ bio }}
                </p>
                <div
                    v-if="owner || location"
                    class="flex flex-row items-center justify-end text-sm space-x-4 w-full h-full"
                >
                    <p>
                        {{ owner }}
                    </p>
                    <p> 
                        {{ location }}
                    </p>
                </div>
            </div>
            <div
                v-else
                class="w-full bg-fc-green p-2 flex-1 my-auto"
            >
                <p class="text-xl font-bold opacity-60 text-center">
                    Nouveau personnage
                </p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        character: {type: Object, default: new Object()},
        border: {type: String, default: ""},
        grayed: { type: Boolean, default: false },
        owner: { type: String, default: "" },
        location: { type: String, default: "" },
        image: { type: Boolean }
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
        urlSelection: function(id) {
            if(id == "create") 
                return "/characters/create"
            else
                return "/user/character/" + id
        }
    }
}
</script>