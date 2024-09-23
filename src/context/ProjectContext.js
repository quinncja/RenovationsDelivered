import { createContext, useContext, useEffect, useState } from "react";
import { fetchJobList } from "utils/api";
import { normalizeData } from "utils/jobNormalizer";
import { phaseList, yearList } from "utils/modifiers";

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(undefined);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobData = await fetchJobList();
        const normalized = normalizeData(jobData);
        setProjects(normalized);
      } catch (error) {
        console.log(error);
      }
    };
    if (!projects) loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllProjects = () => {
    if (projects && projects.jobs) {
      return Object.values(projects.jobs);
    }
    return [];
  };

  const getProjectByNum = (jobNum) => {
    return projects.jobs[jobNum];
  };

  const getYearById = (yearId) => {
    return projects.years[yearId];
  };

  const getPhaseById = (phaseId) => {
    return projects.phases[phaseId];
  };

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

  return (
    <ProjectContext.Provider
      value={{
        projects,
        getAllProjects,
        pageModifierToString,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
