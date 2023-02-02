import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import shell from "vue-shell";
import contextmenu from "v-contextmenu";
import "v-contextmenu/dist/themes/dark.css";
import { createPinia } from 'pinia'

import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import InstantSearch from 'vue-instantsearch/vue3/es'

const pinia = createPinia()

export const app = createApp(App)
.use(LoadingPlugin, {
    canCancel: false, // default false
    color: "#4f46e5",
    loader: "spinner",
    width: 64,
    height: 64,
    backgroundColor: "#ffffff",
    opacity: 0.5,
    zIndex: 999,
}, {
    // slots
})
.use(pinia)
.use(InstantSearch)
.use(contextmenu)
.use(shell)
.use(router)

.mount('#app')
