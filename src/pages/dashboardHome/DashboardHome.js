import { useTrackedJobs } from "context/TrackedJobContext";
import useWelcomeText from "utils/hooks/useWelcomeText";
import TrackedJobs from "./trackedJobs/TrackedJobs";
import HomeWidgets from "../../widgets/homeWidgets/HomeWidgets";

function DashboardHome() {
  const welcomeText = useWelcomeText();
  const { trackedJobs } = useTrackedJobs();

  return (
    <div className="dashboard-welcome">
      <h1> {welcomeText} </h1>

      <HomeWidgets />
      <TrackedJobs jobs={trackedJobs} />

    </div>
  );
}

export default DashboardHome;
