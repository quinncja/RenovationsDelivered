import { leftArrowSvg, rightArrowSvg } from "business/svg";
import { useModifiers } from "context/ModifierContext";
import { useProjectContext } from "context/ProjectContext";
import { useMemo } from "react";
import { phaseNumToMonth, statusToString } from "utils/formatters";

export const JobDisplay = () => {
  const { pageModifiers, updatePageModifiers, setModTimeout } =
    useModifiers();
  const { projects } = useProjectContext();
  const selected = pageModifiers.active;
  const { jobNum, yearId, phaseId, active } = pageModifiers;

  const clickHandler = (option) => {
    const container = document.getElementById("job-display");
    if (container) {
      container.scrollTop = 0;
    }
    updatePageModifiers({ active: option });
  };

  const changeProj = (job, year, phase) => {
    setModTimeout(true);
    updatePageModifiers({
      jobNum: job.num,
      yearId: year.id,
      phaseId: phase.id,
    });
  };

  const changePhaseYear = (year, phase) => {
    const yearId = `xxxx-${year}`;
    const phaseFormatted = phase.toString().padStart(2, "0");
    const phaseId = `xxxx-xx-${phaseFormatted}`;

    setModTimeout(true);
    updatePageModifiers({
      yearId: yearId,
      phaseId: phaseId,
    });
  };

  const changePhase = (phaseId) => {
    setModTimeout(true);
    updatePageModifiers({ phaseId });
  };

  const jobButtons = ["Total", "Active", "Closed"];

  const buttonMapper = (type) => (
    <button
      className={`job-button ${type === selected ? "active-job-button" : ""}`}
      onClick={() => clickHandler(type)}
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
          onClick={() => changePhaseYear(group.yearNum, group.phaseNum)}
        >{`${group.phaseName} - 20${group.yearNum}`}</div>
        {group.jobs.map(({ job, phase }) => (
          <button
            className="filtered-job-button"
            onClick={() => changeProj(job, projects.years[phase.yearId], phase)}
            key={phase.id}
          >
            <p id="fjb-name">{job.name}</p>
          </button>
        ))}
      </div>
    ));
  };

  const { counts, groupedPhases, singlePhaseData } = useMemo(() => {
    if (!projects || !projects.jobs || !projects.years || !projects.phases) {
      return {
        counts: { Total: 0, Active: 0, Closed: 0 },
        groupedPhases: [],
        singlePhaseData: null,
      };
    }

    const counts = { Total: 0, Active: 0, Closed: 0 };
    const groups = {};
    const phasesArray = Object.values(projects.phases);

    const filteredPhases = phasesArray.filter((phase) => {
      const [phaseJobNum, phaseYearNum, phasePhaseNum] = phase.id.split("-");

      if (jobNum && phaseJobNum !== jobNum) return false;
      if (yearId && phaseYearNum !== yearId.split("-")[1]) return false;
      if (phaseId && phasePhaseNum !== phaseId.split("-")[2]) return false;

      return true;
    });

    if (filteredPhases.length === 1) {
      const phase = filteredPhases[0];
      const job = projects.jobs[phase.jobNum];
      const year = projects.years[phase.yearId];
      const phasesInYear = year.phases;
      const phaseIndex = phasesInYear.indexOf(phase.id);
      const phaseLength = phasesInYear.length;

      const singlePhaseData = {
        phase,
        job,
        year,
        phaseIndex,
        phaseLength,
        goForward: phaseIndex + 1 < phaseLength,
        goBackward: phaseIndex > 0,
        month: phaseNumToMonth(phase.num),
        statusString: statusToString(phase.status),
      };

      return { counts, groupedPhases: [], singlePhaseData };
    }

    filteredPhases.forEach((phase) => {
      counts.Total += 1;
      if (phase.status === 4) counts.Active += 1;
      if (phase.status > 4) counts.Closed += 1;

      let includePhase = false;
      if (active === "Active" && phase.status === 4) includePhase = true;
      else if (active === "Closed" && phase.status > 4) includePhase = true;
      else if (active === "Total") includePhase = true;

      if (includePhase) {
        const job = projects.jobs[phase.jobNum];
        const year = projects.years[phase.yearId];
        const phaseNumberMatch = phase.name.match(/\d+/);
        const phaseNum = phaseNumberMatch
          ? parseInt(phaseNumberMatch[0], 10)
          : 0;
        const normalizedPhaseName = `Phase ${phaseNum}`;
        const key = `${normalizedPhaseName}-${year.num}`;

        if (!groups[key]) {
          groups[key] = {
            phaseName: normalizedPhaseName,
            yearNum: year.num,
            phaseNum,
            jobs: [],
          };
        }

        groups[key].jobs.push({ job, phase, year });
      }
    });

    const groupedPhases = Object.values(groups).sort((a, b) => {
      const yearA = parseInt(a.yearNum, 10);
      const yearB = parseInt(b.yearNum, 10);

      if (yearA !== yearB) return yearA - yearB;

      const phaseA = a.phaseNum;
      const phaseB = b.phaseNum;

      return phaseA - phaseB;
    });

    return { counts, groupedPhases, singlePhaseData: null };
  }, [jobNum, yearId, phaseId, active, projects]);

  const stepBack = (phaseIndex, phases) => {
    changePhase(phases[phaseIndex - 1]);
  };

  const stepForward = (phaseIndex, phases) => {
    changePhase(phases[phaseIndex + 1]);
  };

  if (!projects) return <div className="loading-widget" />;

  if (singlePhaseData) {
    const {
      phase,
      job,
      year,
      phaseIndex,
      goForward,
      goBackward,
      month,
      statusString,
    } = singlePhaseData;

    return (
      <div className="job-display job-display-single">
        <strong>{job.name}</strong>
        <div className="job-display-content">
          <button
            className={`job-display-arrow ${!goBackward && "arrow-hidden"}`}
            onClick={() => stepBack(phaseIndex, year.phases)}
          >
            {leftArrowSvg()}
          </button>
          <div className="job-display-section">
            <h2>{phase.name}</h2>
            {month} - {year.year}
            <div className={`job-display-status status-${statusString}`}>
              {statusString}
            </div>
          </div>
          <button
            className={`job-display-arrow ${!goForward && "arrow-hidden"}`}
            onClick={() => stepForward(phaseIndex, year.phases)}
          >
            {rightArrowSvg()}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-display">
      <div className="job-buttons">
        {jobButtons.map((type) => buttonMapper(type))}
      </div>
      <div id="job-display" className="filtered-jobs">
        {projectMapper(groupedPhases)}
      </div>
    </div>
  );
};

export default JobDisplay;
