import { useState, useEffect } from 'react';
import { Heart, X, RotateCcw, List, Star, Calendar, ArrowLeft, Info } from 'lucide-react';
import { Movie } from '../../types/movie';
import { tmdbApi } from '../../services/tmdbApi';
import { storage } from '../../utils/storage';

interface Genre {
  id: number;
  name: string;
}

interface SmashOrPassProps {
  onBack: () => void;
  onGeekInfo: (movieId: number) => void;
}

export default function SmashOrPass({ onBack, onGeekInfo }: SmashOrPassProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showSmashList, setShowSmashList] = useState(false);
  const [smashList, setSmashList] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [discoveryMode, setDiscoveryMode] = useState<'discover' | 'trending'>('discover');
  const [languageOption, setLanguageOption] = useState<'any' | 'tr' | 'foreign'>('any');

  useEffect(() => {
    const fetchInitialData = async () => {
      await loadMovies();
      const genresResponse = await tmdbApi.getMovieGenres();
      setGenres(genresResponse.genres || []);
      setSmashList(storage.getSmashList());
    };
    fetchInitialData();
  }, []);

  const loadMovies = async (isNewFilter = false) => {
    try {
      setLoading(true);
      let response;
      const language = languageOption === 'tr' ? 'tr-TR' : 'en-US';
      const originalLanguage = languageOption === 'tr' ? 'tr' : (languageOption === 'foreign' ? '!tr' : undefined);

      if (discoveryMode === 'trending' && languageOption !== 'any') {
        const today = new Date();
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);
        const todayStr = today.toISOString().split('T')[0];
        const lastWeekStr = lastWeek.toISOString().split('T')[0];

        response = await tmdbApi.getDiscoverMovies({
          language: language,
          originalLanguage: originalLanguage,
          releaseDateGte: lastWeekStr,
          releaseDateLte: todayStr,
        });
      } else if (discoveryMode === 'trending') {
        response = await tmdbApi.getTrendingMovies(language);
      } else {
        const randomPage = Math.floor(Math.random() * 500) + 1;
        response = await tmdbApi.getDiscoverMovies({
          genre: selectedGenre,
          year: selectedYear ? parseInt(selectedYear) : undefined,
          page: randomPage,
          language: language,
          originalLanguage: originalLanguage,
        });
      }
      
      const validMovies = response.results?.filter((movie: Movie) => movie.poster_path) || [];

      if (isNewFilter) {
        setMovies(validMovies);
        setCurrentIndex(0);
      } else {
        setMovies(prevMovies => [...prevMovies, ...validMovies]);
      }

    } catch (error) {
      console.error('Failed to load movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSmash = () => {
    const movie = movies[currentIndex];
    if (movie) {
      storage.addToSmashList(movie);
      setSmashList(storage.getSmashList());
    }
    nextMovie();
  };

  const handlePass = () => {
    nextMovie();
  };

  const nextMovie = () => {
    if (currentIndex < movies.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      loadMovies(); // Load new batch when we run out
    }
  };

  const currentMovie = movies[currentIndex];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading movies...</p>
        </div>
      </div>
    );
  }

  if (showSmashList) {
    return (
      <div className="min-h-screen bg-black p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setShowSmashList(false)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Smash</span>
            </button>
            
            <h2 className="text-3xl font-bold text-white">Your Smash List</h2>
            
            {smashList.length > 0 ? (
              <button
                onClick={() => {
                  storage.clearSmashList();
                  setSmashList([]);
                }}
                className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 px-3 py-1 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            ) : (
              <div className="text-gray-400 text-sm">
                {smashList.length} movies
              </div>
            )}
          </div>

          {smashList.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No movies smashed yet!</p>
              <p className="text-gray-500">Go back and start swiping to build your list.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {smashList.map((movie) => (
                <div key={movie.id} className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 group">
                  <img
                    src={tmdbApi.getPosterUrl(movie.poster_path)}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">{movie.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-400 text-xs">{movie.vote_average.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onGeekInfo(movie.id)}
                          className="text-gray-500 hover:text-cyan-400 transition-colors"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            storage.removeFromSmashList(movie.id);
                            setSmashList(storage.getSmashList());
                          }}
                          className="text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Navigation */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowSmashList(true)}
            className="flex items-center space-x-2 bg-white hover:bg-white/90 text-black px-4 py-2 rounded-xl transition-colors font-medium"
          >
            <List className="w-4 h-4" />
            <span>Smash List ({smashList.length})</span>
          </button>
          
          <button
            onClick={() => loadMovies(true)}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-colors border border-white/20"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">New Movies</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 flex justify-center">
        <div className="bg-gray-800/50 backdrop-blur-sm p-2 rounded-xl flex items-center gap-4 border border-white/10">
          <div className="flex items-center bg-black/20 p-1 rounded-lg">
            <button onClick={() => setDiscoveryMode('discover')} className={`px-3 py-1 text-sm rounded-md ${discoveryMode === 'discover' ? 'bg-cyan-500 text-black' : 'text-white/70'}`}>Discover</button>
            <button onClick={() => setDiscoveryMode('trending')} className={`px-3 py-1 text-sm rounded-md ${discoveryMode === 'trending' ? 'bg-cyan-500 text-black' : 'text-white/70'}`}>Popular</button>
          </div>
          <div className="flex items-center bg-black/20 p-1 rounded-lg">
            <button onClick={() => setLanguageOption('any')} className={`px-3 py-1 text-sm rounded-md ${languageOption === 'any' ? 'bg-cyan-500 text-black' : 'text-white/70'}`}>Any</button>
            <button onClick={() => setLanguageOption('tr')} className={`px-3 py-1 text-sm rounded-md ${languageOption === 'tr' ? 'bg-cyan-500 text-black' : 'text-white/70'}`}>Turkish</button>
            <button onClick={() => setLanguageOption('foreign')} className={`px-3 py-1 text-sm rounded-md ${languageOption === 'foreign' ? 'bg-cyan-500 text-black' : 'text-white/70'}`}>Foreign</button>
          </div>
          {discoveryMode === 'discover' && (
            <>
              <div className="bg-black/20 p-1 rounded-lg">
                <select 
                  id="genre"
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="bg-transparent text-white border-0 focus:ring-0 text-sm"
                >
                  <option value="">All Genres</option>
                  {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  ))}
                </select>
              </div>
              <div className="bg-black/20 p-1 rounded-lg">
                <select 
                  id="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-transparent text-white border-0 focus:ring-0 text-sm"
                >
                  <option value="">Any Year</option>
                  {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </>
          )}
          <div className="w-px h-6 bg-white/10"></div>
          <button 
            onClick={() => loadMovies(true)}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-4 py-2 rounded-lg transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Movie Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        {currentMovie && (
          <div className="relative max-w-sm w-full">
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300">
              <div className="relative">
                <img
                  src={tmdbApi.getPosterUrl(currentMovie.poster_path, 'w780')}
                  alt={currentMovie.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white text-sm font-semibold">{currentMovie.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-black mb-2">{currentMovie.title}</h2>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="w-4 h-4 text-black/60" />
                  <span className="text-black/60 text-sm">
                    {new Date(currentMovie.release_date).getFullYear()}
                  </span>
                </div>
                
                <p className="text-black/70 text-sm leading-relaxed line-clamp-3">
                  {currentMovie.overview}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-8 mt-8">
              <button
                onClick={handlePass}
                className="group bg-black hover:bg-black/80 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110 border-2 border-white/20"
              >
                <X className="w-8 h-8 group-hover:rotate-12 transition-transform" />
              </button>
              
              <button
                onClick={handleSmash}
                className="group bg-white hover:bg-white/90 text-black p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <Heart className="w-8 h-8 group-hover:scale-125 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-center p-4">
        <div className="flex items-center justify-center space-x-2 text-gray-400">
          <span className="text-sm text-white/60">Movie {currentIndex + 1} of {movies.length}</span>
        </div>
      </div>
    </div>
  );
}