import { Film } from 'lucide-react';

interface HeaderProps {
  onLogoClick: () => void;
}

export default function Header({ onLogoClick }: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={onLogoClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
          >
            <div className="relative">
              <Film className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              MovieVerse
            </h1>
          </button>
          
        </div>
      </div>
    </header>
  );
}