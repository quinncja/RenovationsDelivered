import { useProjectContext } from "context/ProjectContext";
import { useTrackedJobs } from "context/TrackedJobContext";

function OpenPhases(props) {
  const { homeState } = props;
  const { projects, getActivePhases } = useProjectContext();
  const { trackedJobs } = useTrackedJobs();

  let activePhases;
  if (!projects || !trackedJobs || trackedJobs.length === 0)
    activePhases = undefined;
  else if (homeState === "year") activePhases = getActivePhases();
  else activePhases = getActivePhases(trackedJobs);

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
