import { calendarSvg } from "@assets/icons/svgs";
import { useProjectContext } from "@features/projects/context/ProjectContext";
import { useTrackedProjects } from "@features/projects/context/TrackedProjectContext";

function PhaseCount(props) {
  const { filteredJobsToShow } = props;
  const { projects, getActivePhasesForHome } = useProjectContext();
  const { loadingMap } = useTrackedProjects();

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

export default PhaseCount;
