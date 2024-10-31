import { useEffect } from "react";
import { useModifiers } from "context/ModifierContext";
import { useUserContext } from "context/UserContext";
import { useUserSettings } from "context/UserSettingsContext";
import { useItems } from "context/ItemsContext";
import { useTrackedJobs } from "context/TrackedJobContext";
import { chartObjects } from "graphs/ChartObjects";
import { generateRandomId } from "utils/funcs";

const useLoad = (isAuthenticated) => {
  const { setPageModifiers } = useModifiers();
  const { setItems, addMultItems } = useItems();
  const { fetchCurrentUser } = useUserSettings();
  const { setAppearance, setColorScheme, setLabel } = useUserContext();
  const { setTrackedJobs } = useTrackedJobs();

  const chartObjectMap = chartObjects.reduce((acc, chartObject) => {
    acc[chartObject.type] = chartObject;
    return acc;
  }, {});

  const projectView = {
    items: [
      chartObjectMap["Status"],
      chartObjectMap["Cost Analysis"],
      chartObjectMap["Financial Overview"],
      chartObjectMap["Margin"],
      chartObjectMap["Budget Breakdown"],
      chartObjectMap["COGs Breakdown"],
      chartObjectMap["Sub Breakdown"],
      chartObjectMap["Material Breakdown"],
    ],
  };

  const initiateUserItems = () => {
    let items = [];
    projectView.items.forEach((item) => {
      const newItem = {
        id: generateRandomId(),
        type: item.type,
      };
      items.push(newItem);
    });
    addMultItems(items);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const settings = await fetchCurrentUser();
        setPageModifiers(settings.pageModifiers || { active: "Total" });
        setItems(settings.itemArray || []);
        if (!settings.itemArray) initiateUserItems();
        setLabel(settings.label || "always");
        setAppearance(settings.appearance || "dark");
        setColorScheme(settings.colorScheme || "Tranquil");
        setTrackedJobs(settings.trackedJobs || []);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };

    if (isAuthenticated) loadUser();
    //eslint-disable-next-line
  }, []);
};

export default useLoad;
