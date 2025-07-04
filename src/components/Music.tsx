import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

const tracks = [
  { id: 1, title: 'Be Quiet And Drive (Far Away)', album: 'Around The Fur', duration: '5:00' },
  { id: 2, title: 'Shovit (My Own Summer)', album: 'Around The Fur', duration: '3:35' },
  { id: 3, title: 'Change (In the House of Flies)', album: 'White Pony', duration: '5:00' },
  { id: 4, title: 'Bored', album: 'Adrenaline', duration: '4:06' },
  { id: 5, title: 'Digital Bath', album: 'White Pony', duration: '4:16' },
  { id: 6, title: 'Back To School', album: 'WHite Pony', duration: '3:58' },
  { id: 7, title: 'Root', album: 'Adrenaline', duration: '3:41' },
  { id: 8, title: 'Around The fur', album: 'Around The fur', duration: '3:32' },
  { id: 9, title: 'Headup', album: 'Around The fur', duration: '6:13' },
  { id: 10, title: '976 Evil', album: 'Diamond Eyes', duration: '4:33' },
  { id: 11, title: 'Beware', album: 'Saturday Night Wrist', duration: '6:01' },
  { id: 12, title: 'Bloody Cape', album: 'Deftones', duration: '3:36' },
  { id: 13, title: 'Engine No. 9', album: 'Adrenaline', duration: '3:25' },
  { id: 14, title: 'Kimdracula', album: 'Saturday Night Wrist', duration: '3:15' }
];

const Music: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const togglePlay = (trackId: number) => {
    if (currentTrack === trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(trackId);
      setIsPlaying(true);
    }
  };

  return (
    <section 
      id="music" 
      ref={sectionRef}
      className="py-24 bg-zinc-900 relative overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg')] bg-cover bg-center opacity-5"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <h2 className={`text-3xl md:text-4xl font-bold mb-16 text-white text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
        }`}>
          SET <span className="text-red-600">LIST</span>
        </h2>

        <div className={`bg-zinc-800/80 backdrop-blur-sm rounded-md overflow-hidden shadow-xl max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="p-4 bg-gradient-to-r from-red-900/40 to-zinc-800/40 border-b border-zinc-700">
            <div className="flex items-center space-x-4 text-white text-sm">
              <span className="w-12 text-center">#</span>
              <span className="flex-1">TITLE</span>
              <span className="hidden md:block w-32">ALBUM</span>
              <span className="w-16 text-right">TIME</span>
            </div>
          </div>
          
          <div className="divide-y divide-zinc-700/50">
            {tracks.map((track) => (
              <div 
                key={track.id}
                className={`p-4 flex items-center space-x-4 hover:bg-zinc-700/30 transition-colors cursor-pointer ${
                  currentTrack === track.id ? 'bg-zinc-700/50' : ''
                }`}
                onClick={() => togglePlay(track.id)}
              >
                <div className="w-12 text-center">
                  {currentTrack === track.id ? (
                    <button className="text-red-500 hover:text-red-400 transition-colors">
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                  ) : (
                    <span className="text-zinc-400">{track.id}</span>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-white font-medium truncate">{track.title}</h3>
                </div>
                <div className="hidden md:block w-32 text-zinc-400 text-sm truncate">
                  {track.album}
                </div>
                <div className="w-16 text-zinc-400 text-sm text-right">
                  {track.duration}
                </div>
              </div>
            ))}
          </div>
          
          {/* Player Controls */}
          <div className="p-4 bg-zinc-800 border-t border-zinc-700 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-zinc-400 hover:text-white transition-colors">
                <SkipBack size={18} />
              </button>
              <button 
                className="text-white bg-red-600 hover:bg-red-700 transition-colors rounded-full w-8 h-8 flex items-center justify-center"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button className="text-zinc-400 hover:text-white transition-colors">
                <SkipForward size={18} />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Volume2 size={16} className="text-zinc-400" />
              <div className="w-20 lg:w-32 bg-zinc-700 rounded-full h-1 overflow-hidden">
                <div className="bg-red-600 h-full w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`mt-10 text-center transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <a 
            href="https://music.youtube.com/channel/UCXQtyZ6gWbOYR5B8Sc2sr3g" 
            className="inline-block border-2 border-red-600 text-red-600 py-3 px-8 rounded-sm font-bold hover:bg-red-600 hover:text-white transition-colors duration-300"
          >
            MAS DEFTONES EN YT
          </a>
        </div>
      </div>
    </section>
  );
};

export default Music;