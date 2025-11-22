import './style.css'
import { createPinia } from 'pinia';
import '@fortawesome/fontawesome-free/css/all.css';import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import AppHeader from './components/AppHeader.vue';
import homePageMovie from './components/homePageMovie.vue';
import Categories from './components/MovieCategories/Categories.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas, far, fab);

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.component('AppHeader', AppHeader);
app.component('homePageMovie', homePageMovie);
app.component('Categories', Categories);
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')