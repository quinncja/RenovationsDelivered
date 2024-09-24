import { useUserSettings } from "context/UserSettingsContext";

function SettingsLoading() {
  const { isLoading } = useUserSettings();

  if (isLoading) {
    return <div className="settings-loading"> </div>;
  }
}

export default SettingsLoading;
