import { useUserContext } from "context/UserContext";
import { useUserSettings } from "context/UserSettingsContext";

function ToggleColorMode({ item }) {
  const { appearance, setAppearance } = useUserContext();
  const { saveAppearance } = useUserSettings();

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
    <div className="setting">
      <div className="setting-header">
        {item.name}
        <div className="button-row">
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
    </div>
  );
}

export default ToggleColorMode;
