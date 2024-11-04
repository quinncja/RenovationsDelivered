import { useMemo } from "react";
import { useProjectContext } from "context/ProjectContext";
import { phaseNumToMonth, statusToString } from "utils/formatters";
import { yearList, phaseList } from "utils/modifiers";

const getDefaultYear = (yearId) => {
  return yearList.find((year) => year.id === yearId);
};
const getDefaultPhase = (phaseId) => {
  return phaseList.find((phase) => phase.id === phaseId);
};

const useFilteredPhases = (jobNum, yearId, phaseId, active, state, pm) => {
  const { projects, getProjectByNum, getYearById, sortedPhasesPerJob } =
    useProjectContext();

  const { counts, defaultData, singlePhaseData, yearData, allViewData } =
    useMemo(() => {
      if (!projects || !projects.jobs || !projects.years || !projects.phases) {
        return {
          counts: { Total: 0, Active: 0, Closed: 0 },
          defaultData: null,
          singlePhaseData: null,
          yearData: null,
          allViewData: null,
        };
      }

      const counts = { Total: 0, Active: 0, Closed: 0 };
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
        if(state){
          if( phase.state !== state) return false;
        }
        if(pm){
          if( Number(phase.pm) !== pm) return false;
        }

        return true;
      });

      console.log(filteredPhases)

      filteredPhases.forEach((phase) => {
        counts.Total += 1;
        if (phase.status === 4) counts.Active += 1;
        if (phase.status > 4) counts.Closed += 1;
      });

      const activeFilteredPhases = filteredPhases.filter((phase) => {
        if (active === "Active" && phase.status === 4) return true;
        if (active === "Closed" && phase.status > 4) return true;
        if (active === "Total") return true;
        return false;
      });

      if (!jobNum && ((yearId && phaseId) || phaseId)) {
        const phase = getDefaultPhase(phaseId) || {};
        const year = getDefaultYear(yearId) || {};
        const jobs = {};

        activeFilteredPhases.forEach((phase) => {
          const jobNumKey = phase.jobNum;
          if (!jobs[jobNumKey]) {
            const job = getProjectByNum(jobNumKey);
            if (job) {
              jobs[jobNumKey] = job;
            }
          }
        });

        const jobsArray = Object.values(jobs);

        const phaseIndex = phaseList.findIndex((p) => p.id === phase.id);
        const phaseLength = phaseList.length;

        const prevPhase = phaseIndex > 0 ? phaseList[phaseIndex - 1] : null;
        const nextPhase =
          phaseIndex < phaseLength - 1 ? phaseList[phaseIndex + 1] : null;

        const defaultData = {
          phase,
          year,
          jobs: jobsArray,
          prevPhase,
          nextPhase,
          month: phaseNumToMonth(phase.num),
        };
        return {
          counts,
          defaultData,
          singlePhaseData: null,
          yearData: null,
          allViewData: null,
        };
      }

      if (phaseId && activeFilteredPhases.length === 1) {
        const phase = activeFilteredPhases[0];
        const job = getProjectByNum(phase.jobNum);
        const year = yearId ? getYearById(phase.yearId) : {};

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

        return {
          counts,
          defaultData: null,
          singlePhaseData,
          yearData: null,
          allViewData: null,
        };
      }

      if (yearId && !phaseId) {
        const useDefault = !getYearById(yearId);
        const year = useDefault ? getDefaultYear(yearId) : getYearById(yearId);
        const job = getProjectByNum(jobNum) || { name: "All Projects" };

        const jobs = {};

        activeFilteredPhases.forEach((phase) => {
          const jobNumKey = phase.jobNum;
          if (!jobs[jobNumKey]) {
            const job = getProjectByNum(jobNumKey);
            if (job) {
              jobs[jobNumKey] = job;
            }
          }
        });

        const jobsArray = Object.values(jobs);

        const phasesInYear = useDefault
          ? phaseList
          : activeFilteredPhases.filter((phase) => phase.yearId === yearId);

        const jobPhases = useDefault
          ? phaseList
          : phasesArray.filter((phase) => phase.jobNum === jobNum);
        const yearIds = useDefault
          ? yearList.map((year) => year.id)
          : [...new Set(jobPhases.map((phase) => phase.yearId))];
        const sortedYearIds = yearIds.sort();
        const currentYearIndex = sortedYearIds.indexOf(yearId);

        const prevYearId = sortedYearIds[currentYearIndex - 1] || null;
        const nextYearId = sortedYearIds[currentYearIndex + 1] || null;

        const prevYear = prevYearId
          ? useDefault
            ? getDefaultYear(prevYearId)
            : getYearById(prevYearId)
          : null;
        const nextYear = nextYearId
          ? useDefault
            ? getDefaultYear(nextYearId)
            : getYearById(nextYearId)
          : null;

        const yearData = {
          year,
          job,
          jobs: jobsArray,
          phases: phasesInYear,
          counts,
          prevYear,
          nextYear,
        };

        return {
          counts,
          defaultData: null,
          singlePhaseData: null,
          yearData,
          allViewData: null,
        };
      }

      if (!yearId && !phaseId) {
        const job = getProjectByNum(jobNum) || { name: "All Projects" };
        const jobPhases = activeFilteredPhases;

        const jobs = {};

        activeFilteredPhases.forEach((phase) => {
          const jobNumKey = phase.jobNum;
          if (!jobs[jobNumKey]) {
            const job = getProjectByNum(jobNumKey);
            if (job) {
              jobs[jobNumKey] = job;
            }
          }
        });

        const jobsArray = Object.values(jobs);

        const yearsMap = {};
        jobPhases.forEach((phase) => {
          const yearId = phase.yearId;
          if (!yearsMap[yearId]) {
            const year = getYearById(yearId);
            yearsMap[yearId] = {
              year,
              yearName: year.year,
              phases: [],
              counts: { Total: 0, Active: 0, Closed: 0 },
            };
          }
          yearsMap[yearId].phases.push(phase);
          yearsMap[yearId].counts.Total += 1;
          if (phase.status === 4) yearsMap[yearId].counts.Active += 1;
          if (phase.status > 4) yearsMap[yearId].counts.Closed += 1;
        });

        const yearsArray = Object.values(yearsMap).sort(
          (a, b) => a.year.num - b.year.num,
        );

        const allViewData = {
          job,
          jobs: jobsArray,
          years: yearsArray,
          counts,
        };

        return {
          counts,
          defaultData: null,
          singlePhaseData: null,
          yearData: null,
          allViewData,
        };
      }

      return {
        counts,
        defaultData: null,
        singlePhaseData: null,
        yearData: null,
        allViewData: null,
      };
    }, [
      jobNum,
      yearId,
      phaseId,
      active,
      state,
      pm,
      projects,
      getProjectByNum,
      getYearById,
      sortedPhasesPerJob,
    ]);

  return {
    counts,
    defaultData,
    singlePhaseData,
    yearData,
    allViewData,
  };
};

export default useFilteredPhases;
