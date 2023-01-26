import { createStore } from "vuex"
import user from "./modules/user"
import phaser from "./modules/phaser"
import errors from "./modules/errors"
import room from "./modules/room"
import friends from "./modules/friends"
import VuexPersistence from "vuex-persist"

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
})
const store = createStore({
    modules: {
        user,
        phaser,
        errors,
        room,
        friends,
    },
    plugins: [vuexLocal.plugin],
})

export default store