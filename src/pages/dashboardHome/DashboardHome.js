import { useTrackedJobs } from "context/TrackedJobContext";
import useWelcomeText from "utils/hooks/useWelcomeText";
import TrackedJobs from "./trackedJobs/TrackedJobs";
import HomeWidgets from "./widgets/HomeWidgets";
import useIsAdmin from "utils/hooks/useIsAdmin";

function DashboardHome() {
  const welcomeText = useWelcomeText();
  const { trackedJobs } = useTrackedJobs();
  const isAdmin = useIsAdmin();

  return (
    <div style={{ paddingBottom: "180px" }}>
      <div className="jobs-header" style={{ width: "100%" }} />
      <div className="dashboard-welcome">
        <h1> {welcomeText} </h1>

        {isAdmin && <HomeWidgets />}
        <TrackedJobs jobs={trackedJobs} />
      </div>
    </div>
  );
}

export default DashboardHome;
