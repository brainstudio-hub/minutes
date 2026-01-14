
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <>
      <Helmet>
        <title>BrainStudio Minutes - Análisis de Reuniones con IA</title>
        <meta name="description" content="Analiza reuniones y documentos con IA para generar reportes profesionales. Integración con Fireflies y análisis profundo." />
      </Helmet>
      
      <motion.header 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: 'easeOut' }} 
        className="w-full py-8 px-6 border-b border-purple-900/30"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ scale: 0.95 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 0.4, delay: 0.2 }} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/20 border border-purple-500/30 rounded-full mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            <span className="text-sm font-medium text-purple-200">
              BrainStudio · Minutas IA
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.3 }} 
            className="text-5xl md:text-6xl font-bold mb-4 tracking-tight"
          >
            <span className="text-white">BrainStudio</span>{' '}
            <span className="bg-gradient-to-r from-purple-400 to-violet-600 bg-clip-text text-transparent">
              Minutes
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.4 }} 
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            Herramienta integral para el procesamiento de transcripciones y documentos, generando resúmenes y análisis estratégicos impulsados por IA.
          </motion.p>
        </div>
      </motion.header>
    </>
  );
};
export default Header;
