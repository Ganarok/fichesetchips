import { createStore } from "vuex"
import user from "./modules/user"
import phaser from "./modules/phaser"
import VuexPersistence from "vuex-persist"

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
})

const store = createStore({
    modules: {
        user,
        phaser,
    },
    plugins: [vuexLocal.plugin],
})

export default store