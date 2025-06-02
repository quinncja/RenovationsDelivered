import Revenue from "./Revenue/Revenue";
import Insights from "./Insights/Insights";
import Margin from "./Margin/Margin";
import YearRevenue from "./YearRevenue/YearRevenue";
import PhaseCount from "./PhaseCount/PhaseCount";
import DataValidation from "./DataValidation/DataValidation";

function HomeWidgets() {
  return (
    <>
      <div className="home-widget-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
            width: "100%",
          }}
        >
          <div className="jobs-header" style={{ background: "none" }}>
            <h2> Business Insights </h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            <Revenue />
            <div style={{ width: "100%", display: "flex", gap: "10px" }}>
              <YearRevenue />
              <PhaseCount />
            </div>
            <Margin />
            <Insights />
            <DataValidation />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeWidgets;
