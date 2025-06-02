import { useHome } from "context/HomeContext";
import { kebabToNormal } from "utils/formatters";
import PhaseCountPage from "./phaseCount/PhaseCountPage";
import InsightPage from "./insights/InsightPage";
import DataValidationPage from "./dataValidation/DataValidationPage";
import { useNavigate, useParams } from "react-router-dom";

function DashboardOpen() {
  const { openData, openPage } = useHome();
  const { type } = openData;
  const normal = kebabToNormal(type);
  const { "*": remainingPath } = useParams();
  const navigate = useNavigate();

  const currentType = remainingPath.split("/")[1] || null;

  const renderBody = () => {
    if (type === "data-validation")
      return <DataValidationPage {...openData} id={currentType} />;
    else if (type === "phase-overview") return <PhaseCountPage {...openData} />;
    else if (type && type.includes("insight"))
      return <InsightPage {...openData} />;
    else return "";
  };
  const insightTypes = ["client", "project", "vendor", "subcontractor"];
  const dataValidationTypes = [
    "critical-issues",
    "data-quality",
    "data-integrity",
  ];

  const getOtherTypes = (type) => {
    if (type && type.includes("insight")) {
      return insightTypes
        .filter((insights) => insights !== type.split("-")[0])
        .map((item) => {
          return {
            id: item.charAt(0).toUpperCase() + item.slice(1),
            open: () => openPage(`${item}-insight`),
          };
        });
    }
    if (type === "data-validation") {
      return dataValidationTypes
        .filter((type) => type !== currentType)
        .map((item) => {
          return {
            id: kebabToNormal(item),
            open: () => navigate(`data-validation/${item}`),
          };
        });
    } else return [];
  };

  return (
    <div className="job-cost-dashboard">
      <div className="jobs-header" style={{ justifyContent: "space-between" }}>
        <h2>
          {" "}
          {normal} {currentType ? `• ${kebabToNormal(currentType)}` : ""}
        </h2>
        <div style={{ display: "flex", gap: "20px", paddingRight: "0px" }}>
          {getOtherTypes(type).map((type) => (
            <button className="jobs-header-btn" onClick={() => type.open()}>
              <h4 style={{ color: "white" }}> {type.id} </h4>
            </button>
          ))}
        </div>
      </div>
      <div className="job-cost-widgets">{renderBody()}</div>
    </div>
  );
}

export default DashboardOpen;
