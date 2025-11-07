import { useState } from "react";
import Header from "./header/Header";
import { useProjectContext } from "@features/projects/context/ProjectContext";
import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import Margin from "./widgets/Margin/Margin";
import Breakdown from "./widgets/Breakdown/Breakdown";
import JobDetails from "./widgets/JobDetails/JobDetails";

function Jobcost() {
  const [isVisible, setIsVisible] = useState(true);
  const { pageModifiers } = useJobcostContext();
  const { pageModifierToString } = useProjectContext();

  return (
    <div className="job-cost-dashboard">
      <div className="jobs-header jobs-header-old">
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

export default Jobcost;
