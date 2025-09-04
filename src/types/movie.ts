export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  production_countries: { name: string }[];
  credits?: {
    cast: CastMember[];
  };
  trivia?: string[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface EmojiGame {
  id: string;
  emojis: string;
  movie: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GameScore {
  correct: number;
  total: number;
  streak: number;
}