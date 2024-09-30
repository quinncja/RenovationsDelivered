import { redoSvg } from "business/svg";
import { useHistory } from "context/HistoryContext";
import { AnimatePresence, motion } from "framer-motion";
import { undoVariants } from "utils/animations";

function RedoButton() {
  const { redoActive, handleRedo } = useHistory();

  return (
    <AnimatePresence>
      <motion.button
        title="Redo"
        initial="hidden"
        animate="visible"
        variants={undoVariants}
        onClick={() => handleRedo()}
        className={`topbar-button mirrored ${!redoActive && "topbar-button-disabled"}`}
      >
        {redoSvg()}
      </motion.button>
    </AnimatePresence>
  );
}

export default RedoButton;
