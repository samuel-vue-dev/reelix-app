import { defineStore } from 'pinia';
export const movieStore = defineStore('moviestores', {
  state: () => ({
    movieTitle: null,
    movieDescription: null,
    movieImage: null,
    homePageLoading: false,
    homePageError: false,
    isLoading: false, // Loading state for homepage displaying movies
    isError: false, // errorLoading for homepage displaying movies
    popularTvs: null,
    popularMovies: null,
    topRatedTvShows: null,
    topRatedMovies: null,
    airingToday: null,
    moviesType: [],
    moviesGenre: [],
    movieSearched: null,
  }),
  actions: {
 async fetchHomePageMovie() {
       this.homePageLoading = true;
       this.homePageError = false;
      const apikey = '647bddfa618b72605416f35a2833606d';
       const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?&api_key=${apikey}`;
       try {
         const response = await fetch(apiUrl);
         if(!response.ok) {
         this.homePageLoading = false;
         this.homePageError = true;
           return;
         }
         const data = await response.json();
          this.homePageLoading = false;
          this.homePageError = false;
         const fetchedMovie = data.results;
         const movieLength = Math.floor(Math.random()*fetchedMovie.length);
         this.movieTitle = fetchedMovie[movieLength].title;
         this.movieDescription = fetchedMovie[movieLength].overview;
         this.movieImage = fetchedMovie[movieLength].backdrop_path;
      }
      catch(error) {
          this.homePageLoading = false;
          this.homePageError = true;
       }
    },
    
     async  fetchForEachCategories(url,type) {
       this.isLoading = true;
       this.isError = false;
       try { 
         const response = await fetch(url);
         if(!response.ok) {
           this.isLoading = false;
           this.isError = true;
           alert('Network Error');
           return;
         }
         this.isLoading = false;
         this.isError = false;
         const data = await response.json();
         this[type] = data.results;
         }
         catch(error) {
           alert('fails to fetch');
           this.isLoading = false;
           this.isError = true;
           this[type] = null;
         }
  },
  async fetchForPopularTvShows() {
  const url = `https://api.themoviedb.org/3/tv/popular?&api_key=647bddfa618b72605416f35a2833606d`;
  await this.fetchForEachCategories(url, 'popularTvs');
  },
  
  async fetchForPopularMovies() {
      const url = `https://api.themoviedb.org/3/movie/popular?&api_key=647bddfa618b72605416f35a2833606d`;
      await this.fetchForEachCategories(url, 'popularMovies');
  },
  async fetchForTopRatedTvShows() {
      const url = `https://api.themoviedb.org/3/tv/top_rated?&api_key=647bddfa618b72605416f35a2833606d`;
      await this.fetchForEachCategories(url,'topRatedTvShows');
  },
  async fetchForTopRatedMovies() {
      const url = `https://api.themoviedb.org/3/movie/top_rated?&api_key=647bddfa618b72605416f35a2833606d`;
      await this.fetchForEachCategories(url,'topRatedMovies');
  },
  async fetchForAiringToday() {
      const url = `https://api.themoviedb.org/3/tv/airing_today?&api_key=647bddfa618b72605416f35a2833606d`;
      await this.fetchForEachCategories(url,'airingToday');
  },
  // Movie Type fetch Function
  async fetchForMovieTypes({ type, subType, page }) {
      this.isLoading = true;
      this.isError = false;
      const url = `https://api.themoviedb.org/3/${type}/${subType}?api_key=647bddfa618b72605416f35a2833606d&language=en-US&page=${page}`;     
      try {
      const response = await fetch(url);
      if(!response.ok) {
        this.isLoading = false;
        this.isError = true;
        alert("Network error");
        return;
      }
      const data = await response.json();
      this.moviesType = data.results;
      this.isLoading = false;
      this.isError = false;
      
  } catch(error) {
      this.isLoading = false;
      this.isError = true;
      this.moviesType = null;
  }
  },
  // Genre movie Fetch Function
  async fetchForGenreTypes({ genreId, pageId }) {
      this.isLoading = true;
      this.isError = false;
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=647bddfa618b72605416f35a2833606d&language=en-US&with_genres=${genreId}&page=${pageId}`;     
  try {
      const response = await fetch(url);
      if(!response.ok) {
        this.isLoading = false;
        this.isError = true;
        alert("Network error");
        return;
      }
       const data = await response.json();
       this.moviesGenre = data.results;
      this.isLoading = false;
      this.isError = false;
      
  } catch(error) {
      this.isLoading = false;
      this.isError = true;
      this.moviesGenre = null;
  }
  }, 
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
      this.movieSearched = data.results;
      this.isLoading = false;
      this.isError = false;
   } catch(error) {
       this.isLoading = false;
       this.isError = true;
       this.movieSearched = null;
   }
    },
    
  // Action Block ends here //===== //// ====
  }
})