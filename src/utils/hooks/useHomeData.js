import { useCallback } from "react";
import { useHome } from "context/HomeContext";
import { fetchHomeData } from "utils/api";
import { toast } from "sonner";

export const useHomeData = () => {
  const { updateDataMap } = useHome();

  const handleChangeOrders = (dataArray) => {
    const transformedArray = new Array(dataArray.length);

    for (let i = 0; i < dataArray.length; i++) {
      const data = dataArray[i];
      const transformed = { ...data };

      for (const key in data) {
        if (key.startsWith("sbcgln") && key.endsWith("_bdgprc")) {
          const prefixLength = "sbcgln".length;
          const suffixLength = "_bdgprc".length;
          const indexStr = key.substring(
            prefixLength,
            key.length - suffixLength,
          );

          const index = parseInt(indexStr, 10);
          if (!isNaN(index)) {
            const dscrptKey = `sbcgln${index}_dscrpt`;
            const description = data[dscrptKey];

            if (description !== undefined) {
              transformed[description] = data[key];
              delete transformed[key];
              delete transformed[dscrptKey];
            }
          }
        }
      }

      transformedArray[i] = transformed;
    }

    return transformedArray;
  };

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
  };

  const afterLoad = (id, data) => {
    if (id === "cost-vs-budget") return handleCostVBudget(data);
    if (id === "change-orders") return handleChangeOrders(data);
    else return data;
  };
  const loadData = useCallback(
    async (id, body, signal) => {
      try {
        let newData = await fetchHomeData(id, body, signal);
        newData = afterLoad(id, newData);
        updateDataMap(id, newData);
      } catch (error) {
        toast.error("Error loading home view");
      }
    },
    // eslint-disable-next-line
    [],
  );

  return loadData;
};
