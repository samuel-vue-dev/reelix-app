<script setup>
  import { ref } from 'vue';
  import{ useRouter, useRoute } from 'vue-router';
  import { searchStore } from '@/AppState/search';
  const router = useRouter();
  const route = useRoute();
  const searchStores = searchStore();
  
</script>
<template>
<AppHeader /> 
<div class=" md:pt-38 lg:pt-38 p-5">
  <div class="relative mx-auto my-0 text-white max-w-[800px]">
    <div class=" text-[16px] absolute top-3 left-2 text-grey-200"><FontAwesomeIcon :icon="['fas','search']"/></div>
    <button class="text-white bg-[#3CB371] rounded-md absolute top-[6px] right-[5px] px-3 py-2"><FontAwesomeIcon :icon="['fas','search']"/></button>
    <input type="text" placeholder="search for something" class=" px-8 p-3 text-white border border-white rounded-sm w-full">
  </div>
  
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
  <div>
  </div>
</div>

</template>
