import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { overlayVariants } from 'utils/animations';
import { useCSSVariable } from 'utils/hooks/useCSSVariable';

const Overlay = ({ isVisible, onClick, zIndex = 15 }) => {
const color = useCSSVariable("--overlay");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="overlay"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants(color, 0)}
          className="open-widget-overlay"
          style={{ zIndex: zIndex }}
          onClick={onClick}
        />
      )}
    </AnimatePresence>
  );
};

export default Overlay;
