import { Heart, Gamepad2, Info } from 'lucide-react';

interface LandingPageProps {
  onModeSelect: (mode: 'smash' | 'emoji' | 'geek') => void;
}

export default function LandingPage({ onModeSelect }: LandingPageProps) {
  return (
    <div className="h-screen flex">
      {/* Smash or Pass Panel */}
      <div 
        onClick={() => onModeSelect('smash')}
        className="flex-1 relative group cursor-pointer overflow-hidden transition-all duration-700 hover:flex-[1.2]"
      >
        {/* Video Background */}
        <div className="absolute inset-0 bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
          >
            <source src="/video31.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-center p-8">
          <div className="transform transition-all duration-500 group-hover:scale-110">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-2xl">
              <Heart className="w-10 h-10 text-black" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Smash or Pass
            </h2>
            
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <p className="text-white/90 text-lg md:text-xl max-w-xs leading-relaxed">
                Discover your next favorite movie through quick decisions
              </p>
              <div className="w-16 h-0.5 bg-white mx-auto mt-4"></div>
            </div>
          </div>
        </div>
        
        {/* Border */}
        <div className="absolute right-0 top-0 w-px h-full bg-white/20"></div>
      </div>

      {/* Emoji Guess Panel */}
      <div 
        onClick={() => onModeSelect('emoji')}
        className="flex-1 relative group cursor-pointer overflow-hidden transition-all duration-700 hover:flex-[1.2]"
      >
        {/* Video Background */}
        <div className="absolute inset-0 bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
          >
            <source src="/video32.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-center p-8">
          <div className="transform transition-all duration-500 group-hover:scale-110">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-2xl">
              <Gamepad2 className="w-10 h-10 text-black" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Emoji Guess
            </h2>
            
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <p className="text-white/90 text-lg md:text-xl max-w-xs leading-relaxed">
                Test your movie knowledge with emoji puzzles
              </p>
              <div className="w-16 h-0.5 bg-white mx-auto mt-4"></div>
            </div>
          </div>
        </div>
        
        {/* Borders */}
        <div className="absolute left-0 top-0 w-px h-full bg-white/20"></div>
        <div className="absolute right-0 top-0 w-px h-full bg-white/20"></div>
      </div>

      {/* Geek Info Panel */}
      <div 
        onClick={() => onModeSelect('geek')}
        className="flex-1 relative group cursor-pointer overflow-hidden transition-all duration-700 hover:flex-[1.2]"
      >
        {/* Video Background */}
        <div className="absolute inset-0 bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
          >
            <source src="/video33.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center text-center p-8">
          <div className="transform transition-all duration-500 group-hover:scale-110">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-2xl">
              <Info className="w-10 h-10 text-black" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Geek Info
            </h2>
            
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <p className="text-white/90 text-lg md:text-xl max-w-xs leading-relaxed">
                Dive deep into movie trivia and details
              </p>
              <div className="w-16 h-0.5 bg-white mx-auto mt-4"></div>
            </div>
          </div>
        </div>
        
        {/* Border */}
        <div className="absolute left-0 top-0 w-px h-full bg-white/20"></div>
      </div>
    </div>
  );
}