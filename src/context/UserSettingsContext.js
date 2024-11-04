import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { userApiUrl, defaultHeaders } from "utils/config";

const UserSettingsContext = createContext();

export function useUserSettings() {
  return useContext(UserSettingsContext);
}

export function UserSettingsProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [abortControllerMap, setAbortControllerMap] = useState({
    saveItems: null,
    saveModifiers: null,
    saveAppearance: null,
    saveColorScheme: null,
    savePageModifiers: null,
    saveSortSetting: null,
    saveLabelSettings: null,
  });

  useEffect(() => {
    return () => {
      Object.values(abortControllerMap).forEach((controller) => {
        if (controller) controller.abort();
      });
    };
  }, [abortControllerMap]);

  async function fetchCurrentUser() {
    try {
      const response = await axios.get(userApiUrl, defaultHeaders);
      console.log(response.data)
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch user data", error);
      throw new Error("Failed to fetch user data");
    }
  }

  const updateUserSettings = async (update, controllerKey) => {
    setIsLoading(true);
    setError(null);

    if (abortControllerMap[controllerKey]) {
      abortControllerMap[controllerKey].abort();
    }

    const controller = new AbortController();
    setAbortControllerMap((prev) => ({ ...prev, [controllerKey]: controller }));

    try {
      const currentUserData = await fetchCurrentUser();

      const updatedUserData = {
        ...currentUserData,
        ...update,
      };

      const response = await axios.put(
        userApiUrl,
        { data: updatedUserData },
        {
          ...defaultHeaders,
          signal: controller.signal,
        },
      );

      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        console.error("Failed to update user settings", error);
        setError("Failed to update user settings");
        throw new Error("Failed to update user settings");
      }
    } finally {
      setIsLoading(false);
      setAbortControllerMap((prev) => ({ ...prev, [controllerKey]: null }));
    }
  };

  const saveAppearance = async (appearance) =>
    await updateUserSettings({ appearance }, "saveAppearance");
  const saveColorScheme = async (colorScheme) =>
    await updateUserSettings({ colorScheme }, "saveColorScheme");
  const saveItems = async (itemArray) =>
    await updateUserSettings({ itemArray }, "saveItems");
  const saveModifiers = async (itemModifiers) =>
    await updateUserSettings({ itemModifiers }, "saveModifiers");
  const savePageModifiers = async (pageModifiers) =>
    await updateUserSettings({ pageModifiers }, "savePageModifiers");
  const saveSortSetting = async (smartSort) =>
    await updateUserSettings({ smartSort }, "saveSortSetting");
  const saveLabelSettings = async (label) =>
    await updateUserSettings({ label }, "saveLabelSettings");
  const saveTrackedJobs = async (trackedJobs) =>
    await updateUserSettings({ trackedJobs }, "saveTrackedProjects");

  return (
    <UserSettingsContext.Provider
      value={{
        isLoading,
        error,
        saveAppearance,
        saveColorScheme,
        saveItems,
        saveModifiers,
        savePageModifiers,
        saveSortSetting,
        saveLabelSettings,
        saveTrackedJobs,
        fetchCurrentUser,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
}
