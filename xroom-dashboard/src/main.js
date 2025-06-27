// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Swal from 'sweetalert2';
import '@/assets/main.css';

const app = createApp(App);
app.use(router);
app.config.globalProperties.$swal = Swal; // Add SweetAlert2 globally
app.mount('#app');