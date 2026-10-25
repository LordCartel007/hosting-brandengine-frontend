import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingSpinner = () => {
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = document.getElementById('loaderVideo');

    if (!video) return;

    const handleReady = () => {
      setVideoReady(true);
    };

    const handleError = () => {
      setVideoReady(false);
    };

    video.addEventListener('canplay', handleReady);
    video.addEventListener('playing', handleReady);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('canplay', handleReady);
      video.removeEventListener('playing', handleReady);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="loading-container">
      {/* Spinner */}
      <AnimatePresence>
        {!videoReady && (
          <motion.div
            className="brand-spinner"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="spinner-ring"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <motion.div
              className="spinner-core"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading video */}
      <video autoPlay muted loop playsInline id="loaderVideo">
        <source
          src="https://assets.lordcartel.com/carousel/neon-loading.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default LoadingSpinner;
