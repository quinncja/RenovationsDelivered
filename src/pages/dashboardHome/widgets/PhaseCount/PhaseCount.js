import { useHome } from "context/HomeContext";
import PhaseCountChart from "./PhaseCountChart";

function PhaseCount() {
  const id = "phase-overview";
  const { getWidgetDataById, openPage } = useHome();
  const data = getWidgetDataById(id);

  if (!data) return <div className="home-yearrevenue-widget loading-widget" />;

  const total = data.find((datum) => datum.phase === "total");

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: "100%", gap: "10px"}}> 
      <div
      className="home-phasecount-widget clickable-widget"
      onClick={() => openPage(id)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "25px",
          paddingBottom: "0px",
          alignItems: "flex-start",
          position: "relative"
        }}
      >
      <h3 style={{fontWeight: 500, fontSize: "16px"}}>Phase Status Distribution</h3>
      </div>
      <div
        className="phase-chart"
        style={{ flex: 1, minHeight: 0, paddingBottom: "25px", position: "relative" }}
        onClick={(e) => e.stopPropagation()}
      >
        <PhaseCountChart id={id} data={data} />
      </div>
    </div>
    </div>
  );
}

export default PhaseCount;
