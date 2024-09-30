import { UndoSvg } from "business/svg";
import { useHistory } from "context/HistoryContext";
import { AnimatePresence, motion } from "framer-motion";
import { undoVariants } from "utils/animations";

function UndoButton() {
  const { undoActive, handleUndo } = useHistory();

  return (
    <AnimatePresence>
      <motion.button
        title="Undo"
        initial="hidden"
        animate="visible"
        variants={undoVariants}
        onClick={() => handleUndo()}
        className={`topbar-button ${!undoActive && "topbar-button-disabled"}`}
      >
        {UndoSvg()}
      </motion.button>
    </AnimatePresence>
  );
}

export default UndoButton;
