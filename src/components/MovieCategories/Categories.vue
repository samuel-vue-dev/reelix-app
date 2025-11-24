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
  movieCards.value = Array.from(document.querySelectorAll('.animate-in'));
  observeMovies();
  })
</script>
<template>
  <div>
    <div v-if="!movieStores.movieLoading" class=" p-5 movie-box p-5 text-white pt-[100px]">
      
      <!-- Popular Tvsshows -->
      <div class="flex justify-between items-center font-[roboto_condensed]"><h2 class="text-xl font-bold"><FontAwesomeIcon :icon="['fas','film']"/> Popular Tv Shows</h2><button @click="pushToMovieType('tv','popular','1')">More<FontAwesomeIcon :icon="['fas','angle-right']"/></button></div>
<div class="mt-2 mb-4 overflow-x-scroll flex gap-3">
  <div v-for="movies in movieStores.popularTvs" :key="movies.id" class=" animate-in relative w-[full] aspect-[2/3] h-[290px] md:h-[450px] rounded-lg shrink-0 bg-[rgb(255,255,255,0.3)]">
    <img :src="`https://image.tmdb.org/t/p/original${movies.poster_path}`" class="w-full h-full object-auto rounded-lg"/>
    <div class="absolute inset-0 rounded-lg bg-gradient-to-b from-[rgba(0,0,0,0)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.9)]"></div>
    <h2 class="absolute bottom-[35px] left-2 text-white text-[13px] font-bold">{{ movies.title || movies.name }}</h2>
    <p class="absolute bottom-[15px] left-2 text-white text-[11px]">{{ new Date(movies.release_date).getFullYear() || new Date(movies.first_air_date).getFullYear() }}</p>
    <p class="absolute bottom-[15px] right-2 text-white text-[12px] flex gap-[2px] items-center"><FontAwesomeIcon class="text-[#FFA500]" :icon="['fas','star']"/>{{ movies.vote_average.toFixed(1) }}</p>
  </div>
