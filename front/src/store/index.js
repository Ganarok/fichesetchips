import { createStore } from 'vuex'
import user from './user'
import phaser from './phaser'

const store = createStore({
    modules: {
        user,
        phaser
    }
})

export default store