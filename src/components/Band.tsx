import React, { useRef, useEffect, useState } from 'react';

const bandMembers = [
  {
    name: 'Alejandro Soto',
    role: 'Vocals',
    image: 'https://images.pexels.com/photos/8133243/pexels-photo-8133243.jpeg',
    bio: 'Channeling the raw emotion and dynamic range of Chino Moreno with his own unique flair and intensity.'
  },
  {
    name: 'Marcos Ruiz',
    role: 'Guitar',
    image: 'https://images.pexels.com/photos/8108089/pexels-photo-8108089.jpeg',
    bio: 'Crafting the textured soundscapes and heavy riffs that form the backbone of our Deftones tribute.'
  },
  {
    name: 'Carlos Mendez',
    role: 'Bass',
    image: 'https://images.pexels.com/photos/8108559/pexels-photo-8108559.jpeg',
    bio: 'Providing the deep, resonant low end that drives our sound forward with precision and power.'
  },
  {
    name: 'Lucia Torres',
    role: 'Drums',
    image: 'https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg',
    bio: 'Behind the kit delivering the complex rhythms and thunderous beats that define our dynamic performances.'
  }
];

// Moved Daniel to a separate constant to control layout
const djMember = {
  name: 'Daniel Vega',
  role: 'DJ/Samples',
  image: 'https://images.pexels.com/photos/7887850/pexels-photo-7887850.jpeg',
  bio: 'Adding the electronic elements and atmospheric touches that complete our authentic Deftones sound.'
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
                <img 
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
              <img 
                src={djMember.image} 
                alt={djMember.name} 
                className="w-full aspect-[3/4] object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-xl font-bold mb-1">{djMember.name}</h3>
                <p className="text-red-500 font-medium text-sm mb-3">{djMember.role}</p>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {djMember.bio}
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