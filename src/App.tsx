// src/App.tsx

import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FullGalleryPage from './pages/FullGalleryPage'
import Footer from './components/Footer'
import Viewer3DPage from './pages/Viewer3DPage'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-zinc-900">
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<FullGalleryPage />} />
        <Route path="/viewer-3d" element={<Viewer3DPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
