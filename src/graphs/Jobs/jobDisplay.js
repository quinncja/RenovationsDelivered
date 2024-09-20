import { leftArrowSvg, rightArrowSvg } from "business/svg";
import { useDashboardContext } from "context/DashboardContext";
import { useProjectContext } from "context/ProjectContext";
import { useMemo } from "react";
import { phaseNumToMonth, statusToString } from "utils/formatters";

export const JobDisplay = () => {
  const { pageModifiers, updatePageModifiers, setModTimeout } =
    useDashboardContext();
  const { projects } = useProjectContext();
  const selected = pageModifiers.active;
  const { jobNum, yearId, phaseId, active } = pageModifiers;

  const getFilteredPhases = (modifiers, projects) => {
    const { jobNum, yearId, phaseId } = modifiers;
    const { phases = {} } = projects || {};

    const phasesArray = Object.values(phases);

    return phasesArray.filter((phase) => {
      const [phaseJobNum, phaseYearNum, phasePhaseNum] = phase.id.split("-");

      let isMatch = true;

      if (jobNum && jobNum !== "") {
        isMatch = isMatch && phaseJobNum === jobNum;
      }

      if (yearId && yearId !== "") {
        isMatch = isMatch && phaseYearNum === yearId.split("-")[1];
      }

      if (phaseId && phaseId !== "") {
        isMatch = isMatch && phasePhaseNum === phaseId.split("-")[2];
      }

      return isMatch;
    });
  };

  const filteredPhases = useMemo(() => {
    if (jobNum || yearId || phaseId) {
      return getFilteredPhases(pageModifiers, projects);
    }
    return Object.values((projects && projects.phases) || {});
  }, [jobNum, yearId, phaseId, pageModifiers, projects]);

  const { counts, phaseList } = useMemo(() => {
    const counts = {
      Total: 0,
      Active: 0,
      Closed: 0,
    };
    const phaseList = [];

    filteredPhases.forEach((phase) => {
      counts.Total += 1;
      if (phase.status === 4) counts.Active += 1;
      if (phase.status > 4) counts.Closed += 1;

      if (active === "Active" && phase.status === 4) {
        phaseList.push(phase);
      } else if (active === "Closed" && phase.status > 4) {
        phaseList.push(phase);
      } else if (active === "Total") {
        phaseList.push(phase);
      }
    });

    return { counts, phaseList };
  }, [filteredPhases, active]);

  const clickHandler = (option) => {
    const newMods = {
      active: option,
    };
    updatePageModifiers(newMods);
  };

  const changeProj = (job, year, phase) => {
    setModTimeout(true);
    const newMods = {
      jobNum: job.num,
      yearId: year.id,
      phaseId: phase.id,
    };
    updatePageModifiers(newMods);
  };

  const changePhase = (phase) => {
    setModTimeout(true);
    const newMods = {
      phaseId: phase,
    };
    updatePageModifiers(newMods);
  };

  const jobButtons = ["Total", "Active", "Closed"];

  const buttonMapper = (type) => {
    return (
      <button
        className={`job-button ${type === selected ? "active-job-button" : ""}`}
        onClick={() => clickHandler(type)}
      >
        <p> {type} </p>
        <h2> {counts[type]} </h2>
      </button>
    );
  };

  const phaseMapper = (phase) => {
    const job = projects.jobs[phase.jobNum];
    const year = projects.years[phase.yearId];
    return (
      <button
        className="filtered-job-button"
        onClick={() => {
          console.log(job);
          changeProj(job, year, phase, true);
        }}
        key={phase.id}
      >
        <p id="fjb-name">{job.name}</p>
        <p>
          {phase.name} - 20{year.num}
        </p>
      </button>
    );
  };

  const stepBack = (index, phases) => {
    let newIndex = index - 1;
    let newPhase = phases[newIndex];
    changePhase(newPhase);
  };
  const stepForward = (index, phases) => {
    let newIndex = index + 1;
    let newPhase = phases[newIndex];
    changePhase(newPhase);
  };

  if (!projects || !filteredPhases) return <div className="loading-widget" />;
  else if (filteredPhases && filteredPhases.length === 1) {
    const phaseId = filteredPhases[0].id;
    const jobName = projects.jobs[filteredPhases[0].jobNum].name;
    const yearId = filteredPhases[0].yearId;
    const phases = projects.years[yearId].phases;
    const phaseIndex = phases.indexOf(phaseId);
    const phaseLength = phases.length;
    const goForward = phaseIndex + 1 < phaseLength;
    const goBackward = phaseIndex > 0;
    const yearName = projects.years[yearId].year;
    const phaseName = filteredPhases[0].name;
    const month = phaseNumToMonth(filteredPhases[0].num);
    const statusString = statusToString(filteredPhases[0].status);

    return (
      <div className="job-display job-display-single">
        <strong> {jobName} </strong>
        <div className="job-display-content">
          <button
            className={`job-display-arrow ${!goBackward && `arrow-hidden`}`}
            onClick={() => stepBack(phaseIndex, phases)}
          >
            {leftArrowSvg()}
          </button>
          <div className="job-display-section">
            <h2> {phaseName} </h2>
            {month} - {yearName}
            <div className={`job-display-status status-${statusString}`}>
              {" "}
              {statusString}{" "}
            </div>
          </div>
          <button
            className={`job-display-arrow ${!goForward && `arrow-hidden`}`}
            onClick={() => stepForward(phaseIndex, phases)}
          >
            {rightArrowSvg()}
          </button>
        </div>
      </div>
    );
  } else
    return (
      <div className="job-display">
        <div className="job-buttons">
          {jobButtons.map((type) => buttonMapper(type))}
        </div>
        <div className="filtered-jobs">
          {phaseList.map((phase) => phaseMapper(phase))}
        </div>
      </div>
    );
};

export default JobDisplay;
