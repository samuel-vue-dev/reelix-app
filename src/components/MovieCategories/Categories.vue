<script setup>
  import { ref, onMounted, nextTick} from 'vue';
  import { movieStore } from '@/AppState/movies';
  import { useRouter } from 'vue-router';
  const movieStores = movieStore();
  const router = useRouter();
  // Refs for all cards
  const movieCards = ref([]);
  
  async function fetchAll() {
  await movieStores.fetchForPopularTvShows();
  await movieStores.fetchForPopularMovies();
  await movieStores.fetchForTopRatedTvShows();
  await movieStores.fetchForTopRatedMovies();
  await movieStores.fetchForAiringToday();
  }
  function tryAgain() {
  fetchAll();
  }
  
// Intersection Observer to slide in cards
function observeMovies() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // trigger slide-in
        }
        else {
           entry.target.classList.remove('visible'); // trigger slide-in
        }
        });
    },
    { threshold: 0.1 }
  );

  movieCards.value.forEach(card => observer.observe(card));
}

function pushToMovieType(val1,val2,val3) {
router.push({ path: `/watch/${val1}/${val2}/${val3}`})
}

  onMounted(async () => {
  await fetchAll();
  await nextTick();
  movieCards.value = Array.from(document.querySelectorAll('.movie-linear-gradient'));
  observeMovies();
  })
