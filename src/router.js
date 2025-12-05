import IndexPage from './components/IndexPage.vue';
import Login from  './components/authentication/Login.vue';
import SignUp from './components/authentication/SignUp.vue';
import Search from './components/Search.vue';
import MovieDetails from './components/ViewAndSaved/MovieDetails.vue';
import MovieType from './components/DisplayMovieTypes/MovieType.vue';
import GenreWatch from './components/DisplayMovieTypes/GenreWatch.vue';
import WatchList from './components/ViewAndSaved/WatchList.vue';
import BlogPost from './components/Blogs/BlogPost.vue';
import { createRouter, createWebHistory } from "vue-router";
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: IndexPage },
    { path: "/login", component: Login},
    { path: "/sign-up", component: SignUp },
    { path: "/search/:searchKeyWord/:page", component: Search },
    { path: "/watch/:type/:subType/:page", component: MovieType },
    { path: "/genre/:genreType/:id/:page", component: GenreWatch },
    { path: "/watch-list", component: WatchList },
    { path: "/movie-details/:type/:id", component: MovieDetails },
    { path: "/blog-post", component: BlogPost },
    ],
        scrollBehavior(to, from, savedPosition) {
      return { top: 0 };
    },
})