import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBJxgShqmYDwr3i9fOkUvxwjKciQ384uno",
  authDomain: "auth-and-store.firebaseapp.com",
  projectId: "auth-and-store",
  storageBucket: "auth-and-store.firebasestorage.app",
  messagingSenderId: "653814029286",
  appId: "1:653814029286:web:935071e0f5d1878dc61427",
  measurementId: "G-KYT8G4Y09S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
