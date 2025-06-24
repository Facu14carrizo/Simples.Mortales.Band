import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface PhoneVideoProps {
  videoSrc: string;
  alt: string;
}

const PhoneVideo: React.FC<PhoneVideoProps> = ({ videoSrc, alt }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      // Throttle time updates to improve performance
      if (video.currentTime % 0.5 < 0.1) {
        setCurrentTime(video.currentTime);
      }
    };
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Auto-play the video when component mounts
    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Auto-play prevented by browser');
      }
    };
    
    playVideo();

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          await videoRef.current.play();
        }
      } catch (error) {
        console.log('Playback error:', error);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative group">
      {/* Phone Frame */}
      <div className="relative mx-auto w-[280px] h-[560px] bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-[3rem] p-3 shadow-2xl border-4 border-gray-700 transform rotate-2 hover:rotate-0 transition-transform duration-300 hover:scale-105">
        
        {/* Phone Screen */}
        <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
          
          {/* Screen Content */}
          <div className="relative w-full h-full">
            
            {/* Video Container */}
            <div className="relative w-full h-full bg-black">
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
                onClick={togglePlay}
                autoPlay
                loop
                muted
                playsInline
              />
              
              {/* Play Button Overlay - Solo mostrar si no está reproduciéndose */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                    aria-label="Play video"
                    title="Play video"
                  >
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </button>
                </div>
              )}
              
              {/* Video Controls */}
              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleTimeChange}
                    className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer slider"
                    aria-label="Video progress"
                    title="Video progress"
                    style={{
                      background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) 100%)`
                    }}
                  />
                </div>
                
                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-red-400 transition-colors"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                      title={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-red-400 transition-colors"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                      title={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    
                    <span className="text-white text-sm font-mono">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  
                  <button 
                    className="text-white hover:text-red-400 transition-colors"
                    aria-label="Fullscreen video"
                    title="Fullscreen video"
                  >
                    <Maximize2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-60"></div>
        </div>
        
        {/* Phone Buttons */}
        <div className="absolute -right-1 top-20 w-1 h-8 bg-gray-600 rounded-l-full"></div>
        <div className="absolute -right-1 top-32 w-1 h-12 bg-gray-600 rounded-l-full"></div>
        <div className="absolute -right-1 top-48 w-1 h-12 bg-gray-600 rounded-l-full"></div>
        <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gray-600 rounded-r-full"></div>
      </div>
      
      {/* Phone Shadow */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-8 bg-black/20 rounded-full blur-xl"></div>
    </div>
  );
};

export default PhoneVideo; 