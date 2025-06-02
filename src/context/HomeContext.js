import { useLoading } from "app/LoadingContext";
import { useContext, useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { fetchHomeData, fetchOpenHomeData } from "utils/api";
import { useLocation, useNavigate } from "react-router-dom";

const { createContext } = require("react");

const HomeContext = createContext();
export const useHome = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
  const [dataMap, setDataMap] = useState(undefined);
  const [open, setOpen] = useState({
    type: null,
    focused: null,
  });
  const year = new Date().getFullYear();
  const { isAppReady } = useLoading();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (!currentPath.startsWith("/dashboard/item"))
      setOpen({
        type: null,
        focused: null,
      });
  }, [currentPath]);

  useEffect(() => {
    const loadJobData = async () => {
      const maxRetries = 5;
      let retryCount = 0;

      const attemptLoad = async () => {
        try {
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }
          const controller = new AbortController();
          abortControllerRef.current = controller;
          const homeData = await fetchHomeData(controller.signal);

          setDataMap((prev) => {
            const currentData = prev || {};
            const result = { ...currentData };

            for (const [key, value] of Object.entries(homeData)) {
              result[key] = {
                widgetData: value,
                homeData: currentData[key]?.homeData || null,
              };
            }

            return result;
          });
        } catch (error) {
          if (error.name === "AbortError") {
            throw error;
          }

          retryCount++;
          if (retryCount <= maxRetries) {
            console.log(
              `Retrying job data fetch (attempt ${retryCount}/${maxRetries})`,
            );
            await attemptLoad();
          } else {
            throw error;
          }
        }
      };

      try {
        await attemptLoad();
      } catch (error) {
        if (error.name !== "AbortError") {
          toast.error("Failed to load home data");
        }
      }
    };

    const shouldLoadData = () => {
      if (isAppReady && currentPath.startsWith("/dashboard") && !dataMap) {
        return true;
      }
    };

    if (shouldLoadData()) {
      loadJobData();
    }

    // eslint-disable-next-line
  }, [isAppReady, currentPath]);

  const abortControllerRef2 = useRef(null);

  useEffect(() => {
    const loadOpenData = async () => {
      const maxRetries = 5;
      let retryCount = 0;

      const attemptLoad = async () => {
        let controller;
        try {
          if (abortControllerRef2.current) {
            abortControllerRef2.current.abort();
          }
          controller = new AbortController();
          abortControllerRef2.current = controller;

          const mods = {
            year: year,
            type: open.type,
          };

          const items = await fetchOpenHomeData(mods, controller.signal);
          if (items) {
            setDataMap((prev) => ({
              ...(prev || {}),
              [open.type]: {
                ...(prev?.[open.type] || {}),
                homeData: items[open.type],
              },
            }));
          }
        } catch (error) {
          console.log("Error details:", {
            name: error.name,
            message: error.message,
            isAborted: controller?.signal?.aborted,
            retryCount: retryCount,
          });

          const isRealAbortError =
            error.name === "AbortError" && controller?.signal?.aborted;

          if (isRealAbortError) {
            console.log("Aborting due to explicit abort signal");
            throw error;
          }

          retryCount++;
          console.log(
            `Error on attempt ${retryCount}/${maxRetries}:`,
            error.message,
          );

          if (retryCount <= maxRetries) {
            console.log(
              `Retrying job data fetch (attempt ${retryCount}/${maxRetries})`,
            );
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 * retryCount),
            );
            return await attemptLoad();
          } else {
            console.log("Max retries reached, giving up");
            throw error;
          }
        }
      };

      try {
        await attemptLoad();
      } catch (error) {
        if (
          error.name !== "AbortError" &&
          !abortControllerRef.current?.signal?.aborted
        ) {
          console.error("Failed to load job data after retries:", error);
          toast.error("Failed to load job data");
        }
      }
    };

    const shouldLoadData = () => {
      if (
        !isAppReady ||
        !currentPath.startsWith("/dashboard/item") ||
        !open.type
      ) {
        return false;
      }
      if (dataMap && dataMap[open.type] && dataMap[open.type].openData)
        return false;
      return true;
    };

    const pathParts = currentPath.split("/");
    const typeFromPath = pathParts[3];
    if (typeFromPath) {
      setOpen((prev) => ({ ...prev, type: typeFromPath }));
    }

    if (shouldLoadData()) {
      loadOpenData();
    }

    // eslint-disable-next-line
  }, [isAppReady, currentPath, open.type]);

  const getWidgetDataById = (id) => {
    if (!dataMap) return null;
    if (dataMap[id]) return dataMap[id].widgetData;
  };

  const updateFocusedId = (newId) => {
    if (newId === open.focused) setOpen((prev) => ({ ...prev, focused: null }));
    else setOpen((prev) => ({ ...prev, focused: newId }));
  };

  const updateFocusedPhaseCount = (newObj) => {
    if (
      newObj.status === open.focused?.status &&
      newObj.phase === open.focused?.phase
    )
      setOpen((prev) => ({ ...prev, focused: null }));
    else setOpen((prev) => ({ ...prev, focused: newObj }));
  };

  const openPage = (type, focused = null) => {
    setOpen({ type, focused });
    navigate(`/dashboard/item/${type.toLowerCase()}`);
  };

  const openData = {
    type: open.type,
    focused: open.focused,
    data: dataMap ? dataMap[open.type] : null,
  };

  return (
    <HomeContext.Provider
      value={{
        getWidgetDataById,
        updateFocusedId,
        updateFocusedPhaseCount,
        openPage,
        openData,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
