import { useProjectContext } from "context/ProjectContext";
import { useTrackedJobs } from "context/TrackedJobContext";

function OpenPhases(props) {
  const { homeState } = props;
  const { projects, getActivePhases } = useProjectContext();
  const { trackedJobs } = useTrackedJobs();

  let activePhases = undefined;
  if (homeState === "year") activePhases = getActivePhases();
  else if (!projects || !trackedJobs || trackedJobs.length === 0)
    activePhases = -1; 
  else activePhases = getActivePhases(trackedJobs);

  if(activePhases === -1) 
  return(
    <div className="home-widget home-widget-sm">
        <strong style={{color: "white"}}>
            No data
        </strong>
    </div>
  )
  return (
    <div className="home-widget home-widget-sm">
      <span
        className={`home-widget-num ${!activePhases && "home-widget-loading"}`}
      >
        {" "}
        {activePhases}{" "}
      </span>
      <span className="home-widget-title">
        {" "}
        {activePhases ? "Open Phases" : ""}{" "}
      </span>
    </div>
  );
}

export default OpenPhases;
