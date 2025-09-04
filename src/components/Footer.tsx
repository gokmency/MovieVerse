import { Database, Sparkles } from 'lucide-react';

type AppMode = 'landing' | 'smash' | 'emoji' | 'geek' | 'blog' | 'contact';

interface FooterProps {
  onNavigate: (mode: AppMode) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 text-white/60 mb-2 sm:mb-0">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm">Made with love</span>
          </div>
          
          <div className="flex items-center space-x-4 text-xs text-white/40">
            <a href="https://x.com/grainzeth" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-white transition-colors">
              <Database className="w-3 h-3" />
              <span>Powered by GRAINZ</span>
            </a>
            <span>•</span>
            <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">Blog</button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Contact</button>
            <span>•</span>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}