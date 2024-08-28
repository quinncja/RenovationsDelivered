import { motion } from "framer-motion";
import { labelVariants } from "utils/animations";
import { saveLabelSettings } from "utils/api";
import { useUserContext } from "context/UserContext";

function ToggleLabels({ item }) {
  const { label, setLabel } = useUserContext();

  const toggleLabel = async (input) => {
    const oldChoice = input;
    setLabel(input);
    try {
      await saveLabelSettings(input);
    } catch (error) {
      setLabel(oldChoice);
    }
  };

  return (
    <motion.div className="setting">
      <div className="setting-header">
        {item.name}
        <div className="button-row">
          <motion.div
            className="button-overlay triple-button"
            variants={labelVariants}
            animate={label}
            id={item.name}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            className={`setting-button ${label === "none" && "active-button"}`}
            onClick={() => toggleLabel("none")}
            title="Never show"
          >
            {" "}
            Never{" "}
          </button>
          <button
            className={`setting-button ${label === "open" && "active-button"}`}
            onClick={() => toggleLabel("open")}
            title="Show while open"
          >
            {" "}
            Open{" "}
          </button>

          <button
            className={`setting-button ${label === "always" && "active-button"}`}
            onClick={() => toggleLabel("always")}
            title="Always show"
          >
            {" "}
            Always{" "}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ToggleLabels;
