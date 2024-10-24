import { useModifiers } from "context/ModifierContext";
import { useProjectContext } from "context/ProjectContext";
import { useMemo } from "react";

export const useSingle = () => {
  const { pageModifiers } = useModifiers();
  const { projects } = useProjectContext();

  const single = useMemo(() => {
    if (!projects) return false;

    const { jobNum, yearId, phaseId, active } = pageModifiers;

    const isPhaseActive = (phase) => {
      if (active === "Active") return phase.status === 4;
      if (active === "Closed") return phase.status > 4;
      if (active === "Total") return true;
      return false;
    };

    if (jobNum && yearId && phaseId) {
      const phase = projects.phases[phaseId];
      if (phase && isPhaseActive(phase)) {
        return true;
      }
      return false;
    }

    if (!jobNum && yearId && phaseId) {
      const phase = projects.phases[phaseId];
      if (phase && isPhaseActive(phase)) {
        return true;
      }
      return false;
    }

    if (!jobNum) return false;

    const job = projects.jobs[jobNum];
    if (!job) return false;

    const jobYears = job.years || [];

    const filteredYears = jobYears.filter((yearId) => {
      const year = projects.years[yearId];
      if (!year) return false;

      const phasesInYear = year.phases || [];
      const activePhasesInYear = phasesInYear.filter((phaseId) => {
        const phase = projects.phases[phaseId];
        return phase && isPhaseActive(phase);
      });

      return activePhasesInYear.length > 0;
    });

    if (!yearId) {
      if (filteredYears.length !== 1) return false;
    }

    const selectedYearId = yearId || filteredYears[0];
    const year = projects.years[selectedYearId];
    if (!year) return false;

    const phasesInYear = year.phases || [];
    const activePhasesInYear = phasesInYear.filter((phaseId) => {
      const phase = projects.phases[phaseId];
      return phase && isPhaseActive(phase);
    });

    if (!phaseId) {
      if (activePhasesInYear.length !== 1) return false;
    } else {
      const phase = projects.phases[phaseId];
      if (!phase || !isPhaseActive(phase)) return false;
    }

    return true;
  }, [pageModifiers, projects]);

  return single;
};
