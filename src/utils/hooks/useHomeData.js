import { useCallback } from "react";
import { useHome } from "context/HomeContext";
import { fetchHomeData } from "utils/api";

export const useHomeData = () => {
  const { updateDataMap } = useHome();


  const handleCostVBudget = (data) => {
      if (data && data.length > 0) {
        const counts = data[0];
        const pieChartData = [
          {
            id: "Under Budget",
            label: "Under Budget",
            value: counts.BelowBudgetCount,
            color: "#2cf21e",
          },
          {
            id: "Over Budget",
            label: "Over Budget",
            value: counts.AboveBudgetCount,
            color: "#ff2049",
          },
        ];
        return pieChartData;
      }
    return -1;
  }

  const afterLoad = (id, data) => {
    if(id === "cost-vs-budget")
      return handleCostVBudget(data);
    else return data;
  }
  const loadData = useCallback(
    async (id, body, signal) => {
      let newData = await fetchHomeData(id, body, signal);
      newData = afterLoad(id, newData)
      updateDataMap(id, newData);
    },
    // eslint-disable-next-line
    [],
  );

  return loadData;
};
