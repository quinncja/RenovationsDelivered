import { useJobCostContext } from "context/JobCostContext";
import { useProjectContext } from "context/ProjectContext";
import Header from "pages/jobcost/header/Header";
import { useState } from "react";
import OpenBreakdownBar from "./OpenBreakdownBar";
import OpenCostBreakdown from "./OpenCostBreakdown";
import OpenBreakdownTable from "./OpenBreakdownTable/OpenBreakdownTable";

function OpenBreakdown() {
  const { breakdownData, pageModifiers, openBreakdownPage } =
    useJobCostContext();
  const { type, data } = breakdownData;

  const [isVisible, setIsVisible] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);
  const { pageModifierToString } = useProjectContext();

  const types = ["Material", "Labor", "WTPM", "Subcontractors"];
  const getOtherTypes = (type) => {
    return types.filter((item) => item !== type);
  };

  return (
    <div className="job-cost-dashboard">
      <div className="jobs-header" style={{ justifyContent: "space-between" }}>
        <h2>
          {" "}
          {type} {isVisible2 ? "Breakdown" : "Cost Items"}{" "}
          {!isVisible && ` - ${pageModifierToString(pageModifiers)}`}{" "}
        </h2>
        <div style={{ display: "flex", gap: "20px", paddingRight: "0px" }}>
          {getOtherTypes(type).map((type) => (
            <button
              className="jobs-header-btn"
              onClick={() => openBreakdownPage(type)}
            >
              <h4 style={{ color: "white" }}> {type} </h4>
            </button>
          ))}
        </div>
      </div>
      <div className="job-cost-widgets">
        <Header setIsVisible={setIsVisible} />
        <OpenCostBreakdown data={data} type={type} />
        <OpenBreakdownBar data={data}/>
        <OpenBreakdownTable setIsVisible={setIsVisible2} type={type}/>
      </div>
    </div>
  );
}

export default OpenBreakdown;
