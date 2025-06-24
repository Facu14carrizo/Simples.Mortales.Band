import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StickerAlbum: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const stickers = [
    { id: 1, src: 'src/resources/toys/Artboard Sticker palermo.jpg', alt: 'Sticker Palermo' },
    { id: 2, src: 'src/resources/toys/Artboard Sticker palermo02.png', alt: 'Sticker Palermo 2' },
    { id: 4, src: 'src/resources/toys/PrimerArtBoartSticker.jpg', alt: 'Sticker SM Original' },
    { id: 5, src: 'src/resources/toys/Stickers mortales_page-0001.jpg', alt: 'Stickers Mortales Página 1' },
    { id: 6, src: 'src/resources/toys/Stickers mortales_page-0002.jpg', alt: 'Stickers Mortales Página 2' },
    { id: 7, src: 'src/resources/toys/Stickers mortales_page-0003.jpg', alt: 'Stickers Mortales Página 3' },
    { id: 8, src: 'src/resources/toys/Stickers mortales_page-0004.jpg', alt: 'Stickers Mortales Página 4' },
  ];

  const handleImageClick = (id: number) => {
    setSelectedImage(id);
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
  };

  return (
    <div className="relative">
      {/* Fullscreen View */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeFullscreen}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={stickers.find(sticker => sticker.id === selectedImage)?.src}
              alt={stickers.find(sticker => sticker.id === selectedImage)?.alt}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white/20 hover:text-white/40 transition-colors"
              onClick={closeFullscreen}
              aria-label="Close fullscreen view"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Sticker Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-[1200px] mx-auto">
        {stickers.map((sticker, index) => (
          <motion.div
            key={sticker.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleImageClick(sticker.id)}
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 p-4">
              <img
                src={sticker.src}
                alt={sticker.alt}
                className="w-full h-auto object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
              
              {/* Only Border and Simple Shine */}
              <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-silver-400 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
              
              {/* Simple Top Shine Only */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/15 to-transparent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
              </div>
              
              {/* Simple Corner Highlights */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                <div className="absolute top-1 left-1 w-2 h-2 bg-white/20 rounded-full blur-sm"></div>
                <div className="absolute top-1 right-1 w-2 h-2 bg-white/20 rounded-full blur-sm"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StickerAlbum; 