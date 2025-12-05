<script setup>
  // IMPORTS =========== /////
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { userAuth } from "@/AppState/auth";

const router = useRouter();
const userAuthStore = userAuth();
const ifGoogleAuthError = computed(() => userAuthStore.googleAuthError);

// Vue Models ========= //////
const email = ref(null);
const password = ref(null);
const formCheckingError = ref(null);

const passwordCheck = ref(null);
const checkPassArea = ref(null);

// Auth Error Messages ===========  //////
const authMessageError = computed(() => {
  if (userAuthStore.authErrorMessage == "Firebase: Error (auth/invalid-credential).") {
    return "Invalid Credential";
  } else if (userAuthStore.authErrorMessage == "Firebase: Error (auth/invalid-email).") {
    return "Invalid email";
  } else if (userAuthStore.authErrorMessage == "Firebase: Error (auth/user-not-found).") {
    return "User not found";
  } else if (userAuthStore.authErrorMessage == "Firebase: Error (auth/wrong-password).") {
    return "Wrong Password";
  } else {
    return "An Error Occured while authenticating";
  }
});

// Check Field Password Instance ======== //////
function checkPassword() {
  if (passwordCheck.value.checked) {
    checkPassArea.value.type = "text";
  } else {
    checkPassArea.value.type = "password";
  }
}

// Login Auth ======== //////
async function login() {
  if (!email.value && !password.value) {
    userAuthStore.authError = false;
    formCheckingError.value = "Both fields are required";
  } else if (!email.value) {
    userAuthStore.authError = false;
    formCheckingError.value = "Email field is required";
  } else if (!password.value) {
    userAuthStore.authError = false;
    formCheckingError.value = "Password field is required";
  } else {
    formCheckingError.value = null;
    await userAuthStore.loginAuth(email.value, password.value);
  }
}

// signInWithGoogle Auth ========== ///////
async function signWithGoogle() {
  await userAuthStore.signInWithGoogle();
}

// onMounted ======== ////////////
onMounted(() => {
  if (userAuthStore.authSuccess == true) {
    router.push({ path: "/" });
  } else {
    router.push({ path: "/login" });
  }
});
</script>

<template>
  <!-- if user has Login -->
  <div
    v-if="userAuthStore.authSuccess == true"
    class="font-[poppins] p-5 text-center h-screen w-full content-center bg-black text-white"
  >
    <div class="max-w-[500px] mx-auto my-0">
      <h2 class="text-2xl mb-3 font-[georgia]">You have login.</h2>

      <button
        @click="() => router.push({ path: '/' })"
        class="p-4 rounded-full border border-2 border-green-500 bg-[#3CB371]"
      >
        <FontAwesomeIcon :icon="['fas', 'arrow-left']" /> Go home
      </button>
    </div>
  </div>

  <div v-else>
    <!-- if user hasn't login -->
    <AppHeader />

    <div class="bg-[url('./assets/backgroundmovie.jpg')] font-[poppins] h-screen">
      <div class="bg-[rgb(0,0,0,0.8)] h-screen p-5 text-white content-center">
        <div class="max-w-[500px] border border-white border-2 grid mx-auto my-0 rounded-md p-4">
          <h2 class="text-center text-[25px] font-bold">LOGIN</h2>

          <!-- Email Field -->
          <label class="text-[16px] mt-3 mb-1">Email</label>
          <div class="relative">
            <FontAwesomeIcon :icon="['fas', 'user']" class="absolute left-2 top-4" />
            <input
              v-model="email"
              type="email"
              placeholder="youremail@gmail.com"
              class="py-3 px-8 w-full border border-2 rounded-md"
            />
          </div>

          <!-- Password Field -->
          <label class="text-[16px] mt-3 mb-1">Password</label>
          <div class="relative">
            <FontAwesomeIcon :icon="['fas', 'lock']" class="absolute left-2 top-4" />

            <input
              type="checkbox"
              @click="checkPassword"
              ref="passwordCheck"
              class="absolute left-[90%] top-4"
            />

            <input
              v-model="password"
              ref="checkPassArea"
              type="password"
              placeholder="yourpassword"
              class="py-3 px-8 w-full border border-2 rounded-md"
            />
          </div>

          <!-- Login Btn -->
          <button
            @click="login"
            class="mt-3 mb-1 flex gap-[3px] justify-center p-3 rounded-md bg-[#3CB371]"
          >
            Login
            <div
              v-if="userAuthStore.authProcessing == true"
              class="spinner border border-6 border-[rgb(255,255,255,0.3)] border-t-white h-[25px] w-[25px] rounded-full"
            ></div>
          </button>

          <p class="text-[14px] text-center">
            Not account Registered yet?
            <router-link to="/sign-up" class="underline text-blue-500">SignUp</router-link>
          </p>

          <!-- SignInWithGoogle -->
          <button
            @click="signWithGoogle"
            class="mt-2 p-3 bg-white text-black rounded-md flex justify-center items-center gap-1"
          >
            <img src="@/assets/googleicon.png" class="w-[20px] h-[20px]" />
            Continue With Google
            <div v-if="userAuthStore.authProcessing"
              class="spinner border border-6 border-[rgb(0,0,0,0.3)] border-t-black h-[25px] w-[25px] rounded-full"
            ></div>
          </button>

          <!-- Form Error -->
          <transition name="fade">
            <div
              v-if="formCheckingError"
              class="bg-[rgb(255,255,255,0.8)] rounded-md backdrop-blur-sm p-3 mt-2"
            >
              <p class="text-red-500 text-center">{{ formCheckingError }}</p>
            </div>
          </transition>

          <!-- Auth Error -->
          <transition name="fade">
            <div
              v-if="userAuthStore.authError"
              class="mt-2 text-red-500 text-center bg-[rgb(255,255,255,0.7)] backdrop-blur-md p-[10px] rounded-sm"
            >
              <h3>
                <FontAwesomeIcon :icon="['fas', 'exclamation-triangle']" />
                {{ authMessageError }}
              </h3>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
  <!-- Goggle Auth Error UI -->
  <transition name="slide-in">
    <div v-show="ifGoogleAuthError" class="absolute bottom-5 w-full ">
      <div class="grid justify-center p-5">
       <div class="bg-[rgb(255,255,255,0.8)] text-red-500 rounded-md px-5 py-2">
         <p class="text-md"><FontAwesomeIcon :icon="['fas','info-circle']"/> Fail to Sigin In, Try again Later.</p>
       </div>
    </div>
   </div>
 </transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>