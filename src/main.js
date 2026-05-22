import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const app = createApp(App)
const options = {
    timeout: false,
    position: "top-center",
    transition: "Vue-Toastification__fade",
    maxToasts: 4,
    // You can set your default options here
};
app.use(Toast, options);
app.use(router)
app.mount('#app')