</script>
<template>
  <div>
    <div v-if="!movieStores.movieLoading" class=" p-5 movie-box p-5 text-white pt-[100px]">
      
      <!-- Popular Tvsshows -->
      <div class="flex justify-between items-center font-[roboto_condensed]"><h2 class="text-xl font-bold"><FontAwesomeIcon :icon="['fas','film']"/> Popular Tv Shows</h2><button @click="pushToMovieType('tv','popular','1')">More<FontAwesomeIcon :icon="['fas','angle-right']"/></button></div>
      <div class="auto-grid mt-5">
        <div v-for="movies in movieStores.popularTvs" :key="movies.id" class="movie-linear-gradient bg-[rgb(255,255,255,0.3)] rounded-md top-0 left-0 min-h-[225px] min-w-[150px] relative mb-3">
          <img :src=" `https://image.tmdb.org/t/p/original${movies.poster_path}`" class=" rounded-md left-0 absolute top-0 h-full w-full object-auto">
          <div  class="overlay-shadow absolute top-0 left-0 h-full w-full rounded-md"></div>
          <h2 class="absolute p-[10px] font-bold text-[13px] z-[60]  bottom-[25px] ">{{ movies.title || movies.name }}</h2> 
          <p class=" absolute z-[60] text-[11px] left-3 bottom-[13px]">{{ new Date(movies.release_date).getFullYear() || new Date(movies.first_air_date).getFullYear()}}</p>    
          <p class="absolute bottom-[13px]  z-[60] text-[12px] right-[10px]"><FontAwesomeIcon class="text-[#FFA500]" :icon="['fas','star']"/> {{ movies.vote_average.toFixed(1) }}</p>
     </div>
      </div>
           <!-- Trending Movies --> 
      <div class="flex justify-between items-center font-[roboto_condensed]"><h2 class="text-xl font-bold"><FontAwesomeIcon :icon="['fas','display']"/> Trending movies</h2><button @click="pushToMovieType('movie','popular','1')">More<FontAwesomeIcon :icon="['fas','angle-right']"/></button></div>
      <div class="auto-grid mt-5">
        <div v-for="movies in movieStores.popularMovies" :key="movies.id" class="movie-linear-gradient bg-[rgb(255,255,255,0.3)] rounded-md top-0 left-0 min-h-[225px] min-w-[150px] relative mb-3">
          <img :src=" `https://image.tmdb.org/t/p/original${movies.poster_path}`" class=" rounded-md left-0 absolute top-0 h-full w-full object-auto">
          <div class="overlay-shadow absolute top-0 left-0 h-full w-full rounded-md"></div>
          <h2 class="absolute p-[10px] font-bold text-[13px] z-[60]  bottom-[25px] ">{{ movies.title || movies.name }}</h2> 
          <p class=" absolute z-[60] text-[11px] left-3 bottom-[13px]">{{ new Date(movies.release_date).getFullYear() || new Date(movies.first_air_date).getFullYear()}}</p>    
          <p class="absolute bottom-[13px]  z-[60] text-[12px] right-[10px]"><FontAwesomeIcon class="text-[#FFA500]" :icon="['fas','star']"/> {{ movies.vote_average.toFixed(1) }}</p>
     </div>
      </div>
            <!-- Top TvShows -->
      <div class="flex justify-between items-center font-[roboto_condensed]"><h2 class="text-xl font-bold"><FontAwesomeIcon :icon="['fas','fire']"/> Top TvShows</h2><button @click="pushToMovieType('tv','top_rated','1')">More<FontAwesomeIcon :icon="['fas','angle-right']"/></button></div>
      <div class="auto-grid mt-5">
        <div v-for="movies in movieStores.topRatedTvShows" :key="movies.id" class="movie-linear-gradient bg-[rgb(255,255,255,0.3)] rounded-md top-0 left-0 min-h-[225px] min-w-[150px] relative mb-3">
          <img :src=" `https://image.tmdb.org/t/p/original${movies.poster_path}`" class=" rounded-md left-0 absolute top-0 h-full w-full object-auto">
          <div class="overlay-shadow absolute top-0 left-0 h-full w-full rounded-md"></div>
          <h2 class="absolute p-[10px] font-bold text-[13px] z-[60]  bottom-[25px] ">{{ movies.title || movies.name }}</h2> 
          <p class=" absolute z-[60] text-[11px] left-3 bottom-[13px]">{{ new Date(movies.release_date).getFullYear() || new Date(movies.first_air_date).getFullYear()}}</p>    
          <p class="absolute bottom-[13px]  z-[60] text-[12px] right-[10px]"><FontAwesomeIcon class="text-[#FFA500]" :icon="['fas','star']"/> {{ movies.vote_average.toFixed(1) }}</p>
     </div>
      </div>
           <!-- Top Rated Movies --> 
      <div class="flex justify-between items-center font-[roboto_condensed]"><h2 class="text-xl font-bold"><FontAwesomeIcon :icon="['fas','star']"/> Top Rated movies</h2><button @click="pushToMovieType('movie','top_ratedr','1')">More<FontAwesomeIcon :icon="['fas','angle-right']"/></button></div>
      <div class="auto-grid mt-5">
        <div v-for="movies in movieStores.topRatedMovies" :key="movies.id" class="movie-linear-gradient bg-[rgb(255,255,255,0.3)] rounded-md top-0 left-0 min-h-[225px] min-w-[150px] relative mb-3">
          <img :src=" `https://image.tmdb.org/t/p/original${movies.poster_path}`" class=" rounded-md left-0 absolute top-0 h-full w-full object-auto">
          <div class="overlay-shadow absolute top-0 left-0 h-full w-full rounded-md"></div>
          <h2 class="absolute p-[10px] font-bold text-[13px] z-[60]  bottom-[25px] ">{{ movies.title || movies.name }}</h2> 
          <p class=" absolute z-[60] text-[11px] left-3 bottom-[13px]">{{ new Date(movies.release_date).getFullYear() || new Date(movies.first_air_date).getFullYear()}}</p>    
          <p class="absolute bottom-[13px]  z-[60] text-[12px] right-[10px]"><FontAwesomeIcon class="text-[#FFA500]" :icon="['fas','star']"/> {{ movies.vote_average.toFixed(1) }}</p>
     </div>
      </div>
      
            <!-- Airing Today -->
      <div class="flex justify-between items-center font-[roboto_condensed]"><h2 class="text-xl font-bold"><FontAwesomeIcon :icon="['fas','clock']"/> Airing Today</h2><button @click="pushToMovieType('tv','airing_today','1')">More<FontAwesomeIcon :icon="['fas','angle-right']"/></button></div>
      <div class="auto-grid mt-5">
        <div v-for="movies in movieStores.airingToday" :key="movies.id" class="movie-linear-gradient bg-[rgb(255,255,255,0.3)] rounded-md top-0 left-0 min-h-[225px] min-w-[150px] relative mb-3">
          <img :src=" `https://image.tmdb.org/t/p/original${movies.poster_path}`" class=" rounded-md left-0 absolute top-0 h-full w-full object-auto">
          <div class="overlay-shadow absolute top-0 left-0 h-full w-full rounded-md"></div>
          <h2 class="absolute p-[10px] font-bold text-[13px] z-[60]  bottom-[25px] ">{{ movies.title || movies.name }}</h2> 
          <p class=" absolute z-[60] text-[11px] left-3 bottom-[13px]">{{ new Date(movies.release_date).getFullYear() || new Date(movies.first_air_date).getFullYear()}}</p>    
          <p class="absolute bottom-[13px]  z-[60] text-[12px] right-[10px]"><FontAwesomeIcon class="text-[#FFA500]" :icon="['fas','star']"/> {{ movies.vote_average.toFixed(1) }}</p>
     </div>
      </div>
    </div>
    
              <!-- loading movie -->
         <div v-if="movieStores.movieLoading" class="p-5 top-0 left-0 bg-black h-screen w-full grid items-center">
        <div class="text-center grid justify-center">
          <div  class="spinner mb-3" ></div>
        <h2 class="text-white text-center">Loading....</h2>
        </div>
      </div>
      
      <!-- loading movie error -->
         <div v-if="movieStores.errorLoading" class="p-5 top-0 left-0 bg-black h-screen w-full grid items-center">
         <div class="text-white text-center">
          <FontAwesomeIcon class="text-7xl text-red-300 mb-2" :icon="['fas','exclamation-triangle']" />
          <h2 class="text-white text-center">Network Error. please check your connection and try again.</h2>
          <button @click="tryAgain" class="bg-white text-black border border-2 mt-2 px-8 py-3 rounded-full focus:bg-inherit focus:text-white ">Try again</button>
        </div>
      </div>
  
    
  </div>
</template>
<style>
  
  .auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  z-index: 200;
}

.auto-grid .overlay-shadow {
  background: linear-gradient(to bottom, rgb(0,0,0,0),rgb(0,0,0,0), rgb(0,0,0,0.9));
  z-index: 50;
  height: 100%;
  width: 100%;
}

/* Slide-in from bottom animation */
.movie-linear-gradient {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.5s ease;
}

.movie-linear-gradient.visible {
  opacity: 1;
  transform: translateY(0);
}


@media screen and (min-width: 768px) {
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 10px;
}
.movie-linear-gradient {
min-height: 400px;
width: 100%;
aspect-ratio: 2 / 3;
}
}
</style>