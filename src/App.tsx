import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import SmashOrPass from './components/modes/SmashOrPass';
import EmojiGuess from './components/modes/EmojiGuess';
import GeekInfo from './components/modes/GeekInfo';

type AppMode = 'landing' | 'smash' | 'emoji' | 'geek';

function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('landing');

  const navigateToMode = (mode: AppMode) => {
    setCurrentMode(mode);
  };

  const navigateHome = () => {
    setCurrentMode('landing');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative">
      {currentMode === 'landing' && <Header onLogoClick={navigateHome} />}
      
      <main className="flex-1">
        {currentMode === 'landing' && (
          <LandingPage onModeSelect={navigateToMode} />
        )}
        
        {currentMode === 'smash' && (
          <SmashOrPass onBack={navigateHome} />
        )}
        
        {currentMode === 'emoji' && (
          <EmojiGuess onBack={navigateHome} />
        )}
        
        {currentMode === 'geek' && (
          <GeekInfo onBack={navigateHome} />
        )}
      </main>

      {currentMode === 'landing' && <Footer />}
    </div>
  );
}

export default App;