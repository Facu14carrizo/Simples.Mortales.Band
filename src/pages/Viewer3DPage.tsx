import React, { useState } from 'react';
import Viewer3D from '../components/Viewer3D/Viewer3D';

const Viewer3DPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('viewer');

  return (
    <div className="min-h-screen viewer-background text-white relative overflow-hidden">
      {/* Efectos de fondo mejorados */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-900/30 via-red-800/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-t from-orange-900/30 via-orange-800/20 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-to-r from-red-600/10 via-transparent to-orange-600/10 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Partículas de fondo espectaculares */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Partículas principales */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Partículas grandes */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute w-2 h-2 bg-orange-400 rounded-full floating-particle-large"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${5 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Partículas brillantes */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`bright-${i}`}
            className="absolute w-1.5 h-1.5 bg-red-300 rounded-full floating-particle-bright"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Ondas de energía dinámicas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full energy-wave-large"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-orange-500/10 rounded-full energy-wave-medium" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-red-600/15 rounded-full energy-wave-small" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-orange-600/8 rounded-full energy-wave-large" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Efectos de fuego y energía */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-red-600/20 via-orange-500/10 to-transparent fire-effect"></div>
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-red-500/15 via-orange-400/8 to-transparent energy-field"></div>
      </div>

      {/* Líneas de energía */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`energy-line-${i}`}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-red-500/30 to-transparent energy-line"
            style={{
              left: `${(i + 1) * 12.5}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Efectos de partículas orbitales */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 orbital-particles">
          {[...Array(6)].map((_, i) => (
            <div
              key={`orbital-${i}`}
              className="absolute w-1 h-1 bg-red-400 rounded-full"
              style={{
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 orbital-particles-reverse">
          {[...Array(8)].map((_, i) => (
            <div
              key={`orbital-reverse-${i}`}
              className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full"
              style={{
                animationDelay: `${i * 0.4}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header espectacular mejorado */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-red-600 bg-clip-text text-transparent animate-pulse header-glow">
            🎸 Visualizador 3D de la Púa
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto text-shine-effect">
            Explora la púa de Simples Mortales en tres dimensiones con efectos visuales espectaculares
          </p>
        </div>

        {/* Tabs de navegación mejorados */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-2 border border-gray-700">
            <button
              onClick={() => setActiveTab('viewer')}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 tab-button ${
                activeTab === 'viewer'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/50 active'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              🎮 Visualizador 3D
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 tab-button ${
                activeTab === 'info'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-red-500/50 active'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              ℹ️ Información
            </button>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'viewer' && (
            <div className="space-y-6">
              {/* Contenedor del visualizador mejorado */}
              <div className="relative viewer-container bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden viewer-border shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10"></div>
                
                {/* Efectos de energía mejorados */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-red-500/20 rounded-full energy-wave"></div>
                  <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-orange-500/20 rounded-full energy-wave" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-red-600/20 rounded-full energy-wave" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-orange-600/25 rounded-full energy-wave" style={{ animationDelay: '1.5s' }}></div>
                </div>
                
                <div className="relative h-[70vh]">
                  <Viewer3D modelPath="/3dObjects/PuaSM3D.glb" />
                </div>
              </div>

              {/* Características destacadas mejoradas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="feature-card bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-all duration-300">
                  <div className="text-4xl mb-4 loading-pulse">🎸</div>
                  <h3 className="text-xl font-bold mb-2 text-red-400">Influencia Musical</h3>
                  <p className="text-gray-300">Deftones revolucionó el metal alternativo con su sonido único que mezcla agresión y atmósfera</p>
                </div>
                <div className="feature-card bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300">
                  <div className="text-4xl mb-4 loading-pulse" style={{ animationDelay: '0.5s' }}>🎵</div>
                  <h3 className="text-xl font-bold mb-2 text-orange-400">Discografía Legendaria</h3>
                  <p className="text-gray-300">Desde "Adrenaline" hasta "Ohms", cada álbum es una obra maestra de innovación musical</p>
                </div>
                <div className="feature-card bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-600 transition-all duration-300">
                  <div className="text-4xl mb-4 loading-pulse" style={{ animationDelay: '1s' }}>🔥</div>
                  <h3 className="text-xl font-bold mb-2 text-red-500">Legado Cultural</h3>
                  <p className="text-gray-300">Su impacto trasciende la música, influenciando generaciones de artistas y fans en todo el mundo</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent header-glow">
                🎸 Sobre la Púa de Simples Mortales
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-red-400">🎯 Características Técnicas</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <span className="text-red-400 mr-2">•</span>
                      Modelo 3D de alta resolución
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-400 mr-2">•</span>
                      Texturas detalladas y realistas
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-400 mr-2">•</span>
                      Optimizado para web con Draco
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-400 mr-2">•</span>
                      Compatible con dispositivos móviles
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-orange-400">🎨 Efectos Visuales</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <span className="text-orange-400 mr-2">•</span>
                      Post-processing avanzado
                    </li>
                    <li className="flex items-center">
                      <span className="text-orange-400 mr-2">•</span>
                      Efectos de bloom y antialiasing
                    </li>
                    <li className="flex items-center">
                      <span className="text-orange-400 mr-2">•</span>
                      Sistema de partículas dinámico
                    </li>
                    <li className="flex items-center">
                      <span className="text-orange-400 mr-2">•</span>
                      Iluminación HDR y sombras suaves
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl border border-red-500/30">
                <h3 className="text-xl font-bold mb-4 text-center text-red-400">🎮 Cómo Usar el Visualizador</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl mb-2 loading-pulse">🖱️</div>
                    <div className="font-bold text-white">Rotar</div>
                    <div className="text-sm text-gray-400">Click + arrastrar</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-2 loading-pulse" style={{ animationDelay: '0.3s' }}>🔍</div>
                    <div className="font-bold text-white">Zoom</div>
                    <div className="text-sm text-gray-400">Rueda del mouse</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-2 loading-pulse" style={{ animationDelay: '0.6s' }}>📱</div>
                    <div className="font-bold text-white">Mover</div>
                    <div className="text-sm text-gray-400">Click derecho + arrastrar</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Viewer3DPage; 