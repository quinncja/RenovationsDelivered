import { AnimatePresence, motion } from "framer-motion";
import { useSystemMessage } from "context/SystemMessageContext";
import { itemFadeIn } from "utils/animations";

function SystemMessage(){
    const { systemMessage } = useSystemMessage();

    return(
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
    )
}

export default SystemMessage;