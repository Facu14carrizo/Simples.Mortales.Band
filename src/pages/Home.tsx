import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy loading para componentes pesados
const Hero = React.lazy(() => import('../components/Hero'));
const About = React.lazy(() => import('../components/About'));
const Band = React.lazy(() => import('../components/Band'));
const Music = React.lazy(() => import('../components/Music'));
const Shows = React.lazy(() => import('../components/Shows'));
const Gallery = React.lazy(() => import('../components/Gallery'));
const Contact = React.lazy(() => import('../components/Contact'));

// Componente de carga para secciones
const SectionLoader = () => (
  <div className="py-24 bg-black flex items-center justify-center">
    <div className="animate-pulse bg-gray-800 h-64 w-full max-w-4xl rounded"></div>
  </div>
);

function Home() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-black text-white"
      >
        <Suspense fallback={<SectionLoader />}>
          <Hero />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Band />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Music />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Shows />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Gallery />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default Home; 