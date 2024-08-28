import { saveAppearance } from "utils/api";
import { useUserContext } from "context/UserContext";
import { motion } from "framer-motion";
import { toggleVariants } from "utils/animations";

function ToggleColorMode({ item }) {
  const { appearance, setAppearance } = useUserContext();

  const handleAppearanceChange = async (newChoice) => {
    const oldChoice = appearance;
    setAppearance(newChoice);
    try {
      await saveAppearance(newChoice);
    } catch (error) {
      setAppearance(oldChoice);
    }
  };

  return (
    <motion.div className="setting">
      <div className="setting-header">
        {item.name}
        <div className="button-row">
          <motion.div
            className="button-overlay"
            variants={toggleVariants}
            animate={appearance}
            id={item.name}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            className={`setting-button ${appearance === "dark" && "active-button"}`}
            onClick={() => handleAppearanceChange("dark")}
          >
            {" "}
            Dark{" "}
          </button>
          <button
            className={`setting-button ${appearance === "light" && "active-button"}`}
            onClick={() => handleAppearanceChange("light")}
          >
            {" "}
            Light{" "}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ToggleColorMode;
