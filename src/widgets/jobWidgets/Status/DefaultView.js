import React from "react";
import { leftArrowSvg, rightArrowSvg } from "business/svg";
import { useModifiers } from "context/ModifierContext";
const DefaultView = ({ defaultData, setItemView }) => {
  const { updatePageModifiers, setModTimeout } = useModifiers();
  const { phase, year, jobs, month, nextPhase, prevPhase } = defaultData;

  const formatMonthYear = (month, year) => {
    if (month && year) {
      return `${month} - ${year}`;
    } else if (month) {
      return `${month}`;
    } else if (year) {
      return `${year}`;
    } else {
      return "";
    }
  };

  const stepBack = (e) => {
    e.stopPropagation();
    if (!prevPhase) return;
    setModTimeout(true);
    updatePageModifiers({
      phaseId: prevPhase.id,
    });
  };

  const stepForward = (e) => {
    e.stopPropagation();
    if (!nextPhase) return;
    setModTimeout(true);
    updatePageModifiers({
      phaseId: nextPhase.id,
    });
  };

  const handleClick = () => {
    setItemView({
      display: true,
      items: jobs,
      tag: "name",
      job: "All Projects",
      itemClick: (item) => {
        setModTimeout(true);
        updatePageModifiers({
          jobNum: item.num,
        });
      },
    });
  };

  return (
    <div className="job-display job-display-single job-display-all">
      <strong>All Projects</strong>
      <div className="job-display-content">
        <button
          className={`job-display-arrow ${!prevPhase && "arrow-hidden"}`}
          onClick={stepBack}
        >
          {leftArrowSvg()}
        </button>
        <div
          className="job-display-section btn-section"
          onClick={() => handleClick()}
        >
          <h2 style={{ fontSize: "35px" }}>{phase.name}</h2>
          {formatMonthYear(month, year.year)}
        </div>
        <button
          className={`job-display-arrow ${!nextPhase && "arrow-hidden"}`}
          onClick={stepForward}
        >
          {rightArrowSvg()}
        </button>
      </div>
    </div>
  );
};

export default DefaultView;
