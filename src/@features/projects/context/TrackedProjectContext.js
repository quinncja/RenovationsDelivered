import { createContext, useContext, useState } from "react";
import { updateTrackedJobsAction } from "@features/dashboard/utils/dashboardActions";
import { useHistory } from "../../../@shared/context/HistoryContext";
import { saveUserData } from "@features/users/api/usersApi";

const TrackedProjectContext = createContext();

export const useTrackedProjects = () => useContext(TrackedProjectContext);

export const TrackedJobProvider = ({ children }) => {
  const { pushHistory } = useHistory();

  const saveTrackedJobs = (jobs) => {
    saveUserData(jobs, "trackedJobs");
  };

  const [trackedJobs, setTrackedJobs] = useState(undefined);
  const [loadingMap, setLoadingMap] = useState(true);
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
            phases: data,
          },
        };
      });
    } else {
      setDataMap((prev) => {
        return {
          ...prev,
          [id]: data,
        };
      });
    }
  };

  const [marginFilter, setMarginFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const filterJobs = (jobArray) => {
    if (!jobArray || jobArray.length === 0) return [];

    return jobArray.filter((jobNum) => {
      if (Object.keys(dataMap).length === 0) return true;

      const job = dataMap[jobNum];

      if (!job || job.length === 0) return false;

      const jobData = job[0];

      const searchMatch =
        !searchFilter ||
        (jobData.JobName &&
          jobData.JobName.toLowerCase().includes(searchFilter.toLowerCase())) ||
        (jobData.ClientName &&
          jobData.ClientName.toLowerCase().includes(
            searchFilter.toLowerCase(),
          )) ||
        (jobData.ProjectManager &&
          jobData.ProjectManager.toLowerCase().includes(
            searchFilter.toLowerCase(),
          ));

      if (!searchMatch) return false;

      if (!marginFilter) return true;

      const totalContract = jobData.ClosedContract || 0;
      const totalCost = jobData.ClosedCost || 0;

      if (totalContract === 0) return false;

      const marginPercent = ((totalContract - totalCost) / totalContract) * 100;

      switch (marginFilter) {
        case "high":
          return marginPercent >= 20;
        case "target":
          return marginPercent < 20 && marginPercent >= 17;
        case "critical":
          return marginPercent < 17;
        default:
          return true;
      }
    });
  };

  return (
    <TrackedProjectContext.Provider
      value={{
        trackedJobs,
        setDataMap,
        setTrackedJobs,
        updateTrackedJobs,
        dataMap,
        updateDataMap,
        filterJobs,
        marginFilter,
        setMarginFilter,
        setSearchFilter,
        loadingMap,
        setLoadingMap,
      }}
    >
      {children}
    </TrackedProjectContext.Provider>
  );
};
