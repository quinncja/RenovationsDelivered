import NewWidgetButton from "modules/navbar/leftnav/dropdown/buttons/NewWidgetButton";
import { newWidgetButtonVariants } from "utils/animations";
import UndoButton from "modules/navbar/leftnav/dropdown/buttons/UndoButton";
import RedoButton from "modules/navbar/leftnav/dropdown/buttons/RedoButton";
import { motion } from "framer-motion";

function Dropdown({toggleExpanded}){
    return(
        <div className="topbar-flex">
            <motion.div
            initial="hidden"
            animate="visible"
            variants={newWidgetButtonVariants}
            className="divider-line"
            ></motion.div>
            <NewWidgetButton toggleExpanded={toggleExpanded} />
            <UndoButton />
            <RedoButton />
        </div>
    )
}
export default Dropdown;