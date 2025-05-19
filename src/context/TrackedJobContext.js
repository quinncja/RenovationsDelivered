import { createContext, useContext, useState } from "react";
import { updateTrackedJobsAction } from "utils/dashboardActions";
import { useHistory } from "./HistoryContext";
import { useUserSettings } from "./UserSettingsContext";

const TrackedJobContext = createContext();

export const useTrackedJobs = () => useContext(TrackedJobContext);

export const TrackedJobProvider = ({ children }) => {
  const { pushHistory } = useHistory();
  const { saveTrackedJobs } = useUserSettings();
  const [trackedJobs, setTrackedJobs] = useState(undefined);
  const [dataMap, setDataMap] = useState({});

  const updateTrackedJobsFn = updateTrackedJobsAction(
    setTrackedJobs,
    saveTrackedJobs,
  );

  const updateTrackedJobs = async (newJobs, type) => {
    const oldJobs = [...trackedJobs];
    const jobsCopy = [...newJobs];
    updateTrackedJobsFn(newJobs);
    const historyObj = {
      text: `Job ${type}`,
      redo: () => {
        updateTrackedJobsFn(jobsCopy);
      },
      undo: () => {
        updateTrackedJobsFn(oldJobs);
      },
    };
    pushHistory(historyObj);
  };

  const updateDataMap = (id, data, phase = false) => {
    if (phase) {
      setDataMap((prev) => {
        const existingData = prev[id] || {};
        
        return {
          ...prev,
          [id]: {
            ...existingData,
            phases: data 
          }
        };
      });
    } else {
      setDataMap((prev) => {
        return {
          ...prev,
          [id]: data
        };
      });
    }
  };

  return (
    <TrackedJobContext.Provider
      value={{
        trackedJobs,
        setTrackedJobs,
        updateTrackedJobs,
        dataMap,
        updateDataMap,
      }}
    >
      {children}
    </TrackedJobContext.Provider>
  );
};
