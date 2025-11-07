import { buildingSvg } from "@assets/icons/svgs";
import { useTrackedProjects } from "@features/projects/context/TrackedProjectContext";

function ProjectCount(props) {
  const { filteredJobsToShow } = props;
  const { loadingMap } = useTrackedProjects();
  let activeProjects;
  if (!filteredJobsToShow) activeProjects = undefined;
  else activeProjects = filteredJobsToShow.length;
  if (activeProjects === 0)
    return (
      <div className="tjh-widget">
        <div className="tjh-box"> {buildingSvg()} </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h2> - </h2>
          <h4> {"Active Projects"} </h4>
        </div>
      </div>
    );
  if (loadingMap)
    return (
      <div className="tjh-widget">
        <div className="tjh-box "> {buildingSvg()} </div>
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
  else
    return (
      <div className="tjh-widget">
        <div className="tjh-box"> {buildingSvg()} </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h2> {activeProjects} </h2>
          <h4> {"Active Projects"} </h4>
        </div>
      </div>
    );
}

export default ProjectCount;
