import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const galleryImages = [
  {
    id: 1,
    src: 'src/resources/imgs/gallery/1.jpeg',
    alt: 'Live concert performance'
  },
  {
    id: 2,
    src: 'src/resources/imgs/gallery/3.jpeg',
    alt: 'Band performing on stage'
  },
  {
    id: 3,
    src: 'src/resources/imgs/gallery/4.jpeg',
    alt: 'Drummer in action'
  },
  {
    id: 4,
    src: 'src/resources/imgs/gallery/5.jpeg',
    alt: 'Concert atmosphere'
  },
  {
    id: 5,
    src: 'src/resources/imgs/gallery/6.jpeg',
    alt: 'Crowd at a rock concert'
  },
  {
    id: 6,
    src: 'src/resources/imgs/gallery/7.jpeg',
    alt: 'Heavy is the crown'
  }
];

const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchMove, setTouchMove] = useState({ x: 0, y: 0 });

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

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      setTouchMove({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8
        : scrollLeft + clientWidth * 0.8;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  const handleImageClick = (id: number) => {
    setSelectedImage(id);
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
  };

  const getParallaxStyle = () => {
    if (selectedImage) {
      const x = (mousePosition.x - 0.5) * 40;
      const y = (mousePosition.y - 0.5) * 40;
      return {
        transform: `translate(${x}px, ${y}px)`,
        transition: 'transform 0.1s ease-out'
      };
    }
    return {};
  };

  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="py-24 bg-zinc-900 relative overflow-hidden"
    >
      {/* Dynamic background gradient */}
      <div 
        className="absolute inset-0 opacity-20 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(220, 38, 38, 0.3), transparent 70%)`
        }}
      />

      {/* Fullscreen Image View with Parallax */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
          onClick={closeFullscreen}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center"
            style={getParallaxStyle()}
          >
            <img 
              src={galleryImages.find(img => img.id === selectedImage)?.src}
              alt={galleryImages.find(img => img.id === selectedImage)?.alt}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
                const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                setSelectedImage(galleryImages[prevIndex].id);
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 text-white p-4 rounded-full opacity-20 hover:opacity-40 transition-all duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
                const nextIndex = (currentIndex + 1) % galleryImages.length;
                setSelectedImage(galleryImages[nextIndex].id);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 text-white p-4 rounded-full opacity-20 hover:opacity-40 transition-all duration-300"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>

            <button 
              className="absolute top-4 right-4 text-white/20 hover:text-white/40 transition-colors"
              onClick={closeFullscreen}
              aria-label="Close fullscreen view"
            >
              <X size={32} />
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 relative">
        <h2 className={`text-3xl md:text-4xl font-bold mb-16 text-white text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-red-600">GALLERY</span>
        </h2>

        <div className="relative">
          {/* Gallery Navigation Buttons - More Transparent */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-4 rounded-full opacity-30 hover:opacity-50 transition-all duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-4 rounded-full opacity-30 hover:opacity-50 transition-all duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight size={32} />
          </button>
          
          {/* Gallery Images */}
          <div 
            ref={scrollRef}
            className={`flex space-x-6 overflow-x-auto scrollbar-hide pb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {galleryImages.map((image, index) => (
              <div 
                key={image.id}
                className="flex-shrink-0 w-[300px] md:w-[400px] cursor-pointer overflow-hidden rounded-lg shadow-2xl"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transform: `translateY(${mousePosition.y * 20 - 10}px)`
                }}
                onClick={() => handleImageClick(image.id)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`mt-12 text-center transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="p-4">
            <Link 
              to="/gallery" 
              className="group relative inline-block overflow-visible"
            >
              <div className="relative flex items-center justify-center space-x-4 border-2 border-white/30 text-white py-5 px-12 rounded-lg font-bold transition-all duration-300 group-hover:border-white/90 group-hover:bg-white/10 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(220,38,38,0.4)]">
                <span className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-2 text-lg">VIEW FULL ART</span>
                <svg 
                  className="w-7 h-7 transform transition-all duration-300 group-hover:translate-x-3 group-hover:scale-125" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-center"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;