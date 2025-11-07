import { useDashboard } from "@features/dashboard/context/DashboardContext";
import { camelToTitleCase } from "@shared/utils/functions";
import PhaseCountPage from "./widgets/YearCompletion/YearCompletionOpen";
import InsightPage from "./widgets/Insights/insightsOpen/InsightPage";
import { useNavigate, useParams } from "react-router-dom";
import AgingSummaryPage from "./widgets/AgingSummary/AgingSummaryPage";
import DetailPage from "./widgets/Insights/insightsOpen/DetailPage";
import DataValidationOpen from "./widgets/DataValidation/DataValidationOpen";

function DashboardOpen() {
  const { openData, openPage } = useDashboard();
  const { type, detail } = openData;
  const normal = camelToTitleCase(type);
  const { "*": remainingPath } = useParams();
  const navigate = useNavigate();

  let currentType = !detail ? remainingPath.split("/")[1] : null;

  const renderBody = () => {
    console.log(type);
    if (type === "dataValidation")
      return <DataValidationOpen {...openData} id={currentType} />;
    if (type === "agingSummary") return <AgingSummaryPage {...openData} />;
    else if (type === "phaseCompletion")
      return <PhaseCountPage {...openData} />;
    else if (type && type.includes("Insight"))
      if (detail && detail.id) return <DetailPage {...openData} />;
      else return <InsightPage {...openData} />;
    else return "";
  };
  const insightTypes = ["client", "project", "vendor", "subcontractor"];
  const dataValidationTypes = [
    "criticalIssues",
    "dataQuality",
    "dataIntegrity",
  ];

  const getOtherTypes = (type) => {
    if (type && type.includes("insight")) {
      return insightTypes
        .filter((insights) => insights !== type.split("-")[0])
        .map((item) => {
          return {
            id: item.charAt(0).toUpperCase() + item.slice(1),
            open: () => openPage(`${item}Insight`),
          };
        });
    }
    if (type === "dataValidation") {
      return dataValidationTypes
        .filter((type) => type !== currentType)
        .map((item) => {
          return {
            id: camelToTitleCase(item),
            open: () => navigate(`dataValidation/${item}`),
          };
        });
    } else return [];
  };

  return (
    <div className="job-cost-dashboard">
      <div
        className="jobs-header jobs-header-old"
        style={{ justifyContent: "space-between" }}
      >
        <h2>
          {" "}
          {normal} {currentType ? `• ${camelToTitleCase(currentType)}` : ""}
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
