import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import shell from "vue-shell";
import contextmenu from "v-contextmenu";
import "v-contextmenu/dist/themes/dark.css";


export const app = createApp(App)
.use(contextmenu)
.use(shell)
.use(router)

.mount('#app')
