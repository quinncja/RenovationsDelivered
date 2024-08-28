import { motion } from "framer-motion";
import { smartSortVariants } from "utils/animations";
import { saveSortSetting } from "utils/api";
import { useDashboardContext } from "context/DashboardContext";

function ToggleSort({ item }) {
  const { smartSort, setSmartSort } = useDashboardContext();

  const toggleSmartSort = async (input) => {
    const oldChoice = input;
    setSmartSort(input);
    try {
      await saveSortSetting(input);
    } catch (error) {
      setSmartSort(oldChoice);
    }
  };

  return (
    <motion.div className="setting">
      <div className="setting-header">
        {item.name}
        <div className="button-row">
          <motion.div
            className="button-overlay"
            variants={smartSortVariants}
            animate={smartSort}
            id={item.name}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            className={`setting-button ${smartSort === "true" && "active-button"}`}
            onClick={() => toggleSmartSort("true")}
          >
            {" "}
            On{" "}
          </button>
          <button
            className={`setting-button ${smartSort === "false" && "active-button"}`}
            onClick={() => toggleSmartSort("false")}
          >
            {" "}
            Off{" "}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ToggleSort;
