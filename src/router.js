import IndexPage from './components/IndexPage.vue';
import Login from  './components/authentication/Login.vue';
import SignUp from './components/authentication/SignUp.vue';
import Search from './components/Search.vue';
import MovieType from './components/DisplayMovieTypes/MovieType.vue';
import GenreWatch from './components/DisplayMovieTypes/GenreWatch.vue';
import Watchlist from './components/MovieSaved/Watchlist.vue';
import { createRouter, createWebHistory } from "vue-router";
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: IndexPage },
    { path: "/login", component: Login},
    { path: "/sign-up", component: SignUp },
    { path: "/watch/:type/:subType/:page", component: MovieType },
    { path: "/watch-list", component: Watchlist },
    { path: "/genre/:genreType/:id/:page", component: GenreWatch },
    { path: "/search/:searchKeyWord/:page", component: Search }
    ],
        scrollBehavior(to, from, savedPosition) {
      return { top: 0 };
    },
})