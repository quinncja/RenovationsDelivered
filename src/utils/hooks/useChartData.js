import { useItems } from "context/ItemsContext";
import { useModifiers } from "context/ModifierContext";
import { useCallback } from "react";
import { fetchChartData } from "utils/api";
import { modifierFormatter } from "utils/formatters";
import usePrevPhase from "./phase/usePrevPhase";
import useIsAdmin from "./useIsAdmin";

export const useChartData = () => {
  const { updateDataMap } = useItems();
  const { pageModifiers } = useModifiers();
  const { phaseId } = pageModifiers;
  const prevPhase = usePrevPhase(phaseId);
  const formattedModifiers = modifierFormatter(pageModifiers, prevPhase);
  const isAdmin = useIsAdmin();

  function removeContracted(newData, query) {
    if (!Array.isArray(newData)) {
      return newData;
    }

    if (
      query === "revenue" ||
      query === "revenue-single" ||
      query === "revenue-single-open"
    )
      return newData.filter((item) => item.id !== "Contracted");
    else return newData;
  }

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
      let newData = await fetchChartData(modsToUse, signal);
      if (!isAdmin) newData = removeContracted(newData, query);
      updateDataMap(id, newData);
    },
    // eslint-disable-next-line
    [pageModifiers, prevPhase],
  );

  return loadData;
};
