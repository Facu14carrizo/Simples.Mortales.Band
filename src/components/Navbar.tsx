import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Box, Eye } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Container, Engine } from "tsparticles-engine";

const navLinks = [
  { name: 'Inicio', href: '#home' },
  { name: 'Nosotros', href: '#about' },
  { name: 'Band', href: '#band' },
  { name: 'Music', href: '#music' },
  { name: 'Shows', href: '#shows' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contacto', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const location = useLocation();
  const navigate = useNavigate();

  // Determinar si estamos en la página del visualizador 3D
  const isViewerPage = location.pathname === '/viewer-3d';

  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  // Función para manejar la navegación desde la página del visualizador
  const handleNavigation = (href: string) => {
    if (isViewerPage) {
      // Si estamos en la página del visualizador, navegar a la página principal con el ancla
      navigate(`/${href}`);
    }
    // Si no estamos en la página del visualizador, el comportamiento normal funcionará
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <nav 
      className={`${isViewerPage ? 'relative' : 'fixed'} w-full z-50 transition-all duration-300 ${
        scrolled && !isViewerPage
          ? 'bg-black/90 backdrop-blur-md py-3 shadow-xl'
          : isViewerPage
          ? 'bg-black/95 backdrop-blur-md py-4 shadow-xl'
          : 'bg-transparent py-6'
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 60,
            particles: {
              color: {
                value: "#ff0000",
              },
              links: {
                color: "#ff0000",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 20,
              },
              opacity: {
                value: 0.3,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black via-red-900/20 to-black opacity-80"
          style={{
            transform: `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * 5}deg) rotateY(${(mousePosition.x - 0.5) * 5}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-white font-extrabold text-xl md:text-2xl tracking-wider"
          >
            TRIBUTO A DEFTONES
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.href)}
                className="text-gray-300 hover:text-red-500 transition-colors duration-300 font-medium tracking-wide"
              >
                {link.name}
              </button>
            ))}
            
            {/* 3D Viewer Button - Extremely Impressive */}
            <Link
              to="/viewer-3d"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white transition-all duration-500 ease-out bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-xl shadow-2xl hover:shadow-red-500/50 hover:scale-110 transform hover:-translate-y-2 btn-3d-viewer"
              style={{
                background: 'linear-gradient(45deg, #dc2626, #b91c1c, #991b1b, #dc2626)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 3s ease infinite, glow 2s ease-in-out infinite alternate',
                boxShadow: '0 0 40px rgba(220, 38, 38, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
            >
              {/* Animated Background Particles */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-transparent to-red-500/30 animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-2 left-2 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                  <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-red-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-4 left-6 w-1 h-1 bg-red-500 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                  <div className="absolute bottom-6 right-3 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
                  <div className="absolute top-1/2 left-2 w-1 h-1 bg-red-300 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
                  <div className="absolute top-1/2 right-2 w-1 h-1 bg-red-500 rounded-full animate-ping" style={{animationDelay: '0.8s'}}></div>
                </div>
              </div>
              
              {/* Energy Waves Effect */}
              <div className="absolute inset-0 rounded-xl">
                <div className="absolute inset-0 border-2 border-red-500/30 rounded-xl animate-ping wave-expand" style={{animationDuration: '2s'}}></div>
                <div className="absolute inset-0 border border-red-400/50 rounded-xl animate-ping wave-expand" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
                <div className="absolute inset-0 border border-red-300/40 rounded-xl animate-ping wave-expand" style={{animationDuration: '4s', animationDelay: '2s'}}></div>
              </div>
              
              {/* Floating Energy Particles */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="particle w-1 h-1 top-4 left-4 particle-float" style={{animationDelay: '0s'}}></div>
                <div className="particle w-1.5 h-1.5 top-6 right-6 particle-float" style={{animationDelay: '1s'}}></div>
                <div className="particle w-1 h-1 bottom-4 left-6 particle-float" style={{animationDelay: '2s'}}></div>
                <div className="particle w-1.5 h-1.5 bottom-6 right-3 particle-float" style={{animationDelay: '3s'}}></div>
                <div className="particle w-1 h-1 top-1/2 left-2 particle-float" style={{animationDelay: '0.5s'}}></div>
                <div className="particle w-1 h-1 top-1/2 right-2 particle-float" style={{animationDelay: '1.5s'}}></div>
              </div>
              
              {/* Electric Arc Effects */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="electric-arc arc-1"></div>
                <div className="electric-arc arc-2"></div>
                <div className="electric-arc arc-3"></div>
              </div>
              
              {/* Glowing Border */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 animate-pulse"></div>
              
              {/* Text with Glow */}
              <span className="relative z-10 text-shadow-glow">
                <Eye className="inline-block w-5 h-5 mr-2 animate-pulse" />
                3D VIEWER
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-500 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    handleNavigation(link.href);
                    setIsOpen(false);
                  }}
                  className="text-gray-300 hover:text-red-500 transition-colors duration-300 font-medium tracking-wide text-left"
                >
                  {link.name}
                </button>
              ))}
              
              {/* Mobile 3D Viewer Button */}
              <Link
                to="/viewer-3d"
                onClick={() => setIsOpen(false)}
                className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white transition-all duration-500 ease-out bg-gradient-to-r from-red-600 to-red-800 rounded-lg shadow-xl hover:shadow-red-500/50 hover:scale-105 transform"
              >
                <Eye className="inline-block w-4 h-4 mr-2" />
                3D VIEWER
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;