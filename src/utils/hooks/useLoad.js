import { useEffect, useMemo, useCallback } from 'react';
import { useModifiers } from "context/ModifierContext";
import { useUserContext } from "context/UserContext";
import { useUserSettings } from "context/UserSettingsContext";
import { useItems } from "context/ItemsContext";
import { useTrackedJobs } from "context/TrackedJobContext";
import { chartObjects } from "graphs/ChartObjects";
import { generateRandomId } from "utils/funcs";
import useIsAdmin from "./useIsAdmin";

const useLoad = (isAuthenticated) => {
  const { setPageModifiers } = useModifiers();
  const { addMultItems, setItems } = useItems();
  const { fetchCurrentUser } = useUserSettings();
  const { setAppearance, setColorScheme, setLabel } = useUserContext();
  const { setTrackedJobs } = useTrackedJobs();
  const isAdmin = useIsAdmin();

  const chartObjectMap = useMemo(() => {
    return chartObjects.reduce((acc, chartObject) => {
      acc[chartObject.type] = chartObject;
      return acc;
    }, {});
  }, []);

  const adminView = useMemo(() => ({
    items: [
      chartObjectMap["Client Breakdown"]
    ]
  }), [chartObjectMap]);

  const projectView = useMemo(() => ({
    items: [
      chartObjectMap["Status"],
      chartObjectMap["Cost Analysis"],
      chartObjectMap["Financial Overview"],
      chartObjectMap["Margin"],
      chartObjectMap["Budget Breakdown"],
      chartObjectMap["COGs Breakdown"],
      chartObjectMap["Sub Breakdown"],
      chartObjectMap["Material Breakdown"],
      chartObjectMap["Change Orders"],
    ],
  }), [chartObjectMap]);

  const getMissingAdminItems = useCallback((userItems) => {
    const userItemTypes = new Set(userItems.map(item => item.type));
    return adminView.items
      .filter(adminItem => !userItemTypes.has(adminItem.type))
      .map(adminItem => ({
        id: generateRandomId(),
        type: adminItem.type,
      }));
  }, [adminView.items]);

  const getMissingProjectItems = useCallback((userItems) => {
    const userItemTypes = new Set(userItems.map(item => item.type));
    return projectView.items
      .filter(projectItem => !userItemTypes.has(projectItem.type))
      .map(projectItem => ({
        id: generateRandomId(),
        type: projectItem.type,
      }));
  }, [projectView.items]);

  const processUserItems = useCallback((existingItems) => {
    let itemsToAdd = [...existingItems];

    const missingProjectItems = getMissingProjectItems(existingItems);
    itemsToAdd = [...itemsToAdd, ...missingProjectItems];

    if (isAdmin) {
      const missingAdminItems = getMissingAdminItems(existingItems);
      itemsToAdd = [...itemsToAdd, ...missingAdminItems];
    }

    if (itemsToAdd.length > 0) setItems(itemsToAdd);
    //eslint-disable-next-line
  }, [getMissingProjectItems, getMissingAdminItems, isAdmin, addMultItems]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const settings = await fetchCurrentUser();

        setPageModifiers(settings.pageModifiers || { active: "Total" });
        processUserItems(settings.itemArray || []);
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
  [
    isAuthenticated,
  ]);
};

export default useLoad;
