import { buildingSvg, downArrowSvg, rightArrowSvg } from "@assets/icons/svgs";
import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import { useProjectContext } from "@features/projects/context/ProjectContext";

function JobListButton({ isOpen, setIsOpen }) {
  const { pageModifiers } = useJobcostContext();
  const { getJobListByPageModifiers, phaseListToProjectList } =
    useProjectContext();
  const jobList = getJobListByPageModifiers(pageModifiers);
  const projectList = phaseListToProjectList(jobList);
  const totalProjects = projectList.length;

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      style={{ paddingLeft: "15px", paddingRight: "20px", gap: "15px" }}
      className={`job-cost-header-button ${isOpen ? "open-job-cost-header-button" : ""}`}
    >
      <div style={{ marginTop: "5px", width: "35px" }}> {buildingSvg()}</div>
      {totalProjects ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <h2 style={{ fontWeight: 700, fontSize: "20px" }}>
              {" "}
              {totalProjects || 0}
            </h2>
            <h5 style={{ minWidth: "17ch" }}>
              {" "}
              {totalProjects && totalProjects === 1
                ? "Project"
                : "Projects"}{" "}
            </h5>
          </div>
          <div className="joblist-arrow">
            {isOpen ? downArrowSvg() : rightArrowSvg()}
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              width: "7.5ch",
              position: "relative",
            }}
          >
            <div className="loading-widget" />
            <h5 style={{ opacity: 0, minWidth: "17ch", fontSize: "20px" }}>
              {" "}
              Projects{" "}
            </h5>
          </div>
        </>
      )}
    </div>
  );
}

export default JobListButton;
