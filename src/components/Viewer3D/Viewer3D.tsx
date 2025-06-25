import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

interface Viewer3DProps {
  modelPath: string;
}

const Viewer3D: React.FC<Viewer3DProps> = ({ modelPath }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Configuración de la escena con fondo rojo/negro
    const scene = new THREE.Scene();
    // Fondo degradado rojo/negro
    scene.background = new THREE.Color(0x000000);
    
    // Fog con tonos rojos
    scene.fog = new THREE.Fog(0x1a0000, 8, 40);

    // Configuración de la cámara
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    // Renderer con configuración avanzada
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false, // Cambiado a false para usar el fondo de la escena
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Crear fondo degradado rojo/negro
    const createGradientBackground = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2;
      canvas.height = 512;
      const context = canvas.getContext('2d');
      
      if (context) {
        const gradient = context.createLinearGradient(0, 0, 0, 512);
        gradient.addColorStop(0, '#000000');     // Negro en la parte superior
        gradient.addColorStop(0.3, '#1a0000');   // Rojo muy oscuro
        gradient.addColorStop(0.6, '#330000');   // Rojo oscuro
        gradient.addColorStop(0.8, '#4d0000');   // Rojo medio oscuro
        gradient.addColorStop(1, '#660000');     // Rojo medio en la parte inferior
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, 2, 512);
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.mapping = THREE.EquirectangularReflectionMapping;
      
      return texture;
    };

    // Aplicar el fondo degradado
    const backgroundTexture = createGradientBackground();
    scene.background = backgroundTexture;

    // Post-processing con colores de la banda
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.8,  // intensidad aumentada para efecto rojo
      0.4,  // radio
      0.75  // umbral
    );
    composer.addPass(bloomPass);

    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * renderer.getPixelRatio());
    fxaaPass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * renderer.getPixelRatio());
    composer.addPass(fxaaPass);

    // Controles mejorados
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = isAutoRotating;
    controls.autoRotateSpeed = 2;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.maxDistance = 20;
    controls.minDistance = 2;

    // Sistema de iluminación con colores de la banda
    const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    scene.add(ambientLight);

    // Luz principal roja
    const mainLight = new THREE.DirectionalLight(0xdc2626, 1.2);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    scene.add(mainLight);

    // Luces de relleno con tonos rojos
    const fillLight1 = new THREE.DirectionalLight(0xef4444, 0.4);
    fillLight1.position.set(-5, 0, 5);
    scene.add(fillLight1);

    const fillLight2 = new THREE.DirectionalLight(0xb91c1c, 0.3);
    fillLight2.position.set(0, -5, -5);
    scene.add(fillLight2);

    // Luz puntual animada roja
    const pointLight = new THREE.PointLight(0xdc2626, 1.5, 10);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    // Sistema de partículas con colores rojos
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      // Colores rojos variados
      const redIntensity = 0.6 + Math.random() * 0.4; // 0.6 a 1.0
      colors[i] = redIntensity; // R
      colors[i + 1] = Math.random() * 0.3; // G (bajo)
      colors[i + 2] = Math.random() * 0.2; // B (muy bajo)
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Cargador de modelos
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    // Cargar modelo
    loader.load(
      modelPath,
      (gltf: any) => {
        const model = gltf.scene;
        
        // Configurar sombras para el modelo
        model.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Mejorar materiales con tonos rojos
            if (child.material) {
              child.material.envMapIntensity = 1.2;
              child.material.needsUpdate = true;
            }
          }
        });
        
        // Centrar y escalar el modelo
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.5 / maxDim;
        model.scale.multiplyScalar(scale);
        
        model.position.sub(center.multiplyScalar(scale));
        
        scene.add(model);
        setLoading(false);
      },
      (progress: any) => {
        const percent = (progress.loaded / progress.total * 100);
        setProgress(percent);
        console.log('Cargando:', percent + '%');
      },
      (error: any) => {
        console.error('Error al cargar el modelo:', error);
        setError('Error al cargar el modelo');
        setLoading(false);
      }
    );

    // Manejo de redimensionamiento
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
      
      fxaaPass.material.uniforms['resolution'].value.x = 1 / (width * renderer.getPixelRatio());
      fxaaPass.material.uniforms['resolution'].value.y = 1 / (height * renderer.getPixelRatio());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Loop de renderizado con animaciones
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animar partículas
      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.002;
        if (positions[i] > 10) positions[i] = -10;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;
      
      // Animar luz puntual roja
      const time = Date.now() * 0.001;
      pointLight.position.x = Math.sin(time) * 3;
      pointLight.position.z = Math.cos(time) * 3;
      
      // Rotar sistema de partículas
      particleSystem.rotation.y += 0.002;
      
      controls.update();
      composer.render();
    };
    animate();

    // Limpieza
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      composer.dispose();
    };
  }, [modelPath, isAutoRotating]);

  const toggleAutoRotation = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Overlay de controles con colores de la banda */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleAutoRotation}
          className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
            isAutoRotating 
              ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-500/50' 
              : 'bg-black/80 text-gray-300 hover:bg-black/90 border border-red-600/50'
          }`}
        >
          {isAutoRotating ? '⏸️ Pausar Rotación' : '▶️ Auto Rotar'}
        </button>
      </div>

      {/* Indicador de carga con colores de la banda */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
              <div 
                className="absolute inset-0 border-4 border-transparent border-t-red-600 rounded-full animate-spin"
                style={{ animationDuration: '1s' }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl">🎸</div>
              </div>
            </div>
            <div className="text-white text-xl font-bold mb-2">Cargando Púa 3D</div>
            <div className="w-64 bg-gray-800 rounded-full h-2 mx-auto">
              <div 
                className="bg-gradient-to-r from-red-600 to-red-800 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-gray-400 mt-2">{Math.round(progress)}%</div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90">
          <div className="text-center">
            <div className="text-6xl mb-4">😞</div>
            <div className="text-white text-xl font-bold mb-2">Error al cargar</div>
            <div className="text-gray-400">{error}</div>
          </div>
        </div>
      )}

      {/* Instrucciones con colores de la banda */}
      <div className="absolute bottom-4 left-4 z-10 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white border border-red-600/30">
        <div className="text-sm">
          <div className="font-bold mb-2 text-red-400">🎮 Controles:</div>
          <div>• Click + arrastrar: Rotar</div>
          <div>• Rueda del mouse: Zoom</div>
          <div>• Click derecho + arrastrar: Mover</div>
        </div>
      </div>
    </div>
  );
};

export default Viewer3D; 