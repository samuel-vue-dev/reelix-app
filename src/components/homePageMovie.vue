<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { movieStore } from '@/AppState/movies'

const movieStores = movieStore()
let intervalId = null

// Fetch homepage movie
async function fetchHomeMovie() {
  await movieStores.fetchHomePageMovie()
}

function tryAgain() {
fetchHomeMovie();
}

//mount when page load
onMounted(() => {
  fetchHomeMovie()
  intervalId = setInterval(fetchHomeMovie, 7000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="h-screen font-[poppins]">
    <!-- laoding movie if false -->
    <div v-if="!movieStores.homePageLoading">
    <div  :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/original${movieStores.movieImage}')`}" class="homepagemovie rounded-md font-[poppins] h-[100vh] w-full bg-no-repeat bg-cover bg-center relative top-10">
      <div class="overlay-shadow h-full rounded-md content-center">
        <div style="height: 100vh" class="p-4 text-white grid items-center ">
          <div class="">
            <h2 class="text-5xl font-bold mb-4">{{ movieStores.movieTitle || "Loading...." }}</h2>
            <p class="set-text-ellipsis mb-3">{{ movieStores.movieDescription || "Loading...."}}</p>
            <button class="px-6 py-5 bg-[#3CB371] rounded-sm text-md">
              <FontAwesomeIcon :icon="['fas', 'play']" /> Watch Now
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
      <!-- loading movie -->
      <div v-if="movieStores.homePageLoading" class="p-5 absolute top-0 left-0 bg-black h-screen w-full grid items-center">
        <div class="text-center grid justify-center">
          <div class="spinner mb-4 border border-6 border-[rgb(255,255,255,0.3)] border-t-white h-[40px] w-[40px] aspect-[1/1] rounded-full"></div>
          <h2 class="text-white text-center">Loading....</h2>
        </div>
      </div>
      <!-- loading movie error -->
         <div v-if="movieStores.homePageError" class="p-5 absolute top-0 left-0 bg-black h-screen w-full grid items-center">
        <div class="text-white text-center">
          <FontAwesomeIcon class="text-7xl text-red-300 mb-2" :icon="['fas','exclamation-triangle']" />
          <h2 class="text-white text-center">Network Error. please check your connection and try again.</h2>
          <button @click="tryAgain" class="bg-white text-black border border-2 mt-2 px-8 py-3 rounded-full focus:bg-inherit focus:text-white ">Try again</button>
        </div>
      </div>
    </div>
</template>
<style>
.homepagemovie .overlay-shadow {
  background-image: linear-gradient(
    to top right,
    rgb(0, 0, 0, 0.8),
    rgb(0, 0, 0, 0.8),
    rgb(0, 0, 0, 0.6)
  );
}

.homepagemovie .set-text-ellipsis {
  color: white;
  background: none;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  max-width: 800px;
}

@media screen and (min-width: 768px) {
  .homepagemovie {
    height: auto;
  }
  .overlay-shadow {
    height: auto;
  }
}
</style>
