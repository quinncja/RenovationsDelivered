import { motion } from "framer-motion";
import { close } from "../../business/svg";
import ToggleColorMode from "./ToggleColorMode";
import DropdownItem from "./DropdownItem";
import { settingWidgetVariants, overlayVariants } from "../../utils/animations";
import { useCSSVariable } from "../../utils/hooks/useCSSVariable";
import ToggleLabels from "./ToggleLabels";

function Settings({ closeSelf }) {
  const color = useCSSVariable("--overlay");

  const settings = [
    {
      name: "Appearance",
      type: "toggle",
    },
    {
      name: "Color Scheme",
      type: "dropdown",
    },
    // {
    //   name: "Smart Sort",
    //   type: "toggle",
    // <ToggleSort item={settings[2]} />
    // },
    {
      name: "Graph Details",
      type: "toggle",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={overlayVariants(color, 0)}
      className="open-widget-overlay"
      onClick={closeSelf}
    >
      <motion.div
        className="dashboard-widget setting-widget"
        variants={settingWidgetVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="widget-top setting-top">
          <div className="drag-handle-wrapper" />
          <motion.div className="widget-title">Settings</motion.div>
          <button className="x-button widget-item" onClick={closeSelf}>
            {close()}
          </button>
        </div>
        <div className="settings">
          <ToggleColorMode item={settings[0]} />
          <ToggleLabels item={settings[2]} />
          <DropdownItem item={settings[1]} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Settings;
