import { useModifiers } from "context/ModifierContext";
import { useProjectContext } from "context/ProjectContext";
import SingleStatus from "./SingleStatus";
import useFilteredPhases from "utils/hooks/phase/useFilteredPhases";

export const JobDisplay = ({ open }) => {
  const { pageModifiers, updatePageModifiers, setModTimeout } = useModifiers();
  const { projects } = useProjectContext();
  const selected = pageModifiers.active;
  const { jobNum, yearId, phaseId, active } = pageModifiers;

  const { counts, groupedPhases, singlePhaseData } = useFilteredPhases(
    jobNum,
    yearId,
    phaseId,
    active
  );

  const clickHandler = (e, option) => {
    e.stopPropagation();
    const container = document.getElementById("job-display");
    if (container) {
      container.scrollTop = 0;
    }
    updatePageModifiers({ active: option });
  };

  const changeProj = (e, job, year, phase) => {
    e.stopPropagation();
    setModTimeout(true);
    updatePageModifiers({
      jobNum: job.num,
      yearId: year.id,
      phaseId: phase.id,
    });
  };

  const changePhaseYear = (e, year, phase) => {
    e.stopPropagation();
    const yearId = `xxxx-${year}`;
    const phaseFormatted = phase.toString().padStart(2, "0");
    const phaseId = `xxxx-xx-${phaseFormatted}`;

    setModTimeout(true);
    updatePageModifiers({
      yearId: yearId,
      phaseId: phaseId,
    });
  };

  const jobButtons = ["Total", "Active", "Closed"];

  const buttonMapper = (type) => (
    <button
      className={`job-button ${open ? "open-job-button" : ""} ${type === selected ? "active-job-button" : ""}`}
      onClick={(e) => clickHandler(e, type)}
      key={type}
    >
      <p>{type}</p>
      <h2>{counts[type]}</h2>
    </button>
  );

  const projectMapper = (groupedPhases) => {
    return groupedPhases.map((group) => (
      <div key={`${group.phaseName}-${group.yearNum}`}>
        <div
          className="filtered-job-button sticky-job"
          onClick={(e) => changePhaseYear(e, group.yearNum, group.phaseNum)}
        >{`${group.phaseName} - 20${group.yearNum}`}</div>
        {group.jobs.map(({ job, phase }) => (
          <button
            className="filtered-job-button"
            onClick={(e) =>
              changeProj(e, job, projects.years[phase.yearId], phase)
            }
            key={phase.id}
          >
            <p id="fjb-name">{job.name}</p>
          </button>
        ))}
      </div>
    ));
  };

  if (!projects) return <div className="loading-widget" />;

  if (singlePhaseData) {
    return <SingleStatus singlePhaseData={singlePhaseData} />
  }
  return (
    <div className={`${open ? "open-job-display" : ""} job-display`}>
      <div className="job-buttons">
        {jobButtons.map((type) => buttonMapper(type))}
      </div>
      <div
        id="job-display"
        className={`${open ? "open-filtered-job" : ""} filtered-jobs `}
      >
        {projectMapper(groupedPhases)}
      </div>
    </div>
  );
};

export default JobDisplay;
