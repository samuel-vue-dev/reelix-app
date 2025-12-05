<script setup>
  import { ref, onMounted, computed, watch, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  import { WatchList } from '@/AppState/addToWatchList'
  import { userAuth } from '@/AppState/auth';
  const auth = userAuth();
  const router = useRouter();
  const useWatchList = WatchList();
  const movieCards = ref(null);
  const checkForCompletedMovie = ref(null);
  const showDeleted = computed(() => {
  return useWatchList.deletion;
  })
  const myWatchList = computed(() => {
  return useWatchList.watchData;
  })

async  function fetchWatchByUser() {
  await useWatchList.fetchWatchList();
  await nextTick();
  movieCards.value = Array.from(document.querySelectorAll('.slide-from-bottom'));
  observeMovies();

  }
 async function deleteMovie(movieId) {
  await useWatchList.deleteAddedWatch({ watchId: movieId });
  }
  
  async function completeWatch(movieId) {
  await useWatchList.completedAddedWatched({ watchId: movieId });
  checkForCompletedMovie.value = true;
  }
  
  async function unCompletedWatch(movieId) {
  await useWatchList.unCompletedAddedWatched({ watchId: movieId });
  }
  
  
  //Get Movie Details
  function getMovieDetails(val1,val2) {
router.push({ path: `/movie-details/${val1}/${val2}`})
}
// Retry function to watch List
function tryAgain() {
  fetchWatchByUser();
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
function formatDate(ms) {
  if (!ms) return "";

  const date = new Date(ms);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric" 
  });
}

  onMounted(()=> {
  fetchWatchByUser();
  })
</script>
<template>
 <AppHeader/> 
  <div class="pt-20 block md:pt-30 text-white p-4">
    <div class="flex justify-between">
    <h2 class=" flex items-center gap-1text-1xl font-bold"><FontAwesomeIcon :icon="['fas','bookmark']"/> Watch List</h2> 
    <div class="flex items-center gap-2">
    <div class="bg-[rgb(255,255,255,0.4)] backdrop-blur-md p-3 rounded-full w-[100px]">
      <h2 class="text-sm truncate">{{ auth.user?.uid }}</h2>
    </div>
    <button class="p-2 text-sm bg-red-500 rounded-md"><FontAwesomeIcon :icon="['fas','trash']"/> Clear All</button>
    </div>
  </div>
<div v-if="useWatchList.watchData.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 flex-wrap gap-4 mt-5"> 
<!-- if fetched successfully -->
  <div ref="movieCards" class="slide-from-bottom gap-4 p-2 bg-[rgba(255,255,255,0.2)] rounded-lg w-full relative" v-for="movies in myWatchList" :key="movies.id">
   <div class="flex items-start gap-4">
    <div class="aspect-[2/3] h-full w-[130px] rounded-md ">
      <img :src="`https://image.tmdb.org/t/p/original${movies.data.addPoster}`" class="object-cover rounded-md h-full w-full " />
    </div>
    <div class="flex-1 ">
      <button @click="deleteMovie(movies.id)" class="text-sm absolute text-red-500 right-2 top-2 bg-white rounded-md p-2"><FontAwesomeIcon :icon="['fas','trash']"/></button>
      <h2 class="font-semibold text-white pr-10 mt-3">{{ movies.data.addTitle }}</h2>
      <p class="line-clamp-5 text-sm opacity-80">{{ movies.data.addOverview }}</p>
      <div class="flex items-center justify-between mt-[5px]">
        <button @click="getMovieDetails(movies.data.addType,movies.data.addId)" class="p-[5px] rounded-md text-[13px] bg-[rgb(255,255,255,0.5)] mt-1">Read More <FontAwesomeIcon :icon="['fas','arrow-right']"/></button>
        <button class="text-[10px] p-[8px] rounded-[25px] bg-white text-black">{{ new Date(movies.data.addYear).getFullYear() }}</button>
      </div>
    </div>
    </div>
    <div class=" flex gap-2 justify-between mt-3 text-[12px]">
      <p class=""><FontAwesomeIcon :icon="['fas','clock']"/> {{ formatDate(movies.data.addDate) }}</p>
      <div v-if="movies.data.watched">
        <p class="flex items-center gap-2">
          <span class="flex items-center gap-[4px] text-[11px]"><span class="p-[2px] rounded-full bg-white aspect-[1/1] grid justify-center items-center">
            <FontAwesomeIcon class="text-green-600" :icon="['fas','check-circle']"/>
            </span>Watched</span>
            <input :checked="movies.data.watched"  @change="unCompletedWatch(movies.id)" type="checkbox"></p>
      </div>
      <div v-else>
        <p class="flex items-center gap-2">
          <span class="flex items-center gap-[4px] text-[11px]">
            <span class="p-[2px] rounded-full bg-white aspect-[1/1] grid justify-center items-center">
              <FontAwesomeIcon class="text-red-500" :icon="['fas','info-circle']"/>
              </span>Not Watched</span>
              <input @change="completeWatch(movies.id)" type="checkbox"></p>
      </div>
      </div>

  </div>
