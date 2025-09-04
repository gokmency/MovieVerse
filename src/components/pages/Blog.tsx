import { ArrowLeft } from 'lucide-react';

interface BlogProps {
  onBack: () => void;
}

export default function Blog({ onBack }: BlogProps) {
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Home</span>
        </button>
        <h1 className="text-4xl font-bold mb-8 text-center text-white">MovieVerse Blog</h1>
        
        <div className="space-y-12">
          <article className="bg-gray-900/50 p-6 rounded-lg border border-white/10">
            <h2 className="text-3xl font-bold mb-4 text-cyan-400">The Ultimate Guide to Movie Genres: From Action to Rom-Com</h2>
            <p className="text-white/80 mb-4">
              Ever wondered what makes an action movie different from a thriller, or a comedy from a rom-com? Understanding movie genres is key to discovering new films you'll love. In this guide, we'll break down the most popular movie genres, complete with definitions, key characteristics, and classic examples. Get ready to expand your cinematic horizons!
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white">1. Action</h3>
                <p className="text-white/70 ml-4">High-energy films characterized by thrilling stunts, epic fight scenes, and a fast-paced plot. The protagonist often faces a series of physical challenges, leading to a climactic showdown. <br /><strong>Keywords:</strong> action movies, stunts, fight scenes, adventure. <br /><strong>Examples:</strong> <em>Die Hard</em>, <em>The Dark Knight</em>, <em>Mad Max: Fury Road</em>.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">2. Comedy</h3>
                <p className="text-white/70 ml-4">Designed to make you laugh, comedies use humor to entertain. From slapstick to satire, this genre covers a wide range of humorous storytelling. <br /><strong>Keywords:</strong> comedy films, funny movies, humor, satire. <br /><strong>Examples:</strong> <em>Superbad</em>, <em>Bridesmaids</em>, <em>Monty Python and the Holy Grail</em>.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">3. Drama</h3>
                <p className="text-white/70 ml-4">Dramas are serious, plot-driven stories that portray realistic characters and life situations. They explore deep emotional themes, creating a powerful connection with the audience. <br /><strong>Keywords:</strong> drama films, emotional stories, character development. <br /><strong>Examples:</strong> <em>The Shawshank Redemption</em>, <em>Forrest Gump</em>, <em>Parasite</em>.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">4. Sci-Fi (Science Fiction)</h3>
                <p className="text-white/70 ml-4">Sci-fi films transport us to futuristic worlds, often exploring themes of technology, space exploration, and extraterrestrial life. These movies blend imagination with scientific concepts. <br /><strong>Keywords:</strong> sci-fi movies, futuristic films, space travel, aliens. <br /><strong>Examples:</strong> <em>Blade Runner</em>, <em>The Matrix</em>, <em>Star Wars</em>.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">5. Horror</h3>
                <p className="text-white/70 ml-4">Horror movies are designed to scare and thrill. They create a sense of fear and suspense through terrifying imagery, supernatural events, and psychological tension. <br /><strong>Keywords:</strong> horror films, scary movies, suspense, supernatural. <br /><strong>Examples:</strong> <em>The Shining</em>, <em>Get Out</em>, <em>Hereditary</em>.</p>
              </div>
            </div>
          </article>

          <article className="bg-gray-900/50 p-6 rounded-lg border border-white/10">
            <h2 className="text-3xl font-bold mb-4 text-cyan-400">How to Find Hidden Gems on Streaming Services</h2>
            <p className="text-white/80 mb-4">
              With thousands of movies available on streaming platforms, it's easy to get lost in a sea of popular blockbusters. But what about the hidden gems? These lesser-known films often offer unique stories and fresh perspectives. Here are our top tips for discovering your next favorite movie.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white">1. Dive into Subgenres</h3>
                <p className="text-white/70 ml-4">Don't just search for 'Comedy'—try more specific subgenres like 'dark comedy' or 'mockumentary.' The more specific you are, the more likely you are to find something new and interesting. <br /><strong>Keywords:</strong> movie subgenres, film discovery, streaming tips.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">2. Use Third-Party Discovery Tools</h3>
                <p className="text-white/70 ml-4">Apps and websites like MovieVerse's 'Smash or Pass' feature can help you find movies you wouldn't normally encounter. These tools use smart algorithms to suggest films based on your taste. <br /><strong>Keywords:</strong> movie discovery apps, film recommendations, MovieVerse.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">3. Follow Film Festivals</h3>
                <p className="text-white/70 ml-4">Many independent films that premiere at festivals like Sundance or Cannes eventually make their way to streaming services. Keep an eye on festival lineups to discover acclaimed movies before they go mainstream. <br /><strong>Keywords:</strong> film festivals, independent cinema, Sundance, Cannes.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">4. Explore Foreign Films</h3>
                <p className="text-white/70 ml-4">Don't let subtitles scare you away! International cinema offers a wealth of incredible stories. Platforms like Netflix and MUBI have extensive collections of foreign films waiting to be discovered. <br /><strong>Keywords:</strong> foreign films, international cinema, world cinema.</p>
              </div>
            </div>
          </article>

          <article className="bg-gray-900/50 p-6 rounded-lg border border-white/10">
            <h2 className="text-3xl font-bold mb-4 text-cyan-400">The Evolution of Cinema: A Journey Through Film History</h2>
            <p className="text-white/80 mb-4">
              Cinema has come a long way since its inception. From silent black-and-white films to the immersive CGI blockbusters of today, the evolution of filmmaking is a fascinating story. Join us on a journey through the pivotal moments in film history that have shaped the movies we love today.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white">1. The Silent Era (1890s-1920s)</h3>
                <p className="text-white/70 ml-4">The birth of cinema began with silent films, where storytelling was purely visual, relying on acting, music, and title cards. Pioneers like Charlie Chaplin and Buster Keaton became global icons without ever speaking a word on screen. <br /><strong>Keywords:</strong> silent films, film history, Charlie Chaplin, early cinema.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">2. The Golden Age of Hollywood (1930s-1950s)</h3>
                <p className="text-white/70 ml-4">The introduction of sound revolutionized the industry, leading to the Golden Age of Hollywood. This era was dominated by the studio system and saw the rise of iconic genres like musicals, gangster films, and classic monster movies. <br /><strong>Keywords:</strong> Golden Age of Hollywood, classic movies, studio system, talkies.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">3. The New Hollywood (1960s-1970s)</h3>
                <p className="text-white/70 ml-4">A new wave of filmmakers challenged the traditional studio system, creating more personal, director-driven films. This era, known as New Hollywood, produced some of the most critically acclaimed movies of all time. <br /><strong>Keywords:</strong> New Hollywood, director-driven films, 1970s cinema, film auteurs.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">4. The Blockbuster Era (1980s-Present)</h3>
                <p className="text-white/70 ml-4">Starting with films like <em>Jaws</em> and <em>Star Wars</em>, the blockbuster era changed the business of movies. High-concept plots, massive marketing campaigns, and spectacular special effects became the new standard for success. <br /><strong>Keywords:</strong> blockbuster movies, special effects, CGI, modern cinema.</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
