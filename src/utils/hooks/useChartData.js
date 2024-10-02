import { useItems } from "context/ItemsContext";
import { useModifiers } from "context/ModifierContext";
import { useCallback } from "react";
import { fetchChartData } from "utils/api";
import { modifierFormatter } from "utils/formatters";
import usePrevPhase from "./phase/usePrevPhase";

export const useChartData = () => {
  const { updateDataMap } = useItems();
  const { pageModifiers } = useModifiers();
  const { phaseId } = pageModifiers;
  const prevPhase = usePrevPhase(phaseId)
  const formattedModifiers = modifierFormatter(pageModifiers, prevPhase); 

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
    [pageModifiers, prevPhase],
  );

  return loadData;
};
