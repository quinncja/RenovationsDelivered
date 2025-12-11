import { useDashboard } from "@features/dashboard/context/DashboardContext";
import BarChart from "./BarChart";

function PhaseCompletion() {
  const id = "phaseCompletion";
  const { getWidgetDataById, openPage } = useDashboard();
  const data = getWidgetDataById(id);

  if (!data) return <div className="home-yearrevenue-widget loading-widget" />;

  return (
    <div
      className="home-yearrevenue-widget"
      onClick={() => openPage(id)}
    >
      <div
        style={{
          display: "flex",
          paddingTop: "25px",
          paddingLeft: "25px",
          alignItems: "flex-start",
        }}
      >
        <div className="widget-title">
          Phase Status Distribution
        </div>
      </div>
      <div
        className="phase-chart"
        style={{
          flex: 1,
          minHeight: 0,
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <BarChart id={id} data={data} />
      </div>
    </div>
  );
}

export default PhaseCompletion;
