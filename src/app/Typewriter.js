import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Typewriter = ({ text, style, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [callbackCalled, setCallbackCalled] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const randomDelay = Math.random() * 120 + 80;

      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, randomDelay);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
    }
  }, [currentIndex, text, isComplete]);

  useEffect(() => {
    if (isComplete && !callbackCalled) {
      const callbackTimer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
        setCallbackCalled(true);
      }, 650);

      return () => clearTimeout(callbackTimer);
    }
  }, [isComplete, callbackCalled, onComplete]);

  const cursor = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.h3
      style={{
        ...style,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span>{displayedText}</span>
      <motion.span
        variants={cursor}
        initial="hidden"
        animate="visible"
        style={{
          display: "inline-block",
          backgroundColor: "currentColor",
          width: "2px",
          height: "1.1em",
          marginLeft: "3px",
        }}
      />
    </motion.h3>
  );
};

export default Typewriter;
