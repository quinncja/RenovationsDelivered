import { useTrackedProjects } from "@features/projects/context/TrackedProjectContext";
import useWelcomeText from "@features/dashboard/hooks/useWelcomeText";
import TrackedProjectsSection from "./tracked-projects/TrackedProjectsSection";
import HomeWidgets from "./widgets/HomeWidgets";
import useIsAdmin from "@shared/hooks/useIsAdmin";

function Dashboard() {
  const welcomeText = useWelcomeText();
  const { trackedJobs } = useTrackedProjects();
  const isAdmin = useIsAdmin();

  return (
    <div style={{ paddingBottom: "180px" }}>
      <div className="jobs-header" style={{ width: "100%" }} />
      <div className="dashboard-welcome">
        <h1> {welcomeText} </h1>

        {isAdmin && <HomeWidgets />}
        <TrackedProjectsSection jobs={trackedJobs} />
      </div>
    </div>
  );
}

export default Dashboard;
