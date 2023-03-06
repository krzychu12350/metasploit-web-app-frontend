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
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueBaseTooltip from 'vue-base-tooltip'
import 'vue-base-tooltip/style.css'
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import LongPress from 'vue3-directive-long-press';
import InstantSearch from 'vue-instantsearch/vue3/es'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faFolder, faFile, faFolderPlus, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faFolder, faFile, faFolderPlus, faCloudArrowUp)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

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
    isFullPage: false,
}, {
    // slots
})
.use(pinia)
.use(LongPress)
.use(VueBaseTooltip, { offset: 10 })
.use(InstantSearch)
.use(contextmenu)
.use(shell)
.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
