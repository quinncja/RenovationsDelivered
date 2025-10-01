import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { toast } from "sonner";
import { fetchAggrJobData, fetchBreakdownItems, saveUserData } from "utils/api";
import { modifierFormatter } from "utils/formatters";
import { useHistory } from "./HistoryContext";
import { updatePageModifiersAction } from "utils/dashboardActions";
import { useLoading } from "app/LoadingContext";
import { useLocation, useNavigate } from "react-router-dom";
import useIsAdmin from "utils/hooks/useIsAdmin";

const JobCostContext = createContext();
export const useJobCostContext = () => useContext(JobCostContext);

export const JobCostProvider = ({ children }) => {
  const isAdmin = useIsAdmin();
  const { isAppReady } = useLoading();
  const [jobData, setJobData] = useState(undefined);
  const [breakdown, setBreakdown] = useState({
    type: null,
    focused: null,
  });

  const [typeFilter, setTypeFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const [breakdownItems, setBreakdownItems] = useState({
    Material: null,
    Labor: null,
    Subcontractors: null,
    WTPM: null,
  });

  const getSubCount = () => {
    if (!jobData) return null;
    else return jobData.subs[0].SubcontractCount;
  };
  const navigate = useNavigate();

  const savePageModifiers = async (modifiers) => {
    await saveUserData(modifiers, "pageModifiers");
  };

  const [pageModifiers, setPageModifiers] = useState({
    jobNum: null,
    yearId: null,
    phaseId: null,
    state: null,
    pm: null,
    client: null,
    status: null,
  });

  const isEmpty = useMemo(() => {
    return Object.values(pageModifiers).every(
      (value) => value === null || value === "none",
    );
  }, [pageModifiers]);

  const clearPageModifiers = () => {
    if (!isAdmin)
      setPageModifiers({
        jobNum: "none",
        yearId: null,
        phaseId: null,
        state: null,
        pm: null,
        client: null,
        status: null,
      });
    else
      setPageModifiers({
        jobNum: null,
        yearId: null,
        phaseId: null,
        state: null,
        pm: null,
        client: null,
        status: null,
      });
  };

  const [modTimeout, setModTimeout] = useState(true);
  const { pushHistory } = useHistory();

  useEffect(() => {
    if (modTimeout) {
      setTimeout(() => {
        setModTimeout(false);
      }, 1000);
    }
  }, [modTimeout]);

  const clearJobCostData = () => {
    setJobData(undefined);
  };

  const updatePageModifiers = (newMods, flag = false) => {
    setModTimeout(true);
    setBreakdownItems({
      Material: null,
      Labor: null,
      Subcontractors: null,
      WTPM: null,
    });
    const oldMods = { ...pageModifiers };
    const newModObj = {
      ...pageModifiers,
      ...newMods,
    };

    const updatePageModifiersFn = updatePageModifiersAction(
      setPageModifiers,
      setModTimeout,
    );
    updatePageModifiersFn(newMods);

    if (!flag) {
      const historyObj = {
        text: "Modifer change",
        type: "fixed",
        undo: () => updatePageModifiersFn(oldMods),
        redo: () => updatePageModifiersFn(newModObj),
      };
      pushHistory(historyObj);
    }

    setPageModifiers(newModObj);
    savePageModifiers(newModObj);
  };

  const formattedModifiers = modifierFormatter(pageModifiers, null);
  const abortControllerRef = useRef(null);

  const location = useLocation();
  const currentPath = location.pathname;

  const lastLoadedModifiersRef = useRef(null);

  const typeMap = {
    Material: 1,
    Labor: 2,
    Subcontractors: 4,
    WTPM: 5,
  };

  useEffect(() => {
    const loadJobData = async () => {
      setJobData(undefined);
      const maxRetries = 5;
      let retryCount = 0;

      const attemptLoad = async () => {
        let controller;
        try {
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }
          controller = new AbortController();
          abortControllerRef.current = controller;

          const mods = {
            ...formattedModifiers,
            type: "job-data",
          };

          const aggrJobData = await fetchAggrJobData(mods, controller.signal);
          setJobData(aggrJobData);
          lastLoadedModifiersRef.current = JSON.stringify(formattedModifiers);
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
        !currentPath.startsWith("/jobcost") ||
        !pageModifiers
      ) {
        return false;
      }
      const currentModifiersString = JSON.stringify(formattedModifiers);
      return currentModifiersString !== lastLoadedModifiersRef.current;
    };

    const pathParts = currentPath.split("/");
    const typeFromPath = pathParts[3];
    if (typeFromPath) {
      let capitalizedType;
      if (typeFromPath === "wtpm") capitalizedType = "WTPM";
      else
        capitalizedType =
          typeFromPath.charAt(0).toUpperCase() + typeFromPath.slice(1);
      setBreakdown((prev) => ({ ...prev, type: capitalizedType }));
    }

    if (shouldLoadData()) {
      loadJobData();
    }
    // eslint-disable-next-line
  }, [isAppReady, currentPath, pageModifiers]);

  // getters

  const getSpent = (arr1, arr2) => {
    let sum = 0;

    if (arr1)
      for (const obj of arr1) {
        sum += Number(obj.value) || 0;
      }

    if (arr2)
      for (const obj of arr2) {
        sum += Number(obj.value) || 0;
      }

    return sum;
  };

  const getBudget = (type) => {
    const finances = jobData.finances;
    if (type === 1) return Number(finances.Material) || 0;
    if (type === 2) return Number(finances.Labor) || 0;
    if (type === 4) return Number(finances.Subcontracts) || 0;
    if (type === 5) return Number(finances.WTPM) || 0;
  };

  const getCommittedCosts = (type) => {
    if (type === 2 || type === 5) return [];
    if (type === 1) return jobData?.committed?.costs || [];
    if (type === 4) return jobData?.committed?.subs || [];
  };

  const getPostedCosts = (type) => {
    return jobData.posted.filter((cost) => cost.costType === type);
  };

  const getDataByType = useCallback(
    (widgetType) => {
      if (!jobData) return null;
      if (widgetType === "margin") return jobData.margin || undefined;
      if (widgetType === "details") return jobData.details || undefined;
      let data = {
        costItems: {},
        budget: "",
      };
      const type = typeMap[widgetType];
      data.type = widgetType;
      data.costItems.posted = getPostedCosts(type);
      data.costItems.committed = getCommittedCosts(type) || [];
      data.recentItems = jobData.recentItems.filter(
        (item) => item.category === widgetType,
      );

      data.budget = getBudget(type);
      data.spent = getSpent(data.costItems.posted, data.costItems.committed);
      return data;
    },
    //eslint-disable-next-line
    [jobData],
  );

  const getTotalCost = () => {
    const types = [1, 2, 4, 5];
    let accumulator = 0;

    for (const type of types) {
      const posted = getPostedCosts(type);
      const committed = getCommittedCosts(type);

      let spent;
      if (type === 4) {
        spent = getSpent(posted, []);
      } else {
        spent = getSpent(posted, committed);
      }

      accumulator += spent;
    }

    return accumulator;
  };

  const getTotalBudget = () => {
    const types = [1, 2, 4, 5];
    let accumulator = 0;
    for (const type of types) {
      const budget = getBudget(type);
      accumulator += budget;
    }
    return accumulator;
  };

  const getJobDetails = () => {
    if (!jobData) return;
    const details = {
      cost: getTotalCost(),
      budget: getTotalBudget(),
    };
    return details;
  };

  const abortControllerRef2 = useRef(null);

  useEffect(() => {
    const loadItems = async () => {
      const maxRetries = 3;
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
            ...formattedModifiers,
            type: "job-data",
          };

          const typeNum = typeMap[breakdown.type];
          const items = await fetchBreakdownItems(
            mods,
            typeNum,
            controller.signal,
          );
          setBreakdownItems((prev) => ({ ...prev, [breakdown.type]: items }));
          lastLoadedModifiersRef.current = JSON.stringify(formattedModifiers);
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
        !currentPath.startsWith("/jobcost/breakdown") ||
        !pageModifiers ||
        !breakdown.type
      ) {
        return false;
      }
      if (breakdownItems[breakdown.type]) return false;
      return true;
    };

    if (shouldLoadData()) {
      loadItems();
    }

    // eslint-disable-next-line
  }, [isAppReady, currentPath, pageModifiers, breakdown.type]);

  const currentBreakdownData = breakdown.type
    ? getDataByType(breakdown.type)
    : null;

  const breakdownData = {
    type: breakdown.type,
    focused: breakdown.focused,
    data: currentBreakdownData,
  };

  const updateFocusedId = (newId) => {
    if (newId === breakdown.focused)
      setBreakdown((prev) => ({ ...prev, focused: null }));
    else setBreakdown((prev) => ({ ...prev, focused: newId }));
  };

  const openBreakdownPage = (type, focused = null) => {
    setBreakdown({ type, focused });
    navigate(`/jobcost/breakdown/${type.toLowerCase()}`);
  };

  const getBreakdownItems = () => {
    const items = breakdownItems[breakdown.type] || null;
    if (!items) return null;

    let dataToFilter;
    if (Array.isArray(items)) {
      dataToFilter = { parent: [], children: items };
    } else {
      dataToFilter = {
        parent: items.parent || [],
        children: items.children || [],
      };
    }

    let filteredData = { ...dataToFilter };

    if (breakdown.focused) {
      filteredData.parent = filteredData.parent.filter(
        (item) => item.id === breakdown.focused,
      );
      filteredData.children = filteredData.children.filter(
        (item) => item.id === breakdown.focused,
      );
    }

    if (typeFilter) {
      if (typeFilter === "parent") {
        const parentIds = new Set(
          filteredData.parent.map((parent) => parent.id),
        );
        filteredData = {
          parent: filteredData.parent,
          children: filteredData.children.filter(
            (child) => child.parent !== "",
          ),
        };
      } else if (typeFilter === "orphan") {
        const parentIds = new Set(
          filteredData.parent.map((parent) => parent.id),
        );
        filteredData = {
          parent: [],
          children: filteredData.children.filter(
            (child) => child.parent === "",
          ),
        };
      } else {
        filteredData.parent = filteredData.parent.filter(
          (item) => item.type === typeFilter,
        );
        filteredData.children = filteredData.children.filter(
          (item) => item.type === typeFilter,
        );
      }
    }

    if (searchFilter) {
      const searchTerm = searchFilter.toLowerCase();
      const searchMatch = (item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm),
        );
      filteredData.parent = filteredData.parent.filter(searchMatch);
      filteredData.children = filteredData.children.filter(searchMatch);
    }

    if (
      filteredData.parent.length === 0 &&
      filteredData.children.length === 0
    ) {
      return null;
    }

    return filteredData;
  };

  return (
    <JobCostContext.Provider
      value={{
        isEmpty,
        jobData,
        clearJobCostData,
        getDataByType,
        pageModifiers,
        setPageModifiers,
        updatePageModifiers,
        modTimeout,
        setModTimeout,
        getCommittedCosts,
        getPostedCosts,
        getJobDetails,
        clearPageModifiers,
        openBreakdownPage,
        breakdownData,
        getBreakdownItems,
        updateFocusedId,
        typeFilter,
        setTypeFilter,
        searchFilter,
        setSearchFilter,
        getSubCount,
      }}
    >
      {children}
    </JobCostContext.Provider>
  );
};
