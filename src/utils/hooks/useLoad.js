import { useEffect } from "react";
import { useModifiers } from "context/ModifierContext";
import { useUserContext } from "context/UserContext";
import { useUserSettings } from "context/UserSettingsContext";
import { useTrackedJobs } from "context/TrackedJobContext";

const useLoad = (isAuthenticated) => {
  const { setPageModifiers } = useModifiers();
  const { fetchCurrentUser } = useUserSettings();
  const { setAppearance, setColorScheme, setLabel } = useUserContext();
  const { setTrackedJobs } = useTrackedJobs();

  useEffect(
    () => {
      const loadUser = async () => {
        try {
          const settings = await fetchCurrentUser();

          setPageModifiers(settings.pageModifiers || { active: "Total" });
          setLabel(settings.label || "always");
          setAppearance(settings.appearance || "dark");
          setColorScheme(settings.colorScheme || "Tranquil");
          setTrackedJobs(settings.trackedJobs || []);
        } catch (error) {
          console.error("Failed to load user:", error);
        }
      };

      if (isAuthenticated) {
        loadUser();
      }
    },
    //eslint-disable-next-line
    [isAuthenticated],
  );
};

export default useLoad;
