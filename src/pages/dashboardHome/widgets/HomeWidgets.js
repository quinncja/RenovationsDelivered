import Revenue from "./Revenue/Revenue";
import Insights from "./Insights/Insights";
import Margin from "./Margin/Margin";
import YearRevenue from "./YearRevenue/YearRevenue";
import PhaseCount from "./PhaseCount/PhaseCount";
import DataValidation from "./DataValidation/DataValidation";
import AgingSummary from "./AgingSummary/AgingSummary";
import MonthlyYearRevenue from "./MonthlyYearRevenue/MonthlyYearRevenue";

function HomeWidgets() {

  const year = new Date().getFullYear();

  return (
    <>
      <div className="home-widget-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            position: 'relative'
          }}
        >
            <div className="jobs-header" style={{ background: "none" }}>
              <h2> Business Insight </h2>
            </div>

            <Revenue />
            <div style={{ width: "100%", display: "flex", gap: "10px" }}>
              <YearRevenue />
              <MonthlyYearRevenue/>
            </div>
            </div>  
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
                position: 'relative'
              }}
            >
            <div className="jobs-header" style={{ background: "none" }}>
              <h2> {year} Overview </h2>
            </div>
            <div style={{ width: "100%", display: "flex", gap: "10px" }}>
            <Margin />
            <PhaseCount />
            </div>
        </div>

        <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
                position: 'relative'
              }}
            >
            <div className="jobs-header" style={{ marginTop: "20px" }}>
              <h2> Finances </h2>
            </div>
            <AgingSummary />
            <Insights />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0px",
                width: "100%",
                position: 'relative'
              }}
            >
            <div className="jobs-header" style={{ marginTop: "20px" }}>
              <h2> Reports </h2>
            </div>
            <DataValidation />
          </div>
        </div>
    </>
  );
}

export default HomeWidgets;
