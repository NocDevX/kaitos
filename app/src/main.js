import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Util from './assets/js/util';

window.getCookie = Util.getCookie;

const app = createApp(App)

app.use(router)

app.mount('#app')