</div>
           <!-- Trending Movies --> 
      <div class="flex justify-between items-center font-[roboto_condensed]"><h2 class="text-xl font-bold"><FontAwesomeIcon :icon="['fas','display']"/> Trending movies</h2><button @click="pushToMovieType('movie','popular','1')">More<FontAwesomeIcon :icon="['fas','angle-right']"/></button></div>
      <div class=" mb-4 mt-3 flex gap-3 overflow-x-scroll">
        <div v-for="movies in movieStores.popularMovies" :key="movies.id" class="animate-in relative w-[full] aspect-[2/3] h-[290px] md:h-[450px] rounded-lg shrink-0 bg-[rgb(255,255,255,0.3)]">
          <img :src="`https://image.tmdb.org/t/p/original${movies.poster_path}`" class="h-full w-full rounded-lg object-cover">
          <div class="absolute inset-0 top-0 left-0 rounded-lg bg-gradient-to-b from-[rgba(0,0,0,0)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.9)]"></div>
          <h2 class="absolute p-[10px] font-bold text-[13px] z-[60]  bottom-[25px] ">{{ movies.title || movies.name }}</h2> 
          <p class="absolute z-[60] text-[11px] left-3 bottom-[13px]">{{ new Date(movies.release_date).getFullYear() || new Date(movies.first_air_date).getFullYear()}}</p>    
          <p class="absolute bottom-[13px]  z-[60] text-[12px] right-[10px]"><FontAwesomeIcon class="text-[#FFA500]" :icon="['fas','star']"/> {{ movies.vote_average.toFixed(1) }}</p>
       </div>
      </div>
            <!-- Top TvShows -->
      <div class="flex justify-between items-center font-[roboto_condensed]"><h2 class="text-xl font-bold"><FontAwesomeIcon :icon="['fas','fire']"/> Top TvShows</h2><button @click="pushToMovieType('tv','top_rated','1')">More<FontAwesomeIcon :icon="['fas','angle-right']"/></button></div>
         <div class="mb-4 mt-3 flex gap-3 overflow-x-scroll">
          <div v-for="movies in movieStores.topRatedTvShows" :key="movies.id" class="animate-in relative w-[full] aspect-[2/3] h-[290px] md:h-[450px] rounded-lg shrink-0 bg-[rgb(255,255,255,0.3)]">
          <img :src="`https://image.tmdb.org/t/p/original${movies.poster_path}`" class="h-full w-full rounded-lg object-cover">
          <div class="absolute inset-0 top-0 left-0 rounded-lg bg-gradient-to-b from-[rgba(0,0,0,0)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.9)]"></div>
          <h2 class="absolute p-[10px] font-bold text-[13px] z-[60]  bottom-[25px] ">{{ movies.title || movies.name }}</h2> 
          <p class=" absolute z-[60] text-[11px] left-3 bottom-[13px]">{{ new Date(movies.release_date).getFullYear() || new Date(movies.first_air_date).getFullYear()}}</p>    
          <p class="absolute bottom-[13px]  z-[60] text-[12px] right-[10px]"><FontAwesomeIcon class="text-[#FFA500]" :icon="['fas','star']"/> {{ movies.vote_average.toFixed(1) }}</p>
       </div>
      </div>
           <!-- Top Rated Movies --> 
      <div class="flex justify-between items-center font-[roboto_condensed]"><h2 class="text-xl font-bold"><FontAwesomeIcon :icon="['fas','star']"/> Top Rated movies</h2><button @click="pushToMovieType('movie','top_rated','1')">More<FontAwesomeIcon :icon="['fas','angle-right']"/></button></div>
      <div class="mb-4 mt-3 overflow-x-scroll flex gap-3">
       <div v-for="movies in movieStores.topRatedMovies" :key="movies.id" class="animate-in relative w-[full] aspect-[2/3] h-[290px] md:h-[450px] rounded-lg shrink-0 bg-[rgb(255,255,255,0.3)]">
          <img :src=" `https://image.tmdb.org/t/p/original${movies.poster_path}`" class=" rounded-lg h-full w-full object-cover">
          <div class="absolute inset-0 top-0 left-0 rounded-lg bg-gradient-to-b from-[rgba(0,0,0,0)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.9)]"></div>
          <h2 class="absolute p-[10px] font-bold text-[13px] z-[60]  bottom-[25px] ">{{ movies.title || movies.name }}</h2> 
          <p class=" absolute z-[60] text-[11px] left-3 bottom-[13px]">{{ new Date(movies.release_date).getFullYear() || new Date(movies.first_air_date).getFullYear()}}</p>    
          <p class="absolute bottom-[13px]  z-[60] text-[12px] right-[10px]"><FontAwesomeIcon class="text-[#FFA500]" :icon="['fas','star']"/> {{ movies.vote_average.toFixed(1) }}</p>
     </div>
      </div>
      
            <!-- Airing Today -->
      <div class="flex justify-between items-center font-[roboto_condensed]"><h2 class="text-xl font-bold"><FontAwesomeIcon :icon="['fas','clock']"/> Airing Today</h2><button @click="pushToMovieType('tv','airing_today','1')">More<FontAwesomeIcon :icon="['fas','angle-right']"/></button></div>
      <div class="mb-4 mt-3 overflow-x-scroll flex gap-3">
        <div v-for="movies in movieStores.airingToday" :key="movies.id" class="animate-in relative w-[full] aspect-[2/3] h-[290px] md:h-[450px] rounded-lg shrink-0 bg-[rgb(255,255,255,0.3)]">
          <img :src=" `https://image.tmdb.org/t/p/original${movies.poster_path}`" class="rounded-lg left-0 absolute top-0 h-full w-full object-auto">
          <div class="absolute inset-0 top-0 left-0 rounded-lg bg-gradient-to-b from-[rgba(0,0,0,0)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.9)]"></div>
          <h2 class="absolute p-[10px] font-bold text-[13px] z-[60]  bottom-[25px] ">{{ movies.title || movies.name }}</h2> 
          <p class=" absolute z-[60] text-[11px] left-3 bottom-[13px]">{{ new Date(movies.release_date).getFullYear() || new Date(movies.first_air_date).getFullYear()}}</p>    
          <p class="absolute bottom-[13px]  z-[60] text-[12px] right-[10px]"><FontAwesomeIcon class="text-[#FFA500]" :icon="['fas','star']"/> {{ movies.vote_average.toFixed(1) }}</p>
     </div>
      </div>
    </div>
    
              <!-- loading movie -->
    <div v-if="movieStores.movieLoading" class="p-5 fixed top-0 left-0 bg-black h-screen w-full grid items-center">
      <div class="text-center grid justify-center">
        <div class="spinner mb-4 border border-6 border-[rgb(255,255,255,0.3)] border-t-white h-[40px] w-[40px] aspect-[1/1] rounded-full"></div>
        <h2 class="text-white text-center">Loading....</h2>
      </div>
   </div>
      
      <!-- loading movie error -->
         <div v-if="movieStores.errorLoading" class="p-5 fixed top-0 left-0 bg-black h-screen w-full grid items-center">
         <div class="text-white text-center">
          <FontAwesomeIcon class="text-7xl text-red-300 mb-2" :icon="['fas','exclamation-triangle']" />
          <h2 class="text-white text-center">Network Error. please check your connection and try again.</h2>
          <button @click="tryAgain" class="bg-white text-black border border-2 mt-2 px-8 py-3 rounded-full focus:bg-inherit focus:text-white ">Try again</button>
        </div>
      </div>
  
    
  </div>
</template>
<style>
   
/* Slide-in from bottom animation */
.animate-in {
opacity: 0;
  transform: translateX(20px);
  transition: all 0.5s ease;
}

.animate-in.visible {
opacity: 1;
transform: translateX(0);
}
</style>