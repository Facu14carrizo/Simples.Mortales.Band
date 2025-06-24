import React, { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';

const PosterAlbum: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const posters = [
    { id: 1, src: 'src/resources/toys/Artboard.Flyer00.jpeg', alt: 'Flyer 00' },
    { id: 2, src: 'src/resources/toys/Artboard.Flyer01.jpeg', alt: 'Flyer 01' },
    { id: 3, src: 'src/resources/toys/Artboard.Flyer02.jpeg', alt: 'Flyer 02' },
    { id: 4, src: 'src/resources/toys/Artboard.Flyer04.jpeg', alt: 'Flyer 04' },
    { id: 5, src: 'src/resources/toys/Artboard.Flyer05.jpeg', alt: 'Flyer 05' },
    { id: 6, src: 'src/resources/toys/Artboard.Flyer06.jpeg', alt: 'Flyer 06' },
    { id: 7, src: 'src/resources/toys/Artboard.Flyer07.jpg', alt: 'Flyer 07' },
    { id: 8, src: 'src/resources/toys/Artboard.Flyer08.jpeg', alt: 'Flyer 08' },
    { id: 9, src: 'src/resources/toys/Artboard.Flyer09.jpeg', alt: 'Flyer 09' },
    { id: 10, src: 'src/resources/toys/Artboard.Flyer010.jpeg', alt: 'Flyer 010' },
    { id: 11, src: 'src/resources/toys/Artboard.Flyer011.jpeg', alt: 'Flyer 011' },
    { id: 12, src: 'src/resources/toys/Artboard.Flyer012six.jpg', alt: 'Flyer 012 Six' },
    { id: 13, src: 'src/resources/toys/Artboard.Flyer013.jpg', alt: 'Flyer 013' },
    { id: 14, src: 'src/resources/toys/Artboard 1flyer six ig.jpg', alt: 'Flyer Six IG' },
  ];

  useEffect(() => {
    const handleFlip = () => {
      setIsFlipping(true);
      setTimeout(() => setIsFlipping(false), 1200);
    };

    window.addEventListener('flip', handleFlip);
    return () => window.removeEventListener('flip', handleFlip);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[900px] py-8 sm:py-12 md:py-16 relative overflow-hidden px-4 sm:px-6">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900"></div>
      
      {/* Animated Background Grid - Responsive */}
      <div className="absolute inset-0 opacity-10 sm:opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.1)_1px,transparent_1px)] bg-[size:25px_25px] sm:bg-[size:50px_50px] animate-pulse"></div>
      </div>
      
      {/* Multiple Glow Layers - Responsive */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 sm:from-red-600/15 via-transparent to-red-600/10 sm:to-red-600/15 blur-2xl sm:blur-3xl scale-100 sm:scale-150 opacity-40 sm:opacity-60 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-red-500/8 sm:from-red-500/10 via-transparent to-red-600/8 sm:to-red-600/10 blur-xl sm:blur-2xl scale-75 sm:scale-125 opacity-30 sm:opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Floating Energy Orbs - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 sm:w-4 sm:h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full blur-sm animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw]">
        <HTMLFlipBook
          width={window.innerWidth < 640 ? 300 : window.innerWidth < 768 ? 400 : window.innerWidth < 1024 ? 500 : 700}
          height={window.innerWidth < 640 ? 400 : window.innerWidth < 768 ? 500 : window.innerWidth < 1024 ? 600 : 900}
          size="stretch"
          minWidth={window.innerWidth < 640 ? 250 : window.innerWidth < 768 ? 350 : window.innerWidth < 1024 ? 450 : 600}
          maxWidth={window.innerWidth < 640 ? 350 : window.innerWidth < 768 ? 450 : window.innerWidth < 1024 ? 550 : 900}
          minHeight={window.innerWidth < 640 ? 300 : window.innerWidth < 768 ? 400 : window.innerWidth < 1024 ? 500 : 700}
          maxHeight={window.innerWidth < 640 ? 450 : window.innerWidth < 768 ? 550 : window.innerWidth < 1024 ? 650 : 1100}
          flippingTime={window.innerWidth < 640 ? 1000 : 1500}
          className="shadow-2xl"
          startPage={0}
          drawShadow={true}
          usePortrait={window.innerWidth < 640}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={window.innerWidth < 640 ? 0.6 : 0.8}
          showPageCorners={window.innerWidth >= 768}
          disableFlipByClick={false}
          useMouseEvents={true}
          swipeDistance={window.innerWidth < 640 ? 20 : 30}
          clickEventForward={true}
          useBoundingRect={false}
          style={{
            boxShadow: window.innerWidth < 640 
              ? `0 15px 40px rgba(220, 38, 38, 0.3), 0 0 60px rgba(220, 38, 38, 0.1)`
              : `0 25px 80px rgba(220, 38, 38, 0.4), 0 0 150px rgba(220, 38, 38, 0.2), 0 0 200px rgba(220, 38, 38, 0.1), inset 0 0 50px rgba(220, 38, 38, 0.05)`,
            borderRadius: window.innerWidth < 640 ? '15px' : '25px',
            border: window.innerWidth < 640 ? '2px solid rgba(220, 38, 38, 0.2)' : '3px solid rgba(220, 38, 38, 0.3)',
            background: 'linear-gradient(145deg, rgba(220, 38, 38, 0.1), rgba(0, 0, 0, 0.8))'
          }}
          onFlip={(e: any) => {
            setCurrentPage(e.data);
            setIsFlipping(true);
            setTimeout(() => setIsFlipping(false), window.innerWidth < 640 ? 1000 : 1500);
          }}
          onChangeState={(e: any) => console.log('State changed', e.data)}
          onInit={(e: any) => console.log('Initialized', e.data)}
        >
          {posters.map((poster, index) => (
            <div
              key={poster.id}
              className="demoPage"
              data-density="hard"
              style={{
                background: `
                  linear-gradient(145deg, #0a0a0a, #1a1a1a),
                  radial-gradient(circle at 20% 20%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(220, 38, 38, 0.05) 0%, transparent 50%)
                `,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: window.innerWidth < 640 ? '20px' : window.innerWidth < 768 ? '25px' : '40px',
                boxSizing: 'border-box',
                borderRadius: window.innerWidth < 640 ? '10px' : window.innerWidth < 768 ? '15px' : '20px',
                border: window.innerWidth < 640 ? '1px solid rgba(220, 38, 38, 0.1)' : '2px solid rgba(220, 38, 38, 0.2)',
                boxShadow: window.innerWidth < 640 
                  ? `inset 0 0 20px rgba(220, 38, 38, 0.05), 0 0 15px rgba(220, 38, 38, 0.03)`
                  : `inset 0 0 40px rgba(220, 38, 38, 0.1), 0 0 30px rgba(220, 38, 38, 0.05)`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Page Background Pattern */}
              <div className="absolute inset-0 opacity-5 sm:opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.3)_0%,transparent_70%)]"></div>
              </div>

              <div className="relative w-full h-full flex items-center justify-center group">
                <img
                  src={poster.src}
                  alt={poster.alt}
                  className="max-w-full max-h-full object-contain transition-all duration-700 group-hover:scale-105 sm:group-hover:scale-110"
                  style={{
                    filter: window.innerWidth < 640 
                      ? `drop-shadow(0 10px 20px rgba(0,0,0,0.4))`
                      : `drop-shadow(0 20px 40px rgba(0,0,0,0.5)) drop-shadow(0 0 20px rgba(220, 38, 38, 0.2))`,
                    borderRadius: window.innerWidth < 640 ? '8px' : '15px',
                    border: window.innerWidth < 640 ? '2px solid rgba(255,255,255,0.1)' : '3px solid rgba(255,255,255,0.15)',
                    boxShadow: window.innerWidth < 640 
                      ? `inset 0 0 10px rgba(255,255,255,0.05), 0 0 15px rgba(220, 38, 38, 0.2)`
                      : `inset 0 0 20px rgba(255,255,255,0.1), 0 0 30px rgba(220, 38, 38, 0.3)`
                  }}
                />
                
                {/* Enhanced Page Number - Responsive */}
                <div className={`absolute ${window.innerWidth < 640 ? 'bottom-4 right-4' : 'bottom-8 right-8'} bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white ${window.innerWidth < 640 ? 'px-3 py-1.5 text-sm' : 'px-6 py-3 text-xl'} font-bold shadow-lg sm:shadow-2xl border border-red-400/30 sm:border-2 sm:border-red-400/40 rounded-full backdrop-blur-sm`}>
                  <span className="relative z-10">{index + 1}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                </div>
                
                {/* Enhanced Poster Title - Responsive */}
                <div className={`absolute ${window.innerWidth < 640 ? 'top-4 left-4' : 'top-8 left-8'} bg-black/80 backdrop-blur-md text-white ${window.innerWidth < 640 ? 'px-3 py-1.5 text-xs' : 'px-6 py-3 text-base'} font-bold border border-white/20 sm:border-2 sm:border-white/30 rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl max-w-[60%] sm:max-w-none`}>
                  <span className="relative z-10 truncate sm:normal-case">{poster.alt}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent rounded-lg sm:rounded-xl"></div>
                </div>
                
                {/* Corner Decorations - Responsive */}
                {window.innerWidth >= 640 && (
                  <>
                    <div className="absolute top-6 right-6 w-4 h-4 bg-gradient-to-r from-red-600 to-red-500 rounded-full opacity-80 shadow-lg animate-pulse"></div>
                    <div className="absolute bottom-6 left-6 w-3 h-3 bg-gradient-to-r from-red-500 to-red-400 rounded-full opacity-80 shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </>
                )}
                
                {/* Page Corner Fold Effect - Desktop Only */}
                {window.innerWidth >= 768 && (
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-red-600/30 opacity-60"></div>
                )}
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              </div>
            </div>
          ))}
        </HTMLFlipBook>
        
        {/* Enhanced Instructions Panel - Responsive */}
        <div className="mt-8 sm:mt-12 md:mt-16 text-center px-4">
          <div className="bg-gradient-to-r from-red-600/30 to-red-500/30 backdrop-blur-xl border border-red-400/30 sm:border-2 sm:border-red-400/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-lg mx-auto shadow-xl sm:shadow-2xl">
            <div className="relative">
              <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 flex items-center justify-center">
                <span className="mr-2 sm:mr-3">🎸</span>
                <span className="text-sm sm:text-base md:text-lg">Álbum de Posters</span>
                <span className="ml-2 sm:ml-3">🎸</span>
              </h3>
              <p className="text-white/80 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                Haz clic y arrastra para voltear las páginas
              </p>
              <div className="flex justify-center space-x-2 sm:space-x-4 mb-3 sm:mb-4">
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-red-600 rounded-full animate-pulse shadow-lg"></div>
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-red-600 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-red-600 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <p className="text-white/60 text-xs sm:text-sm">
                Página {currentPage + 1} de {posters.length}
              </p>
            </div>
            
            {/* Panel Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 rounded-xl sm:rounded-2xl blur-xl scale-110 -z-10"></div>
          </div>
        </div>
        
        {/* Dynamic Page Indicator - Responsive */}
        <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center space-x-1 sm:space-x-2 px-4">
          {posters.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentPage 
                  ? 'bg-red-600 scale-125 shadow-lg' 
                  : 'bg-red-600/40 hover:bg-red-600/60'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Ambient Light Effects - Responsive */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-red-600/20 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-red-500/15 rounded-full blur-xl sm:blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default PosterAlbum; 