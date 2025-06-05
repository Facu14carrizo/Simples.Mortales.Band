import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Cubo simple para verificar que Three.js funciona
function Box() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="red" />
    </mesh>
  )
}

function Model({ modelPath }: { modelPath: string }) {
  const [error, setError] = useState<string | null>(null)
  
  try {
    console.log('Intentando cargar modelo:', modelPath)
    const gltf = useGLTF(modelPath)
    
    if (!gltf.scene) {
      console.error('No se pudo cargar la escena del modelo')
      return null
    }

    // Material simple y brillante
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide
    })

    // Aplicar material a todos los meshes
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material
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
        gap: '10px'
      }}>
        <button 
          onClick={() => setCurrentModel('box')}
          style={{
            padding: '8px 16px',
            background: currentModel === 'box' ? '#2196F3' : '#4CAF50',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer'
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
            cursor: 'pointer'
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
            cursor: 'pointer'
          }}
        >
          Púa
        </button>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          antialias: true,
          alpha: false
        }}
      >
        <ambientLight intensity={1} />
        
        {currentModel === 'box' ? (
          <Box />
        ) : (
          <Suspense fallback={null}>
            <Model modelPath={currentModel === 'duck' ? '/3dObjects/Basement/Duck.glb' : '/3dObjects/PuaSM3D.glb'} />
          </Suspense>
        )}
        
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          minDistance={1}
          maxDistance={10}
        />
      </Canvas>
    </div>
  )
}
