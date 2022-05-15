import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Util from './assets/js/util';
import api from './assets/js/api';
import $ from 'jquery';

import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

window.Toastify = Toastify;
window.getCookie = Util.getCookie;
window.$ = $;
window.api = api;

const app = createApp(App)

app.use(router)

app.mount('#app')
