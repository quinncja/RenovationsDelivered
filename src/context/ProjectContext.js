import _ from "lodash";
import { createContext, useCallback, useContext, useState } from "react";
import { phaseList, yearList } from "utils/modifiers";

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(undefined);

  const recnumToPageModifiers = (recnum) => {
    const jobNum = recnum.slice(2,6)
    const yearId = `${jobNum}-${recnum.slice(0,2)}`
    const phaseId = `${yearId}-${recnum.slice(6,8)}`
    return({
      jobNum,
      yearId,
      phaseId
    })
  }

  const getAllProjects = useCallback(() => {
    if (projects && projects.jobs) {
      return Object.values(projects.jobs);
    }
    return [];
  }, [projects]);

  const getAllPhases = useCallback(() => {
    return projects && projects.phases ? Object.values(projects.phases) : [];
  }, [projects]);

  const getPhaseById = useCallback(
    (phaseId) => {
      return projects && projects.phases ? projects.phases[phaseId] : "";
    },
    [projects],
  );

  const getProjectByNum = useCallback(
    (jobNum) => {
      return jobNum && projects && projects.jobs ? projects.jobs[jobNum] : "";
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
      return projects && yearId && projects.years ? projects.years[yearId] : "";
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

  const getPhasesByYearNum = (yearNum) => {
    if (!projects?.phases) return [];

    return Object.values(projects.phases).filter(
      (phase) => phase.yearNum === yearNum,
    );
  };

  const getPhasesByFullYear = (fullYear) => {
    const yearNum = String(fullYear).slice(-2);
    return getPhasesByYearNum(yearNum);
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

  const getJobStr = (jobNum) => {
    if (jobNum === "000999") return "Warranty";
    if (jobNum === "000363") return "Mikes House";
    const project = getProjectByNum(jobNum);
    return project ? project.name : jobNum;
  };

  const getYearStr = (yearId) => {
    return getYearById(yearId).year;
  };

  const getPhaseStr = (phaseId) => {
    const phase = getPhaseById(phaseId);
    if (phase) return phase.name;
    else return "";
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

  const countClosedPhases = useCallback(
    (jobNum) => {
      const phases = getPhasesForJob(jobNum);
      if (!phases) return 0;

      const count = phases.filter((phase) => phase.status > 4).length;
      return count;
    },
    [getPhasesForJob],
  );

  const getActivePhasesForHome = useCallback(
    (jobNums = []) => {
      let count = 0;

      if (jobNums.length === 0) {
        return 0;
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
        return [];
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
    [getPhasesForJob],
  );

  const getActiveJobs = useCallback(() => {
    const activeJobs = [];
    const allProjects = getAllProjects();

    if (!allProjects || allProjects.length === 0) return activeJobs;

    allProjects.forEach((project) => {
      const jobNum = project.num;
      const activePhaseCount = countActivePhases(jobNum);
      if (activePhaseCount > 0) {
        activeJobs.push(jobNum);
      }
    });

    return activeJobs;
  }, [getAllProjects, countActivePhases]);

  const getAllStates = () => {
    if (!projects?.states) return [];

    return Object.values(projects.states).sort();
  };

  const getStateInfo = (state) => {
    if (!projects?.states?.[state]) return null;
    return projects.states[state];
  };

  const getJobsByState = (state) => {
    if (!projects?.states?.[state]) return [];
    const stateData = projects.states[state];
    return stateData.jobIds
      .map((jobId) => projects.jobs[jobId])
      .filter(Boolean);
  };

  const getPhasesByState = (state) => {
    if (!projects?.states?.[state]) return [];
    const stateData = projects.states[state];
    return stateData.phaseIds
      .map((phaseId) => projects.phases[phaseId])
      .filter(Boolean);
  };

  const getStateByPhase = (phaseId) => {
    if (!projects?.states) return [];

    //eslint-disable-next-line
    for (const [stateKey, stateData] of Object.entries(projects.states)) {
      if (stateData.phaseIds.includes(phaseId)) {
        return stateData;
      }
    }
    return [];
  };

  const getStateByJob = (jobId) => {
    if (!projects || !projects?.states) return null;

    //eslint-disable-next-line
    for (const [stateKey, stateData] of Object.entries(projects.states)) {
      if (stateData.jobIds.includes(jobId)) {
        return stateData;
      }
    }
    return null;
  };

  const getJobCountByState = () => {
    if (!projects?.states) return {};
    return Object.entries(projects.states).reduce((acc, [state, data]) => {
      acc[state] = data.jobIds.length;
      return acc;
    }, {});
  };

  const getPhaseCountByState = () => {
    if (!projects?.states) return {};
    return Object.entries(projects.states).reduce((acc, [state, data]) => {
      acc[state] = data.phaseIds.length;
      return acc;
    }, {});
  };

  const getAllSupervisors = () => {
    if (!projects?.supervisors) return [];
    return Object.values(projects.supervisors).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  };

  const getSupervisorById = (supervisorId) => {
    return projects.supervisors?.[supervisorId] || null;
  };

  const getJobsBySupervisor = (supervisorId) => {
    const supervisor = projects.supervisors?.[supervisorId];
    if (!supervisor) return [];
    return supervisor.jobs.map((jobId) => projects.jobs[jobId]).filter(Boolean);
  };

  const getPhasesBySupervisor = (supervisorId) => {
    if (!projects?.phases) return [];
    return Object.values(projects.phases).filter(
      (phase) => phase.pmId === supervisorId,
    );
  };

  const getSupervisorByPhase = (phaseId) => {
    if (!projects) return [];
    const phase = projects.phases?.[phaseId];
    if (!phase?.pmId) return [];
    return projects.supervisors[phase.pmId] || null;
  };

  const getSupervisorName = (supervisorId) => {
    if (!projects) return [];
    return projects.supervisors?.[supervisorId]?.name || "Unknown";
  };

  const getJobCountBySupervisor = () => {
    if (!projects?.supervisors) return {};
    return Object.entries(projects.supervisors).reduce(
      (acc, [id, supervisor]) => {
        acc[id] = {
          name: supervisor.name,
          count: supervisor.jobs.length,
        };
        return acc;
      },
      {},
    );
  };

  const getPhaseCountBySupervisor = () => {
    if (!projects?.phases || !projects?.supervisors) return {};

    const counts = {};
    Object.values(projects.supervisors).forEach((supervisor) => {
      counts[supervisor.id] = {
        name: supervisor.name,
        count: 0,
      };
    });

    Object.values(projects.phases).forEach((phase) => {
      if (phase.pmId && counts[phase.pmId]) {
        counts[phase.pmId].count++;
      }
    });

    return counts;
  };

  const getAllStatuses = () => {
    if (!projects?.statuses) return [];
    return Object.keys(projects.statuses)
      .map((s) => parseInt(s, 10))
      .sort((a, b) => a - b);
  };

  const getStatusInfo = (status) => {
    if (!projects?.statuses?.[status]) return null;
    return projects.statuses[status];
  };

  const getJobsByStatus = (status) => {
    if (!projects?.statuses?.[status]) return [];
    const statusData = projects.statuses[status];
    return statusData.jobIds
      .map((jobId) => projects.jobs[jobId])
      .filter(Boolean);
  };

  const getPhasesByStatus = (status) => {
    if (!projects?.statuses?.[status]) return [];
    const statusData = projects.statuses[status];
    return statusData.phaseIds
      .map((phaseId) => projects.phases[phaseId])
      .filter(Boolean);
  };

  const getStatusByPhase = (phaseId) => {
    if (!projects) return null;
    const phase = projects.phases?.[phaseId];
    return phase?.status || null;
  };

  const getJobCountByStatus = () => {
    if (!projects?.statuses) return {};
    return Object.entries(projects.statuses).reduce((acc, [status, data]) => {
      acc[status] = data.jobIds.length;
      return acc;
    }, {});
  };

  const getPhaseCountByStatus = () => {
    if (!projects?.statuses) return {};
    return Object.entries(projects.statuses).reduce((acc, [status, data]) => {
      acc[status] = data.phaseIds.length;
      return acc;
    }, {});
  };

  const getAllClients = () => {
    if (!projects) return [];
    if (!projects?.clients) return [];
    return Object.values(projects.clients).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  };

  const getClientById = (clientId) => {
    return projects.clients?.[clientId] || null;
  };

  const getJobsByClient = (clientId) => {
    const client = projects.clients?.[clientId];
    if (!client) return [];
    return client.jobs.map((jobId) => projects.jobs[jobId]).filter(Boolean);
  };

  const getClientByPhase = (phaseId) => {
    if (!projects) return [];
    const phase = projects.phases?.[phaseId];
    if (!phase?.clientId) return [];
    return projects.clients[phase.clientId] || null;
  };

  const getClientByJob = (jobId) => {
    if (!projects) return [];
    const job = projects.jobs?.[jobId];
    if (!job?.clientId) return null;
    return projects.clients[job.clientId] || [];
  };

  const getJobPhasesByStatus = (jobId, status) => {
    const job = projects.jobs?.[jobId];
    if (!job) return [];

    const allPhases = [];
    job.years.forEach((yearId) => {
      const year = projects.years[yearId];
      if (year?.phases) {
        year.phases.forEach((phaseId) => {
          const phase = projects.phases[phaseId];
          if (phase && phase.status === status) {
            allPhases.push(phase);
          }
        });
      }
    });

    return allPhases;
  };

  const getJobsBySupervisorAndState = (supervisorId, state) => {
    const supervisorJobs = getJobsBySupervisor(supervisorId);
    const stateJobs = getJobsByState(state);

    const stateJobIds = new Set(stateJobs.map((j) => j.num));
    return supervisorJobs.filter((job) => stateJobIds.has(job.num));
  };

  const getPhasesBySupervisorAndStatus = (supervisorId, status) => {
    const supervisorPhases = getPhasesBySupervisor(supervisorId);
    return supervisorPhases.filter((phase) => phase.status === status);
  };

  const getSupervisorsByState = () => {
    const matrix = {};

    if (!projects?.phases) return matrix;

    Object.values(projects.phases).forEach((phase) => {
      const state = phase.state;
      const pmId = phase.pmId;

      if (!matrix[state]) {
        matrix[state] = new Set();
      }

      if (pmId) {
        matrix[state].add(pmId);
      }
    });

    Object.keys(matrix).forEach((state) => {
      matrix[state] = Array.from(matrix[state]).map((pmId) => ({
        id: pmId,
        name: getSupervisorName(pmId),
      }));
    });

    return matrix;
  };

  const pageModifierToString = (modifiers) => {
    const { jobNum, yearId, phaseId, state, pm, client } = modifiers;
    const parts = [];

    const getDisplayValue = (id, getByIdFn, listFallback, property) => {
      if (!id) return "";

      if (id.substring(0, 4) === "xxxx") {
        const item = listFallback.find((item) => item.id === id);
        return item ? item[property] : "";
      }

      const item = getByIdFn(id);
      return item ? item[property] : "";
    };

    const jobStr = jobNum ? getProjectByNum(jobNum)?.name || "" : "";
    const yearStr = getDisplayValue(yearId, getYearById, yearList, "year");
    const phaseStr = getDisplayValue(phaseId, getPhaseById, phaseList, "name");
    const stateStr = state || "";
    const pmStr = pm ? getSupervisorById(pm)?.name || "" : "";
    const clientStr = client ? getClientById(client)?.name || "" : "";

    if (jobStr) {
      parts.push(jobStr);
    } else {
      parts.push("All Projects");
    }

    const filters = [
      clientStr && `Client: ${clientStr}`,
      stateStr && `State: ${stateStr}`,
      pmStr && `PM: ${pmStr}`,
      yearStr && `Year: ${yearStr}`,
      phaseStr && `Phase: ${phaseStr}`,
    ].filter(Boolean);

    if (filters.length > 0) {
      if (jobStr) {
        parts.push(`(${filters.join(", ")})`);
      } else {
        parts.push(`- ${filters.join(", ")}`);
      }
    }

    return parts.join(" ");
  };

  const phaseListToProjectList = (phaseList) => {
  const groupedPhases = _.groupBy(phaseList, 'jobNum');
  
  const projectList = Object.keys(groupedPhases).map(jobNum => ({
    jobNum: jobNum,
    name: getProjectByNum(jobNum)?.name || 'Unknown Project',
    client: getClientByJob(jobNum)?.name || 'Unknown Client',
    phases: groupedPhases[jobNum]
  }));

  return projectList;
};

const getJobListByPageModifiers = (pageModifiers) => {
  const jobList = Object.values(projects?.phases || {}).filter((phase) => {
    const statusMatch = pageModifiers.status === null || 
                       (pageModifiers.status === 5 ? (phase.status === 5 || phase.status === 6) : 
                        phase.status === pageModifiers.status);
    
    return (
      (pageModifiers.jobNum === null || phase.jobNum === pageModifiers.jobNum) &&
      (pageModifiers.yearId === null || phase.yearNum === pageModifiers.yearId.slice(-2)) &&
      (pageModifiers.phaseId === null || phase.num === pageModifiers.phaseId.slice(-2)) &&
      (pageModifiers.state === null || phase.state === pageModifiers.state) &&
      statusMatch &&
      (pageModifiers.pm === null || phase.pmId === pageModifiers.pm) &&
      (pageModifiers.client === null || phase.clientId === pageModifiers.client)
    );
  });
  
  return jobList;
};
  function getUniformStatus(list) {
    if (!list || list.length === 0) return null;
    
    const firstStatus = list[0].status;
    const normalizedFirst = firstStatus === 6 ? 5 : firstStatus;
    
    for (let i = 1; i < list.length; i++) {
      const currentStatus = list[i].status;
      const normalizedCurrent = currentStatus === 6 ? 5 : currentStatus;
      
      if (normalizedCurrent !== normalizedFirst) {
        return "Mixed";
      }
    }
    
    if (normalizedFirst === 4) return 4;
    if (normalizedFirst === 5) return 5;
    
    return "Mixed";
  }
  
  const getJobListStatus = (pageModifiers) => {
    const jobList = getJobListByPageModifiers(pageModifiers)
    return getUniformStatus(jobList)
  }

  return (
    <ProjectContext.Provider
      value={{
        
        projects,
        setProjects,
        getAllProjects,
        getPhasesForJob,
        recnumToPageModifiers,
        pageModifierToString,
        getPhaseById,
        getProjectByNum,
        getYearsByJob,
        getYearById,
        getPhasesByYear,
        getLastPhaseForJob,
        countActivePhases,
        countClosedPhases,
        getActivePhasesForHome,
        getActivePhases,
        getClosedPhases,
        getJobStr,
        getYearStr,
        getPhaseStr,
        getActiveJobs,

        getAllStates,
        getStateInfo,
        getJobsByState,
        getPhasesByState,
        getStateByPhase,
        getStateByJob,
        getJobCountByState,
        getPhaseCountByState,

        getAllSupervisors,
        getSupervisorById,
        getJobsBySupervisor,
        getPhasesBySupervisor,
        getSupervisorByPhase,
        getSupervisorName,
        getJobCountBySupervisor,
        getPhaseCountBySupervisor,

        getAllStatuses,
        getStatusInfo,
        getJobsByStatus,
        getPhasesByStatus,
        getStatusByPhase,
        getJobCountByStatus,
        getPhaseCountByStatus,

        getAllClients,
        getClientById,
        getJobsByClient,
        getClientByPhase,
        getClientByJob,

        getJobPhasesByStatus,
        getJobsBySupervisorAndState,
        getPhasesBySupervisorAndStatus,
        getSupervisorsByState,
        getPhasesByFullYear,

        getJobListByPageModifiers,
        getJobListStatus,
        phaseListToProjectList
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
