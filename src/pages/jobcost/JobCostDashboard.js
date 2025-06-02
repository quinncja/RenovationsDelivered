import { useState } from "react";
import Header from "./header/Header";
import Breakdown from "./widgets/Breakdown/Breakdown";
import JobDetails from "./widgets/JobDetails/JobDetails";
import Margin from "./widgets/Margin/Margin";
import { useProjectContext } from "context/ProjectContext";
import { useJobCostContext } from "context/JobCostContext";

function JobCostDashboard() {
  const [isVisible, setIsVisible] = useState(true);
  const { pageModifiers } = useJobCostContext();
  const { pageModifierToString } = useProjectContext();

  return (
    <div className="job-cost-dashboard">
      <div className="jobs-header">
        <h2>
          {" "}
          Job Costing{" "}
          {!isVisible && ` - ${pageModifierToString(pageModifiers)}`}{" "}
        </h2>
      </div>
      <Header setIsVisible={setIsVisible} />
      <div id="dashboard" className={`job-cost-widgets`}>
        <JobDetails />
        <Margin />
        <Breakdown type={"Material"} />
        <Breakdown type={"Labor"} />
        <Breakdown type={"Subcontractors"} />
        <Breakdown type={"WTPM"} />
      </div>
    </div>
  );
}

export default JobCostDashboard;
