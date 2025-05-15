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
            ABOUT <span className="text-red-600">US</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-x-8'
            }`}>
              <div className="relative">
                <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/2955033/pexels-photo-2955033.jpeg" 
                    alt="Band performing live" 
                    className="object-cover w-full h-full rounded-sm shadow-2xl"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 h-full w-full border-2 border-red-600 rounded-sm -z-10"></div>
              </div>
            </div>
            
            <div className={`space-y-6 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100' : 'opacity-0 translate-x-8'
            }`}>
              <p className="text-gray-300 leading-relaxed">
                <span className="text-red-600 font-bold">Simples Mortales</span> emerged from a shared passion for the 
                unique sound and artistic vision of Deftones. Founded in 2020, our tribute band aims to capture the 
                essence of their music while adding our own interpretation.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We dive deep into the atmospheric textures, dynamic shifts, and emotional intensity that define 
                Deftones' distinctive sound. From the raw aggression of "Adrenaline" to the ethereal landscapes 
                of "Koi No Yokan," we strive to deliver an authentic and powerful experience.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our performances are more than just covers—they're a celebration of a band that has pushed the 
                boundaries of metal and alternative music for decades, influencing countless artists along the way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;