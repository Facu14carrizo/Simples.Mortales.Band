// src/App.tsx

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Band from './components/Band'
import Music from './components/Music'
import Shows from './components/Shows'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Viewer3DPage from './pages/Viewer3DPage'

// Función para manejar el smooth scroll en enlaces internos
function smoothScrollHandler(e: Event) {
  e.preventDefault()
  const target = e.currentTarget as HTMLAnchorElement
  const targetId = target.getAttribute('href')
  if (!targetId) return
  const targetElement = document.querySelector(targetId)
  if (!targetElement) return
  window.scrollTo({
    top: targetElement.getBoundingClientRect().top + window.pageYOffset,
    behavior: 'smooth',
  })
}

function Home() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-black text-white"
      >
        <Navbar />
        <Hero />
        <About />
        <Band />
        <Music />
        <Shows />
        <Gallery />
        <Contact />
        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  const location = useLocation()

  useEffect(() => {
    document.title = 'Simples Mortales - Deftones Tribute Band'

    const anchors = document.querySelectorAll('a[href^="#"]')
    anchors.forEach(anchor => anchor.addEventListener('click', smoothScrollHandler))
    return () => {
      anchors.forEach(anchor => anchor.removeEventListener('click', smoothScrollHandler))
    }
  }, [])

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/viewer-3d" element={<Viewer3DPage />} />
    </Routes>
  )
}

export default App
