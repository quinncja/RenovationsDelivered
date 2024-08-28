import whiteLogo from "images/R-Only-White.png";
import blackLogo from "images/R-Only-Grey.png";
import { AnimatePresence, motion } from "framer-motion";
import { useUserContext } from "context/UserContext";
import { useState } from "react";
import { itemFadeIn, topbarVariants } from "utils/animations";
import UndoButton from "components/UndoButton";
import NewWidgetButton from "components/WidgetAdder/NewWidgetButton";
import { newWidgetButtonVariants } from "utils/animations";
import { useSystemMessage } from "../../context/SystemMessageContext";
import RedoButton from "components/RedoButton";
import Modifiers from "components/modifiers/Modifiers";
import { useDashboardContext } from "context/DashboardContext";

function Topbar() {
  const { appearance } = useUserContext();
  const { systemMessage } = useSystemMessage();
  const {setNewWidgetOpen} = useDashboardContext();
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const handleClick = () => {
    toggleExpanded();
    setNewWidgetOpen(true);
  };

  return (
    <>
      <div className="top-left-container">
        <motion.div
          className="nav-container"
          variants={topbarVariants}
          initial="initial"
          animate={expanded ? "expanded" : "initial"}
          exit="exit"
        >
          <img
            onClick={() => toggleExpanded()}
            src={appearance === "light" ? blackLogo : whiteLogo}
            className="logo nav-logo"
            alt="Renovations Delivered"
          />
          <AnimatePresence>
            {expanded && (
              <div className="topbar-flex">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={newWidgetButtonVariants}
                  className="divider-line"
                ></motion.div>
                <NewWidgetButton handleClick={handleClick} />
                <UndoButton />
                <RedoButton />
              </div>
            )}
          </AnimatePresence>
        </motion.div>
        <Modifiers />
      </div>
      <AnimatePresence>
        {systemMessage && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={itemFadeIn}
            className="system-message"
          >
            {systemMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Topbar;
