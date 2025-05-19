import { useRef, useEffect } from "react";
import { plus } from "business/svg";
import { useModalContext } from "context/ModalContext";
import { useModifiers } from "context/ModifierContext";
import { useTrackedJobs } from "context/TrackedJobContext";
import { strToMods } from "utils/formatters";
import { useJobData } from "utils/hooks/useJobData";
import ProjectTab from "./ProjectTab";

function ProjectTabs({ isAdmin }) {
  const { pageModifiers, updatePageModifiers } = useModifiers();
  const { jobNum } = pageModifiers;
  const { openModal } = useModalContext();
  const { trackedJobs, updateTrackedJobs, dataMap } = useTrackedJobs();
  const loadData = useJobData();
  const abortControllersRef = useRef({});

  useEffect(() => {
    if (!trackedJobs) return;
    const jobsToLoad = trackedJobs.filter((job) => !dataMap[job]);

    jobsToLoad.forEach((job) => {
      if (abortControllersRef.current[job]) {
        return;
      }

      const controller = new AbortController();
      abortControllersRef.current[job] = controller;

      loadData(job, controller.signal)
        .then(() => {
          delete abortControllersRef.current[job];
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.error(`Error loading data for job ${job}:`, error);
          }
          delete abortControllersRef.current[job];
        });
    });

    return () => {
      Object.values(abortControllersRef.current).forEach((controller) => {
        controller.abort();
      });
      abortControllersRef.current = {};
    };
  }, [trackedJobs, dataMap, loadData]);

  const handleTabClick = (job,) => {
    const mods = strToMods(job, null, null);
    updatePageModifiers(mods);
  };

  const handleDelete = async (jobToDelete) => {
    const updatedJobs = trackedJobs.filter((job) => job !== jobToDelete);
    const isActiveTab = jobToDelete === jobNum;
    if (isActiveTab) {
      const job = updatedJobs.slice(-1)[0];
      const jobObj = dataMap[job];
      let phaseObj;
      if (jobObj.openPhases.length > 0) {
        phaseObj = jobObj.openPhases[0];
      } else {
        phaseObj = jobObj.closedPhase;
      }
      const { phase, year } = phaseObj;
      const mods = strToMods(job, year, phase);
      updatePageModifiers(mods);
    }
    updateTrackedJobs(updatedJobs, "Delete");
  };

  const handlePlusClick = () => {
    openModal("addJobs");
  };

  const handleViewAllTime = (job) => {
    const mods = strToMods(job, null, null);
    updatePageModifiers(mods);
  };

  const handleViewByYear = (job, jobData) => {
    let phaseObj;
    if (jobData.openPhases.length > 0) {
      phaseObj = jobData.openPhases[0];
    } else {
      phaseObj = jobData.closedPhase;
    }
    const { year } = phaseObj;
    const mods = strToMods(job, year, null);
    updatePageModifiers(mods);
  };

  return (
    <div className={`project-tabs ${!isAdmin && `pt-left-border`}`}>
      {trackedJobs && trackedJobs.length > 0
        ? trackedJobs.map((job) => {
            const jobData = dataMap[job];
            const activeTab = jobNum === job;
            if (!jobData) {
              return (
                <button
                  key={job}
                  className="project-button loading-widget-small"
                  style={{ width: "100px" }}
                ></button>
              );
            } else
              return (
                <ProjectTab
                  key={job}
                  job={job}
                  jobData={jobData}
                  activeTab={activeTab}
                  onTabClick={handleTabClick}
                  onDelete={handleDelete}
                  onViewAllTime={handleViewAllTime}
                  onViewByYear={handleViewByYear}
                />
              );
          })
        : ""}
      <button
        className="project-button"
        style={{ paddingBlock: "0px", paddingInline: "5px" }}
        onClick={handlePlusClick}
      >
        {plus()}
      </button>
    </div>
  );
}

export default ProjectTabs;
