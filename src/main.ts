import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import 'ol/ol.css'
import '@supermap/iclient-ol/dist/iclient-openlayers.min.css'

createApp(App).use(router).mount('#app')
