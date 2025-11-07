import WidgetSection from "@features/dashboard/components/WidgetSection";
import Header from "./header/Header";

function ProjectLibrary() {
  return (
    <div className="job-cost-dashboard">
      <WidgetSection title={`Project Library`} color={"none"} />
      <Header />
    </div>
  );
}

export default ProjectLibrary;
