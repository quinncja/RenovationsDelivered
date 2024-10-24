import { useTrackedJobs } from "context/TrackedJobContext";
import useWelcomeText from "utils/hooks/useWelcomeText";
import TrackedJobs from "./TrackedJobs";
import AddJobs from "./AddJobs";

function DashboardHome() {
  const welcomeText = useWelcomeText();
  const { trackedJobs } = useTrackedJobs();

  return (
    <div className="dashboard-welcome">
      <h1> {welcomeText} </h1>

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
