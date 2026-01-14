
import React from 'react';
import { motion } from 'framer-motion';

const WelcomeMessage = () => {
  return (
    <motion.p
      className='text-sm text-white leading-5 w-full text-center mt-4 opacity-50'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      Selecciona una opción para comenzar.
    </motion.p>
  );
};

export default WelcomeMessage;
