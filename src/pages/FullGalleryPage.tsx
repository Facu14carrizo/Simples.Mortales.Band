import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StickerAlbum from '../components/StickerAlbum';
import PosterAlbum from '../components/PosterAlbum';
import PhoneVideo from '../components/PhoneVideo';

const FullGalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('shots');

  const categories = [
    { id: 'shots', name: 'SHOTS' },
    { id: 'stickers', name: 'STICKERS' },
    { id: 'posters', name: 'POSTERS' },
    { id: 'picks', name: 'PUAS' },
    { id: 'flag', name: 'BANDERAS' },
    { id: 'logos', name: 'LOGOS' },
    { id: 'techniques', name: 'TECHNICAL' },
    { id: 'varios', name: 'VARIOS' }
  ];

  const galleryImages = [
    // Shots - Todas las fotos DSC_ y retratos
    { id: 1, src: 'src/resources/imgs/DSC_1052-Enhanced-NR.jpg', alt: 'Live performance', category: 'shots' },
    { id: 2, src: 'src/resources/imgs/DSC_1042.jpg', alt: 'Band on stage', category: 'shots' },
    { id: 3, src: 'src/resources/imgs/DSC_1040.jpg', alt: 'Concert moment', category: 'shots' },
    { id: 4, src: 'src/resources/imgs/DSC_1038-Enhanced-NR.jpg', alt: 'Live show', category: 'shots' },
    { id: 5, src: 'src/resources/imgs/DSC_1034.jpg', alt: 'Performance', category: 'shots' },
    { id: 6, src: 'src/resources/imgs/DSC_1030-Enhanced-NR.jpg', alt: 'Stage presence', category: 'shots' },
    { id: 7, src: 'src/resources/imgs/DSC_1021-2-Enhanced-NR.jpg', alt: 'Live energy', category: 'shots' },
    { id: 8, src: 'src/resources/imgs/DSC_1020-Enhanced-NR.jpg', alt: 'Concert atmosphere', category: 'shots' },
    { id: 9, src: 'src/resources/imgs/DSC_1019-2-Enhanced-NR.jpg', alt: 'Band performance', category: 'shots' },
    { id: 10, src: 'src/resources/imgs/DSC_1016.jpg', alt: 'Live moment', category: 'shots' },
    { id: 11, src: 'src/resources/imgs/DSC_1012.jpg', alt: 'Stage show', category: 'shots' },
    { id: 12, src: 'src/resources/imgs/DSC_1009.jpg', alt: 'Concert experience', category: 'shots' },
    { id: 13, src: 'src/resources/imgs/DSC_1004-Enhanced-NR.jpg', alt: 'Live performance', category: 'shots' },
    { id: 14, src: 'src/resources/imgs/DSC_1003.jpg', alt: 'Band moment', category: 'shots' },
    { id: 15, src: 'src/resources/imgs/DSC_1002-Enhanced-NR.jpg', alt: 'Stage presence', category: 'shots' },
    { id: 16, src: 'src/resources/imgs/DSC_1001-2-Enhanced-NR.jpg', alt: 'Live energy', category: 'shots' },
    { id: 17, src: 'src/resources/imgs/DSC_1000.jpg', alt: 'Concert atmosphere', category: 'shots' },
    { id: 18, src: 'src/resources/imgs/DSC_0999-2-Enhanced-NR.jpg', alt: 'Band performance', category: 'shots' },
    { id: 19, src: 'src/resources/imgs/DSC_0998-Enhanced-NR.jpg', alt: 'Live show', category: 'shots' },
    { id: 20, src: 'src/resources/imgs/DSC_0997.jpg', alt: 'Stage moment', category: 'shots' },
    { id: 21, src: 'src/resources/imgs/DSC_0994-2-Enhanced-NR.jpg', alt: 'Live performance', category: 'shots' },
    { id: 22, src: 'src/resources/imgs/DSC_0993.jpg', alt: 'Band on stage', category: 'shots' },
    { id: 23, src: 'src/resources/imgs/DSC_0991.jpg', alt: 'Concert moment', category: 'shots' },
    { id: 24, src: 'src/resources/imgs/DSC_0989.jpg', alt: 'Live show', category: 'shots' },
    { id: 25, src: 'src/resources/imgs/DSC_0988.jpg', alt: 'Performance', category: 'shots' },
    { id: 26, src: 'src/resources/imgs/DSC_0984.jpg', alt: 'Stage presence', category: 'shots' },
    { id: 27, src: 'src/resources/imgs/DSC_0981-2-Enhanced-NR.jpg', alt: 'Live energy', category: 'shots' },
    { id: 28, src: 'src/resources/imgs/DSC_0975.jpg', alt: 'Concert atmosphere', category: 'shots' },
    { id: 29, src: 'src/resources/imgs/DSC_0974.jpg', alt: 'Band performance', category: 'shots' },
    { id: 30, src: 'src/resources/imgs/DSC_0969.jpg', alt: 'Live moment', category: 'shots' },
    { id: 31, src: 'src/resources/imgs/DSC_0967-2-Enhanced-NR.jpg', alt: 'Stage show', category: 'shots' },
    { id: 32, src: 'src/resources/imgs/DSC_0966-2-Enhanced-NR.jpg', alt: 'Concert experience', category: 'shots' },
    { id: 33, src: 'src/resources/imgs/DSC_0965-2-Enhanced-NR.jpg', alt: 'Live performance', category: 'shots' },
    { id: 34, src: 'src/resources/imgs/DSC_0963.jpg', alt: 'Band moment', category: 'shots' },
    { id: 35, src: 'src/resources/imgs/DSC_0960-2-Enhanced-NR.jpg', alt: 'Stage presence', category: 'shots' },
    { id: 36, src: 'src/resources/imgs/DSC_0958.jpg', alt: 'Live energy', category: 'shots' },
    { id: 37, src: 'src/resources/imgs/DSC_0954.jpg', alt: 'Concert atmosphere', category: 'shots' },
    { id: 38, src: 'src/resources/imgs/DSC_0953-2-Enhanced-NR.jpg', alt: 'Band performance', category: 'shots' },
    { id: 39, src: 'src/resources/imgs/DSC_0951.jpg', alt: 'Live show', category: 'shots' },
    { id: 40, src: 'src/resources/imgs/DSC_0949.jpg', alt: 'Stage moment', category: 'shots' },
    { id: 41, src: 'src/resources/imgs/DSC_0948-2-Enhanced-NR.jpg', alt: 'Live performance', category: 'shots' },
    { id: 42, src: 'src/resources/imgs/DSC_0947.jpg', alt: 'Band on stage', category: 'shots' },
    { id: 43, src: 'src/resources/imgs/DSC_0944-Enhanced-NR.jpg', alt: 'Concert moment', category: 'shots' },
    { id: 44, src: 'src/resources/imgs/DSC_0943-2-Enhanced-NR.jpg', alt: 'Live show', category: 'shots' },
    { id: 45, src: 'src/resources/imgs/DSC_0939-2.jpg', alt: 'Performance', category: 'shots' },
    { id: 46, src: 'src/resources/imgs/DSC_0937-2-Enhanced-NR.jpg', alt: 'Stage presence', category: 'shots' },
    { id: 47, src: 'src/resources/imgs/DSC_0936.jpg', alt: 'Live energy', category: 'shots' },
    { id: 48, src: 'src/resources/imgs/DSC_0935.jpg', alt: 'Concert atmosphere', category: 'shots' },
    { id: 49, src: 'src/resources/imgs/DSC_0933-Enhanced-NR.jpg', alt: 'Band performance', category: 'shots' },
    { id: 50, src: 'src/resources/imgs/DSC_0932-2-Enhanced-NR-3.jpg', alt: 'Live moment', category: 'shots' },
    { id: 51, src: 'src/resources/imgs/DSC_0931.jpg', alt: 'Stage show', category: 'shots' },
    { id: 52, src: 'src/resources/imgs/DSC_0929.jpg', alt: 'Concert experience', category: 'shots' },
    { id: 53, src: 'src/resources/imgs/DSC_0928.jpg', alt: 'Live performance', category: 'shots' },
    { id: 54, src: 'src/resources/imgs/DSC_0927.jpg', alt: 'Band moment', category: 'shots' },
    { id: 55, src: 'src/resources/imgs/DSC_0926.jpg', alt: 'Stage presence', category: 'shots' },
    { id: 56, src: 'src/resources/imgs/DSC_0925.jpg', alt: 'Live energy', category: 'shots' },
    { id: 57, src: 'src/resources/imgs/DSC_0923-2-Enhanced-NR.jpg', alt: 'Concert atmosphere', category: 'shots' },
    { id: 58, src: 'src/resources/imgs/DSC_0922-Enhanced-NR.jpg', alt: 'Band performance', category: 'shots' },
    { id: 59, src: 'src/resources/imgs/DSC_0920-2-Enhanced-NR.jpg', alt: 'Live show', category: 'shots' },
    { id: 60, src: 'src/resources/imgs/DSC_0918.jpg', alt: 'Stage moment', category: 'shots' },
    { id: 61, src: 'src/resources/imgs/DSC_0916-2-Enhanced-NR.jpg', alt: 'Live performance', category: 'shots' },
    { id: 62, src: 'src/resources/imgs/DSC_0915.jpg', alt: 'Band on stage', category: 'shots' },
    { id: 63, src: 'src/resources/imgs/DSC_0910-2-Enhanced-NR.jpg', alt: 'Concert moment', category: 'shots' },
    { id: 64, src: 'src/resources/imgs/DSC_0909-2-Enhanced-NR.jpg', alt: 'Live show', category: 'shots' },
    { id: 65, src: 'src/resources/imgs/DSC_0903.jpg', alt: 'Performance', category: 'shots' },
    { id: 66, src: 'src/resources/imgs/DSC_0902.jpg', alt: 'Stage presence', category: 'shots' },
    { id: 67, src: 'src/resources/imgs/DSC_0901.jpg', alt: 'Live energy', category: 'shots' },
    { id: 68, src: 'src/resources/imgs/DSC_0893-2-Enhanced-NR.jpg', alt: 'Concert atmosphere', category: 'shots' },
    { id: 69, src: 'src/resources/imgs/DSC_0891-Enhanced-NR.jpg', alt: 'Band performance', category: 'shots' },
    { id: 70, src: 'src/resources/imgs/marto.jpg', alt: 'Marto portrait', category: 'shots' },
    { id: 71, src: 'src/resources/imgs/ivan.jpg', alt: 'Ivan portrait', category: 'shots' },
    { id: 72, src: 'src/resources/imgs/gabo.jpg', alt: 'Gabo portrait', category: 'shots' },
    { id: 73, src: 'src/resources/imgs/facu.jpg', alt: 'Facu portrait', category: 'shots' },
    { id: 74, src: 'src/resources/imgs/bandagrande.jpg', alt: 'Full band photo', category: 'shots' },
    { id: 75, src: 'src/resources/imgs/banda.jpg', alt: 'Band group photo', category: 'shots' },
    { id: 76, src: 'src/resources/imgs/agus2.jpg', alt: 'Agus portrait 2', category: 'shots' },
    { id: 77, src: 'src/resources/imgs/agus.jpg', alt: 'Agus portrait', category: 'shots' },

    // Puas - Todas las puas
    { id: 78, src: 'src/resources/toys/PrimeraPuaSM.jpeg', alt: 'Pua SM 1', category: 'picks' },
    { id: 79, src: 'src/resources/toys/SegundaPuaSM.jpg', alt: 'Pua SM 2', category: 'picks' },
    { id: 80, src: 'src/resources/toys/TerceraPuaSM.01.jpg', alt: 'Pua SM 3.1', category: 'picks' },
    { id: 81, src: 'src/resources/toys/TerceraPuaSM.02.jpg', alt: 'Pua SM 3.2', category: 'picks' },
    { id: 82, src: 'src/resources/toys/puasPrimeraGeneracion.jpeg', alt: 'Puas Primera Generación', category: 'picks' },
    { id: 83, src: 'src/resources/toys/puasSegundaGeneracion.jpeg', alt: 'Puas Segunda Generación', category: 'picks' },
    
    // Banderas - Todas las banderas
    { id: 84, src: 'src/resources/toys/Artboard@flag.png', alt: 'Bandera SM', category: 'flag' },
    { id: 85, src: 'src/resources/toys/Artboard@flag02.png', alt: 'Bandera SM 2', category: 'flag' },
    { id: 86, src: 'src/resources/toys/Artboard@flag03.jpeg', alt: 'Bandera SM 3', category: 'flag' },
    { id: 87, src: 'src/resources/toys/Artboard@flag04.jpeg', alt: 'Bandera SM 4', category: 'flag' },
    { id: 88, src: 'src/resources/toys/Artboard@flag05.jpeg', alt: 'Bandera SM 5', category: 'flag' },
    
    // Logos - Todos los logos
    { id: 89, src: 'src/resources/toys/Asset 4LOGO.png', alt: 'Logo SM 1', category: 'logos' },
    { id: 90, src: 'src/resources/toys/Asset4LOGO2.png', alt: 'Logo SM 2', category: 'logos' },
    { id: 91, src: 'src/resources/toys/Asset4LOGO3.png', alt: 'Logo SM 3', category: 'logos' },
    
    // Technical - Setlists y riders
    { id: 92, src: 'src/resources/toys/Setlist sangre negra viernes 7 de marzo.jpg', alt: 'Setlist Sangre Negra', category: 'techniques' },
    { id: 93, src: 'src/resources/toys/Setlist palermo_liverpool.jpg', alt: 'Setlist Palermo Liverpool', category: 'techniques' },
    { id: 94, src: 'src/resources/toys/Rider tecnico_palermo_liverpool.jpg', alt: 'Rider Técnico Palermo Liverpool', category: 'techniques' },
    { id: 95, src: 'src/resources/toys/Artboard 1.Setlist-SixBar.Abril.jpg', alt: 'Setlist Six Bar', category: 'techniques' },
    { id: 96, src: 'src/resources/toys/setlist (1)_page-0001.jpg', alt: 'Setlist 1', category: 'techniques' },
    { id: 97, src: 'src/resources/toys/Setlist 15-02 (1)_page-0001.jpg', alt: 'Setlist 15-02', category: 'techniques' },
    
    // Varios - Todo lo demás
    { id: 98, src: 'src/resources/toys/varios (1).jpeg', alt: 'Varios 1', category: 'varios' },
    { id: 99, src: 'src/resources/toys/varios (2).jpeg', alt: 'Varios 2', category: 'varios' },
    { id: 100, src: 'src/resources/toys/varios (3).jpeg', alt: 'Varios 3', category: 'varios' },
    { id: 101, src: 'src/resources/toys/varios (4).jpeg', alt: 'Varios 4', category: 'varios' },
    { id: 105, src: 'src/resources/toys/varios (1).mp4', alt: 'Varios Video', category: 'varios' },
    { id: 106, src: 'src/resources/toys/bandaIA1.jpeg', alt: 'Banda IA 1', category: 'varios' },
    { id: 107, src: 'src/resources/toys/bandaIA2.jpeg', alt: 'Banda IA 2', category: 'varios' },
    { id: 108, src: 'src/resources/toys/bandaIA3.jpeg', alt: 'Banda IA 3', category: 'varios' },
    { id: 109, src: 'src/resources/imgs/wallpaper.png', alt: 'Wallpaper', category: 'varios' },
    { id: 110, src: 'src/resources/toys/Artboard Pin palermo04.png', alt: 'Pin Palermo', category: 'varios' },
  ];

  const filteredImages = selectedCategory === 'shots' 
    ? galleryImages.filter(img => img.category === 'shots')
    : galleryImages.filter(img => img.category === selectedCategory);

  useEffect(() => {
    let timeoutId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse move updates to improve performance
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setMousePosition({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight
        });
      }, 16); // ~60fps
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Simular carga de imágenes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
      clearTimeout(timeoutId);
    };
  }, []);

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

  const handleImageClick = (id: number) => {
    setSelectedImage(id);
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    } else {
      newIndex = (currentIndex + 1) % galleryImages.length;
    }
    
    setSelectedImage(galleryImages[newIndex].id);
  };

  return (
    <div className="relative min-h-screen bg-zinc-900">
      {/* Static background gradient instead of dynamic */}
      <div className="fixed inset-0 opacity-20 bg-gradient-to-br from-red-600/30 via-transparent to-red-600/30"></div>

      <main className="relative w-full min-h-screen overflow-y-auto custom-scrollbar">
        <div className="w-full px-4 py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            <span className="text-red-600">FULL</span> GALLERY
          </h1>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105
                  ${selectedCategory === category.id 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {selectedCategory === 'stickers' ? (
            <StickerAlbum />
          ) : selectedCategory === 'posters' ? (
            <PosterAlbum />
          ) : isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <div 
              className={`grid gap-8 max-w-[1600px] mx-auto pb-16 ${
                selectedCategory === 'shots' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'
              }`}
            >
              {filteredImages.map((image, index) => {
                // Check if it's a video file
                const isVideo = image.src.toLowerCase().endsWith('.mp4');
                
                return (
                  <div
                    key={image.id}
                    className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 ${
                      selectedCategory === 'shots' 
                        ? 'aspect-[4/3]'
                        : isVideo 
                          ? 'aspect-auto flex justify-center items-center'
                          : 'aspect-auto'
                    }`}
                    onClick={() => handleImageClick(image.id)}
                  >
                    {isVideo ? (
                      <PhoneVideo videoSrc={image.src} alt={image.alt} />
                    ) : (
                      <>
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          className={`w-full h-full transition-transform duration-500 ${
                            selectedCategory === 'shots' 
                              ? 'object-cover group-hover:scale-105'
                              : 'object-contain'
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Fullscreen View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={closeFullscreen}
          >
            <div 
              className="relative w-full h-full flex items-center justify-center py-8"
              style={getParallaxStyle()}
            >
              {(() => {
                const selectedItem = filteredImages.find(img => img.id === selectedImage);
                const isVideo = selectedItem?.src.toLowerCase().endsWith('.mp4');
                
                if (isVideo && selectedItem) {
                  return (
                    <div className="w-full h-full flex items-center justify-center">
                      <video
                        src={selectedItem.src}
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
                      />
                    </div>
                  );
                }
                
                return (
                  <img
                    src={selectedItem?.src}
                    alt={selectedItem?.alt}
                    className={`max-w-full max-h-[90vh] w-auto h-auto ${
                      selectedCategory === 'shots' 
                        ? 'object-contain'
                        : 'object-contain'
                    }`}
                  />
                );
              })()}
              
              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="fixed left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 text-white p-4 rounded-full opacity-20 hover:opacity-40 transition-all duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft size={32} />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 text-white p-4 rounded-full opacity-20 hover:opacity-40 transition-all duration-300"
                aria-label="Next image"
              >
                <ChevronRight size={32} />
              </button>

              <button
                className="fixed top-4 right-4 text-white/20 hover:text-white/40 transition-colors"
                onClick={closeFullscreen}
                aria-label="Close fullscreen view"
              >
                <X size={32} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FullGalleryPage; 