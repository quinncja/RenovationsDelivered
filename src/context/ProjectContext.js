import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { fetchChartData } from "utils/api";
import { normalizeData } from "utils/jobNormalizer";
import { phaseList, yearList } from "utils/modifiers";
import { useModifiers } from "./ModifierContext";

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const { pageModifiers } = useModifiers();
  const { state, pm } = pageModifiers;
  const [projects, setProjects] = useState(undefined);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const loadJobs = async () => {
      setProjects(undefined);
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;

        const mods = {
          type: "job-list",
          state: state,
          pm: pm,
        };
        const jobData = await fetchChartData(mods);
        const normalized = normalizeData(jobData);
        setProjects(normalized);
      } catch (error) {
        console.log(error);
      }
    };
    loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, pm]);

  const getAllProjects = () => {
    if (projects && projects.jobs) {
      return Object.values(projects.jobs);
    }
    return [];
  };

  const getAllPhases = useCallback(() => {
    return projects && projects.phases ? Object.values(projects.phases) : [];
  }, [projects]);

  const getPhaseById = useCallback(
    (phaseId) => {
      return projects && projects.phases ? projects.phases[phaseId] : null;
    },
    [projects],
  );

  const getProjectByNum = useCallback(
    (jobNum) => {
      return jobNum && projects && projects.jobs ? projects.jobs[jobNum] : null;
    },
    [projects],
  );

  const getYearsByJob = (selectedJob) => {
    return projects && selectedJob && selectedJob.years && projects.years
      ? selectedJob.years.map((yearId) => projects.years[yearId])
      : yearList;
  };

  const getYearById = useCallback(
    (yearId) => {
      return projects && yearId && projects.years
        ? projects.years[yearId]
        : null;
    },
    [projects],
  );

  const getPhasesByYear = (selectedYear, selectedJob = null) => {
    return projects && selectedYear && selectedYear.phases && projects.phases
      ? selectedYear.phases.map((phaseId) => projects.phases[phaseId])
      : selectedJob
        ? []
        : phaseList;
  };

  const getPhasesForJob = useCallback(
    (jobNum) => {
      const job = getProjectByNum(jobNum);
      if (!job) return [];
      const allPhases = [];
      job.years.forEach((yearId) => {
        const year = getYearById(yearId);
        if (year && year.phases) {
          year.phases.forEach((phaseId) => {
            const phase = getPhaseById(phaseId);
            if (phase) {
              allPhases.push(phase);
            }
          });
        }
      });
      return allPhases;
    },
    [getProjectByNum, getYearById, getPhaseById],
  );

  const getLastPhaseForJob = (phaseId) => {
    const phase = getPhaseById(phaseId);
    if (!phase) return null;
    const jobNum = phase.jobNum;
    const allPhases = getPhasesForJob(jobNum);
    if (allPhases.length === 0) return null;

    allPhases.sort((a, b) => {
      const yearA = parseInt(a.yearNum, 10);
      const yearB = parseInt(b.yearNum, 10);
      if (yearA !== yearB) {
        return yearA - yearB;
      } else {
        const phaseNumA = parseInt(a.num, 10);
        const phaseNumB = parseInt(b.num, 10);
        return phaseNumA - phaseNumB;
      }
    });

    return allPhases[allPhases.length - 1];
  };

  const sortedPhasesPerJob = useMemo(() => {
    if (!projects || !projects.jobs) {
      return {};
    }
    const result = {};
    Object.keys(projects.jobs).forEach((jobNum) => {
      const phases = getPhasesForJob(jobNum);
      const sortedPhases = [...phases].sort((a, b) => {
        const yearA = parseInt(a.yearNum, 10);
        const yearB = parseInt(b.yearNum, 10);
        if (yearA !== yearB) {
          return yearA - yearB;
        } else {
          const phaseNumA = parseInt(a.num, 10);
          const phaseNumB = parseInt(b.num, 10);
          return phaseNumA - phaseNumB;
        }
      });
      result[jobNum] = sortedPhases;
    });
    return result;
  }, [projects, getPhasesForJob]);

  const pageModifierToString = (modifiers) => {
    const parts = [];
    const { active, jobNum, yearId, phaseId } = modifiers;
    const activeStr = active === "Total" ? "" : active;

    let phaseStr = "";
    if (phaseId) {
      if (phaseId.substring(0, 4) === "xxxx")
        phaseStr = phaseList.find((phase) => phase.id === phaseId).name;
      else phaseStr = getPhaseById(phaseId).name;
    }
    let yearStr = "";
    if (yearId) {
      if (yearId.substring(0, 4) === "xxxx")
        yearStr = yearList.find((year) => year.id === yearId).year;
      else yearStr = getYearById(yearId).year;
    }

    let jobStr = "";
    if (jobNum) {
      jobStr = getProjectByNum(jobNum).name;
      if (phaseStr !== "" || yearStr !== "" || activeStr !== "") jobStr += ",";
      parts.push(jobStr);
      parts.push(activeStr);
    } else {
      let str = `All ${activeStr} Projects`;
      if (phaseStr !== "" || yearStr !== "") str += ",";
      parts.push(str);
    }

    parts.push(phaseStr);
    parts.push(yearStr);

    const str = parts.join(" ");
    return str;
  };

  const countActivePhases = useCallback(
    (jobNum) => {
      const phases = getPhasesForJob(jobNum);
      if (!phases) return 0;

      const count = phases.filter((phase) => phase.status === 4).length;
      return count;
    },
    [getPhasesForJob],
  );

  const getActivePhases = useCallback(
    (jobNums = []) => {
      let count = 0;

      if (jobNums.length === 0) {
        const allPhases = getAllPhases();
        allPhases.forEach((phase) => {
          if (phase.status === 4) {
            count += 1;
          }
        });
      } else {
        jobNums.forEach((jobNum) => {
          const jobPhases = getPhasesForJob(jobNum);
          if (jobPhases && jobPhases.length > 0) {
            jobPhases.forEach((phase) => {
              if (phase.status === 4) {
                count += 1;
              }
            });
          }
        });
      }

      return count;
    },
    [getAllPhases, getPhasesForJob],
  );

  const getClosedPhases = useCallback(
    (jobNums = []) => {
      let closedPhases = [];

      if (jobNums.length === 0) {
        const allPhases = getAllPhases();
        allPhases.forEach((phase) => {
          if (phase.status > 4) {
            closedPhases.push(phase);
          }
        });
      } else {
        jobNums.forEach((jobNum) => {
          const jobPhases = getPhasesForJob(jobNum);
          if (jobPhases && jobPhases.length > 0) {
            jobPhases.forEach((phase) => {
              if (phase.status > 4) {
                closedPhases.push(phase);
              }
            });
          }
        });
      }

      const recnums = closedPhases.map((phase) => {
        const yy = phase.yearNum;
        const jjjj = phase.jobNum;
        const pp = phase.num.padStart(2, "0");

        const recnum = `${yy}${jjjj}${pp}`;
        return recnum;
      });

      return recnums;
    },
    [getAllPhases, getPhasesForJob],
  );

  return (
    <ProjectContext.Provider
      value={{
        projects,
        getAllProjects,
        getPhasesForJob,
        pageModifierToString,
        getPhaseById,
        getProjectByNum,
        getYearsByJob,
        getYearById,
        getPhasesByYear,
        getLastPhaseForJob,
        countActivePhases,
        sortedPhasesPerJob,
        getActivePhases,
        getClosedPhases,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
