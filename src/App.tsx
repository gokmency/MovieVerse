import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import SmashOrPass from './components/modes/SmashOrPass';
import EmojiGuess from './components/modes/EmojiGuess';
import GeekInfo from './components/modes/GeekInfo';
import Blog from './components/pages/Blog';
import Contact from './components/pages/Contact';

type AppMode = 'landing' | 'smash' | 'emoji' | 'geek' | 'blog' | 'contact';

function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('landing');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const navigateToMode = (mode: AppMode) => {
    setSelectedMovieId(null); // Reset movie ID when changing modes
    setCurrentMode(mode);
  };

  const navigateToGeekInfo = (movieId: number) => {
    setSelectedMovieId(movieId);
    setCurrentMode('geek');
  };

  const navigateHome = () => {
    setCurrentMode('landing');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative">
      <Header onLogoClick={navigateHome} />
      
      <main className="flex-1">
        {currentMode === 'landing' && (
          <LandingPage onModeSelect={navigateToMode} />
        )}
        
        {currentMode === 'smash' && (
          <SmashOrPass onBack={navigateHome} onGeekInfo={navigateToGeekInfo} />
        )}
        
        {currentMode === 'emoji' && (
          <EmojiGuess onBack={navigateHome} />
        )}
        
        {currentMode === 'geek' && (
          <GeekInfo onBack={navigateHome} selectedMovieId={selectedMovieId} />
        )}

        {currentMode === 'blog' && <Blog onBack={navigateHome} />}

        {currentMode === 'contact' && <Contact onBack={navigateHome} />}
      </main>

      <Footer onNavigate={navigateToMode} />
    </div>
  );
}

export default App;