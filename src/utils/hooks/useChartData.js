import { useItems } from "context/ItemsContext";
import { useModifiers } from "context/ModifierContext";
import { useCallback } from "react";
import { fetchChartData } from "utils/api";
import { modifierFormatter } from "utils/formatters";

export const useChartData = () => {
  const { pageModifiers } = useModifiers();
  const { updateDataMap } = useItems();
  const formattedModifiers = modifierFormatter(pageModifiers);

  const loadData = useCallback(
    async (id, query, signal) => {
      if (query === null) {
        updateDataMap(id, []);
        return;
      }

      const modsToUse = {
        ...formattedModifiers,
        type: query,
      };
      const newData = await fetchChartData(modsToUse, signal);
      updateDataMap(id, newData);
    },
    // eslint-disable-next-line
    [pageModifiers],
  );

  return loadData;
};
