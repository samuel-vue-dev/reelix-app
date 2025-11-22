<script setup>
import { ref, onMounted, nextTick, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { movieStore } from '@/AppState/movies';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const router = useRouter();
const route = useRoute();
const movieStores = movieStore();

// Route params
const movieType = ref(route.params.type);
const movieSubType = ref(route.params.subType);
const moviePage = ref(Number(route.params.page) || 1);
const movieCards = ref([]);

// Computed function for h3ading titilrle
const TypeTitle = computed(() => {
  if(movieType.value === 'tv' && movieSubType.value === 'popular') return 'Popular TV Shows';
  if(movieType.value === 'movie' && movieSubType.value === 'popular') return 'Trending Movies';
  if(movieType.value === 'tv' && movieSubType.value === 'top_rated') return 'Top TV Shows';
  if(movieType.value === 'movie' && movieSubType.value === 'top_rated') return 'Top Rated Movies';
  if(movieType.value === 'tv' && movieSubType.value === 'airing_today') return 'Airing Today';
  return '404';
});

// Fetch movies
async function showMovies() {
  await movieStores.fetchForMovieTypes({
    type: movieType.value,
    subType: movieSubType.value,
    page: moviePage.value
  });
  await nextTick();
  movieCards.value = Array.from(document.querySelectorAll('.movie-linear-gradient'));
  observeMovies();
}

// Pagination
async function nextPage() {
  moviePage.value += 1;
  await showMovies();
  router.push({ path: `/watch/${movieType.value}/${movieSubType.value}/${moviePage.value}` });
}

async function prevPage() {
  if(moviePage.value === 1) return;
  moviePage.value -= 1;
  await showMovies();
  router.push({ path: `/watch/${movieType.value}/${movieSubType.value}/${moviePage.value}` });
}

// Retry function to loadmovies
function tryAgain() {
  showMovies();
}

// Observer cor animation
function observeMovies() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('visible');
        else entry.target.classList.remove('visible');
      });
    },
    { threshold: 0.1 }
  );
  movieCards.value.forEach(card => observer.observe(card));
}
// Mounting funtcion
onMounted(() => showMovies());

watch(
  () => route.params.page,
  async (newPage) => {
    moviePage.value = Number(newPage) || 1;
    movieType.value = route.params.type;
    movieSubType.value = route.params.subType;
    await showMovies();
  }
);

</script>

<template>
  <AppHeader />

  <div class="p-5  pt-[80px] md:pt-[110px] lg:pt-[110px]  movie-box text-white">

    <!-- Movies List -->
    <div v-if="!movieStores.movieLoading && !movieStores.errorLoading">
      <div class="flex justify-between items-center mb-3 font-[roboto_condensed]">
        <h2 class="text-xl font-bold">
          <FontAwesomeIcon :icon="['fas','tv']" /> {{ TypeTitle }}
        </h2>
      </div>

      <div class="auto-grid mt-5">
        <div v-for="movies in movieStores.moviesType" :key="movies.id" class="movie-linear-gradient bg-[rgb(255,255,255,0.3)] rounded-md top-0 left-0 min-h-[225px] min-w-[150px] relative mb-3">
          <img :src="`https://image.tmdb.org/t/p/original${movies.poster_path}`" class="rounded-md left-0 absolute top-0 h-full w-full object-auto">
          <div class="bg-gradient-to-b from-[rgba(0,0,0,0)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.9)] absolute top-0 left-0 h-full w-full rounded-md"></div>
          <h2 class="absolute p-[10px] font-bold text-[13px] z-[60] bottom-[25px]">{{ movies.title || movies.name }}</h2>
          <p class="absolute z-[60] text-[11px] left-3 bottom-[13px]">{{ new Date(movies.release_date || movies.first_air_date).getFullYear() }}</p>
          <p class="absolute bottom-[13px] z-[60] text-[12px] right-[10px]">
            <FontAwesomeIcon class="text-[#FFA500]" :icon="['fas','star']"/> {{ movies.vote_average.toFixed(1) }}
          </p>
        </div>
      </div>

      <!-- Pagination Buttons -->
      <div class="flex justify-center gap-3 mt-5">
        <button @click="prevPage" :disabled="moviePage === 1" class="bg-gray-600 p-2 rounded-md text-white disabled:opacity-50">
          <FontAwesomeIcon :icon="['fas','angle-left']" /> Prev
        </button>
        <span class="text-white font-bold p-2">Page {{ moviePage }}</span>
        <button @click="nextPage" class="bg-green-600 p-2 rounded-md text-white">
          Next <FontAwesomeIcon :icon="['fas','angle-right']" />
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="movieStores.movieLoading" class="p-5 fixed top-0 left-0 bg-black h-screen w-full grid items-center">
      <div class="text-center grid justify-center">
        <div class="spinner mb-4 border border-6 border-[rgb(255,255,255,0.3)] border-t-white h-[40px] w-[40px] aspect-[1/1] rounded-full"></div>
        <h2 class="text-white text-center">Loading....</h2>
      </div>
    </div>

    <!-- Error -->
    <div v-if="movieStores.errorLoading" class="p-5 fixed top-0 left-0 bg-black h-screen w-full grid items-center">
      <div class="text-white text-center">
        <FontAwesomeIcon class="text-7xl text-red-300 mb-2" :icon="['fas','exclamation-triangle']" />
        <h2 class="text-white text-center">Network Error. Please check your connection and try again.</h2>
        <button @click="tryAgain" class="bg-white text-black border border-2 mt-2 px-8 py-3 rounded-full focus:bg-inherit focus:text-white">
          Try Again
        </button>
      </div>
    </div>

  </div>
</template>
