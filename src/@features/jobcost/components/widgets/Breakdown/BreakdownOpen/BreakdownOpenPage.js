import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import { useProjectContext } from "@features/projects/context/ProjectContext";
import Header from "@features/jobcost/components/header/Header";
import { useState } from "react";
import TableWrapper from "./Table/TableWrapper";
import BarChart from "./BarChart";
import Details from "./Details";

function BreakdownOpen() {
  const { breakdownData, pageModifiers, openBreakdownPage } =
    useJobcostContext();
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
      <div
        className="jobs-header jobs-header-old"
        style={{ justifyContent: "space-between" }}
      >
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
        <Details data={data} type={type} />
        <BarChart data={data} />
        <TableWrapper setIsVisible={setIsVisible2} type={type} />
      </div>
    </div>
  );
}

export default BreakdownOpen;
