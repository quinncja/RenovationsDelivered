import { useState, useCallback, useMemo } from "react";
import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import { useProjectContext } from "@features/projects/context/ProjectContext";
import { downArrowSvg, rightArrowSvg } from "@assets/icons/svgs";

function JobList() {
  const { pageModifiers, updatePageModifiers } = useJobcostContext();
  const { getJobListByPageModifiers, phaseListToProjectList } =
    useProjectContext();
  const jobList = getJobListByPageModifiers(pageModifiers);
  const projectList = phaseListToProjectList(jobList);
  const totalProjects = projectList.length;

  const [currentPage, setCurrentPage] = useState(1);
  const [expandedProject, setExpandedProject] = useState(null);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(totalProjects / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = useMemo(
    () => projectList.slice(startIndex, endIndex),
    [projectList, startIndex, endIndex],
  );

  const handlePhaseClick = useCallback(
    (e, phase) => {
      e.stopPropagation();
      const mods = {
        jobNum: phase.jobNum,
        yearId: phase.yearId,
        phaseId: phase.id,
      };
      updatePageModifiers(mods);
    },
    [updatePageModifiers],
  );

  const handleProjectClick = useCallback(
    (project) => {
      const mods = {
        jobNum: project.jobNum,
        year: null,
      };
      updatePageModifiers(mods);
    },
    [updatePageModifiers],
  );

  const handlePhaseToggle = useCallback(
    (e, projectJobNum) => {
      e.stopPropagation();
      setExpandedProject(
        expandedProject === projectJobNum ? null : projectJobNum,
      );
    },
    [expandedProject],
  );

  const renderPhase = useCallback(
    (phase) => {
      return (
        <button
          key={phase.id}
          className="phase-button"
          onClick={(e) => handlePhaseClick(e, phase)}
        >
          P{Number(phase.num)}
        </button>
      );
    },
    [handlePhaseClick],
  );

  const renderPhaseCount = useCallback(
    (project) => {
      const isExpanded = expandedProject === project.jobNum;
      const phaseCount = project.phases.length;

      return (
        <div
          className="phase-count"
          onClick={(e) => handlePhaseToggle(e, project.jobNum)}
        >
          <span className="phase-count-text">
            {phaseCount} phase{phaseCount !== 1 ? "s" : ""}
          </span>
          <span
            className={`phase-count-chevron ${isExpanded ? "expanded" : ""}`}
          >
            {isExpanded ? downArrowSvg() : rightArrowSvg()}
          </span>
        </div>
      );
    },
    [expandedProject, handlePhaseToggle],
  );

  const renderProject = useCallback(
    (project) => {
      const isExpanded = expandedProject === project.jobNum;

      return (
        <div key={project.jobNum} className="project-item recent-item">
          <div className="project-header">
            <div
              className="project-info"
              onClick={() => handleProjectClick(project)}
            >
              <h3 className="project-name">{project.name}</h3>
              <h4 className="project-client">{project.client}</h4>
            </div>
            {renderPhaseCount(project)}
          </div>

          {isExpanded && (
            <div className="expanded-phases">
              {project.phases.map((phase) => renderPhase(phase))}
            </div>
          )}
        </div>
      );
    },
    [handleProjectClick, renderPhaseCount, expandedProject, renderPhase],
  );

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    setExpandedProject(null);
  }, []);

  const renderPagination = useCallback(() => {
    if (totalPages <= 1) return null;

    return (
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
        >
          ←
        </button>

        <span className="pagination-info">
          {startIndex + 1}-{Math.min(endIndex, totalProjects)} of{" "}
          {totalProjects}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`pagination-button ${currentPage === totalPages ? "disabled" : ""}`}
        >
          →
        </button>
      </div>
    );
  }, [
    totalPages,
    currentPage,
    handlePageChange,
    startIndex,
    endIndex,
    totalProjects,
  ]);

  return (
    <div className="joblist-widget">
      <h4 className="joblist-header">Project List</h4>
      {currentProjects.map((project) => renderProject(project))}
      {renderPagination()}
    </div>
  );
}

export default JobList;
