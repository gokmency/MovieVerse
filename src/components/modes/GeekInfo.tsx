import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Star, Calendar, Clock, Heart, Users, Globe, DollarSign } from 'lucide-react';
import { Movie, MovieDetails } from '../../types/movie';
import { tmdbApi } from '../../services/tmdbApi';
import { storage } from '../../utils/storage';

interface GeekInfoProps {
  onBack: () => void;
}

export default function GeekInfo({ onBack }: GeekInfoProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [smashList, setSmashList] = useState<Movie[]>([]);

  useEffect(() => {
    setSmashList(storage.getSmashList());
  }, []);

  const searchMovies = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      const response = await tmdbApi.searchMovies(searchQuery);
      setSearchResults(response.results || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectMovie = async (movie: Movie) => {
    try {
      setLoading(true);
      const details = await tmdbApi.getMovieDetails(movie.id);
      setSelectedMovie(details);
      setSearchResults([]);
    } catch (error) {
      console.error('Failed to load movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToSmashList = () => {
    if (selectedMovie) {
      storage.addToSmashList(selectedMovie);
      setSmashList(storage.getSmashList());
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Geek Info</h2>
            <p className="text-white/60">Deep dive into movie details</p>
          </div>

          <div className="text-white/60 text-sm">
            Smash List: {smashList.length}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchMovies()}
              placeholder="Search for any movie..."
              className="w-full bg-white text-black px-4 py-3 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-black/60" />
            <button
              onClick={searchMovies}
              className="absolute right-2 top-2 bg-black hover:bg-black/80 text-white px-4 py-1.5 rounded-lg transition-colors text-sm font-medium"
            >
              Search
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/60">Loading...</p>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && !selectedMovie && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Search Results</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {searchResults.slice(0, 10).map((movie) => (
                <button
                  key={movie.id}
                  onClick={() => selectMovie(movie)}
                  className="bg-white rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 group text-left shadow-lg"
                >
                  <img
                    src={tmdbApi.getPosterUrl(movie.poster_path)}
                    alt={movie.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="text-black font-medium text-sm line-clamp-2 group-hover:text-black/70 transition-colors">
                      {movie.title}
                    </h4>
                    <p className="text-black/60 text-xs mt-1">
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Movie Details */}
        {selectedMovie && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-64 md:h-80">
                <img
                  src={tmdbApi.getBackdropUrl(selectedMovie.backdrop_path)}
                  alt={selectedMovie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/60 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Poster */}
                  <div className="flex-shrink-0">
                    <img
                      src={tmdbApi.getPosterUrl(selectedMovie.poster_path, 'w342')}
                      alt={selectedMovie.title}
                      className="w-48 h-72 object-cover rounded-xl mx-auto md:mx-0"
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 md:mb-0">
                        {selectedMovie.title}
                      </h1>
                      
                      <button
                        onClick={addToSmashList}
                        disabled={storage.isInSmashList(selectedMovie.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                          storage.isInSmashList(selectedMovie.id)
                            ? 'bg-black/30 text-black/60 cursor-not-allowed'
                            : 'bg-black hover:bg-black/80 text-white hover:scale-105'
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                        <span>{storage.isInSmashList(selectedMovie.id) ? 'In Smash List' : 'Add to Smash List'}</span>
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-black/5 rounded-lg p-3 text-center border border-black/10">
                        <Star className="w-5 h-5 text-black mx-auto mb-1" />
                        <div className="text-black font-semibold">{selectedMovie.vote_average.toFixed(1)}</div>
                        <div className="text-black/60 text-xs">Rating</div>
                      </div>
                      
                      <div className="bg-black/5 rounded-lg p-3 text-center border border-black/10">
                        <Calendar className="w-5 h-5 text-black mx-auto mb-1" />
                        <div className="text-black font-semibold">{new Date(selectedMovie.release_date).getFullYear()}</div>
                        <div className="text-black/60 text-xs">Year</div>
                      </div>
                      
                      <div className="bg-black/5 rounded-lg p-3 text-center border border-black/10">
                        <Clock className="w-5 h-5 text-black mx-auto mb-1" />
                        <div className="text-black font-semibold">{selectedMovie.runtime}</div>
                        <div className="text-black/60 text-xs">Minutes</div>
                      </div>
                      
                      <div className="bg-black/5 rounded-lg p-3 text-center border border-black/10">
                        <Globe className="w-5 h-5 text-black mx-auto mb-1" />
                        <div className="text-black font-semibold">{selectedMovie.production_countries[0]?.name.split(' ')[0] || 'N/A'}</div>
                        <div className="text-black/60 text-xs">Country</div>
                      </div>
                    </div>

                    {/* Overview */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-black mb-2">Overview</h3>
                      <p className="text-black/70 leading-relaxed">{selectedMovie.overview}</p>
                    </div>

                    {/* Genres */}
                    {selectedMovie.genres && selectedMovie.genres.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-black mb-2">Genres</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedMovie.genres.map((genre) => (
                            <span
                              key={genre.id}
                              className="bg-black/10 text-black px-3 py-1 rounded-full text-sm border border-black/20"
                            >
                              {genre.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Budget & Revenue */}
                    {(selectedMovie.budget > 0 || selectedMovie.revenue > 0) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedMovie.budget > 0 && (
                          <div className="bg-black/5 rounded-lg p-4 border border-black/10">
                            <div className="flex items-center space-x-2 mb-2">
                              <DollarSign className="w-4 h-4 text-black" />
                              <h4 className="text-black font-medium">Budget</h4>
                            </div>
                            <p className="text-black/70 font-semibold">{formatCurrency(selectedMovie.budget)}</p>
                          </div>
                        )}
                        
                        {selectedMovie.revenue > 0 && (
                          <div className="bg-black/5 rounded-lg p-4 border border-black/10">
                            <div className="flex items-center space-x-2 mb-2">
                              <DollarSign className="w-4 h-4 text-black" />
                              <h4 className="text-black font-medium">Revenue</h4>
                            </div>
                            <p className="text-black/70 font-semibold">{formatCurrency(selectedMovie.revenue)}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Cast */}
                {selectedMovie.credits?.cast && selectedMovie.credits.cast.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-black/10">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="w-5 h-5 text-black" />
                      <h3 className="text-xl font-semibold text-black">Cast</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {selectedMovie.credits.cast.slice(0, 12).map((actor) => (
                        <div key={actor.id} className="text-center">
                          <img
                            src={actor.profile_path 
                              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                              : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=185&h=278&fit=crop'
                            }
                            alt={actor.name}
                            className="w-full h-28 object-cover rounded-lg mb-2"
                          />
                          <p className="text-black text-sm font-medium line-clamp-1">{actor.name}</p>
                          <p className="text-black/60 text-xs line-clamp-1">{actor.character}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedMovie && searchResults.length === 0 && !loading && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white/60 mb-2">Search for Movies</h3>
            <p className="text-white/40">Enter a movie title to explore detailed information</p>
          </div>
        )}
      </div>
    </div>
  );
}