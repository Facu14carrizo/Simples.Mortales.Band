import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Importar todas las imágenes disponibles
const galleryImages = [
  { id: 1, src: 'src/resources/imgs/DSC_1052-Enhanced-NR.jpg', alt: 'Live performance' },
  { id: 2, src: 'src/resources/imgs/DSC_1042.jpg', alt: 'Band on stage' },
  { id: 3, src: 'src/resources/imgs/DSC_1040.jpg', alt: 'Concert moment' },
  { id: 4, src: 'src/resources/imgs/DSC_1038-Enhanced-NR.jpg', alt: 'Live show' },
  { id: 5, src: 'src/resources/imgs/DSC_1034.jpg', alt: 'Performance' },
  { id: 6, src: 'src/resources/imgs/DSC_1030-Enhanced-NR.jpg', alt: 'Stage presence' },
  { id: 7, src: 'src/resources/imgs/DSC_1021-2-Enhanced-NR.jpg', alt: 'Live energy' },
  { id: 8, src: 'src/resources/imgs/DSC_1020-Enhanced-NR.jpg', alt: 'Concert atmosphere' },
  { id: 9, src: 'src/resources/imgs/DSC_1019-2-Enhanced-NR.jpg', alt: 'Band performance' },
  { id: 10, src: 'src/resources/imgs/DSC_1016.jpg', alt: 'Live moment' },
  { id: 11, src: 'src/resources/imgs/DSC_1012.jpg', alt: 'Stage show' },
  { id: 12, src: 'src/resources/imgs/DSC_1009.jpg', alt: 'Concert experience' },
  { id: 13, src: 'src/resources/imgs/DSC_1004-Enhanced-NR.jpg', alt: 'Live performance' },
  { id: 14, src: 'src/resources/imgs/DSC_1003.jpg', alt: 'Band moment' },
  { id: 15, src: 'src/resources/imgs/DSC_1002-Enhanced-NR.jpg', alt: 'Stage presence' },
  { id: 16, src: 'src/resources/imgs/DSC_1001-2-Enhanced-NR.jpg', alt: 'Live energy' },
  { id: 17, src: 'src/resources/imgs/DSC_1000.jpg', alt: 'Concert atmosphere' },
  { id: 18, src: 'src/resources/imgs/DSC_0999-2-Enhanced-NR.jpg', alt: 'Band performance' },
  { id: 19, src: 'src/resources/imgs/DSC_0998-Enhanced-NR.jpg', alt: 'Live show' },
  { id: 20, src: 'src/resources/imgs/DSC_0997.jpg', alt: 'Stage moment' },
  { id: 21, src: 'src/resources/imgs/DSC_0994-2-Enhanced-NR.jpg', alt: 'Live performance' },
  { id: 22, src: 'src/resources/imgs/DSC_0993.jpg', alt: 'Band on stage' },
  { id: 23, src: 'src/resources/imgs/DSC_0991.jpg', alt: 'Concert moment' },
  { id: 24, src: 'src/resources/imgs/DSC_0989.jpg', alt: 'Live show' },
  { id: 25, src: 'src/resources/imgs/DSC_0988.jpg', alt: 'Performance' },
  { id: 26, src: 'src/resources/imgs/DSC_0984.jpg', alt: 'Stage presence' },
  { id: 27, src: 'src/resources/imgs/DSC_0981-2-Enhanced-NR.jpg', alt: 'Live energy' },
  { id: 28, src: 'src/resources/imgs/DSC_0975.jpg', alt: 'Concert atmosphere' },
  { id: 29, src: 'src/resources/imgs/DSC_0974.jpg', alt: 'Band performance' },
  { id: 30, src: 'src/resources/imgs/DSC_0969.jpg', alt: 'Live moment' },
  { id: 31, src: 'src/resources/imgs/DSC_0967-2-Enhanced-NR.jpg', alt: 'Stage show' },
  { id: 32, src: 'src/resources/imgs/DSC_0966-2-Enhanced-NR.jpg', alt: 'Concert experience' },
  { id: 33, src: 'src/resources/imgs/DSC_0965-2-Enhanced-NR.jpg', alt: 'Live performance' },
  { id: 34, src: 'src/resources/imgs/DSC_0963.jpg', alt: 'Band moment' },
  { id: 35, src: 'src/resources/imgs/DSC_0960-2-Enhanced-NR.jpg', alt: 'Stage presence' },
  { id: 36, src: 'src/resources/imgs/DSC_0958.jpg', alt: 'Live energy' },
  { id: 37, src: 'src/resources/imgs/DSC_0954.jpg', alt: 'Concert atmosphere' },
  { id: 38, src: 'src/resources/imgs/DSC_0953-2-Enhanced-NR.jpg', alt: 'Band performance' },
  { id: 39, src: 'src/resources/imgs/DSC_0951.jpg', alt: 'Live show' },
  { id: 40, src: 'src/resources/imgs/DSC_0949.jpg', alt: 'Stage moment' },
  { id: 41, src: 'src/resources/imgs/DSC_0948-2-Enhanced-NR.jpg', alt: 'Live performance' },
  { id: 42, src: 'src/resources/imgs/DSC_0947.jpg', alt: 'Band on stage' },
  { id: 43, src: 'src/resources/imgs/DSC_0944-Enhanced-NR.jpg', alt: 'Concert moment' },
  { id: 44, src: 'src/resources/imgs/DSC_0943-2-Enhanced-NR.jpg', alt: 'Live show' },
  { id: 45, src: 'src/resources/imgs/DSC_0939-2.jpg', alt: 'Performance' },
  { id: 46, src: 'src/resources/imgs/DSC_0937-2-Enhanced-NR.jpg', alt: 'Stage presence' },
  { id: 47, src: 'src/resources/imgs/DSC_0936.jpg', alt: 'Live energy' },
  { id: 48, src: 'src/resources/imgs/DSC_0935.jpg', alt: 'Concert atmosphere' },
  { id: 49, src: 'src/resources/imgs/DSC_0933-Enhanced-NR.jpg', alt: 'Band performance' },
  { id: 50, src: 'src/resources/imgs/DSC_0932-2-Enhanced-NR-3.jpg', alt: 'Live moment' },
  { id: 51, src: 'src/resources/imgs/DSC_0931.jpg', alt: 'Stage show' },
  { id: 52, src: 'src/resources/imgs/DSC_0929.jpg', alt: 'Concert experience' },
  { id: 53, src: 'src/resources/imgs/DSC_0928.jpg', alt: 'Live performance' },
  { id: 54, src: 'src/resources/imgs/DSC_0927.jpg', alt: 'Band moment' },
  { id: 55, src: 'src/resources/imgs/DSC_0926.jpg', alt: 'Stage presence' },
  { id: 56, src: 'src/resources/imgs/DSC_0925.jpg', alt: 'Live energy' },
  { id: 57, src: 'src/resources/imgs/DSC_0923-2-Enhanced-NR.jpg', alt: 'Concert atmosphere' },
  { id: 58, src: 'src/resources/imgs/DSC_0922-Enhanced-NR.jpg', alt: 'Band performance' },
  { id: 59, src: 'src/resources/imgs/DSC_0920-2-Enhanced-NR.jpg', alt: 'Live show' },
  { id: 60, src: 'src/resources/imgs/DSC_0918.jpg', alt: 'Stage moment' },
  { id: 61, src: 'src/resources/imgs/DSC_0916-2-Enhanced-NR.jpg', alt: 'Live performance' },
  { id: 62, src: 'src/resources/imgs/DSC_0915.jpg', alt: 'Band on stage' },
  { id: 63, src: 'src/resources/imgs/DSC_0910-2-Enhanced-NR.jpg', alt: 'Concert moment' },
  { id: 64, src: 'src/resources/imgs/DSC_0909-2-Enhanced-NR.jpg', alt: 'Live show' },
  { id: 65, src: 'src/resources/imgs/DSC_0903.jpg', alt: 'Performance' },
  { id: 66, src: 'src/resources/imgs/DSC_0902.jpg', alt: 'Stage presence' },
  { id: 67, src: 'src/resources/imgs/DSC_0901.jpg', alt: 'Live energy' },
  { id: 68, src: 'src/resources/imgs/DSC_0893-2-Enhanced-NR.jpg', alt: 'Concert atmosphere' },
  { id: 69, src: 'src/resources/imgs/DSC_0891-Enhanced-NR.jpg', alt: 'Band performance' },
  { id: 70, src: 'src/resources/imgs/marto.jpg', alt: 'Marto portrait' },
  { id: 71, src: 'src/resources/imgs/ivan.jpg', alt: 'Ivan portrait' },
  { id: 72, src: 'src/resources/imgs/gabo.jpg', alt: 'Gabo portrait' },
  { id: 73, src: 'src/resources/imgs/facu.jpg', alt: 'Facu portrait' },
  { id: 74, src: 'src/resources/imgs/bandagrande.jpg', alt: 'Full band photo' },
  { id: 75, src: 'src/resources/imgs/banda.jpg', alt: 'Band group photo' },
  { id: 76, src: 'src/resources/imgs/agus2.jpg', alt: 'Agus portrait 2' },
  { id: 77, src: 'src/resources/imgs/agus.jpg', alt: 'Agus portrait' }
];

const FullGalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Simular carga de imágenes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
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
      {/* Dynamic background gradient */}
      <div 
        className="fixed inset-0 opacity-20 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(220, 38, 38, 0.3), transparent 70%)`
        }}
      />

      <main className="relative w-full min-h-screen overflow-y-auto">
        <div className="w-full px-4 py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            <span className="text-red-600">FULL</span> GALLERY
          </h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-[1600px] mx-auto pb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-2xl aspect-[4/3]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleImageClick(image.id)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              ))}
            </motion.div>
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
              <img
                src={galleryImages.find(img => img.id === selectedImage)?.src}
                alt={galleryImages.find(img => img.id === selectedImage)?.alt}
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
              />
              
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