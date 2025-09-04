import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Lightbulb, RotateCcw, Star } from 'lucide-react';
import { EmojiGame, GameScore } from '../../types/movie';
import { emojiGames } from '../../data/emojiGames';
import { storage } from '../../utils/storage';

interface EmojiGuessProps {
  onBack: () => void;
}

export default function EmojiGuess({ onBack }: EmojiGuessProps) {
  const [currentGame, setCurrentGame] = useState<EmojiGame | null>(null);
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState<GameScore>({ correct: 0, total: 0, streak: 0 });
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [usedGames, setUsedGames] = useState<Set<string>>(new Set());

  useEffect(() => {
    setScore(storage.getGameScore('emoji'));
    loadNewGame();
  }, []);

  const loadNewGame = () => {
    const availableGames = emojiGames.filter(game => !usedGames.has(game.id));
    
    if (availableGames.length === 0) {
      setGameOver(true);
      return;
    }

    const randomGame = availableGames[Math.floor(Math.random() * availableGames.length)];
    setCurrentGame(randomGame);
    setUserGuess('');
    setFeedback(null);
    setHintsUsed(0);
  };

  const submitGuess = () => {
    if (!currentGame || !userGuess.trim()) return;

    const isCorrect = userGuess.toLowerCase().trim() === currentGame.movie.toLowerCase();
    const newScore = {
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1,
      streak: isCorrect ? score.streak + 1 : 0
    };

    setScore(newScore);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    storage.saveGameScore('emoji', newScore);

    if (isCorrect) {
      setUsedGames(prev => new Set([...prev, currentGame.id]));
      setTimeout(() => {
        loadNewGame();
      }, 2000);
    }
  };

  const useHint = () => {
    if (hintsUsed < currentGame!.hints.length) {
      setHintsUsed(hintsUsed + 1);
    }
  };

  const resetGame = () => {
    setUsedGames(new Set());
    setGameOver(false);
    setScore({ correct: 0, total: 0, streak: 0 });
    storage.saveGameScore('emoji', { correct: 0, total: 0, streak: 0 });
    loadNewGame();
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Game Complete!</h2>
          <p className="text-white/70 mb-6">You've guessed all available movies!</p>
          
          <div className="bg-white rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Final Score</h3>
            <div className="space-y-2 text-black/70">
              <div className="flex justify-between">
                <span>Correct:</span>
                <span className="text-black font-semibold">{score.correct}</span>
              </div>
              <div className="flex justify-between">
                <span>Total:</span>
                <span>{score.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Accuracy:</span>
                <span className="text-black font-semibold">
                  {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={resetGame}
              className="w-full bg-white hover:bg-white/90 text-black py-3 px-6 rounded-xl transition-all duration-300 font-medium"
            >
              Play Again
            </button>
            <button
              onClick={onBack}
              className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-xl transition-colors border border-white/20"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-2xl mx-auto">
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
            <h2 className="text-2xl font-bold text-white">Emoji Guess</h2>
            <p className="text-white/60 text-sm">Decode the movie from emojis</p>
          </div>

          <button
            onClick={resetGame}
            className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Score Board */}
        <div className="bg-white rounded-xl p-4 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-black">{score.correct}</div>
              <div className="text-black/60 text-sm">Correct</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-black">{score.streak}</div>
              <div className="text-black/60 text-sm">Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-black">
                {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%
              </div>
              <div className="text-black/60 text-sm">Accuracy</div>
            </div>
          </div>
        </div>

        {/* Game Area */}
        {currentGame && (
          <div className="bg-white rounded-2xl p-8 text-center">
            {/* Emoji Display */}
            <div className="text-8xl mb-8 font-mono leading-none">
              {currentGame.emojis}
            </div>

            {/* Difficulty Badge */}
            <div className="flex justify-center mb-6">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                currentGame.difficulty === 'easy' ? 'bg-black text-white' :
                currentGame.difficulty === 'medium' ? 'bg-black/70 text-white' :
                'bg-black/50 text-white'
              }`}>
                {currentGame.difficulty.toUpperCase()}
              </span>
            </div>

            {/* Input */}
            <div className="mb-6">
              <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && submitGuess()}
                placeholder="Enter your guess..."
                className="w-full bg-black/5 text-black px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 transition-all border border-black/10"
                disabled={feedback === 'correct'}
              />
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={`mb-6 p-4 rounded-xl ${
                feedback === 'correct' 
                  ? 'bg-black/10 border border-black/20 text-black' 
                  : 'bg-black/5 border border-black/10 text-black/70'
              }`}>
                {feedback === 'correct' ? (
                  <div>
                    <p className="font-semibold mb-1">Correct! 🎉</p>
                    <p className="text-sm">The answer was: {currentGame.movie}</p>
                  </div>
                ) : (
                  <p>Not quite right. Try again!</p>
                )}
              </div>
            )}

            {/* Hints */}
            {hintsUsed > 0 && (
              <div className="mb-6 space-y-2">
                {currentGame.hints.slice(0, hintsUsed).map((hint, index) => (
                  <div key={index} className="bg-black/5 rounded-lg p-3 text-black/70 text-sm border border-black/10">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="w-4 h-4 text-black/60" />
                      <span>{hint}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {feedback !== 'correct' && (
                <>
                  <button
                    onClick={submitGuess}
                    disabled={!userGuess.trim()}
                    className="bg-black hover:bg-black/80 disabled:bg-black/30 text-white py-3 px-6 rounded-xl transition-all duration-300 disabled:cursor-not-allowed font-medium"
                  >
                    Submit Guess
                  </button>
                  
                  {hintsUsed < currentGame.hints.length && (
                    <button
                      onClick={useHint}
                      className="bg-white/10 hover:bg-white/20 text-black py-3 px-6 rounded-xl transition-colors flex items-center space-x-2 border border-black/20"
                    >
                      <Lightbulb className="w-4 h-4" />
                      <span>Hint ({hintsUsed}/{currentGame.hints.length})</span>
                    </button>
                  )}
                </>
              )}
              
              <button
                onClick={loadNewGame}
                className="bg-white/10 hover:bg-white/20 text-black py-3 px-6 rounded-xl transition-colors border border-black/20"
              >
                Next Movie
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}