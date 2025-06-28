// src/App.tsx

import React, { Suspense, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Preloader from './components/Preloader'

// Lazy loading para mejorar el rendimiento inicial
const Home = React.lazy(() => import('./pages/Home'))
const FullGalleryPage = React.lazy(() => import('./pages/FullGalleryPage'))
const Viewer3DPage = React.lazy(() => import('./pages/Viewer3DPage'))

// Componente de carga
const LoadingSpinner = () => (
  <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
  </div>
)

function App() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<FullGalleryPage />} />
          <Route path="/viewer-3d" element={<Viewer3DPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App
