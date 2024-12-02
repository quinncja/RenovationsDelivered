import { useTrackedJobs } from "context/TrackedJobContext";
import useWelcomeText from "utils/hooks/useWelcomeText";
import TrackedJobs from "./trackedJobs/TrackedJobs";
import AddJobs from "./trackedJobs/AddJobs";
import HomeWidgets from "../../widgets/homeWidgets/HomeWidgets";
import { useHome } from "context/HomeContext";

function DashboardHome() {
  const welcomeText = useWelcomeText();
  const { trackedJobs } = useTrackedJobs();
  const { homeState } = useHome();

  return (
    <div className="dashboard-welcome">
      <h1> {welcomeText} </h1>

      <HomeWidgets />
      {trackedJobs ? (
        trackedJobs.length > 0 || homeState === 'year' ? (
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
