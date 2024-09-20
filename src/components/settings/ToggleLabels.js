import { useUserContext } from "context/UserContext";
import { useUserSettings } from "context/UserSettingsContext";

function ToggleLabels({ item }) {
  const { label, setLabel } = useUserContext();
  const { saveLabelSettings } = useUserSettings();

  const toggleLabel = async (input) => {
    const oldInput = input;
    setLabel(input);
    try {
      await saveLabelSettings(input);
    } catch (error) {
      setLabel(oldInput);
    }
  };

  return (
    <div className="setting">
      <div className="setting-header">
        {item.name}
        <div className="button-row">
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
    </div>
  );
}

export default ToggleLabels;
