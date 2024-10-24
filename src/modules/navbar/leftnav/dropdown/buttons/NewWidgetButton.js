import { plus } from "business/svg";
import { useModalContext } from "context/ModalContext";
import { motion } from "framer-motion";
import { newWidgetButtonVariants } from "utils/animations";

function NewWidgetButton({ toggleExpanded }) {
  const { openModal } = useModalContext();

  const handleClick = () => {
    toggleExpanded();
    openModal("newWidget");
  };

  return (
    <motion.button
      initial="hidden"
      animate="visible"
      variants={newWidgetButtonVariants}
      onClick={handleClick}
      className="topbar-button"
      title="New Widget"
    >
      {plus()}
    </motion.button>
  );
}

export default NewWidgetButton;
