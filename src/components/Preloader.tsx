import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css'; // We’ll put some CSS there for the slash + text style

export const Preloader: React.FC = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Control how long the preloader stays on screen (e.g., 2.5 seconds).
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          className="preloader-container"
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* The slash element */}
          <div className="slash-design" />

          {/* The text (bottom-right), with a gentle upward fade-in motion */}
          <motion.h1
            className="preloader-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Rise Online
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
