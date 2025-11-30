import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// FontAwesome
import '@fortawesome/fontawesome-free/css/all.min.css'

import 'toastify-js/src/toastify.css'
import '@/assets/css/toast.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
