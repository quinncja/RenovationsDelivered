import usePhase from "./usePhase";

const useNextPhase = (phaseId) => {
  return usePhase(phaseId, 1);
};

export default useNextPhase;
