import React from 'react';
import Viewer3D from '../components/Viewer3D/Viewer3D';

const Viewer3DPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Visualizador 3D de la Púa</h1>
        <div className="aspect-w-16 aspect-h-9 w-full max-w-4xl mx-auto">
          <Viewer3D modelPath="/3dObjects/PuaSM3D.glb" />
        </div>
        <div className="mt-8 text-center">
          <p className="text-lg">
            Usa el mouse para rotar, la rueda para hacer zoom y mantén presionado el botón derecho para mover la cámara.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Viewer3DPage; 