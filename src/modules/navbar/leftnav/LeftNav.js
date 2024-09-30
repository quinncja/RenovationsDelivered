import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { topbarVariants } from "utils/animations";
import { Modifiers } from "modules/navbar/leftnav/Modifiers";
import Dropdown from "./dropdown/Dropdown";
import Logo from "./Logo";

function LeftNav() {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="top-left-container">
      <motion.div
        className="nav-container"
        variants={topbarVariants}
        initial="initial"
        animate={expanded ? "expanded" : "initial"}
        exit="exit"
      >
        <Logo expanded={expanded} toggleExpanded={toggleExpanded} />
        <AnimatePresence>
          {expanded && <Dropdown toggleExpanded={toggleExpanded} />}
        </AnimatePresence>
      </motion.div>
      <Modifiers />
    </div>
  );
}

export default LeftNav;
