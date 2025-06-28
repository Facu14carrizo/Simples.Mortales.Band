import React, { Suspense, useState, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Hook para detectar si es dispositivo móvil
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

// Cubo simple para verificar que Three.js funciona
function Box() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="red" />
    </mesh>
  )
}

function Model({ modelPath, isMobile }: { modelPath: string; isMobile: boolean }) {
  const [error, setError] = useState<string | null>(null)
  
  try {
    const gltf = useGLTF(modelPath)
    
    if (!gltf.scene) {
      console.error('No se pudo cargar la escena del modelo')
      return null
    }

    // Material optimizado para móviles
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    })

    // Aplicar material a todos los meshes
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material;
        // Optimizar geometría para móviles
        if (isMobile && child.geometry) {
          child.geometry.computeBoundingSphere();
          child.geometry.computeBoundingBox();
        }
      }
    })

    return <primitive object={gltf.scene} />
  } catch (err) {
    console.error('Error al cargar el modelo:', err)
    setError('Error al cargar el modelo')
    return null
  }
}

export default function GuitarPick3D() {
  const [currentModel, setCurrentModel] = useState<'box' | 'duck' | 'pua'>('box')
  const isMobile = useIsMobile();

  // Configuración optimizada para móviles
  const canvasConfig = useMemo(() => ({
    camera: { 
      position: [0, 0, isMobile ? 8 : 5] as [number, number, number], 
      fov: isMobile ? 35 : 45 
    },
    gl: { 
      antialias: !isMobile,
      alpha: false,
      powerPreference: "high-performance" as WebGLPowerPreference,
      stencil: false,
      depth: true
    }
  }), [isMobile]);

  // Reducir calidad en móviles
  const renderQuality = isMobile ? 0.5 : 1;

  return (
    <div style={{ 
      height: '100vh', 
      width: '100%', 
      backgroundColor: '#000',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.7)',
        padding: '10px',
        borderRadius: '5px',
        color: 'white',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={() => setCurrentModel('box')}
          style={{
            padding: '8px 16px',
            background: currentModel === 'box' ? '#2196F3' : '#4CAF50',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer',
            fontSize: isMobile ? '12px' : '14px'
          }}
        >
          Cubo
        </button>
        <button 
          onClick={() => setCurrentModel('duck')}
          style={{
            padding: '8px 16px',
            background: currentModel === 'duck' ? '#2196F3' : '#4CAF50',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer',
            fontSize: isMobile ? '12px' : '14px'
          }}
        >
          Pato
        </button>
        <button 
          onClick={() => setCurrentModel('pua')}
          style={{
            padding: '8px 16px',
            background: currentModel === 'pua' ? '#2196F3' : '#4CAF50',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer',
            fontSize: isMobile ? '12px' : '14px'
          }}
        >
          Púa
        </button>
      </div>

      <Canvas
        camera={canvasConfig.camera}
        gl={canvasConfig.gl}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={isMobile ? 0.8 : 1} />
        
        {currentModel === 'box' ? (
          <Box />
        ) : (
          <Suspense fallback={null}>
            <Model 
              modelPath={currentModel === 'duck' ? '/3dObjects/Basement/Duck.glb' : '/3dObjects/PuaSM3D.glb'} 
              isMobile={isMobile}
            />
          </Suspense>
        )}
        
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          minDistance={isMobile ? 2 : 1}
          maxDistance={isMobile ? 15 : 10}
          enableZoom={!isMobile}
          enablePan={!isMobile}
          enableRotate={true}
          autoRotate={isMobile}
          autoRotateSpeed={isMobile ? 0.5 : 0}
        />
      </Canvas>
    </div>
  )
}
