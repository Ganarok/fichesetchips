import App from "./App.vue"
import { createApp } from "vue"
import Toast from "vue-toastification"
import CustomI18n from "./locales/index.js"
import Router from "./router/index"
import Store from "./store/index.js"
import "vue-toastification/dist/index.css"
import "./app.css"

const app = createApp(App)

app.directive("click-outside", {
    beforeMount(el, binding) {
        el.clickOutsideEvent = (event) => {
            // here I check that click was outside the el and his children
            if(!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                binding.value(event)
            }
        }

        document.body.addEventListener("click", el.clickOutsideEvent)
    },
    unmounted(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent)
    },
})

app.use(Toast, { timeout: 3500 })
app.use(Router)
app.use(CustomI18n)
app.use(Store)

app.mount("#app")