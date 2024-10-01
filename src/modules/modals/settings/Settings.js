import { close } from "../../../business/svg";
import ToggleColorMode from "./ToggleColorMode";
import DropdownItem from "./DropdownItem";
// import ToggleLabels from "./ToggleLabels";

function Settings({ closeSelf }) {
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
    // {
    //   name: "Graph Details",
    //   type: "toggle",
    // },
  ];

  return (
    <div
      className="dashboard-widget setting-widget"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="widget-top setting-top">
        <div className="drag-handle-wrapper" />
        <div className="widget-title">Settings</div>
        <button className="x-button widget-item" onClick={closeSelf}>
          {close()}
        </button>
      </div>
      <div className="settings">
        <ToggleColorMode item={settings[0]} />
        {/* <ToggleLabels item={settings[2]} /> */}
        <DropdownItem item={settings[1]} />
      </div>
    </div>
  );
}

export default Settings;
