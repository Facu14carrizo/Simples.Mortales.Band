import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import Band from '../components/Band';
import Music from '../components/Music';
import Shows from '../components/Shows';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

function Home() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-black text-white"
      >
        <Hero />
        <About />
        <Band />
        <Music />
        <Shows />
        <Gallery />
        <Contact />
      </motion.div>
    </AnimatePresence>
  );
}

export default Home; 