</div>
  <div v-else class="h-[60vh] w-full grid justify-center items-center max-w-[300px] mx-auto my-0">
    <div class="">
    <div class="text-6xl text-[rgb(254,255,255,0.5)] text-center mb-2 relative max-w-[130px] mx-auto my-0">
      <FontAwesomeIcon :icon="['fas','bookmark']"/>
      <div class=" absolute top-6 left-4 rotate-227 rounded-md border border-7 border-white  w-[100px] border-t-[rgb(254,255,255,0.5)] border-b-0 border-r-0 border-l-0"></div>
     </div>
    <h2 class=" text-sm font-[roboto_condensed] font-bold">No Watch List Added yet</h2>
    <div class="text-center mt-4">
      <button class="bg-[rgb(255,255,255,0.5)] p-2 rounded-md"><router-link class="underline font-[roboto_condensed]" to="/"><FontAwesomeIcon :icon="['fas','arrow-left']"/>Go Home</router-link></button>
    </div>  
   </div>
 </div>
</div>
<!-- Deleted popoup -->
<transition name="slide-in">
<div v-show="showDeleted" class="absolute bottom-5 w-full ">
  <div class="grid justify-center p-5">
    <div class="bg-white text-black rounded-md px-5 py-2">
      <p class="text-md"><FontAwesomeIcon :icon="['fas','check-circle']"/> Deleted Successfully</p>
  </div>
  </div>
</div>
</transition>

  <!-- Loading -->
  <div v-if="useWatchList.isLoading" class="p-5 fixed top-0 left-0 bg-black h-screen w-full grid items-center">
    <div class="text-center grid justify-center">
      <div class="spinner mb-4 border border-6 border-[rgb(255,255,255,0.3)] border-t-white h-[40px] w-[40px] rounded-full"></div>
      <h2 class="text-white">Loading....</h2>
    </div>
  </div>

  <!-- Error -->
  <div v-if="useWatchList.isError" class="p-5 fixed top-0 left-0 bg-black h-screen w-full grid items-center">
    <div class="text-white text-center">
      <FontAwesomeIcon class="text-7xl text-red-300 mb-2" :icon="['fas','exclamation-triangle']" />
      <h2>Network Error. Please check your connection and try again.</h2>
      <button @click="tryAgain" class="bg-white text-black border border-2 mt-2 px-8 py-3 rounded-full">
        Try Again
      </button>
    </div>
  </div>
</template>
<style>
  .slide-in-enter-active,
   .slide-in-leave-active{
   transition: all 0.3s ease;
  }
  
  .slide-in-enter-from,
  .slide-in-leave-to {
  opacity: 0;
  transform: translateY(100%);
  }
  .slide-in-enter-to,
  .slide-in-leave-from {
  opacity: 1;
  transform: translateY(0);
  }
</style>