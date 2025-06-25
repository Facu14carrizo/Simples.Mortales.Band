import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// @ts-ignore
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

interface Viewer3DProps {
  modelPath: string;
}

const Viewer3D: React.FC<Viewer3DProps> = ({ modelPath }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [currentPuaDesign, setCurrentPuaDesign] = useState(0);
  const controlsRef = useRef<any>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const lightsRef = useRef<THREE.Light[]>([]);
  const magicParticlesRef = useRef<THREE.Points | null>(null);
  const magicLightsRef = useRef<THREE.Light[]>([]);
  const epicParticlesRef = useRef<THREE.Points | null>(null);
  const epicLightsRef = useRef<THREE.Light[]>([]);
  const energyWavesRef = useRef<THREE.Mesh[]>([]);
  const fireParticlesRef = useRef<THREE.Points | null>(null);
  const shockWavesRef = useRef<THREE.Mesh[]>([]);

  // Array de rutas de modelos de púas (por ahora solo el actual)
  const puaModels = [
    modelPath, // Modelo actual
    // Aquí agregarás más modelos más adelante
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Configuración de la escena mágica (nuevo modo normal)
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x000011);
    scene.fog = new THREE.Fog(0x000011, 10, 30);

    // Configuración de la cámara
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 6);

    // Renderer simplificado sin efectos post-procesamiento
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Controles
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = isAutoRotating;
    controls.autoRotateSpeed = 1.5;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.maxDistance = 15;
    controls.minDistance = 3;

    // Sistema de iluminación mágico (modo normal)
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);
    lightsRef.current.push(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    scene.add(mainLight);
    lightsRef.current.push(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);
    lightsRef.current.push(fillLight);

    const bottomLight = new THREE.DirectionalLight(0xffffff, 1.0);
    bottomLight.position.set(0, -3, 0);
    scene.add(bottomLight);
    lightsRef.current.push(bottomLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.5);
    frontLight.position.set(0, 0, 5);
    scene.add(frontLight);
    lightsRef.current.push(frontLight);

    // Luces adicionales para modo mágico normal
    const rimLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight1.position.set(3, 0, -3);
    scene.add(rimLight1);
    lightsRef.current.push(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    rimLight2.position.set(-3, 0, -3);
    scene.add(rimLight2);
    lightsRef.current.push(rimLight2);

    const topLight = new THREE.DirectionalLight(0xffffff, 1.0);
    topLight.position.set(0, 5, 0);
    scene.add(topLight);
    lightsRef.current.push(topLight);

    // Crear partículas mágicas (modo normal)
    const magicParticleCount = 1000;
    const magicParticles = new THREE.BufferGeometry();
    const magicPositions = new Float32Array(magicParticleCount * 3);
    const magicColors = new Float32Array(magicParticleCount * 3);
    const magicSizes = new Float32Array(magicParticleCount);

    for (let i = 0; i < magicParticleCount * 3; i += 3) {
      magicPositions[i] = (Math.random() - 0.5) * 40;
      magicPositions[i + 1] = (Math.random() - 0.5) * 40;
      magicPositions[i + 2] = (Math.random() - 0.5) * 40;

      // Colores mágicos (azules, púrpuras, dorados)
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        magicColors[i] = 0.2 + Math.random() * 0.8; // Azul
        magicColors[i + 1] = 0.2 + Math.random() * 0.6;
        magicColors[i + 2] = 0.8 + Math.random() * 0.2;
      } else if (colorChoice < 0.6) {
        magicColors[i] = 0.6 + Math.random() * 0.4; // Púrpura
        magicColors[i + 1] = 0.2 + Math.random() * 0.4;
        magicColors[i + 2] = 0.8 + Math.random() * 0.2;
      } else {
        magicColors[i] = 1.0; // Dorado
        magicColors[i + 1] = 0.8 + Math.random() * 0.2;
        magicColors[i + 2] = 0.2 + Math.random() * 0.4;
      }

      magicSizes[i / 3] = 0.05 + Math.random() * 0.15;
    }

    magicParticles.setAttribute('position', new THREE.BufferAttribute(magicPositions, 3));
    magicParticles.setAttribute('color', new THREE.BufferAttribute(magicColors, 3));
    magicParticles.setAttribute('size', new THREE.BufferAttribute(magicSizes, 1));

    const magicParticleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const magicParticleSystem = new THREE.Points(magicParticles, magicParticleMaterial);
    scene.add(magicParticleSystem);
    magicParticlesRef.current = magicParticleSystem;

    // Crear luces mágicas (modo normal)
    for (let i = 0; i < 8; i++) {
      const magicLight = new THREE.PointLight(0x00ffff, 2, 10);
      magicLight.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      scene.add(magicLight);
      magicLightsRef.current.push(magicLight);
    }

    // Cargador de modelos
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    // Función para cargar modelo
    const loadModel = (modelPath: string) => {
      setLoading(true);
      
      // Limpiar modelo anterior si existe
      scene.traverse((child: any) => {
        if (child.userData.isPuaModel) {
          scene.remove(child);
        }
      });

      loader.load(
        modelPath,
        (gltf: any) => {
          const model = gltf.scene;
          model.userData.isPuaModel = true;
          
          // Crear material que preserve las texturas originales
          model.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              
              // Crear un material que preserve las texturas originales
              if (child.material) {
                const newMaterial = new THREE.MeshStandardMaterial({
                  color: child.material.color || 0xffffff,
                  map: child.material.map,
                  normalMap: child.material.normalMap,
                  roughnessMap: child.material.roughnessMap,
                  metalnessMap: child.material.metalnessMap,
                  transparent: false,
                  opacity: 1.0,
                  roughness: 0.1, // Muy brillante para modo mágico
                  metalness: 0.8, // Muy metálico
                  envMapIntensity: 1.0 // Reflejos intensos
                });
                
                // Configurar las texturas si existen
                if (newMaterial.map) {
                  newMaterial.map.colorSpace = THREE.SRGBColorSpace;
                  newMaterial.map.flipY = false;
                }
                
                if (newMaterial.normalMap) {
                  newMaterial.normalMap.colorSpace = THREE.NoColorSpace;
                  newMaterial.normalMap.flipY = false;
                }
                
                child.material = newMaterial;
                child.material.needsUpdate = true;
              }
            }
          });
          
          // Centrar y escalar el modelo
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 4.5 / maxDim;
          model.scale.multiplyScalar(scale);
          
          model.position.sub(center.multiplyScalar(scale));
          
          // Rotación inicial
          model.rotation.y = Math.PI / 4;
          
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
    };

    // Cargar modelo inicial
    loadModel(puaModels[currentPuaDesign]);

    // Manejo de redimensionamiento
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Loop de renderizado con animaciones
    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Animar partículas mágicas normales
      if (magicParticlesRef.current) {
        const magicPositions = magicParticlesRef.current.geometry.attributes.position.array as Float32Array;
        
        for (let i = 0; i < magicPositions.length; i += 3) {
          magicPositions[i] += Math.sin(time + i) * 0.01;
          magicPositions[i + 1] += Math.cos(time + i) * 0.01;
          magicPositions[i + 2] += Math.sin(time + i * 0.5) * 0.01;
        }
        magicParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        magicParticlesRef.current.rotation.y += 0.01;
        magicParticlesRef.current.rotation.x += 0.005;
      }
      
      // Animar luces mágicas normales
      magicLightsRef.current.forEach((light, index) => {
        if (light instanceof THREE.PointLight) {
          light.position.x = Math.sin(time + index) * 5;
          light.position.y = Math.cos(time + index * 0.7) * 3;
          light.position.z = Math.sin(time + index * 0.5) * 5;
          light.intensity = 1 + Math.sin(time * 2 + index) * 0.5;
        }
      });
      
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Limpieza
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelPath]);

  // Efecto separado para manejar la rotación automática
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
    }
  }, [isAutoRotating]);

  // Efecto para cambiar modelo de púa
  useEffect(() => {
    if (sceneRef.current && puaModels[currentPuaDesign]) {
      // Recargar el modelo cuando cambie el diseño
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      setLoading(true);
      
      // Limpiar modelo anterior
      sceneRef.current.traverse((child: any) => {
        if (child.userData.isPuaModel) {
          sceneRef.current?.remove(child);
        }
      });

      loader.load(
        puaModels[currentPuaDesign],
        (gltf: any) => {
          const model = gltf.scene;
          model.userData.isPuaModel = true;
          
          // Configurar material
          model.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              
              if (child.material) {
                const newMaterial = new THREE.MeshStandardMaterial({
                  color: child.material.color || 0xffffff,
                  map: child.material.map,
                  normalMap: child.material.normalMap,
                  roughnessMap: child.material.roughnessMap,
                  metalnessMap: child.material.metalnessMap,
                  transparent: false,
                  opacity: 1.0,
                  roughness: 0.1,
                  metalness: 0.8,
                  envMapIntensity: 1.0
                });
                
                if (newMaterial.map) {
                  newMaterial.map.colorSpace = THREE.SRGBColorSpace;
                  newMaterial.map.flipY = false;
                }
                
                if (newMaterial.normalMap) {
                  newMaterial.normalMap.colorSpace = THREE.NoColorSpace;
                  newMaterial.normalMap.flipY = false;
                }
                
                child.material = newMaterial;
                child.material.needsUpdate = true;
              }
            }
          });
          
          // Centrar y escalar
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 4.5 / maxDim;
          model.scale.multiplyScalar(scale);
          
          model.position.sub(center.multiplyScalar(scale));
          model.rotation.y = Math.PI / 4;
          
          sceneRef.current?.add(model);
          setLoading(false);
        },
        (progress: any) => {
          const percent = (progress.loaded / progress.total * 100);
          setProgress(percent);
        },
        (error: any) => {
          console.error('Error al cargar el modelo:', error);
          setError('Error al cargar el modelo');
          setLoading(false);
        }
      );
    }
  }, [currentPuaDesign]);

  const toggleAutoRotation = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  const nextPuaDesign = () => {
    setCurrentPuaDesign((prev) => (prev + 1) % puaModels.length);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-red-900 via-red-800 to-black">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Overlay de controles */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={toggleAutoRotation}
          className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
            isAutoRotating 
              ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-500/50' 
              : 'bg-black/80 text-red-300 hover:bg-black/90 border border-red-600/50'
          }`}
        >
          {isAutoRotating ? '⏸️ Pausar Rotación' : '▶️ Auto Rotar'}
        </button>
        
        <button
          onClick={nextPuaDesign}
          className="px-4 py-2 rounded-lg font-bold transition-all duration-300 bg-black/80 text-red-300 hover:bg-black/90 border border-red-600/50"
        >
          🎸 Cambiar Púa ({currentPuaDesign + 1}/{puaModels.length})
        </button>
      </div>

      {/* Indicador de carga */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-red-800 rounded-full"></div>
              <div 
                className="absolute inset-0 border-4 border-transparent border-t-red-600 rounded-full animate-spin"
                style={{ animationDuration: '1s' }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl">🎸</div>
              </div>
            </div>
            <div className="text-white text-xl font-bold mb-2">Cargando Púa 3D</div>
            <div className="w-64 bg-red-900 rounded-full h-2 mx-auto">
              <div 
                className="bg-gradient-to-r from-red-600 to-red-800 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-red-300 mt-2">{Math.round(progress)}%</div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90">
          <div className="text-center">
            <div className="text-6xl mb-4">😞</div>
            <div className="text-white text-xl font-bold mb-2">Error al cargar</div>
            <div className="text-red-300">{error}</div>
          </div>
        </div>
      )}

      {/* Instrucciones */}
      <div className="absolute bottom-4 left-4 z-10 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white border border-red-600/30">
        <div className="text-sm">
          <div className="font-bold mb-2 text-red-400">🎮 Controles:</div>
          <div>• Click + arrastrar: Rotar</div>
          <div>• Rueda del mouse: Zoom</div>
          <div>• Click derecho + arrastrar: Mover</div>
          <div className="mt-2 text-red-400">🎸 Cambiar Púa: Diferentes diseños</div>
        </div>
      </div>
    </div>
  );
};

export default Viewer3D; 