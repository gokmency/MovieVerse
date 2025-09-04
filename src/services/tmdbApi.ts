const API_KEY = '9d917807280cd68b2dc9a7c48d5aafec';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDkxNzgwNzI4MGNkNjhiMmRjOWE3YzQ4ZDVhYWZlYyIsIm5iZiI6MTczOTM4NjM5NS4zODUsInN1YiI6IjY3YWNlZTFiNTMzNTNmOWJiYTM2ZDY1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2pJJ-jWNv8sBkSuKWP5qcGX3T8lCh1e6D9A4aztzomY';
const BASE_URL = 'https://api.themoviedb.org/3';

const headers = {
  'Authorization': `Bearer ${ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
};

export const tmdbApi = {
  async getPopularMovies(page: number = 1) {
    const response = await fetch(`${BASE_URL}/movie/popular?page=${page}`, { headers });
    return response.json();
  },

  async getTrendingMovies() {
    const response = await fetch(`${BASE_URL}/trending/movie/week`, { headers });
    return response.json();
  },

  async searchMovies(query: string) {
    const response = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`, { headers });
    return response.json();
  },

  async getMovieDetails(movieId: number) {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?append_to_response=credits`, { headers });
    return response.json();
  },

  async getDiscoverMovies(filters: { genre?: string; year?: number; rating?: number } = {}) {
    let url = `${BASE_URL}/discover/movie?sort_by=popularity.desc`;
    
    if (filters.genre) url += `&with_genres=${filters.genre}`;
    if (filters.year) url += `&year=${filters.year}`;
    if (filters.rating) url += `&vote_average.gte=${filters.rating}`;
    
    const response = await fetch(url, { headers });
    return response.json();
  },

  getPosterUrl(posterPath: string | null, size: string = 'w500') {
    if (!posterPath) return 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop';
    return `https://image.tmdb.org/t/p/${size}${posterPath}`;
  },

  getBackdropUrl(backdropPath: string | null) {
    if (!backdropPath) return 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
    return `https://image.tmdb.org/t/p/w1280${backdropPath}`;
  },
};