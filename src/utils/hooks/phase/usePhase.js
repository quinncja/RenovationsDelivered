import { useMemo } from "react";
import { useProjectContext } from "context/ProjectContext";
import { phaseList } from "utils/modifiers";

const usePhase = (phaseId, direction) => {
  const { getPhaseById, sortedPhasesPerJob } = useProjectContext();

  const relativePhase = useMemo(() => {
    if (!phaseId) return null;

    const isPlaceholderPhaseId = phaseId.startsWith('xxxx-');

    if (isPlaceholderPhaseId) {
      const index = phaseList.findIndex((phase) => phase.id === phaseId);
      if (index === -1) return null;

      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= phaseList.length) {
        return null; 
      }

      return phaseList[newIndex];
    } else {
      const phase = getPhaseById(phaseId);
      if (!phase) return null;

      const jobNum = phase.jobNum;
      const phases = sortedPhasesPerJob[jobNum];
      if (!phases) return null;

      const index = phases.findIndex((p) => p.id === phaseId);
      if (index === -1) return null;

      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= phases.length) {
        return null; 
      }

      return phases[newIndex];
    }
  }, [phaseId, direction, getPhaseById, sortedPhasesPerJob]);

  return relativePhase;
};

export default usePhase;
