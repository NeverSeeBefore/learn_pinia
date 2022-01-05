import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import piniaActionTimePlugin from './store/pinia-action-time-plugin';
import piniaPlugin from './store/pinia-plugin';

const pinia = createPinia();
pinia.use(piniaPlugin);
pinia.use(piniaActionTimePlugin);

createApp(App).use(pinia).mount('#app')
