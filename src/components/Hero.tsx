import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section 
      id="home" 
      className="h-screen relative flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('https://cdn.wallpapersafari.com/2/15/bpKVyB.jpg')] bg-cover bg-center opacity-100 mix-blend-overlay"></div>
      
      {/* Animated noise overlay */}
      <div className="absolute inset-0 bg-[url('https://cdn.wallpapersafari.com/2/15/bpKVyB.jpg')] bg-cover opacity-80 mix-blend-overlay"></div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 
          className={`text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-white tracking-tight transition-all duration-1000 ${
            loaded ? 'transform-none opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <span className="text-red-600">SIMPLES</span> MORTALES
        </h1>
        
        <p 
          className={`text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
            loaded ? 'transform-none opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Liberando el poder puro y los screamers de Deftones a través de nuestras presentaciones tributo
        </p>
        
        <div 
          className={`transition-all duration-1000 delay-500 ${
            loaded ? 'transform-none opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <a 
            href="#music" 
            className="inline-block bg-red-600 text-white py-3 px-8 rounded-sm font-bold tracking-wide hover:bg-red-700 transition-colors duration-300 mx-2 my-2"
          >
            CANCIONES
          </a>
          <a 
            href="#shows" 
            className="inline-block bg-transparent text-white border-2 border-white py-3 px-8 rounded-sm font-bold tracking-wide hover:bg-white/10 transition-colors duration-300 mx-2 my-2"
          >
            PROXIMOS SHOWS
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white/70 hover:text-white transition-colors duration-300">
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};

export default Hero;