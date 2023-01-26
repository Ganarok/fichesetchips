import { createStore } from "vuex"
import user from "./user"
import phaser from "./phaser"
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
