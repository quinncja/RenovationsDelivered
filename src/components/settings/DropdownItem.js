import { useState } from "react";
import { saveColorScheme } from "utils/api";
import { useUserContext } from "context/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import { burger } from "business/svg";
import ColorSchemePicker from "./ColorSchemePicker";

function DropdownItem({ item }) {
  const { colorScheme, setColorScheme } = useUserContext();
  const [open, setOpen] = useState(false);

  const handleColorChange = async (newChoice) => {
    const oldChoice = colorScheme;
    setColorScheme(newChoice);
    try {
      await saveColorScheme(newChoice);
    } catch (error) {
      setColorScheme(oldChoice);
    }
  };

  return (
    <motion.div className={`setting-wrapper`}>
      <button className={`dropdown-setting`} onClick={() => setOpen(!open)}>
        <div className="setting-header">
          {item.name}
          <div>{burger(open)}</div>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <ColorSchemePicker
            colorScheme={colorScheme}
            handleClick={handleColorChange}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default DropdownItem;
