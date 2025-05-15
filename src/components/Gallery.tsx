import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg',
    alt: 'Live concert performance'
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    alt: 'Band performing on stage'
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    alt: 'Drummer in action'
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg',
    alt: 'Concert atmosphere'
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg',
    alt: 'Crowd at a rock concert'
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg',
    alt: 'Band backstage'
  }
];

const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="py-24 bg-zinc-900"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className={`text-3xl md:text-4xl font-bold mb-16 text-white text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-red-600">GALLERY</span>
        </h2>

        <div className="relative">
          {/* Navigation Buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Gallery Images */}
          <div 
            ref={scrollRef}
            className={`flex space-x-4 overflow-x-auto scrollbar-hide pb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* IE/Edge */
            }}
          >
            {galleryImages.map((image, index) => (
              <div 
                key={image.id}
                className="flex-shrink-0 w-[280px] md:w-[380px] group cursor-pointer overflow-hidden rounded-sm"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="aspect-[4/3] object-cover w-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4">
                      <p className="text-white text-sm">{image.alt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`mt-12 text-center transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <a 
            href="#" 
            className="inline-block border-2 border-white text-white py-3 px-8 rounded-sm font-bold hover:bg-white/10 transition-colors"
          >
            VIEW FULL GALLERY
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;