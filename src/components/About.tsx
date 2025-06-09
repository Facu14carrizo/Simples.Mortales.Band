import React, { useRef, useEffect, useState } from 'react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="min-h-screen relative bg-black"
    >
      {/* Title */}
      <div className="container mx-auto px-4 md:px-6 pt-24">
        <h2 className={`text-4xl md:text-5xl font-bold mb-12 text-white text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
        }`}>
          UN POCO <span className="text-red-600">DE NOSOTROS</span>
        </h2>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Image for mobile */}
        <div className="w-full px-4 mb-8">
          <img 
            src="src/resources/imgs/banda.jpg" 
            alt="Band performing live" 
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Content for mobile (below image) */}
        <div className="container mx-auto px-4 py-8">
          <div className={`space-y-6 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            <p className="text-white text-base leading-relaxed font-medium">
              <span className="text-red-600 font-bold text-xl">Simples Mortales</span> Surgió de una 
              pasión compartida por el sonido único y la visión artística de Deftones. 
              Fundada en 2023, nuestra banda tributo tiene como objetivo capturar la esencia de su música y 
              al mismo tiempo agregar nuestra propia interpretación.
            </p>
            <p className="text-white text-base leading-relaxed font-medium">
              Nos sumergimos profundamente en las texturas atmosféricas, los cambios dinámicos y la intensidad 
              emocional que definen el sonido distintivo de Deftones. Desde la cruda agresión de "Adrenaline" 
              hasta los paisajes etéreos invasivos de "White Pony", nos esforzamos por ofrecer una experiencia auténtica y poderosa.
            </p>
            <p className="text-white text-base leading-relaxed font-medium">
              Nuestras presentaciones son más que simples versiones: son una celebración de una banda que ha traspasado 
              los límites del metal y la música alternativa durante décadas, influyendo en innumerables artistas a lo 
              largo del camino.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block relative w-full">
        <img 
          src="src/resources/imgs/banda.jpg" 
          alt="Band performing live" 
          className="w-full h-auto object-contain"
        />
        
        {/* Content overlaid on the image (desktop only) */}
        <div className="absolute top-0 right-0 w-1/2 p-12">
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            <p className="text-white text-xl leading-relaxed font-semibold drop-shadow-lg">
              <span className="text-red-600 font-bold text-3xl">Simples Mortales</span> Surgió de una 
              pasión compartida por el sonido único y la visión artística de Deftones. 
              Fundada en 2023, nuestra banda tributo tiene como objetivo capturar la esencia de su música y 
              al mismo tiempo agregar nuestra propia interpretación.
            </p>
            <p className="text-white text-xl leading-relaxed font-semibold drop-shadow-lg">
              Nos sumergimos profundamente en las texturas atmosféricas, los cambios dinámicos y la intensidad 
              emocional que definen el sonido distintivo de Deftones. Desde la cruda agresión de "Adrenaline" 
              hasta los paisajes etéreos invasivos de "White Pony", nos esforzamos por ofrecer una experiencia auténtica y poderosa.
            </p>
            <p className="text-white text-xl leading-relaxed font-semibold drop-shadow-lg">
              Nuestras presentaciones son más que simples versiones: son una celebración de una banda que ha traspasado 
              los límites del metal y la música alternativa durante décadas, influyendo en innumerables artistas a lo 
              largo del camino.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;