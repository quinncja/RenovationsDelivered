import { useTrackedJobs } from "context/TrackedJobContext";
import { useCallback } from "react";
import { fetchChartData } from "utils/api";

export const useJobData = () => {
  const { updateDataMap } = useTrackedJobs();

  const loadData = useCallback(
    async (id, signal) => {
      const modsToUse = {
        job: id,
        type: "job-details",
      };
      const newData = await fetchChartData(modsToUse, signal);
      updateDataMap(id, newData);
    },
    // eslint-disable-next-line
    [],
  );

  return loadData;
};