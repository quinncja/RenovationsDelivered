import React from "react";
import { motion } from "framer-motion";
import { overlayVariants } from "@shared/utils/animations";
import { useCSSVariable } from "@shared/hooks/useCSSVariable";

const Overlay = ({ isVisible, onClick, zIndex = 15 }) => {
  const color = useCSSVariable("--overlay");

  return (
    isVisible && (
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
    )
  );
};

export default Overlay;
