import usePhase from "./usePhase";

const usePrevPhase = (phaseId) => {
    return usePhase(phaseId, -1);
};

export default usePrevPhase;