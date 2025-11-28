<script setup>
  import { ref, onMounted, watch} from 'vue';
  import { useRouter, useRoute } from "vue-router";
  import { userAuth } from '@/AppState/auth'
  const userAuthStore = userAuth();
  const router = useRouter();
  const showNav = ref(null);
  const showShadow = ref(null);
  const userInfo = ref(null);
  const showUserInfo = ref(false);
  const showIfUserNotLogin = ref(false);
  const showSearchBar = ref(false);
  const showdropdown = ref(null);
  const userInput = ref(null);

  function pushToMovieType(val1,val2,val3) {
router.push({ path: `/watch/${val1}/${val2}/${val3}`})
}

function ToGenreType(val1,val2,val3) {
router.push({ path: `/genre/${val1}/${val2}/${val3}`})
}
  function openSideBar() {
  showNav.value.classList.remove('nav-list-showing');
  showShadow.value.style.display = "block";
  }
  
  function toggleDropdown() {
  showdropdown.value.classList.toggle("hidelist")
  }
  function closeSideBar() {
    showNav.value.classList.add('nav-list-showing');
    showShadow.value.style.display = "none";
  }
    function copyInfo(val) {
    navigator.clipboard.writeText(val);
    }
    
    // show search bar 
    function toggleSearchBar() {
showSearchBar.value = !showSearchBar.value;
    }
    // show user info 
  function toggleShowUserInfo() {
  showUserInfo.value = !showUserInfo.value;
  }
    // function if user not authenciated
    function ifUserhasnotLogin() {
   router.push({ path: "/sign-up"})
    }
   // function go home 
    function goHome() {
      showUserInfo.value = !showUserInfo.value;
      router.push({ path: "/" })
        }
      
  // function logout current user 
  function logOutUser() {
  userAuthStore.logOut();
  showUserInfo.value = !showUserInfo.value;
  }
  
   // function user to there watch list if they have login
  function routeUserToWatchList() {
  if(userAuthStore.authSuccess == false) {
  alert("You have to login to add or save movie or tv shows to watchlist");
  router.push({ path: "/sign-up" });
 
  }
  else {
  router.push({ path: "/watch-list" });
  }
  }

  function searchMovie(val1)  {
  router.push({ path: `/search/${userInput.value.toLowerCase().replace(/\s+/g, '+')}/${val1}`});
  showSearchBar.value = !showSearchBar.value;
  }
  </script>
<template>
  <!--- AppHeader /////// ========= -->
  
  <header class="fixed bg-black text-white w-full">
    <nav class="p-4 flex justify-between items-center">
      <div class="flex gap-[2px] items-center">
        <!-- openSidebar ////// ======== -->
        <button @click="openSideBar"class="text-white block md:hidden lg:hidden text-[20px] rounded-sm p-1 cursor-pointer bg-[rgb(255,255,255,0.2)] border-gray-200">
  <FontAwesomeIcon :icon="['fas','bars']" />
