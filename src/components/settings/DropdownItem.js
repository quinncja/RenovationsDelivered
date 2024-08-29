import { useState } from "react";
import { useUserContext } from "context/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import { burger } from "business/svg";
import ColorSchemePicker from "./ColorSchemePicker";
import { useUserSettings } from "context/UserSettingsContext";

function DropdownItem({ item }) {
  const { colorScheme, setColorScheme } = useUserContext();
  const { saveColorScheme } = useUserSettings();
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
