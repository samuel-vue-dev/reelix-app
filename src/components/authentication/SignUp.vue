<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from "vue-router";
  import { userAuth } from '@/AppState/auth';
  const userAuthStore = userAuth();
  const router = useRouter();
  const email = ref(null);
  const password = ref(null);
  const formCheckingError = ref(null);
  const passwordCheck = ref(null);
  const checkPassArea = ref(null);
  const authMessageError = computed(() => {
  if(userAuthStore.authErrorMessage == "Firebase: Error (auth/email-already-in-use).") {
  return "Email already exist";
  }
 else if(userAuthStore.authErrorMessage == "Firebase: Error (auth/invalid-crendential).") {
  return "Invalid user";
  }
  else if(userAuthStore.authErrorMessage == "Firebase: Error (auth/invalid-email).") {
  return "Invalid email";
  }
  else if(userAuthStore.authErrorMessage == "Firebase: Error (auth/user-not-found).") {
  return "User not found";
  }
  else if(userAuthStore.authErrorMessage == "Firebase: Error (auth/wrong-password).") {
  return "Wrong Password";
  }
   else {
  return "An Error Occured while authenticating";
  }
    })
  
  function checkPassword() {
  if(passwordCheck.value.checked == true) {
  checkPassArea.value.type = 'text';
  }
  else { 
  checkPassArea.value.type = 'password';
  }
  }
  
async function signup() {
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
    await userAuthStore.signUpAuth(email.value, password.value);
  }
}

</script>

<template>
  
    <div class=" font-[poppins] p-5 text-center h-screen w-full content-center bg-black text-white" v-if="userAuthStore.authSuccess == true">
    <div class="max-w-[500px] mx-auto my-0">
      <h2 class="text-2xl mb-3 font-[georgia]">Authentication Sucessfull</h2>
      <button @click="() => router.push({ path: '/'})" class="py-4 rounded-full border border-2 border-green-500 bg-[#3CB371] px-10"><FontAwesomeIcon :icon="['fas','arrow-left']"/> Go home</button>
   </div>
 </div>
  <div v-else>
  <!-- AppHeader -->
  <AppHeader  />
  <!-- Login status -->
  <!-- Signup form -->
  <div class="bg-[url('./assets/backgroundmovie.jpg')] font-[poppins] h-screen">
   <div class="bg-[rgb(0,0,0,0.8)] h-screen p-5 text-white content-center">
    <div class="max-w-[500px] backdrop-blur-md grid mx-auto my-0 border border-2 rounded-md p-4">
      <h2 class="text-center text-[25px] font-bold">SIGN UP</h2>
      <label form="email" class="text-[16px] mt-3 mb-1">Email</label>
      <div class="mx-0 my-0 relative">
        <FontAwesomeIcon :icon="['fas','user']" class="absolute absolute left-2 top-4"/>
        <input v-model="email" type="email" placeholder="youremail@gmail.com" class="py-3 px-8 w-full border border-2 rounded-md" >
      </div>
   <label for="password" class="text-[16px] mt-3 mb-1">Password</label>
      <div class="mx-0 my-0 relative">
        <FontAwesomeIcon :icon="['fas','lock']" class="absolute absolute left-2 top-4"/>
        <input type="checkbox" @click="checkPassword" ref="passwordCheck" class="absolute left-[90%] top-4">
        <input v-model="password" ref="checkPassArea" type="password" placeholder="yourpassword" class="py-3 px-8 w-full border border-2 rounded-md" >
      </div>
      <button @click="signup" class=" mt-3 mb-1 flex gap-[3px] justify-center p-3 rounded-md bg-[#3CB371]">Sign Up<div v-if="userAuthStore.authProcessing == true" class="spinner" ></div></button>
      <p class="text-[14px] text-center">Already have an account? <router-link to="/login" class="underline text-blue-500">Login</router-link></p>
      <transition name="fade">
        <div v-if="formCheckingError" class="bg-[rgb(255,255,255,0.8)] rounded-md backdrop-blur-sm p-3 ">
      <p class="text-red-500 text-center">{{ formCheckingError }}</p>
      </div>
</transition>
<transition name="fade">
  <div v-if="userAuthStore.authError"
       class="mt-2 text-red-500 text-center bg-[rgb(255,255,255,0.7)] backdrop-blur-md p-[10px] rounded-sm">
    <h3>
      <FontAwesomeIcon :icon="['fas', 'exclamation-triangle']" /> {{ authMessageError }}
    </h3>
  </div>
</transition>
    </div>
   </div>
  </div>
  </div>
</template>