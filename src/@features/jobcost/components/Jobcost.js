import Header from "./header/Header";
import Margin from "./widgets/Margin/Margin";
import JobDetails from "./widgets/JobDetails/JobDetails";
import ContractTrend from "./widgets/ContractTrend/ContractTrend";
import ProjectInfo from "./widgets/ProjectInfo/ProjectInfo";
import WidgetSection from "@features/dashboard/components/WidgetSection";
import Budget from "./widgets/Breakdown/Budget";

function Jobcost() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <div
        className="jobs-header jobs-header-old"
        style={{ position: "relative", marginLeft: "70px", width: "90%" }}
      >
        <h2 style={{fontWeight: "500"}}> JOB COSTING </h2>
      </div>
      <div style={{ position: "sticky", top: "-1px", zIndex: "100" }}>
        <Header />
      </div>

      <div className="job-cost-dashboard" style={{ paddingTop: "0px" }}>
        <div id="dashboard" className={`job-cost-widgets`}>
        <WidgetSection title="" color="" noPin={true}>
            <ProjectInfo />
            <JobDetails />
          </WidgetSection>

          <WidgetSection title="BUDGET BREAKDOWN" color="" noPin={true}>
            <div style={{display: "flex", flexDirection: "column", gap: "15px"}}> 
              <Budget type={"Material"} />
              <Budget type={"Labor"} />
              <Budget type={"Subcontractors"} />
              <Budget type={"WTPM"} />
            </div>
          </WidgetSection>

          <WidgetSection title="TRENDS" color="" noPin={true}>
            <ContractTrend />
            <Margin />
          </WidgetSection>
        </div>
      </div>
    </div>
  );
}

export default Jobcost;
