import { defineStore } from 'pinia';
export const movieDetails = defineStore('movieDetails', {
  state: () => ({
    isLoading: false,
    isError: false,
    watchDetails: [],
  }),
actions: {
  async fetchMovieDetails({ movieType, movieId}) {
    this.isLoading = true;
    this.isError = false;
    const url = `https://api.themoviedb.org/3/${movieType}/${movieId}?&api_key=647bddfa618b72605416f35a2833606d&append_to_response=credits,videos,reviews`;
    try {
      const response = await fetch(url);
      if(!response.ok) {
        this.isLoading = null;
        this.isError = true;
        return;
      }
     const data = await response.json();
        this.watchDetails = data;
       this.isLoading = false;
       this.isError = false;
    }catch(error) {
      this.watchDetails = null;
      this.isLoading = false;
      this.isError = false;
    }
  }
}
})