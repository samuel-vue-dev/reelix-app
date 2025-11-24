<script setup>
  import { ref, onMounted, watch, nextTick, computed } from 'vue';
  import{ useRouter, useRoute } from 'vue-router';
  import { movieStore } from '@/AppState/movies';
  const router = useRouter();
  const route = useRoute();
  const movieStores = movieStore();
  
  const userInput = ref(route.params.searchKeyWord);
  const pageId = ref(Number(route.params.page) || 1);
  const userNewInput = ref(route.params.searchKeyWord);
  const searchValue = computed(() => {
  return route.params.searchKeyWord;
  })
  const movieCards = ref([]);

 async function searchMovieFunction() {
  await movieStores.fetchSearchMovies({ searchInput: userInput.value.toLowerCase().replace(/\s+/g, '+'), pageQuery:pageId.value })
  await nextTick();
  movieCards.value = Array.from(document.querySelectorAll('.movie-linear-gradient'));
  observeMovies();
  }
  
  async function searchMovieByBtn(val1) {
  router.push({ path: `/search/${userNewInput.value.toLowerCase().replace(/\s+/g, '+')}/${val1}` });
  await movieStores.fetchSearchMovies({ searchInput: userNewInput.value.toLowerCase().replace(/\s+/g, '+'), pageQuery: val1 })
  await nextTick();
  movieCards.value = Array.from(document.querySelectorAll('.movie-linear-gradient'));
  observeMovies();

  }
  
  async function nextPage() {
  pageId.value += 1;
  await searchMovieFunction();
  router.push({ path: `/search/${userInput.value}/${pageId.value}` });
}

async function prevPage() {
  if(pageId.value === 1) return;
  pageId.value -= 1;
  await searchMovieFunction();
  router.push({ path: `/search/${userInput.value}/${pageId.value}` });
}

watch(
() => [route.params.page, route.params.searchKeyWord],
async ([ page, searchKeyWord])=> {
pageId.value = Number(page) || 1;
userInput.value = searchKeyWord;
await searchMovieFunction();
})

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
onMounted(() => searchMovieFunction());

function tryAgain() {
 searchMovieFunction();
}
  
  </script>
<template>
<AppHeader /> 
<div class="px-5">
<div class=" md:pt-38 lg:pt-38 pt-25">
  <div class="relative mx-auto my-0 text-white max-w-[800px]">
    <div class=" text-[18px] absolute top-[13px] left-3 text-grey-200"><FontAwesomeIcon :icon="['fas','search']"/></div>
    <button @click="searchMovieByBtn('1')" class="text-white bg-[#3CB371] top-[5px] rounded-md absolute aspect-[1/1] h-[40px] w-[40px] right-[5px] px-3 py-2"><FontAwesomeIcon :icon="['fas','search']"/></button>
    <input v-model="userNewInput" type="text" placeholder="search for something" class="px-9 py-3 text-gray-200 border border-white rounded-md w-full focus:outline-none focus:blue-500 focus:ring-1 focus:ring-gray-200">
    <div class=" text-white font-[roboto_condensed] mt-2"><h2 class="text-xl font-bold"><FontAwesomeIcon :icon="['fas','film']"/>Search Results For: <span class="text-[15px]">{{ searchValue }}</span></h2></div>
  </div>
  </div>
  
      <div v-if="movieStores.movieSearched?.length > 0">
        <div class="auto-grid mt-5">
        <div v-for="search in movieStores.movieSearched" :key="search.id" class="movie-linear-gradient bg-[rgb(255,255,255,0.3)] rounded-md top-0 left-0 min-h-[225px] min-w-[150px] relative mb-3 text-white">
          <img :src="`https://image.tmdb.org/t/p/original${search.poster_path}`" class="rounded-md left-0 absolute top-0 h-full w-full object-auto">
          <div class="bg-gradient-to-b from-[rgba(0,0,0,0)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.9)] absolute top-0 left-0 h-full w-full rounded-md"></div>
          <h2 class="absolute p-[10px] font-bold text-[13px] z-[60] bottom-[25px]">{{ search.title || search.name }}</h2>
          <p class="absolute z-[60] text-[11px] left-3 bottom-[13px]">{{ new Date(search.release_date).getFullYear() || new Date(search.first_air_date).getFullYear()}}</p>    
          <p class="absolute bottom-[13px]  z-[60] text-[12px] right-[10px]"><FontAwesomeIcon class="text-[#FFA500]" :icon="['fas','star']"/> {{ search.vote_average.toFixed(1) }}</p>
        </div>
        </div>
              <div class="flex justify-center gap-3 mt-5">
        <button @click="prevPage" :disabled="pageId === 1" class="bg-gray-600 p-2 rounded-md text-white disabled:opacity-50">
          <FontAwesomeIcon :icon="['fas','angle-left']" /> Prev
        </button>
        <span class="text-white font-bold p-2">Page {{ pageId }}</span>
        <button @click="nextPage" class="bg-green-600 p-2 rounded-md text-white">
          Next <FontAwesomeIcon :icon="['fas','angle-right']" />
        </button>
      </div>
    
      </div>
          <!-- Pagination Buttons -->
      <div class="text-white text-xl mt-40 w-full" v-else>
        <div class="content-center text-center max-w-[400px] mx-auto my-0">
          <div class="text-5xl">
            <FontAwesomeIcon :icon="['fas','search-minus']"/>
          </div>
          <h2 class="">No Results was found</h2>
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
  <div>
  </div>

</template>
