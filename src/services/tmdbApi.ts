const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
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

  async getTrendingMovies(language: string = 'en-US') {
    const response = await fetch(`${BASE_URL}/trending/movie/week?language=${language}`, { headers });
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

  async getDiscoverMovies(filters: { genre?: string; year?: number; rating?: number, page?: number, language?: string, originalLanguage?: string, releaseDateGte?: string, releaseDateLte?: string } = {}) {
    let url = `${BASE_URL}/discover/movie?sort_by=popularity.desc&language=${filters.language || 'en-US'}`;
    
    if (filters.genre) url += `&with_genres=${filters.genre}`;
    if (filters.year) url += `&primary_release_year=${filters.year}`;
    if (filters.rating) url += `&vote_average.gte=${filters.rating}`;
    if (filters.page) url += `&page=${filters.page}`;
    if (filters.originalLanguage) url += `&with_original_language=${filters.originalLanguage}`;
    if (filters.releaseDateGte) url += `&primary_release_date.gte=${filters.releaseDateGte}`;
    if (filters.releaseDateLte) url += `&primary_release_date.lte=${filters.releaseDateLte}`;

    const response = await fetch(url, { headers });
    return response.json();
  },

  async getMovieGenres() {
    const response = await fetch(`${BASE_URL}/genre/movie/list`, { headers });
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