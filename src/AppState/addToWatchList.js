import { defineStore } from 'pinia';
import { db } from '../firebase'
import { addDoc, query, where, getDocs, collection, doc, deleteDoc, serverTimestamp, updateDoc } from 'firebase/firestore' 
import { userAuth } from '@/AppState/auth'
export const WatchList = defineStore('watchlist', {
  state: () => ({
    isLoading: false,
    isError: false,
    textLoader: "Add to Watch List",
    watchData: [],
    deletion: false,
  }),
  actions: {
  async addToWatchList({ postUrl, title, overview, year, Id, type }) {
  this.isLoading = true;
  this.isError = false;
  this.textLoader = "Adding...";

  const auth = userAuth();
  const userId = auth.user?.uid;
  if (!userId) return;
  try {
    const moviesRef = collection(db, `users/${userId}/movies`);
    const q = query(moviesRef, where("addId", "==", Id));
    const snap = await getDocs(q);
    if (!snap.empty) {
      this.isLoading = false;
      this.textLoader = "Already Added";
      return;
    }
    await addDoc(moviesRef, {
      addPoster: postUrl,
      addTitle: title,
      addOverview: overview,
      addYear: year,
      addId: Id,
      addType: type,
      addDate: Date.now(),
      watched: false,
    });

    this.isLoading = false;
    this.textLoader = "Added to Watch";

  } catch (error) {
    this.isLoading = false;
    this.isError = true;
    this.textLoader = "Failed";
  }
},
 async fetchWatchList() {
   this.isLoading = true;
   this.isError = false;
   const auth = userAuth();
   const userId = auth.user?.uid;
   if(!userId) return;
      try {
       const snapShot = await getDocs(collection(db, `users/${userId}/movies` ));
       this.watchData = snapShot.docs.map((docItem) => ({
         id: docItem.id,
         data: docItem.data(),
       }));
      this.isLoading = false;
      this.isError = false;
      }catch {
        this.isLoading = false;
        this.isError = true;
      }
    },
 async deleteAddedWatch({ watchId }) {
   const auth = userAuth();
    const userId = auth.user?.uid;
    if(!userId) return;
     try {
       await deleteDoc(doc(db, `users/${userId}/movies/${watchId}`));
       await this.fetchWatchList();
       this.deletion = true;
       setTimeout(() => {
         this.deletion = false;
       }, 4000)
     }catch(error) {
        this.isLoading = false;
        this.isError = true;
     }
    },
 async completedAddedWatched({ watchId }) {
      this.isLoading = true;
      this.Error = false;
      const auth = userAuth();
      const userId = auth.user?.uid;
      if(!userId) return;
      try {
        this.isLoading = true;
        this.isError = false;
        await updateDoc(doc(db, `users/${userId}/movies/${watchId}`), {
          watched: true,
      });
     await this.fetchWatchList();
      }catch(error) {
        this.isLoading = false;
        this.isError = true;
      }
    },
 async unCompletedAddedWatched({ watchId }) {
      this.isLoading = true;
      this.Error = false;
      const auth = userAuth();
      const userId = auth.user?.uid;
      if(!userId) return;
      try {
        this.isLoading = true;
        this.isError = false;
        await updateDoc(doc(db, `users/${userId}/movies/${watchId}`), {
          watched: false,
      });
     await this.fetchWatchList();
      }catch(error) {
        this.isLoading = false;
        this.isError = true;
      }
    }
  }
})