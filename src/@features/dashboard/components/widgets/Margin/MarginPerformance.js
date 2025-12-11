import { useDashboard } from "@features/dashboard/context/DashboardContext";
import { percentFomatter, phaseToFullMonth } from "@shared/utils/functions";
import {
  displayMargin,
  getMarginBackground,
  getMarginColor,
} from "@shared/utils/functions";
import MoneyDisplay from "@shared/components/MoneyDisplay/MoneyDisplay";

function MarginPerformance() {
  const id = "annualDirectExpenses";
  const { getWidgetDataById } = useDashboard();
  const data = getWidgetDataById(id);

  if (!data) {
    return (
      <div
        className="home-yearrevenue-widget loading-widget"
        style={{ width: "100%", height: "596px" }}
      >
        <span className="home-widget-title"> </span>
      </div>
    );
  }

  const yearSpent = data.total
  const period = data.period
  const homeRevData = getWidgetDataById("annualRevenueTrend");
  const year = new Date().getFullYear();
  const yearSum =
    homeRevData && homeRevData.find((item) => item.year === year)?.revenue;
  const yearMargin = (yearSum - yearSpent) / yearSum * 100
  const marginColor = getMarginColor(yearMargin);
  const marginBackground = getMarginBackground(yearMargin);

  const margin = () => {
    return (
      <div
        className={`widget ${marginBackground}`}
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          boxSizing: "border-box",
          justifyContent: "center",
          width: "calc(25% - 8px)",
          gap: "5px",
          position: "relative",
          isolation: "isolate",
        }}
      >
        <div className="widget-title">
          {" "}
          Margin Through {phaseToFullMonth(period)}{" "}
        </div>
        <h2 style={{ fontSize: "26px", color: marginColor }}>
          {" "}
          {displayMargin(yearMargin)}{" "}
        </h2>
      </div>
    );
  };
  const gross = () => {
    return (
      <div
        className="widget sub-widget"
        style={{
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          width: "calc(25% - 8px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "100%",
            textAlign: "left",
          }}
        >
          <div className="widget-title"> Gross Profit</div> 
          <MoneyDisplay
            value={yearSum - yearSpent}
            size={26}
          />
        </div>
      </div>
    );
  };

  const projectedGross = () => {
    const closedGross = yearSum - yearSum;
    const remainingAmount = yearSum - 1000000 // fill with total contracted for the year
    const projectedGrossFromRemaining = remainingAmount * (yearSpent / 100);

    return (
      <div
        className="widget sub-widget"
        style={{
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          justifyContent: "center",
          width: "23%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            justifyContent: "space-evenly",
            height: "100%",
          }}
        >
          <div className="widget-title"> Projected Gross @ {percentFomatter(yearMargin)} </div>
          <MoneyDisplay
            value={closedGross + projectedGrossFromRemaining}
            size={26}
          />
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      {margin()}
      {gross()}
      {/* projectedGross() */}
     </div>
  );
}

export default MarginPerformance;
