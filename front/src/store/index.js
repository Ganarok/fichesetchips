import VuexPersistence from "vuex-persist"
import { createStore } from "vuex"

import user from "./modules/user"
import phaser from "./modules/phaser"
import characters from './modules/cem/characters'
import errors from "./modules/errors"
import room from "./modules/room"
import friends from "./modules/friends"
import universes from "./modules/universes"
import game from './modules/game'
import stories from './modules/stories'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
})
const store = createStore({
    modules: {
        user,
        phaser,
        characters,
        errors,
        room,
        friends,
        universes,
        game,
        stories
    },
    plugins: [vuexLocal.plugin],
})

export default store