</button>
<router-link to="/" class="flex items-center">
        <img class="h-[40px] "src="../assets/Screenshot_20251022-094039.jpg">
        <h2 class="text-[20px] font-bold">Reelix<span class="text-[#3CB371]">Play</span></h2>
        </router-link>
      </div>
      
      <!-- navlist component -->
      <div ref="showNav" class="nav-list-showing block nav-list bg-black p-6">
        <div class="text-right flex justify-end text-white">
          <!-- SidebarClose --->
          <button class="text-[30px] block md:hidden lg:hidden xl-hidden" @click="closeSideBar">
            <FontAwesomeIcon :icon="['fas','times']" />
          </button>
          </div>
          <ul class="flex flex-col gap-[10px] md:flex lg-flex md:flex-row lg:flex-row md:gap-[20px] lg:gap-[20px] text-md">
            <li v-if="userAuthStore.authSuccess == false" @click="() => router.push({ path:'/login'})"><FontAwesomeIcon :icon="['fas','sign-in-alt']"/> Login</li>
            <li v-if="userAuthStore.authSuccess == false" @click="() => router.push({ path: '/sign-up'})"><FontAwesomeIcon :icon="['fas','user-plus']"/> Signup</li>
            <li class="flex font-bold items-center w-[160px] gap-[5px] " v-else >UserID: <span class="font-normal truncate">{{ userAuthStore.user?.uid }}</span><FontAwesomeIcon :icon="['fas','copy']"/></li>
             <li @click="pushToMovieType('tv','popular','1')"><FontAwesomeIcon :icon="['fas','tv']" /> Tv Shows</li>
             <li @click="pushToMovieType('movie','popular','1')"><FontAwesomeIcon :icon="['fas','film']" /> Movies</li>
             <li><FontAwesomeIcon :icon="['fas','blog']" /> Blogs</li>
            <li class="relative" @click="toggleDropdown">Genre<FontAwesomeIcon :icon="['fas','angle-down']"/>
            <div ref="showdropdown" class="relative bg-black block hidelist">
            <ul class=" text-gray-400 set-list-responsiveness md:bg-black  md:none lg:bg-black rounded-md px-4 pb-5 grid justify-between gap-5 absolute mt-5 text-sm md:px-5 lg:px-5">
              <li @click="ToGenreType('action','28','1')">Action</li>
              <li  @click="ToGenreType('adventure','12','1')">Adventures</li>
              <li  @click="ToGenreType('animation','16','1')">Animations</li>
              <li  @click="ToGenreType('comedy','35','1')">Comedy</li>
              <li  @click="ToGenreType('crime','80','1')">Crime</li>
              <li  @click="ToGenreType('drama','18','1')">Drama</li>
              <li  @click="ToGenreType('documentry','99','1')">Documentry</li>
              <li  @click="ToGenreType('family','10751','1')">Family</li>
              <li  @click="ToGenreType('fantacy','14','1')">Fantacy</li>
              <li  @click="ToGenreType('history','36','1')">History</li>
              <li  @click="ToGenreType('horor','27','1')">Horor</li>
              <li  @click="ToGenreType('music','10402','1')">Music</li>
              <li  @click="ToGenreType('mystery','9648','1')">Mystery</li>
              <li  @click="ToGenreType('romance','10749','1')">Romance</li>
              <li  @click="ToGenreType('science and fiction','878','1')">Science and Fiction</li>
              <li @click="ToGenreType('tv movie','10770','1')">TvMovies</li>
              <li @click="ToGenreType('thriller','53','1')">Thriller</li>
              <li @click="ToGenreType('war','10752','1')">War</li>
              <li @click="ToGenreType('western','37','1')">Western</li>
            </ul>
            </div>
            </li>
          </ul>
      </div>
      <!--- Mobile Show --->
      <div class="flex items-center gap-[6px] text-[20px]">
        <button @click="toggleSearchBar('search','1')"><FontAwesomeIcon :icon="['fas','search']" /></button>
        <button v-if="userAuthStore.authSuccess == false" @click="ifUserhasnotLogin"><FontAwesomeIcon :icon="['fas','user-plus']" /></button>
        <button v-if="userAuthStore.authSuccess == true" @click="toggleShowUserInfo"><FontAwesomeIcon :icon="['fas','user']" /></button>
        <button @click="routeUserToWatchList"><FontAwesomeIcon :icon="['fas','bookmark']"/></button>
      </div>
    </nav>
      <div @click="closeSideBar" ref="showShadow" class="hidden h-screen fixed w-full top-0 right-0 bg-[rgb(0,0,0,0.5)] cancelNavWithSpace">
          </div>
 </header>
 
 <!-- User Information -->
 <transition name="fade-in-form">
