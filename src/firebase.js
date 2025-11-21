import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmjLGep-rvqWFf1SyV1JT2fGJaFAOs5S4",
  authDomain: "flix-watch-auth.firebaseapp.com",
  projectId: "flix-watch-auth",
  storageBucket: "flix-watch-auth.firebasestorage.app",
  messagingSenderId: "1087398951605",
  appId: "1:1087398951605:web:24293b638aeb4f3cbe9cfc",
  measurementId: "G-VLQLL32CQC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);