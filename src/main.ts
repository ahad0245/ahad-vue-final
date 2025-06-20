import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'vue-cal/dist/vuecal.css';
import './style.css';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');