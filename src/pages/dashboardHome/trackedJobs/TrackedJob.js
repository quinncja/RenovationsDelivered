import { chevronRight, close, gridSvg, personSvg } from "business/svg";
import { useTrackedJobs } from "context/TrackedJobContext";
import { getBaseJobName } from "pages/openItem/transformData";
import { useEffect, useRef, useState } from "react";
import { dollarFormatter, strToMods } from "utils/formatters";
import { useJobData } from "utils/hooks/useJobData";
import { useModifiers } from "context/ModifierContext";
import { useNavigate } from "react-router-dom";
import { calculateMargin, displayMargin, getMarginClass } from "utils/funcs";
import { fetchChartData } from "utils/api";
import PhaseEntry from "./PhaseEntry";

function TrackedJob(props) {
  const { job, deleteSelf } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [ phaseData, setPhaseData ] = useState();
  const { dataMap } = useTrackedJobs();
  const { updatePageModifiers } = useModifiers();
  const navigate = useNavigate();
  const dataArray = props.data || dataMap[job] || null;
  const accessJobData = () => {
    if (!dataArray) return;
    if (dataArray.length > 1) {
      return {...dataArray[0], error: true};
    } else {
      return dataArray[0];
    }
  };
  const data = accessJobData();
  const loadData = useJobData();
  const abortControllerRef = useRef(null);

  const fetchPhaseData = async () => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const modsToUse = {
        job: job,
        type: "phase-details",
      };
      const newPhaseData = await fetchChartData(modsToUse, controller.signal);
      setPhaseData(newPhaseData);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch request aborted");
      } else {
        console.error("Error fetching data:", error);
      }
    }
  }

  const toggleSelf = () => {
    if(!data) return
    if(isOpen === false) fetchPhaseData();
    setIsOpen(!isOpen)
  }

  const handleClick = (obj) => {
    const mods = strToMods(job, null, null);
    updatePageModifiers(mods);
    navigate("/jobcost");
  };

  const handlePhaseClick = (year, phase) => {
    const mods = strToMods(job, year, phase);
    updatePageModifiers(mods);
    navigate("/jobcost");
  };

  const handleSubClick = (year, phase) => {
    const mods = strToMods(job, year, phase);
    updatePageModifiers(mods);
    navigate("/jobcost/breakdown/subcontractors");
  };

  const jobBody = () => {
    const margin = calculateMargin(data.TotalContract, data.TotalCost)
    return (
      <div className="job-body">
        <div className="job-left">
          <h2> {getBaseJobName(data.JobName)} </h2>
          <h4> {data.ClientName} </h4>
        </div>
        <div className="job-right">
          <div style={{display: "flex", gap: "7px", alignItems: "baseline"}}> <span className="phase-dot phase-dot-Complete phase-dot-small"> </span> <h4> <strong style={{ color: "var(--white)" }}> {data.OpenPhases} </strong> open </h4> </div>
          <div style={{display: "flex", gap: "7px", alignItems: "baseline"}}> <span className="phase-dot phase-dot-small"> </span> <h4> <strong style={{ color: "var(--white)" }}> {data.ClosedPhases} </strong> closed </h4> </div>

          <h3 style={{justifySelf: "end"}} className={`${getMarginClass(margin)}`}> {displayMargin(margin)} </h3>

        </div>
      </div>
    );
  };

  const openJobBody = () => {
    return(
      <div> 
        <div>
          <h4> Project Manager </h4>
          <div> {personSvg()} {data.ProjectManager} </div>
        </div>
        <div>
          <h4> Total </h4>
          <div> {personSvg()} {data.ProjectManager} </div>
        </div>
        <div>
          <h4> Project Manager </h4>
         <div> {personSvg()} {data.ProjectManager} </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        return;
      }
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;
        loadData(job, controller.signal);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch request aborted");
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
    //eslint-disable-next-line
  }, [job]);

  const renderPhaseEntries = () => {
    if (!isOpen) return null;

    if (!phaseData) {
      return(
      <div className="phases-container">
        {data.OpenPhases > 0 &&
        <>
          <div style={{display: "flex", gap: "7px", alignItems: "baseline", paddingBottom: "5px"}}> <span className="phase-dot phase-dot-Complete phase-dot-big"> </span> <h3> Open Phases ({data.OpenPhases})</h3> </div>
          {Array(data.OpenPhases).fill(null).map((_, index) => (
          <PhaseEntry key={`loading-${index}`}  />
          ))}
         </>
        }
        {data.OpenPhases > 0 && data.ClosedPhases > 0 && <div style={{height: "10px"}}></div>}
       {data.ClosedPhases > 0 &&
        <>
        <div style={{display: "flex", gap: "7px", alignItems: "baseline", paddingBottom: "5px"}}> <span className="phase-dot phase-dot-big"> </span> <h3> Closed Phases ({data.ClosedPhases})</h3> </div>
        {Array(data.ClosedPhases).fill(null).map((_, index) => (
        <PhaseEntry key={`loading-${index}`} />
        ))}
        </>
      }
      </div>
      )
    }
    
    const openPhases = phaseData.filter(item => item.Status === 4);
    const closedPhases = phaseData.filter(item => item.Status > 4);
    
    return (
      <div className="phases-container">
      {data.OpenPhases > 0 &&
        <>
        <div style={{display: "flex", gap: "7px", alignItems: "baseline", paddingBottom: "5px"}}>  <span className="phase-dot phase-dot-Complete phase-dot-big"> </span> <h3> Open Phases ({openPhases.length})</h3> </div>
        {openPhases.map((item, index) => (
          <PhaseEntry key={`phase-open-${index}`} data={item} handleClick={handlePhaseClick} handleSubClick={handleSubClick} />
        ))}
        </>
        }
        {data.OpenPhases > 0 && data.ClosedPhases > 0 && <div style={{height: "10px"}}></div>}
        {data.ClosedPhases > 0 &&
        <>
        <div style={{display: "flex", gap: "7px", alignItems: "baseline", paddingBottom: "5px"}}> <span className="phase-dot phase-dot-big"> </span> <h3> Closed Phases ({closedPhases.length})</h3> </div>
        {closedPhases.map((item, index) => (
          <PhaseEntry key={`phase-closed-${index}`} data={item} handleClick={handlePhaseClick} handleSubClick={handleSubClick}/>
        ))}
        </>
        }
      </div>
    );
  };

  const renderAdminData = () => {
    if (!isOpen) return null;
    
    return (
     <div className="admin-job-details">
        <div style={{display: 'flex', flexDirection: "column", gap: "3px"}}> 
          <h4> Project Manager</h4>
          <h3> {data.ProjectManager} </h3>
        </div>
        <div style={{display: 'flex', flexDirection: "column", gap: "3px"}}> 
          <h4> Total Contract</h4>
          <h3> {dollarFormatter(data.TotalContract)} </h3>
        </div>
        <div style={{display: 'flex', flexDirection: "column", gap: "3px"}}> 
          <h4> Total Spent</h4>
          <h3> {dollarFormatter(data.TotalCost)} </h3>
        </div>

     </div>
    );
  };

  return (
    <div className="tracked-job-container">
    <div
      className={`tracked-job ${!data && "loading-widget"} ${isOpen && "tracked-job-open"}`}
      onClick={toggleSelf}
    >
      <button
        className="widget-item"
        style={{opacity: ".5", height: "fit-content", alignSelf: "center", background: 'none', border: "none", cursor: "pointer", transforBox: "fill-box", transformOrigin: "center", transform: `${isOpen ? "rotate(90deg)" : "rotate(0deg)"}`, transition: "all .2s ease-in-out", display: 'flex'}}
      >
        {chevronRight()}
      </button>

      {data && jobBody()}

      <button
        className="x-item widget-item"
        style={{opacity: ".5", height: "fit-content", alignSelf: "center", background: 'none', border: "none", cursor: "pointer", padding: '10px', display: 'flex'}}

        title={"View Job Costing"}
        onClick={(e) => {
          e.stopPropagation();
          handleClick(job);
        }}
      >
        {gridSvg()}
      </button>

      {/* <button
        className="x-button widget-item"
        onClick={(e) => {
          e.stopPropagation();
          deleteSelf(job);
        }}
      >
        {close()}
      </button> */}
    </div>
    {renderAdminData()}
    {renderPhaseEntries()}
    </div>
  );
}

export default TrackedJob;
