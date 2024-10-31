import React, { useEffect, useRef } from "react";
import { leftArrowSvg, rightArrowSvg } from "business/svg";
import { useModifiers } from "context/ModifierContext";
import useNextPhase from "utils/hooks/phase/useNextPhase";
import usePrevPhase from "utils/hooks/phase/usePrevPhase";

const PhaseView = ({ singlePhaseData }) => {
  const { updatePageModifiers, setModTimeout } = useModifiers();
  const { phase, job, year, phaseIndex, phaseLength, month, statusString } =
    singlePhaseData;
  const prevPhase = usePrevPhase(phase.id);
  const nextPhase = useNextPhase(phase.id);
  const activeDotRef = useRef(null);

  useEffect(() => {
    if (activeDotRef.current) {
      activeDotRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [phaseIndex]);

  const stepBack = (e) => {
    e.stopPropagation();
    if (!prevPhase) return;
    setModTimeout(true);
    updatePageModifiers({
      yearId: prevPhase.yearId,
      phaseId: prevPhase.id,
      active: "Total",
    });
  };

  const stepForward = (e) => {
    e.stopPropagation();
    if (!nextPhase) return;
    setModTimeout(true);
    updatePageModifiers({
      yearId: nextPhase.yearId,
      phaseId: nextPhase.id,
      active: "Total",
    });
  };

  const displayPhaseDots = () => {
    return (
      <div className="phase-dots">
        {Array.from({ length: phaseLength }, (_, i) => (
          <span
            key={i}
            ref={i === phaseIndex ? activeDotRef : null}
            className={`phase-dot ${i === phaseIndex ? `phase-dot-${statusString}` : ""}`}
          ></span>
        ))}
      </div>
    );
  };

  return (
    <div className="job-display job-display-single">
      <strong>{job.name}</strong>
      <div className="job-display-content">
        <button
          className={`job-display-arrow ${!prevPhase && "arrow-hidden"}`}
          onClick={stepBack}
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
          className={`job-display-arrow ${!nextPhase && "arrow-hidden"}`}
          onClick={stepForward}
        >
          {rightArrowSvg()}
        </button>
      </div>
      <div className="dots-container">{displayPhaseDots()}</div>
    </div>
  );
};

export default PhaseView;
