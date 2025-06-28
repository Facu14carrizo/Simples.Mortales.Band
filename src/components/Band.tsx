import React, { useRef, useEffect, useState } from 'react';

const bandMembers = [
  {
    name: 'Gabo',
    role: 'Vocals',
    image: '/src/resources/imgs/gabo.jpg',
    bio: 'Canalizando la emoción cruda y el rango dinámico de Chino Moreno con su propio estilo e intensidad únicos.'
  },
  {
    name: 'Agustin',
    role: 'Guitar I',
    image: '/src/resources/imgs/agus.jpg',
    bio: 'Creando paisajes sonoros texturizados y riffs pesados ​​que forman la columna vertebral de nuestro sonido.'
  },
  {
    name: 'Ivan',
    role: 'Drums',
    image: '/src/resources/imgs/ivan.jpg',
    bio: 'Detrás del beat, que ofrece los ritmos complejos y atronadores que definen nuestras actuaciones dinámicas.'
  },
  {
    name: 'Facu',
    role: 'Bass',
    image: '/src/resources/imgs/facu.jpg',
    bio: 'Proporciona los graves profundos y resonantes que impulsan nuestro sonido con precisión y potencia.'
  }
];

// Espacio para musico adicional
const featured = {
  name: 'Marto',
  role: 'Guitar II',
  image: '/src/resources/imgs/marto.jpg',
  bio: 'Dando forma a las texturas en capas y riffs poderosos que agregan profundidad e intensidad a nuestro sonido característico.'
};

// Componente de imagen optimizada
const OptimizedImage: React.FC<{ src: string; alt: string; className: string }> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`${className} bg-gray-800 flex items-center justify-center`}>
        <span className="text-gray-400 text-sm">Error al cargar imagen</span>
      </div>
    );
  }

  return (
    <>
      {!isLoaded && (
        <div className={`${className} bg-gray-800 animate-pulse`} />
      )}
      <img 
        src={src} 
        alt={alt} 
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
      />
    </>
  );
};

const Band: React.FC = () => {
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
      id="band" 
      ref={sectionRef}
      className="py-24 bg-black"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className={`text-3xl md:text-4xl font-bold mb-16 text-white text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
        }`}>
          THE <span className="text-red-600">BAND</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Main band members */}
          {bandMembers.map((member, index) => (
            <div 
              key={member.name}
              className={`relative group transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="overflow-hidden rounded-sm">
                <OptimizedImage 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full aspect-[3/4] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-red-500 font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Empty column for spacing on larger screens */}
          <div className="hidden lg:block"></div>

          {/* DJ member positioned on the right */}
          <div 
            className={`relative group transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '750ms' }}
          >
            <div className="overflow-hidden rounded-sm">
              <OptimizedImage 
                src={featured.image} 
                alt={featured.name} 
                className="w-full aspect-[3/4] object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-xl font-bold mb-1">{featured.name}</h3>
                <p className="text-red-500 font-medium text-sm mb-3">{featured.role}</p>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {featured.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Band;