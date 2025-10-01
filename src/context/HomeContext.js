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
    detail: null,
  });
  const [detailMap, setDetailMap] = useState(undefined);
  const year = new Date().getFullYear();
  const { isAppReady } = useLoading();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const abortControllerRef = useRef(null);
  const abortControllerRef2 = useRef(null);

  useEffect(() => {
    if (!currentPath.startsWith("/dashboard/item")) {
      setOpen({
        type: null,
        focused: null,
        detail: null,
      });
      return;
    }

    const pathParts = currentPath.split("/");
    const typeFromPath = pathParts[3];
    const detailFromPath = pathParts[5];

    if (detailFromPath) {
      setOpen((prev) => {
        if (prev.type !== typeFromPath || prev.detail?.id !== detailFromPath) {
          return {
            type: typeFromPath,
            focused: null,
            detail: { id: detailFromPath },
          };
        }
        return prev;
      });
    } else if (typeFromPath) {
      setOpen((prev) => {
        if (prev.type !== typeFromPath || prev.detail !== null) {
          return {
            type: typeFromPath,
            focused: null,
            detail: null,
          };
        }
        return prev;
      });
    }
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
          console.log(homeData);
          setDataMap((prev) => {
            const currentData = prev || {};
            const result = { ...currentData };

            for (const [key, value] of Object.entries(homeData)) {
              result[key] = {
                widgetData: value,
                homeData: currentData[key]?.homeData || null,
                detailData: currentData[key]?.detailData || null,
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
            detailId: open?.detail?.id,
          };

          const items = await fetchOpenHomeData(mods, controller.signal);

          if (open?.detail?.id) {
            if (items) {
              setDetailMap((prev) => ({
                ...(prev || {}),
                [open.detail.id]: items,
              }));
            }
          } else {
            if (items) {
              setDataMap((prev) => ({
                ...(prev || {}),
                [open.type]: {
                  ...(prev?.[open.type] || {}),
                  homeData: items[open.type],
                },
              }));
            }
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
          !abortControllerRef2.current?.signal?.aborted
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

      if (open.detail?.id) {
        const currentDetailData = dataMap?.[open.type]?.detailData;
        return (
          !currentDetailData || currentDetailData.detailId !== open.detail.id
        );
      } else {
        return !dataMap?.[open.type]?.homeData;
      }
    };

    if (shouldLoadData()) {
      loadOpenData();
    }

    // eslint-disable-next-line
  }, [isAppReady, currentPath, open.type, open.detail?.id]);

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
    setOpen({ type, focused, detail: null });
    navigate(`/dashboard/item/${type.toLowerCase()}`);
  };

  const openDetailPage = (type, detail) => {
    setOpen({ type, focused: null, detail });
    navigate(`/dashboard/item/${type.toLowerCase()}/id/${detail.id}`);
  };

  const openData = {
    type: open.type,
    focused: open.focused,
    detail: open.detail,
    data: dataMap ? dataMap[open.type] : null,
    detailData: detailMap && open.detail ? detailMap[open.detail.id] : null,
  };

  return (
    <HomeContext.Provider
      value={{
        getWidgetDataById,
        updateFocusedId,
        updateFocusedPhaseCount,
        openPage,
        openDetailPage,
        openData,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
