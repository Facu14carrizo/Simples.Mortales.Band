import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Box, Eye } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
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

  // Determinar si estamos en la página del visualizador 3D
  const isViewerPage = location.pathname === '/viewer-3d';

  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

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
              link.href.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-red-500 transition-colors duration-300 font-medium tracking-wide"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-300 hover:text-red-500 transition-colors duration-300 font-medium tracking-wide"
                >
                  {link.name}
                </Link>
              )
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
              <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-red-400 electric-arc" style={{transform: 'translateX(-50%)'}}></div>
              <div className="absolute bottom-0 left-1/2 w-0.5 h-2 bg-red-400 electric-arc" style={{transform: 'translateX(-50%)', animationDelay: '0.5s'}}></div>
              <div className="absolute top-1/2 left-0 w-2 h-0.5 bg-red-400 electric-arc" style={{transform: 'translateY(-50%)', animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 right-0 w-2 h-0.5 bg-red-400 electric-arc" style={{transform: 'translateY(-50%)', animationDelay: '1.5s'}}></div>
              
              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 via-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="absolute inset-[1px] rounded-xl bg-gradient-to-r from-gray-900 via-black to-gray-900"></div>
              
              {/* Content */}
              <div className="relative flex items-center space-x-3 z-10">
                <div className="relative">
                  <div className="relative" style={{
                    transformStyle: 'preserve-3d',
                    perspective: '200px',
                    animation: 'cubeRotate 6s linear infinite'
                  }}>
                    <Box className="w-10 h-10 text-red-300" style={{
                      transform: 'rotateX(45deg) rotateY(45deg)',
                      filter: 'drop-shadow(0 0 15px rgba(220, 38, 38, 0.8))',
                      textShadow: '0 0 10px rgba(220, 38, 38, 0.6)',
                      animation: 'cubeGlow 3s ease-in-out infinite'
                    }} />
                    {/* Sombra simple */}
                    <div className="absolute inset-0 w-10 h-10 bg-red-900/30 rounded-sm" style={{
                      transform: 'rotateX(45deg) rotateY(45deg) translateZ(-5px)',
                      filter: 'blur(2px)'
                    }}></div>
                    {/* Borde brillante */}
                    <div className="absolute inset-0 w-10 h-10 border border-red-400/50 rounded-sm" style={{
                      transform: 'rotateX(45deg) rotateY(45deg) translateZ(1px)',
                      filter: 'blur(0.5px)',
                      animation: 'cubeGlow 2s ease-in-out infinite'
                    }}></div>
                  </div>
                  {/* Partículas flotantes alrededor del cubo */}
                  <div className="absolute -top-1 -left-1 w-1 h-1 bg-red-400 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
                  <div className="absolute -top-1 -right-1 w-1 h-1 bg-red-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-red-500 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                  <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-red-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
                  
                  <Eye className="w-7 h-7 absolute -top-3 -right-3 text-red-400 animate-pulse" />
                  <Eye className="w-6 h-6 absolute -bottom-2 -left-2 text-red-500 animate-pulse" style={{animationDelay: '0.7s'}} />
                  <div className="absolute -top-2 -left-2 w-3 h-3 bg-red-400 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
                  <div className="absolute -bottom-2 -right-2 w-2.5 h-2.5 bg-red-300 rounded-full animate-ping" style={{animationDelay: '0.8s'}}></div>
                </div>
                <span className="font-extrabold tracking-wider text-base uppercase text-white animate-pulse" style={{
                  textShadow: '0 0 10px rgba(220, 38, 38, 0.8), 0 0 20px rgba(220, 38, 38, 0.6), 0 0 30px rgba(220, 38, 38, 0.4)',
                  animation: 'pulse 2s ease-in-out infinite'
                }}>
                  3D Viewer
                </span>
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse energy-pulse"></div>
                <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
              
              {/* Hover Effects */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/30 to-red-500/0 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"></div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 shine-effect"></div>
              
              {/* Additional Glow Rings */}
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-red-500 via-red-600 to-red-500 opacity-0 group-hover:opacity-30 blur transition-opacity duration-500"></div>
              <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-red-400 via-red-500 to-red-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-700"></div>
              <div className="absolute -inset-3 rounded-xl bg-gradient-to-r from-red-300 via-red-400 to-red-300 opacity-0 group-hover:opacity-10 blur-lg transition-opacity duration-1000"></div>
              
              {/* Rotating Orbs */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin" style={{animationDuration: '3s'}}></div>
              <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-red-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-spin" style={{animationDuration: '2s', animationDirection: 'reverse'}}></div>
            </Link>
          </div>
          
          {/* Mobile Navigation Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-500 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen py-4' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-red-500 transition-colors py-2 border-b border-gray-800 font-medium tracking-wide"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-red-500 transition-colors py-2 border-b border-gray-800 font-medium tracking-wide"
                >
                  {link.name}
                </Link>
              )
            ))}
            
            {/* Mobile 3D Viewer Button */}
            <Link
              to="/viewer-3d"
              onClick={() => setIsOpen(false)}
              className="group relative inline-flex items-center justify-center px-4 py-3 overflow-hidden font-bold text-white transition-all duration-500 ease-out bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-lg shadow-xl hover:shadow-red-500/50 hover:scale-105 transform"
              style={{
                background: 'linear-gradient(45deg, #dc2626, #b91c1c, #991b1b, #dc2626)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 3s ease infinite',
                boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)',
              }}
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative flex items-center space-x-2 z-10">
                <Box className="w-4 h-4 animate-bounce" style={{animationDuration: '2s'}} />
                <span className="font-extrabold tracking-wider text-sm uppercase">
                  3D Viewer
                </span>
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;