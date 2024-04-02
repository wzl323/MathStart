import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist-uni'

const piniaStore = createPinia();
piniaStore.use(piniaPersist);


const app = createApp(App)
    .use(piniaStore)

app.mount('#app')

