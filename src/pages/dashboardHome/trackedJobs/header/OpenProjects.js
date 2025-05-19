import { buildingSvg } from "business/svg";
import { useTrackedJobs } from "context/TrackedJobContext";

function OpenProjects(props) {
  const { filteredJobsToShow } = props;
  const {loadingMap} = useTrackedJobs();
  let activeProjects;
  if (!filteredJobsToShow) activeProjects = undefined;
  else activeProjects = filteredJobsToShow.length;

  if(loadingMap)
    return (
      <div className="tjh-widget">
      <div className="tjh-box "> {buildingSvg()} </div>
      <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
      <div className="loading-widget"/>
      </div>
    </div>
    )
  if (activeProjects >= 0)
    return (
      <div className="tjh-widget">
        <div className="tjh-box"> {buildingSvg()} </div>
        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
        <h2> {activeProjects} </h2>
        <h4> {"Active Projects"} </h4>
        </div>
      </div>
  );
}

export default OpenProjects;
