import { useMemo } from "react";
import { useProjectContext } from "context/ProjectContext";
import { phaseNumToMonth, statusToString } from "utils/formatters";

const useFilteredPhases = (jobNum, yearId, phaseId, active) => {
  const { projects, getProjectByNum, getYearById, sortedPhasesPerJob } =
    useProjectContext();

  const { counts, groupedPhases, singlePhaseData } = useMemo(() => {
    if (!projects || !projects.jobs || !projects.years || !projects.phases) {
      return {
        counts: { Total: 0, Active: 0, Closed: 0 },
        groupedPhases: [],
        singlePhaseData: null,
      };
    }

    const counts = { Total: 0, Active: 0, Closed: 0 };
    const groups = {};
    const phasesArray = Object.values(projects.phases);

    const filteredPhases = phasesArray.filter((phase) => {
      if (jobNum && phase.jobNum !== jobNum) return false;

      if (yearId) {
        if (yearId.startsWith("xxxx-")) {
          const selectedYearNum = yearId.split("-")[1];
          if (phase.yearNum !== selectedYearNum) return false;
        } else {
          if (phase.yearId !== yearId) return false;
        }
      }

      if (phaseId) {
        if (phaseId.startsWith("xxxx-")) {
          const selectedPhaseNum = phaseId.split("-")[2];
          if (phase.num !== selectedPhaseNum) return false;
        } else {
          if (phase.id !== phaseId) return false;
        }
      }

      return true;
    });

    if (filteredPhases.length === 1) {
      const phase = filteredPhases[0];
      const job = getProjectByNum(phase.jobNum);
      const year = getYearById(phase.yearId);

      const phasesInJob = sortedPhasesPerJob[phase.jobNum] || [];
      const phaseIndex = phasesInJob.findIndex((p) => p.id === phase.id);
      const phaseLength = phasesInJob.length;

      const singlePhaseData = {
        phase,
        job,
        year,
        phaseIndex,
        phaseLength,
        month: phaseNumToMonth(phase.num),
        statusString: statusToString(phase.status),
      };

      return { counts, groupedPhases: [], singlePhaseData };
    }

    filteredPhases.forEach((phase) => {
      counts.Total += 1;
      if (phase.status === 4) counts.Active += 1;
      if (phase.status > 4) counts.Closed += 1;

      let includePhase = false;
      if (active === "Active" && phase.status === 4) includePhase = true;
      else if (active === "Closed" && phase.status > 4) includePhase = true;
      else if (active === "Total") includePhase = true;

      if (includePhase) {
        const job = getProjectByNum(phase.jobNum);
        const year = getYearById(phase.yearId);
        const phaseNumberMatch = phase.name.match(/\d+/);
        const phaseNum = phaseNumberMatch
          ? parseInt(phaseNumberMatch[0], 10)
          : 0;
        const normalizedPhaseName = `Phase ${phaseNum}`;
        const key = `${normalizedPhaseName}-${year.num}`;

        if (!groups[key]) {
          groups[key] = {
            phaseName: normalizedPhaseName,
            yearNum: year.num,
            phaseNum,
            jobs: [],
          };
        }

        groups[key].jobs.push({ job, phase, year });
      }
    });

    const groupedPhases = Object.values(groups).sort((a, b) => {
      const yearA = parseInt(a.yearNum, 10);
      const yearB = parseInt(b.yearNum, 10);

      if (yearA !== yearB) return yearA - yearB;

      return a.phaseNum - b.phaseNum;
    });

    return { counts, groupedPhases, singlePhaseData: null };
  }, [
    jobNum,
    yearId,
    phaseId,
    active,
    projects,
    getProjectByNum,
    getYearById,
    sortedPhasesPerJob,
  ]);

  return { counts, groupedPhases, singlePhaseData };
};

export default useFilteredPhases;
