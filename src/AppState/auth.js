import { defineStore } from 'pinia';
import { auth } from '../firebase';
import  { router } from '../router';
import { supabase } from '../utils/supabaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
export const userAuth = defineStore('user-authentication', {
  state: () => ({
    // state Declaring ==== ////
     user: JSON.parse(localStorage.getItem("userInfo")) || null,
     authProcessing: false,
     authError: false,
     authErrorMessage: null,
     authSuccess: JSON.parse(localStorage.getItem("authStatus")) || false,
     googleAuthErrorError: false,
  }),
  actions: {
    // Signup authentication for user ==== ////
  async  signUpAuth(email, password ) {
    
    // State Declaring Handling === ////
    this.authProcessing = true;
    this.authError = false;
    this.user = null;
    this.authErrorMessage = null;
    this.authSuccess = false;
      try {
        // State Declaring Handling === ////
        const userInput = await createUserWithEmailAndPassword(auth, email, password);
        const userdata = userInput.user;
        this.authProcessing = false;
        this.authError = false;
        this.user = userdata;
        this.authErrorMessage = null;
        this.authSuccess = true;
        localStorage.setItem("userInfo", JSON.stringify(userdata));
        localStorage.setItem("authStatus", true);
        setTimeout(() => {
        router.push({ path: "/"});
        }, 1000)

      } catch(error) {
        // Auth Error handling === ////
        this.authProcessing = false;
        this.authError = true;
        this.user = null;
        this.authErrorMessage = error.message;
        this.authSuccess = false;
      }
    },
    // login authentication for user ==== ////
  async  loginAuth(email, password) {
    // State Declaring Handling === ////
    this.authProcessing = true;
    this.authError = false;
    this.user = null;
    this.authErrorMessage = null;
    this.authSuccess = false;
      try {
        // State Declaring Handling === ////
        const userInput = await signInWithEmailAndPassword(auth, email, password);
        const userdata = userInput.user;
        this.authProcessing = false;
        this.authError = false;
        this.user = userdata;
        this.authErrorMessage = null;
        this.authSuccess = true;
        localStorage.setItem("userInfo", JSON.stringify(userdata));
        localStorage.setItem("authStatus", true);
        setTimeout(() => {
        router.push({ path: "/"});
        }, 1000)
  } catch(error) {
        // Auth Error handling === ////
        this.authProcessing = false;
        this.authError = true;
        this.user = null;
        this.authErrorMessage = error.message;
        this.authSuccess = false;
      }
    },
 async signInWithGoogle() {
   this.authProcessing = true;
   this.googleAuthError = false;
      try {
        const provider = new GoogleAuthProvider();
        const result =await signInWithPopup(auth, provider);
        const userdata = result.user;
        this.user = userdata;
        this.authSuccess = true;
        this.authProcessing = false;
        this.googleAuthError = 
        localStorage.setItem("userInfo", JSON.stringify(userdata));
        localStorage.setItem("authStatus", true);
        setTimeout(() => {
        router.push({ path: "/"});
        }, 1000)

      }catch(error){
        this.authProcessing = false;
        this.googleAuthError = true;
        setTimeout(() => {
          this.googleAuthError = false;
        }, 4000)
      }
    },
    logOut() {
        this.authProcessing = false;
        this.authError = false;
        this.user = null;
        this.authErrorMessage =null;
        this.authSuccess = false;
        localStorage.setItem("authStatus", false);
        localStorage.setItem('userInfo', null);
        router.push({ path: "/"})
    }
  }
})