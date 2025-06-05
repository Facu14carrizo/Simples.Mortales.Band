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
      { threshold: 0.2 }
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
      className="py-24 bg-zinc-900"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold mb-12 text-white text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            UN POCO <span className="text-red-600">DE NOSOTROS</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-x-8'
            }`}>
              <div className="relative">
                <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                  <img 
                    src="src/resources/imgs/banda.jpg" 
                    alt="Band performing live" 
                    className="object-cover w-full h-full rounded-xl shadow-2xl"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 h-full w-full border-2 border-red-600 rounded-sm -z-10"></div>
              </div>
            </div>
            
            <div className={`space-y-6 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-x-8'
            }`}>
              <p className="text-gray-300 leading-relaxed">
                <span className="text-red-600 font-bold">Simples Mortales</span> Surgió de una 
                pasión compartida por el sonido único y la visión artística de Deftones. 
                Fundada en 2023, nuestra banda tributo tiene como objetivo capturar la esencia de su música y 
                al mismo tiempo agregar nuestra propia interpretación.
              </p>
              <p className="text-gray-300 leading-relaxed">
              Nos sumergimos profundamente en las texturas atmosféricas, los cambios dinámicos y la intensidad 
              emocional que definen el sonido distintivo de Deftones. Desde la cruda agresión de "Adrenaline" 
              hasta los paisajes etéreos invasivos de "White Pony", nos esforzamos por ofrecer una experiencia auténtica y poderosa.
              </p>
              <p className="text-gray-300 leading-relaxed">
              Nuestras presentaciones son más que simples versiones: son una celebración de una banda que ha traspasado 
              los límites del metal y la música alternativa durante décadas, influyendo en innumerables artistas a lo 
              largo del camino.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;