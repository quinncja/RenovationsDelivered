import { useTrackedJobs } from "context/TrackedJobContext";
import useWelcomeText from "utils/hooks/useWelcomeText";
import TrackedJobs from "./trackedJobs/TrackedJobs";
import AddJobs from "./trackedJobs/AddJobs";
import HomeWidgets from "../../widgets/homeWidgets/HomeWidgets";

function DashboardHome() {
  const welcomeText = useWelcomeText();
  const { trackedJobs } = useTrackedJobs();
  console.log(trackedJobs)
  return (
    <div className="dashboard-welcome">
      <h1> {welcomeText} </h1>

      <HomeWidgets />
      {trackedJobs ? (
        trackedJobs.length > 0 ? (
          <TrackedJobs jobs={trackedJobs} />
        ) : (
          <AddJobs />
        )
      ) : (
        <div className="loading-widget" />
      )}
    </div>
  );
}

export default DashboardHome;
