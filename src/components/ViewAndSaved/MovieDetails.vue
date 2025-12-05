<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { movieDetails } from '@/AppState/movieDetails';
import { WatchList } from '@/AppState/addToWatchList'

const route = useRoute();
const router = useRouter();
const useMovieDetails = movieDetails();
const useWatchList = WatchList();

const MovieDetails = computed(() => useMovieDetails.watchDetails);
const currrentTextLoader = computed(() => useWatchList.textLoader);
const movieTitle = computed(() => {
  const details = MovieDetails.value          // <-- unwrap here
  return details?.name || details?.title
})

const movieDate = computed(() => {
  const details = MovieDetails.value          // <-- unwrap here
  return details?.first_air_date || details?.release_date;
})


async function addToWatchListBtn(val1,val2,val3,val4,val5, val6) {
await useWatchList.addToWatchList({ postUrl: val1, title: val2, overview: val3, year:val4, Id:val5, type:val6 })
}
const watchType = ref(route.params.type);
const watchId = ref(route.params.id);
const videoPlayer = ref(null);
const showVideoPlayer = ref(false);
const setTimeoutForLoading = ref(true);
const videoSection = ref(null);
const showCopied = ref(false);
const showShare = ref(false);

async function fetchWatchDetails() {
  await useMovieDetails.fetchMovieDetails({
    movieType: watchType.value,
    movieId: watchId.value
  });
}

