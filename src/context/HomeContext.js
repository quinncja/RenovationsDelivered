import { useContext, useState, useMemo } from "react";
import useIsAdmin from "utils/hooks/useIsAdmin";
import { useTrackedJobs } from "./TrackedJobContext";
import { useProjectContext } from "./ProjectContext";

const { createContext } = require("react");

const HomeContext = createContext();
export const useHome = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
  const isAdmin = useIsAdmin();
  const defaultState = isAdmin ? "year" : "user";
  const [homeState, setHomeState] = useState(defaultState);
  const [dataMap, setDataMap] = useState({});
  const { projects, getClosedPhases } = useProjectContext();
  const { trackedJobs } = useTrackedJobs();

  const closedPhases = useMemo(() => {
    let phases;

    if (homeState === "year") return "";
    else {
      if (!projects || !trackedJobs || trackedJobs.length === 0) {
        return undefined;
      } else phases = getClosedPhases(trackedJobs);
      if (phases.length > 0) return phases.join(",");
      return -10;
    }
    //eslint-disable-next-line
  }, [projects, trackedJobs, homeState]);

  const updateDataMap = (id, data) => {
    setDataMap((prev) => {
      return {
        ...prev,
        [id]: data,
      };
    });
  };

  return (
    <HomeContext.Provider
      value={{
        homeState,
        setHomeState,
        dataMap,
        updateDataMap,
        closedPhases,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
