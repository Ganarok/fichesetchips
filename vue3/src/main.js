import App from './App.vue'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import CustomI18n from './locales/index.js'
import Router from './router/index'
import Store from './store/index.js'
import 'vue-toastification/dist/index.css'
import './app.css'

createApp(App)
    .use(Toast, { timeout: 3500 })
    .use(Router)
    .use(CustomI18n)
    .use(Store)
    .mount('#app')
