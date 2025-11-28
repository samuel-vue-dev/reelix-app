<script setup>
  import { ref, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { movieDetails } from '@/AppState/movieDetails';
  const route = useRoute();
  const router = useRouter();
  const useMovieDetails = movieDetails(); 
  const watchType = ref(route.params.type);
  const watchId = ref(route.params.id);
  async function fetchWatchDetails() {
  await useMovieDetails.fetchMovieDetails({ movieType: watchType.value, movieId: watchId.value });
  }
  onMounted(() => {
  fetchWatchDetails();
  })
  
</script>
<template>
  <AppHeader />
  <div class="fixed h-screen w-full bg-cover bg-no-repeat" :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${useMovieDetails.watchDetails.backdrop_path})`}">
    <div class="fixed w-full overflow-scroll h-screen bg-[rgb(0,0,0,0.8)] backdrop-blur-sm">
      <div class="pt-25 px-5 max-w-[1200px] mx-auto my-0 md:mt-10">
        <div class="text-white block md:flex justify-center lg:flex items-center gap-[30px]">
          <div class="mx-auto my-0 max-w-[300px]">
            <img class="rounded-md" :src="`https://image.tmdb.org/t/p/original${useMovieDetails.watchDetails.poster_path}`"/>
          </div>
      <div class="mt-3 text-center md:text-left">
        <h2 class="text-4xl font-bold  font-[open_sans] font-bold">{{ useMovieDetails.watchDetails.title || useMovieDetails.watchDetails.name }}</h2>
        <div class="mt-2">
          <button class="w-full bg-white p-3 rounded-full text-black max-w-[600px]"><FontAwesomeIcon :icon="['far','bookmark']"/> Add to WatchList</button>
          <div class="text-center mt-2 flex justify-center gap-2 md:justify-start">
            <button class="p-4 bg-[#3CB371] rounded-md text-white">Watch Now<FontAwesomeIcon :icon="['fas','play']"/></button>
            <button class="p-4 bg-[rgb(255,255,255,0.2)] rounded-md text-white">Visit<FontAwesomeIcon :icon="['fas','link']"/></button>
          </div>
          <p class="mt-2">Year: {{ useMovieDetails.watchDetails.first_air_date || useMovieDetails.watchDetails.release_date || "N/A" }} </p>
          <div class="flex justify-center md:justify-start lg:justify-start gap-2 flex-wrap mt-2">
            <div class="p-3 bg-[rgb(255,255,255,0.2)] rounded-md"><FontAwesomeIcon :icon="['fas','star']" class="text-[#FFA500]"/> {{ (useMovieDetails.watchDetails.vote_average || 0).toFixed(1)}}</div>
            <div class="p-3 bg-[rgb(255,255,255,0.2)] rounded-md"><FontAwesomeIcon :icon="['fas','vote-yea']"/> {{ useMovieDetails.watchDetails.vote_count }} Voters</div>
            <div class="p-3 bg-[rgb(255,255,255,0.2)] rounded-md"><FontAwesomeIcon :icon="['fas','globe']"/> {{ useMovieDetails.watchDetails.popularity }}</div>
            <div class="p-3 bg-[rgb(255,255,255,0.2)] rounded-md"><FontAwesomeIcon :icon="['fas','vote-yea']" class="text-[#3CB371]"/> {{ useMovieDetails.watchDetails.runtime || "N/A" }} min</div>
          </div>
    <div class="mt-4">
     <h2 class="flex items-center justify-center md:justify-start lg:justify-start gap-2">
     <span class="border border-2 border-white border-t-white border-b-0 border-l-0 border-r-0 w-[20%] "></span>
     <span class="text-white flex text-3xl font-bold ">Over View</span>
     <span class="border border-2 border-white border-t-white border-b-0 border-l-0 border-r-0 w-[20%]"></span>
    </h2>
    <div class="text-md text-left font-[public_sans]">
      <p>{{ useMovieDetails.watchDetails.overview }}</p>
    </div>
   </div>

        </div>
    </div>
 </div>
 <!-- Movie Details content -->
 <div class="mt-2 text-white block gap-5">
 
<div class="mt-3 max-w-[400px]">
  <h2 class="text-2xl font-bold">Other Informations</h2>
  <div class="grid grid-cols-2 gap-5 mt-2">
    <div>
      <h2 class=" font-[600]">Title:</h2>
      <p class="text-[rgb(255,255,255,0.4)] text-sm">{{ useMovieDetails.watchDetails?.title || useMovieDetails.watchDetails?.name }}</p>
    </div>
    <div>
      <h2 class=" font-[600]">Year Out:</h2>
      <p class="text-[rgb(255,255,255,0.4)] text-sm">{{ useMovieDetails.watchDetails?.first_air_date || useMovieDetails.watchDetails?.release_date }}</p>
    </div>
    <div>
      <h2 class=" font-[600]">Status:</h2>
      <p class="text-[rgb(255,255,255,0.4)] text-sm">{{ useMovieDetails.watchDetails?.status || " Not Available" }}</p>
    </div>
    <div>
      <h2 class=" font-[600]">Seasons:</h2>
      <p class="text-[rgb(255,255,255,0.4)] text-sm">{{ useMovieDetails.watchDetails?.number_of_seasons || "Not Available" }}</p>
    </div>
    <div>
      <h2 class=" font-[600]">Episodes:</h2>
      <p class="text-[rgb(255,255,255,0.4)] text-sm">{{ useMovieDetails.watchDetails?.number_of_episodes|| "Not Available" }}</p>
    </div>
    <div>
      <h2 class=" font-[600]">Last Air Date:</h2>
      <p class="text-[rgb(255,255,255,0.4)] text-sm">{{ useMovieDetails.watchDetails?.last_air_date || "Not Available" }}</p>
    </div>
    <div>
      <h2 class=" font-[600]">Next Air Episodes:</h2>
      <p v-if="useMovieDetails.watchDetails?.next_episode_to_air" class="text-[rgb(255,255,255,0.4)] text-sm">{{ useMovieDetails.watchDetails?.next_episode_to_air.name || "Not Available" }}</p>
    </div>
    <div>
      <h2 class=" font-[600]">Origin Country:</h2>
      <p class="text-[rgb(255,255,255,0.4)] text-sm">{{ useMovieDetails.watchDetails?.origin_country?.[0] || "Not Available" }}</p>
    </div>
    <div>
      <h2 class=" font-[600]">Original Language:</h2>
      <p class="text-[rgb(255,255,255,0.4)] text-sm">{{ useMovieDetails.watchDetails?.original_language|| "Not Available" }}</p>
    </div>
  </div>
  <div>
    <h2>Production Companies</h2>
    
  </div>
</div>


 </div>
  </div>
  </div>
  </div>
</template>
<style>

</style>