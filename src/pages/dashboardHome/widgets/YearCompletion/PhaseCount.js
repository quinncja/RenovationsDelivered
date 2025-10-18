import { useHome } from "context/HomeContext";
import PhaseCountChart from "./PhaseCountChart";

function PhaseCount() {
  const id = "phase-overview";
  const { getWidgetDataById, openPage } = useHome();
  const data = getWidgetDataById(id);

  if (!data) return <div className="home-yearrevenue-widget loading-widget" />;

  const total = data.find((datum) => datum.phase === "total");

  return (
    <div
      className="home-phasecount-widget sub-widget"
      onClick={() => openPage(id)}
    >
      <div
        style={{
          display: "flex",
          paddingTop: "15px",
          alignItems: "flex-start",
        }}
      >
        <h4 style={{ fontWeight: 500, fontSize: "14px" }}>
          Phase Status Distribution
        </h4>
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
        <PhaseCountChart id={id} data={data} />
      </div>
    </div>
  );
}

export default PhaseCount;
