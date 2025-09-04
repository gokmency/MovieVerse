import { Movie } from '../types/movie';

const SMASH_LIST_KEY = 'movieverse_smash_list';
const GAME_SCORES_KEY = 'movieverse_game_scores';

export const storage = {
  getSmashList(): Movie[] {
    const stored = localStorage.getItem(SMASH_LIST_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  addToSmashList(movie: Movie): void {
    const currentList = this.getSmashList();
    const exists = currentList.find(m => m.id === movie.id);
    
    if (!exists) {
      currentList.push(movie);
      localStorage.setItem(SMASH_LIST_KEY, JSON.stringify(currentList));
    }
  },

  removeFromSmashList(movieId: number): void {
    const currentList = this.getSmashList();
    const filtered = currentList.filter(m => m.id !== movieId);
    localStorage.setItem(SMASH_LIST_KEY, JSON.stringify(filtered));
  },

  isInSmashList(movieId: number): boolean {
    const smashList = this.getSmashList();
    return smashList.some(m => m.id === movieId);
  },

  clearSmashList(): void {
    localStorage.removeItem(SMASH_LIST_KEY);
  },

  getGameScore(gameType: string) {
    const scores = localStorage.getItem(`${GAME_SCORES_KEY}_${gameType}`);
    return scores ? JSON.parse(scores) : { correct: 0, total: 0, streak: 0 };
  },

  saveGameScore(gameType: string, score: { correct: number; total: number; streak: number }) {
    localStorage.setItem(`${GAME_SCORES_KEY}_${gameType}`, JSON.stringify(score));
  },
};