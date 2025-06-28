import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(onComplete, 500); // Pequeña pausa para la animación
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-500 ${
      isComplete ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            <span className="text-red-600">SIMPLES</span> MORTALES
          </h1>
          <p className="text-gray-400 text-lg">Cargando...</p>
        </div>
        
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-gray-500 mt-4 text-sm">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};

export default Preloader; 