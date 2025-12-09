import Select from "react-dropdown-select";
import { useProjectContext } from "@features/projects/context/ProjectContext";
import { useTrackedProjects } from "@features/projects/context/TrackedProjectContext";
import useIsAdmin from "@shared/hooks/useIsAdmin";
import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import { close } from "@assets/icons/svgs";
import { useState } from "react";

function ProjectSelector() {
  const {
    projects,
    getAllProjects,
    getProjectByNum,
    getYearsByJob,
    getYearById,
    getPhasesByYear,
  } = useProjectContext();
  const { trackedJobs } = useTrackedProjects();
  const isAdmin = useIsAdmin();
  const { pageModifiers, modTimeout, updatePageModifiers } =
    useJobcostContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const allProjects = getAllProjects() || [];
  const { jobs = {} } = projects || {};
  const trackedProjects = allProjects.filter((proj) =>
    trackedJobs.includes(proj.num),
  );
  const selectedJobNum = pageModifiers.jobNum;
  const active = pageModifiers.jobNum;

  const getJobMods = (jobNum) => {
    const selectedJob = getProjectByNum(jobNum);
    const selectedJobYears = getYearsByJob(selectedJob);
    if (selectedJobYears.length === 1) {
      const selectedYearId = selectedJobYears[0].id;
      const selectedYear = getYearById(selectedYearId);
      const selectedYearPhases = getPhasesByYear(selectedYear, selectedJob);
      if (selectedYearPhases.length === 1) {
        return {
          jobNum: jobNum,
          yearId: null,
          phaseId: null,
        };
      } else
        return {
          jobNum: jobNum,
          yearId: null,
        };
    } else return { jobNum: jobNum };
  };

  const handleJobChange = (value) => {
    if (modTimeout) return;
    let jobNum;
    if (!isAdmin && value.length === 0) jobNum = "none";
    else jobNum = value.length > 0 ? value[0].num : null;
    const newMods = getJobMods(jobNum);
    console.log(newMods, "NEW MODS");
    updatePageModifiers(newMods);
  };

  const handleWrapperClick = (e) => {
    if (e.target.closest(".react-dropdown-select")) return;
    const control = e.currentTarget.querySelector(".react-dropdown-select");
    if (control) {
      control.click();
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    const newMods = {
      jobNum: null,
    };
    updatePageModifiers(newMods);
  };

  return (
    <div
      className={`project-select-wrapper ${active ? "project-select-wrapper-active" : ""} ${isDropdownOpen ? "project-select-wrapper-open" : ""}`}
      title="Change project"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingRight: "40px",
        borderRadius: "0px",
        paddingLeft: "22px",
        minWidth: "200px",
      }}
      onClick={handleWrapperClick}
    >
      <h4> Project </h4>
      <Select
        labelField="name"
        valueField="num"
        options={isAdmin ? allProjects || [] : trackedProjects || []}
        values={
          selectedJobNum && jobs[selectedJobNum] ? [jobs[selectedJobNum]] : []
        }
        placeholder={isAdmin ? "-" : "-"}
        className="project-select-dropdown"
        dropdownGap={15}
        dropdownHandle={false}
        searchBy="name"
        sortBy="name"
        onChange={handleJobChange}
        portal={document.body}
        dropdownPosition="bottom"
        onDropdownOpen={() => setIsDropdownOpen(true)}
        onDropdownClose={() => setIsDropdownOpen(false)}
      />
      {active && (
        <div
          className="select-clear"
          title="Clear project"
          onClick={(e) => handleClear(e)}
        >
          {close()}
        </div>
      )}
    </div>
  );
}

export default ProjectSelector;
