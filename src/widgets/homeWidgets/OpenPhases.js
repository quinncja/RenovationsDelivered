import { useHome } from "context/HomeContext";
import { useProjectContext } from "context/ProjectContext";
import { useTrackedJobs } from "context/TrackedJobContext";

function OpenPhases() {
  const { homeState } = useHome();
  const { projects, getActivePhases } = useProjectContext();
  const { trackedJobs } = useTrackedJobs();

  let activePhases;
  if (!projects) activePhases = undefined;
  else if (homeState === "year") activePhases = getActivePhases();
  else if (!trackedJobs || trackedJobs.length === 0) activePhases = -1;
  else activePhases = getActivePhases(trackedJobs);

  if (activePhases === -1)
    return (
      <div className="home-widget home-widget-sm">
        <strong style={{ color: "white" }}>No data</strong>
      </div>
    );
  if (activePhases >= 0)
    return (
      <div className="home-widget home-widget-sm">
        <span className={`home-widget-num`}> {activePhases} </span>
        <span className="home-widget-title"> {"Open Phases"} </span>
      </div>
    );
  return (
    <div className="home-widget home-widget-sm">
      <span className={`home-widget-num ${"home-widget-loading"}`}> </span>
      <span className="home-widget-title"> </span>
    </div>
  );
}

export default OpenPhases;
