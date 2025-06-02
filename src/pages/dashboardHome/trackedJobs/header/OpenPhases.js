import { calendarSvg } from "business/svg";
import { useProjectContext } from "context/ProjectContext";
import { useTrackedJobs } from "context/TrackedJobContext";

function OpenPhases(props) {
  const { filteredJobsToShow } = props;
  const { projects, getActivePhasesForHome } = useProjectContext();
  const { loadingMap } = useTrackedJobs();

  let activePhases;
  if (!projects) activePhases = undefined;
  activePhases = getActivePhasesForHome(filteredJobsToShow);

  if (filteredJobsToShow.length === 0)
    return (
      <div className="tjh-widget">
        <div className="tjh-box "> {calendarSvg()} </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h2> - </h2>
          <h4> {"Open Phases"} </h4>
        </div>
      </div>
    );
  if (loadingMap)
    return (
      <div className="tjh-widget">
        <div className="tjh-box "> {calendarSvg()} </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div className="loading-widget" />
        </div>
      </div>
    );
  if (activePhases >= 0)
    return (
      <div className="tjh-widget">
        <div className="tjh-box "> {calendarSvg()} </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h2> {activePhases} </h2>
          <h4> {"Open Phases"} </h4>
        </div>
      </div>
    );
}

export default OpenPhases;