function playVideoBtn(videoId) {
  videoPlayer.value.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&muted=1&loop=1&showinfo=0`;
  showVideoPlayer.value = true;
  setTimeout(() => {
    setTimeoutForLoading.value = false;
  }, 5000);
  videoSection.value.scrollIntoView({ behavior: 'smooth' });
}

function copyWindowUrl() {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
  showCopied.value = true;
  setTimeout(() => {
    showCopied.value = false;
  }, 5000);
}

function shareBtn() {
showShare.value = !showShare.value;
}
function shareTo(platform) {
  const url = window.location.href;
  const text = "Watch Out";
  const encodedURL = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  let shareURL = "";

  switch (platform) {
    case "whatsapp":
      shareURL = `https://wa.me/?text=${encodedText}%20${encodedURL}`;
      break;

    case "facebook":
      shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`;
      break;

    case "twitter":
      shareURL = `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedText}`;
      break;

    default:
      console.warn("Unknown platform:", platform);
      return;
  }

  window.open(shareURL, "_blank");
}


onMounted(() => {
  fetchWatchDetails();
});

</script>

<template>
  <AppHeader />

  <!-- Top Background -->
  <div class="fixed text-white h-screen w-full bg-cover bg-no-repeat" :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${MovieDetails.backdrop_path})` }">
    <div class="fixed w-full overflow-scroll h-screen bg-[rgb(0,0,0,0.8)] backdrop-blur-sm">
      <div class="pt-25 px-5 max-w-[1200px] mx-auto my-0 md:mt-10">

        <!-- Poster + Info -->
        <div class="text-white block md:flex justify-center lg:flex items-center gap-[30px]">
          <div class="mx-auto max-w-[350px] w-full bg-[rgb(255,255,255,0.5)] rounded-md aspect-[2/3]">
            <img class="rounded-md" :src="`https://image.tmdb.org/t/p/original${MovieDetails.poster_path}`"/>
          </div>

          <div class="mt-3 text-center md:text-left">
            <h2 class="text-4xl font-bold font-[open_sans]">
              {{ MovieDetails.name || MovieDetails.title }}
           </h2>

            <div class="mt-2">
              <div class="flex items-center gap-3">
                <button @click="addToWatchListBtn(MovieDetails.poster_path,movieTitle, MovieDetails.overview, movieDate, MovieDetails.id, watchType)" class="w-full bg-white p-3 rounded-full text-black max-w-[600px]">
                  <FontAwesomeIcon :icon="['far','bookmark']" />
                {{ currrentTextLoader }}
                </button>

                <div class="flex items-center text-1xl gap-2">
                  <div @click="shareBtn" class="w-12 grid justify-center items-center bg-[rgb(255,255,255,0.3)] rounded-full aspect-[1/1] p-2">
                    <FontAwesomeIcon :icon="['fas','share']" />
                  </div>

                  <div @click="copyWindowUrl" class="relative w-12 grid justify-center items-center bg-[rgb(255,255,255,0.3)] rounded-full aspect-square p-2">
                    <FontAwesomeIcon :icon="['fas','link']" />
                    <div v-show="showCopied" class="top-10 absolute bg-black color-white text-[9px] rounded-md p-3">
                      <h2>Copied</h2>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Buttons -->
              <div class="text-center mt-2 flex justify-center gap-2 md:justify-start">
                <button class="flex gap-1 items-center p-4 bg-[#3CB371] rounded-md text-white">
                  <FontAwesomeIcon :icon="['fas','play']" />
                  Watch Now
                </button>

                <button class="flex gap-1 items-center p-4 bg-[rgb(255,255,255,0.2)] rounded-md text-white">
                  <FontAwesomeIcon :icon="['fas','link']" />
                  Visit
                </button>
              </div>

              <!-- Info -->
              <p class="mt-2 font-[300]">
                <span class="font-[600]">Year Out:</span>
                {{ MovieDetails.first_air_date || MovieDetails.release_date || "N/A" }}
              </p>

              <div class="mt-1 font-[300]" v-if="MovieDetails.genres">
                <span class="font-bold">Genre: </span>
                <span class="font-[roboto_condensed] overflow-hidden text-[14px]" v-for="genre in MovieDetails.genres" :key="genre.id">
                  {{ genre.name }},
                </span>
              </div>

              <div class="flex justify-center md:justify-start lg:justify-start gap-2 flex-wrap mt-2 text-sm">
                <div class="p-2 bg-[rgb(255,255,255,0.2)] rounded-md">
                  <FontAwesomeIcon :icon="['fas','star']" class="text-[#FFA500]" />
                  {{ (MovieDetails.vote_average || 0).toFixed(1) }}
                </div>

                <div class="p-2 bg-[rgb(255,255,255,0.2)] rounded-md">
                  <FontAwesomeIcon :icon="['fas','vote-yea']" />
                  {{ MovieDetails.vote_count }} Voters
                </div>

                <div class="p-2 bg-[rgb(255,255,255,0.2)] rounded-md">
                  <FontAwesomeIcon :icon="['fas','globe']" />
                  {{ MovieDetails.popularity }}
                </div>

                <div class="p-2 bg-[rgb(255,255,255,0.2)] rounded-md">
                  <FontAwesomeIcon :icon="['fas','vote-yea']" class="text-[#3CB371]" />
                  {{ MovieDetails.runtime || "N/A" }} min
                </div>
              </div>

              <!-- Overview -->
              <div class="mt-4">
                <h2 class="flex items-center justify-center md:justify-start gap-2">
                  <span class="border border-2 border-white border-b-0 w-[20%]"></span>
                  <span class="text-white text-3xl font-bold">Over View</span>
                  <span class="border border-2 border-white border-b-0 w-[20%]"></span>
                </h2>

                <div class="text-md text-left font-[public_sans]">
                  <p>{{ MovieDetails.overview }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Video Player -->
        <div ref="videoSection" v-show="showVideoPlayer" class="my-5">
          <div class="mx-auto max-w-[500px] w-full aspect-[16/9] relative">
            <iframe ref="videoPlayer" class="h-full w-full" src="" allow="autoplay" allowfullscreen></iframe>

            <div v-show="setTimeoutForLoading" class="absolute top-0 bg-[rgb(0,0,0,0.9)] h-full w-full grid justify-center items-center" >
              <div>
                <FontAwesomeIcon class="spinner text-3xl" :icon="['fas','sync']" />
                <p>Loading</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Videos List -->
        <div class="mt-4">
          <h2 class="font-bold text-2xl mb-2">
            <FontAwesomeIcon :icon="['fas','video']" />
            Videos and Trailer
          </h2>

          <div>
            <div v-if="MovieDetails?.videos?.results?.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div
                v-for="movieVideo in MovieDetails.videos.results"
                :key="movieVideo.id"
                class="rounded-md relative w-full bg-[rgb(255,255,255,0.5)] aspect-[16/9]"
                @click="playVideoBtn(movieVideo.key)"
              >
                <img
                  class="rounded-md w-full h-full object-cover"
                  :src="`https://img.youtube.com/vi/${movieVideo.key}/maxresdefault.jpg`"
                />

                <div class="rounded-md absolute h-full w-full inset-0 bg-gradient-to-b from-[rgb(0,0,0,0)] to-[rgb(0,0,0,0.8)]"></div>

                <h2 class="absolute bottom-0 text-sm font-bold p-2 pr-15">
                  {{ movieVideo.name }}
                </h2>

                <p class="absolute right-3 bottom-0">
                  <FontAwesomeIcon class="text-xl" :icon="['fas','video']" />
                </p>

                <p class="absolute text-[12px] top-2 right-2 font-bold bg-white text-black rounded-full px-3">
                  {{ movieVideo.type }}
                </p>
              </div>
            </div>

            <div class="mt-8 mb-8" v-else>
              <div class="text-center">
                <div class="text-4xl relative mx-auto text-gray-100 w-[150px]">
                  <FontAwesomeIcon :icon="['fas','video']" />
                  <div class="absolute top-5 left-[20%] rotate-140 border-b-0 border-l-0 border-r-0 border-t-gray-100 rounded-md border-4 w-[80px]"></div>
                </div>
                <h2 class="mt-3">Not Available</h2>
              </div>
            </div>
          </div>
        </div>

        <!-- Other Details -->
        <div class="mt-2 block gap-5">
          <div class="mt-3">
            <h2 class="text-2xl font-bold">Other Informations</h2>

            <div class="grid md:flex md:flex-wrap grid-cols-2 gap-5 mt-2">
              <div>
                <h2 class="font-[600]">Title:</h2>
                <p class="text-[rgb(255,255,255,0.4)] text-sm">
                  {{ MovieDetails.title || MovieDetails.name }}
                </p>
              </div>

              <div>
                <h2 class="font-[600]">Year Out:</h2>
                <p class="text-[rgb(255,255,255,0.4)] text-sm">
                  {{ MovieDetails.first_air_date || MovieDetails.release_date }}
                </p>
              </div>

              <div>
                <h2 class="font-[600]">Tag Line:</h2>
                <p class="text-[rgb(255,255,255,0.4)] text-sm">
                  {{ MovieDetails.tagline || "Not Available" }}
                </p>
              </div>

              <div>
                <h2 class="font-[600]">Status:</h2>
                <p class="text-[rgb(255,255,255,0.4)] text-sm">
                  {{ MovieDetails.status || "Not Available" }}
                </p>
              </div>

              <div>
                <h2 class="font-[600]">Seasons:</h2>
                <p class="text-[rgb(255,255,255,0.4)] text-sm">
                  {{ MovieDetails.number_of_seasons || "Not Available" }}
                </p>
              </div>

              <div>
                <h2 class="font-[600]">Episodes:</h2>
                <p class="text-[rgb(255,255,255,0.4)] text-sm">
                  {{ MovieDetails.number_of_episodes || "Not Available" }}
                </p>
              </div>

              <div>
                <h2 class="font-[600]">Last Air Date:</h2>
                <p class="text-[rgb(255,255,255,0.4)] text-sm">
                  {{ MovieDetails.last_air_date || "Not Available" }}
                </p>
              </div>

              <div>
                <h2 class="font-[600]">Next Air Episodes:</h2>
                <p
                  v-if="MovieDetails.next_episode_to_air"
                  class="text-[rgb(255,255,255,0.4)] text-sm"
                >
                  {{ MovieDetails.next_episode_to_air.name }}
                </p>
                <p v-else class="text-[rgb(255,255,255,0.4)] text-sm">
                  Not Available
                </p>
              </div>

              <div>
                <h2 class="font-[600]">Origin Country:</h2>
                <p class="text-[rgb(255,255,255,0.4)] text-sm">
                  {{ MovieDetails.origin_country?.[0] || "Not Available" }}
                </p>
              </div>

              <div>
                <h2 class="font-[600]">Original Language:</h2>
                <p class="text-[rgb(255,255,255,0.4)] text-sm">
                  {{ MovieDetails.original_language || "Not Available" }}
                </p>
              </div>

              <div>
                <h2 class="font-[600]">Typed:</h2>
                <p class="text-[rgb(255,255,255,0.4)] text-sm">
                  {{ MovieDetails.type || "Not Available" }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Cast Members -->
        <div class="mt-3">
          <h2 class="text-2xl font-bold">Cast Members</h2>
          <div class="flex gap-2 w-full overflow-scroll mt-3" v-if="MovieDetails?.credits">
            <div v-for="castMembers in MovieDetails.credits.cast" :key="castMembers.id" class="relative h-[250px] w-full rounded-md aspect-[2/3] bg-[rgb(255,255,255,0.5)]">
              <img class="object-cover rounded-md" :src="`https://image.tmdb.org/t/p/original${castMembers.profile_path}`"/>
              <div class="absolute top-0 h-full w-full bg-gradient-to-b from-[rgb(0,0,0,0)] to-[rgb(0,0,0,0.9)]"></div>
              <h2 class="absolute bottom-1 p-2">
                {{ castMembers.name }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading -->
  <div v-if="useMovieDetails.isLoading" class="p-5 fixed top-0 left-0 bg-black h-screen w-full grid items-center">
    <div class="text-center grid justify-center">
      <div class="spinner mb-4 border border-6 border-[rgb(255,255,255,0.3)] border-t-white h-[40px] w-[40px] rounded-full"></div>
      <h2 class="text-white">Loading....</h2>
    </div>
  </div>

  <!-- Error -->
  <div v-if="useMovieDetails.isError" class="p-5 fixed top-0 left-0 bg-black h-screen w-full grid items-center">
    <div class="text-white text-center">
      <FontAwesomeIcon class="text-7xl text-red-300 mb-2" :icon="['fas','exclamation-triangle']" />
      <h2>Network Error. Please check your connection and try again.</h2>
      <button @click="tryAgain" class="bg-white text-black border border-2 mt-2 px-8 py-3 rounded-full">
        Try Again
      </button>
    </div>
  </div>
                     <!-- Share platform -->
     <transition name="slide-from-bottom">              
      <div v-show="showShare" class="absolute bg-[rgb(0,0,0,0.1)] h-screen w-full z-[1500] backdrop-blur-md grid justify-center items-center">
        <div class="relative p-4">
        <div class="max-w-[300px] text-center bg-black px-15 py-4 rounded-md text-white">
          <h2 class="font-bold text-[18px] mb-2">Share To:</h2>
          <div class="flex items-center justify-center gap-3 text-3xl">
            <button @click="shareTo('facebook')" class="bg-[rgb(255,255,255,0.2)] p-2 rounded-full text-blue-500">
              <FontAwesomeIcon :icon="['fab','facebook']"/>
          </button>
           <button @click="shareTo('twitter')" class="bg-[rgb(255,255,255,0.2)] p-2 rounded-full text-white">
             <FontAwesomeIcon :icon="['fab','twitter']"/>
          </button>
           <button @click="shareTo('whatsapp')" class="bg-[rgb(255,255,255,0.2)] p-2 rounded-full text-green-600">
             <FontAwesomeIcon :icon="['fab','whatsapp']"/>
          </button>
           <button @click="copyWindowUrl" class=" relative bg-[rgb(255,255,255,0.2)] p-2 rounded-full text-white">
             <FontAwesomeIcon :icon="['fas','link']"/>
             <div v-show="showCopied" class="top-10 absolute bg-black color-white text-[9px] rounded-md p-3">
               <h2>Copied</h2>
            </div>
          </button>
          </div>
          <div class="mt-3">
            <button @click="shareBtn" class="absolute top-0 right-0 bg-[rgb(255,255,255,0.5)] aspect-square p-2 text-2xl text-white rounded-full">
              <FontAwesomeIcon :icon="['fas','times']"/>
            </button>
            <button @click="shareBtn" class="bg-red-500 px-8 py-2 rounded-md">
              Cancel
            </button>
          </div>
        </div>
        </div>
      </div>
    </transition>
</template>

<style>
.slide-from-bottom-enter-active,
.slide-from-bottom-leave-active {
  transition: all 0.4s ease;
}
.slide-from-bottom-enter-from,
.slide-from-bottom-leave-to {
  opacity: 1;
  transform: translateY(100%);
}
.slide-from-bottom-enter-to,
.slide-from-bottom-leave-from{
  opacity: 1;
  transform: translateY(0);
}

</style>
