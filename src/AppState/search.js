import { defineStore } from 'pinia';
export const searchStore = defineStore('search', {
  state: () => ({
    movieSearch: [],
    isError: false,
    isLoading: false,
  }),
  actions: {
   async fetchSearchMovies({ searchInput, pageQuery }) {
      this.isLoading = true;
      this.isError = false;
     const url = `https://api.themoviedb.org/3/search/movie?&api_key=647bddfa618b72605416f35a2833606d&query=${searchInput}&page=${pageQuery}`;   
   try {
     const response = await fetch(url);
     if(!response.ok) {
       this.isLoading = false;
       this.isError = true;
       alert("Network Error")
       return;
     }
      const data = await response.json();
      this.movieSearch = data.results;
      this.isLoading = false;
      this.isError = false;
      
   } catch(error) {
       this.isLoading = false;
       this.isError = true;
   }
    }
    },
  })