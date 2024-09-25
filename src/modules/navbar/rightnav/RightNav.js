import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { burger } from "business/svg";
import { dropdownVariants } from "utils/animations";
import Dropdown from "./Dropdown";
import Overlay from "modules/modals/Overlay";


function RightNav() {
  const [expanded, setExpanded] = useState(false)

  const toggleSelf = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <> 
      <motion.div
        id="dropdown"
        variants={dropdownVariants}
        animate={expanded ? "expanded" : "initial"}
        style={{zIndex: 15}}
        className="nc-right"
      >
        <button
          className={`dropdown-button ${expanded ? "dropdown-button-open" : ""}`}
          onClick={toggleSelf}
        >
          {burger(expanded)}
        </button>
        <AnimatePresence>
          {expanded && <Dropdown toggleSelf={toggleSelf}/> }
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {expanded && (
          <Overlay isVisible={true} onClick={toggleSelf} zIndex={12} />
        )}
      </AnimatePresence>
    </>
  );
}

export default RightNav;
