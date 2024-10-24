import { useModifiers } from "context/ModifierContext";
import { useProjectContext } from "context/ProjectContext";
import PhaseView from "./PhaseView";
import useFilteredPhases from "utils/hooks/phase/useFilteredPhases";
import AllView from "./AllView";
import YearView from "./YearView";
import DefaultView from "./DefaultView";
import { useEffect, useState } from "react";
import ItemsView from "./ItemsView";

export const JobDisplay = ({ open }) => {
  const { pageModifiers, updatePageModifiers } = useModifiers();
  const { projects } = useProjectContext();
  const selected = pageModifiers.active;
  const { jobNum, yearId, phaseId, active } = pageModifiers;
  const [ itemView, setItemView ] = useState({
    display: false,
    itemClick: () => {},
    items: null,
    tag: null,
    job: null,
  })
  const { counts, defaultData, singlePhaseData, yearData, allViewData } = useFilteredPhases(
    jobNum,
    yearId,
    phaseId,
    active,
  );

  const clearItemView = () => {
    setItemView({
      display: false,
      itemClick: () => {},
      items: null,
      tag: null,
      job: null,
    })
  }

  useEffect(() => {
    clearItemView()
  }, [pageModifiers])

  const clickHandler = (e, option) => {
    e.stopPropagation();
    const container = document.getElementById("job-display");
    if (container) {
      container.scrollTop = 0;
    }
    updatePageModifiers({ active: option });
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

  if (!projects) return <div className="loading-widget" />;

  if (singlePhaseData) {
    return <PhaseView singlePhaseData={singlePhaseData} />;
  }
  let bodyComponent;
  if(itemView.display) {
    bodyComponent = <ItemsView itemView={itemView} clearItemView={clearItemView}/>
  }
  else if(!jobNum && ((yearId && phaseId) || phaseId)) {
    bodyComponent = <DefaultView defaultData={defaultData} setItemView={setItemView}/>
  }
  else if(!yearId && !phaseId){
    bodyComponent = <AllView allViewData={allViewData} setItemView={setItemView}/>
  }
  else if(!phaseId){
    bodyComponent = <YearView yearData={yearData} setItemView={setItemView}/>
  }

  return (
    <div className={`job-display`}>
        {bodyComponent}
      <div className="job-buttons">
        {jobButtons.map((type) => buttonMapper(type))}
      </div>
    </div>
  );
};

export default JobDisplay;