<div style="z-index: 200" ref="userInfo" v-if="showUserInfo"class="p-5 inset-0 h-screen grid justify-center items-center backdrop-blur-md w-full bg-[rgb(0,0,0,0.6)] fixed">
  <div class="grid max-w-[700px] bg-[rgb(0,0,0,0.3)] backdrop-blur-md text-white p-4 rounded-md" >
    <div class="grid m-0 justify-center">
       <div class=" h-[130px] p-4 border aspect-square rounded-full text-center content-center text-7xl">
      <FontAwesomeIcon :icon="['fas','user']"/>
    </div>
    </div>
        <div class=" mb-5 pl-5 pr-5 flex justify-between gap-7 mt-5">
      <div class="border w-full m-0 "></div>
      <div class="border w-full m-0 "></div>
    </div>
         <div class=" grid relative">
   <label for="userId" class="mb-1">UserId</label>
   <FontAwesomeIcon :icon="['fas','envelope']" class="absolute text-[20px] top-11 left-2"/>
   <FontAwesomeIcon :icon="['fas','copy']" @click="copyInfo(userAuthStore.user?.uid)" class="absolute top-11 text-[20px] left-[90%]"/>
   <input class="px-9 w-full rounded-md border py-3"type="text" :value="userAuthStore.user?.uid" disabled>
   </div>
      <div class=" mt-3 grid relative font-[poppins]" >
   <label for="userId" class="mb-1">UserEmail</label>
   <FontAwesomeIcon :icon="['fas','envelope']" class="absolute text-[20px] top-11 left-2"/>
   <FontAwesomeIcon :icon="['fas','copy']" @click="copyInfo(userAuthStore.user?.email)" class="absolute text-[20px] top-11 left-[90%]"/>
   <input class="px-9 rounded-md border py-3 w-full"type="text" :value="userAuthStore.user?.email" disabled>
   </div>
   <div class="flex justify-between  mt-3">
     <button @click="goHome" class="p-3 bg-[#3CB371] text-white rounded-md"><FontAwesomeIcon :icon="['fas','home']"/> Go home</button>
     <button @click="logOutUser" class="p-3 bg-red-500 text-white rounded-md"><FontAwesomeIcon :icon="['fas','sign-out']"/> Log Out</button>
  </div>
 <button @click="toggleShowUserInfo" class="text-3xl absolute top-5 right-3  text-white">
  <FontAwesomeIcon :icon="['fas','times']"/>
</button>
</div>  
</div>
</transition>
<transition name="fade-in-form">
  <div v-if="showSearchBar" class="fixed top-0 z-[1000] left-0 bg-[rgb(0,0,0,0.5)] backdrop-blur-md h-screen w-full">
    <div class="max-w-[500px] mx-auto my-0">
      <div class="text-right mt-3 mr-4 mb-2">
        <button @click="toggleSearchBar" class="text-white text-right text-4xl"><FontAwesomeIcon :icon="['fad','times']"/></button>
      </div>  <div class="relative p-3">
      <button class="text-gray-300 absolute top-[28px] text-xl left-5"><FontAwesomeIcon :icon="['fas','search']" /></button>
      <button @click="searchMovie('1')" class="px-3 py-2 bg-white text-black rounded-full ap absolute top-[21px] right-5"><FontAwesomeIcon :icon="['fas','search']" /></button>
      <input v-model="userInput" type="text" placeholder="enter your search keyword" class="rounded-full px-9 py-4 border border-white text-gray-300 w-full">
    </div>
  </div>
  </div>
</transition>
</template>
<style>
  /* Font Awesome Importing link */
  
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
 header {
 z-index: 999;
 font-family: "roboto condensed";
 font-weight: 700;
 }
 
.cancelNavWithSpace {
  z-index: 150;
}

.hidelist {
  display: none;
}

.fade-in-form-enter-active, .fade-in-form-leave-active {
  transition: opacity 0.5s ease, transform 0.3s ease;
  transform: translateY(0);
}
.fade-in-form-enter-from, .fade-in-form-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
@media (min-width: 768px) {
  .set-list-responsiveness {
    display: grid !important;
  }
}
  /* Mobile Responsive Nav */
    @media screen and (max-width: 767px) {
.set-list-responsiveness {
    display: grid !important;
    grid-template-columns: auto auto;
  }
  .hidelist {
  display: none;
  }
  .nav-list {
      backdrop-filter: blur(5px);
      position: absolute;
      width: 250px;
      top: 0;
      left: 0;
      background: rgb(0,0,0);
      height: 100vh;
      z-index: 300;
      transition: transform 0.3s ease, opacity 0.4s ease;
  }
  .nav-list-showing {
      transform: translateX(-100%);
  }
  }
</style>

