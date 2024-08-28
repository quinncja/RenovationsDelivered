import { plus } from "business/svg";
import { motion } from "framer-motion";
import { newWidgetButtonVariants } from "utils/animations";

function NewWidgetButton({handleClick}) {

    return(
    <motion.button         
        initial="hidden"
        animate="visible"
        variants={newWidgetButtonVariants}
        onClick={handleClick}
        className="topbar-button" title="New Widget">
            {plus()}
    </motion.button>
    )
}

export default NewWidgetButton;