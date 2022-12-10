import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Util from './assets/js/util';
import api from './assets/js/api';
import $ from 'jquery';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

window.Toastify = Toastify;
window.getCookie = Util.getCookie;
window.$ = $;
window.api = api;

library.add(faSpinner);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.mount('#app');
