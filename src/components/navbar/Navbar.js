import Dropdown from "components/dropdown/Dropdown";
import React, { useState } from "react";
import { useCSSVariable } from "utils/hooks/useCSSVariable";
import { AnimatePresence, motion } from "framer-motion";
import { overlayVariants } from "utils/animations";
import Topbar from "components/topbar/Topbar";

function Navbar({ openSettings }) {
  const [expanded, setExpanded] = useState();
  const color = useCSSVariable("--overlay");
  const toggleDropdown = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Topbar />
      <Dropdown
        openSettings={openSettings}
        expanded={expanded}
        toggleSelf={toggleDropdown}
      />
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants(color)}
            className="open-widget-overlay"
            style={{ zIndex: 12 }}
            onClick={() => toggleDropdown()}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
