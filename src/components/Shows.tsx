import React, { useRef, useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';

const allShows = [
  {
    id: 10,
    date: 'PROXIMAMENTE',
    venue: '...',
    location: '???',
    ticketLink: '#',
    isSoldOut: false
  },
  {
    id: 9,
    date: 'MAY 10, 2025',
    venue: 'Liverpool Club',
    location: 'Palermo',
    ticketLink: '#',
    isSoldOut: true
  },
  {
    id: 8,
    date: 'ABR 05, 2025',
    venue: 'Six Bar',
    location: 'San Miguel',
    ticketLink: '#',
    isSoldOut: true
  },
  {
    id: 7,
    date: 'ABR 01, 2025',
    venue: 'La Casa Del Rock',
    location: 'San Miguel',
    ticketLink: '#',
    isSoldOut: true
  },
  {
    id: 6,
    date: 'MAR 07, 2025',
    venue: 'Sangre Negra',
    location: 'Pilar',
    ticketLink: '#',
    isSoldOut: true
  },
  {
    id: 5,
    date: 'FEB 22, 2025',
    venue: 'TERRAZAS',
    location: 'Pacheco',
    ticketLink: '#',
    isSoldOut: true
  },
  {
    id: 4,
    date: 'FEB 15, 2025',
    venue: 'Six Bar',
    location: 'San Miguel',
    ticketLink: '#',
    isSoldOut: true
  },
  {
    id: 3,
    date: 'DIC 14, 2024',
    venue: 'Sangre Negra',
    location: 'Pilar',
    ticketLink: '#',
    isSoldOut: true
  },
  {
    id: 2,
    date: 'SEP 13, 2024',
    venue: 'Sangre Negra',
    location: 'Pilar',
    ticketLink: '#',
    isSoldOut: true
  },
  {
    id: 1,
    date: 'JUN 21, 2024',
    venue: 'Sangre Negra',
    location: 'Pilar',
    ticketLink: '#',
    isSoldOut: true
  }
];

const Shows: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedShows, setDisplayedShows] = useState(allShows.slice(0, 5));
  const [showLoadMore, setShowLoadMore] = useState(true);

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

  const handleLoadMore = () => {
    const currentLength = displayedShows.length;
    const newShows = allShows.slice(currentLength, currentLength + 10);
    setDisplayedShows([...displayedShows, ...newShows]);
    
    if (currentLength + 10 >= allShows.length) {
      setShowLoadMore(false);
    }
  };

  return (
    <section 
      id="shows" 
      ref={sectionRef}
      className="py-24 bg-black relative"
    >
      {/* Background effect */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg')] bg-cover bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <h2 className={`text-3xl md:text-4xl font-bold mb-16 text-white text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
        }`}>
          PROXIMOS <span className="text-red-600">SHOWS</span>
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {displayedShows.map((show, index) => (
            <div 
              key={show.id}
              className={`bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-sm overflow-hidden transform transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between group">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                  <div className="mb-4 md:mb-0">
                    <Calendar size={20} className="text-red-600 hidden md:block" />
                    <div className="text-red-600 font-mono text-lg md:hidden">{show.date}</div>
                  </div>
                  
                  <div className="md:border-l md:border-zinc-700 md:pl-8">
                    <div className="text-red-600 font-mono text-lg hidden md:block">{show.date}</div>
                    <h3 className="text-white text-xl font-bold">{show.venue}</h3>
                    <p className="text-zinc-400">{show.location}</p>
                  </div>
                </div>
                
                <div className="mt-6 md:mt-0">
                  {show.isSoldOut ? (
                    <span className="inline-block bg-zinc-800 text-zinc-400 py-2 px-6 rounded-sm font-bold text-sm">
                      SOLD OUT
                    </span>
                  ) : (
                    <a 
                      href={show.ticketLink}
                      className="inline-block bg-transparent hover:bg-red-600 text-red-600 hover:text-white border-2 border-red-600 py-2 px-6 rounded-sm font-bold text-sm transition-colors duration-300"
                    >
                      TICKETS
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`mt-12 text-center space-y-6 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {showLoadMore && (
            <button 
              onClick={handleLoadMore}
              className="inline-block bg-transparent hover:bg-red-600 text-red-600 hover:text-white border-2 border-red-600 py-3 px-8 rounded-sm font-bold text-sm transition-colors duration-300 mx-2"
            >
              MAS SHOWS
            </button>
          )}
          <div>
            <a 
              href="#contact" 
              className="inline-block bg-red-600 text-white py-3 px-8 rounded-sm font-bold tracking-wide hover:bg-red-700 transition-colors"
            >
              CONTACTANOS PARA AGENDAR UNA FECHA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shows;