import Select from "react-dropdown-select";
import { useProjectContext } from "context/ProjectContext";
import { useTrackedJobs } from "context/TrackedJobContext";
import useIsAdmin from "utils/hooks/useIsAdmin";
import { useJobCostContext } from "context/JobCostContext";

function ProjectSelector() {
  const {
    projects,
    getAllProjects,
    getProjectByNum,
    getYearsByJob,
    getYearById,
    getPhasesByYear,
  } = useProjectContext();
  const { trackedJobs } = useTrackedJobs();
  const isAdmin = useIsAdmin();
  const { pageModifiers, modTimeout, updatePageModifiers } =
    useJobCostContext();

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
    console.log(newMods);
    updatePageModifiers(newMods);
  };

  const handleWrapperClick = (e) => {
    if (e.target.closest(".react-dropdown-select")) return;

    const control = e.currentTarget.querySelector(".react-dropdown-select");

    if (control) {
      control.click();
    }
  };

  return (
    <div
      className={`project-select-wrapper ${active && "project-select-wrapper-active"} psd-left`}
      title="Change project"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        alignItems: "flex-start",
        paddingRight: "25px",
        borderRadius: "0px",
        paddingLeft: "22px",
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
        placeholder={isAdmin ? "All Projects" : "Select a project"}
        className="project-select-dropdown"
        dropdownGap={-3}
        dropdownHandle={false}
        searchBy="name"
        sortBy="name"
        onChange={handleJobChange}
      />
    </div>
  );
}

export default ProjectSelector;
