import { useDashboard } from "@features/dashboard/context/DashboardContext";
import { percentFomatter } from "@shared/utils/functions";
import {
  displayMargin,
  getMarginBackground,
  getMarginColor,
} from "@shared/utils/functions";
import MarginBarChart from "./MarginBarChart";
import MoneyDisplay from "@shared/components/MoneyDisplay/MoneyDisplay";

function MarginPerformance() {
  const id = "marginPerformance";
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

  const total = data.find((item) => item.id === "total");
  const marginColor = getMarginColor(total.value);
  const marginBackground = getMarginBackground(total.value);
  const homeRevData = getWidgetDataById("annualRevenueTrend");
  const year = new Date().getFullYear();
  const yearSum =
    homeRevData && homeRevData.find((item) => item.year === year)?.revenue;

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
          width: "25%",
          gap: "5px",
          position: "relative",
          isolation: "isolate",
        }}
      >
        <div className="widget-title">
          {" "}
          Completed Job Margin{" "}
        </div>
        <h2 style={{ fontSize: "26px", color: marginColor }}>
          {" "}
          {displayMargin(total.value)}{" "}
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
          width: "23%",
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
          <div className="widget-title"> Completed Gross </div> 
          <MoneyDisplay
            value={total.TotalContract - total.TotalCost}
            size={26}
          />
        </div>
      </div>
    );
  };

  const projectedGross = () => {
    const closedGross = total.TotalContract - total.TotalCost;
    const remainingAmount = yearSum - total.TotalContract;
    const projectedGrossFromRemaining = remainingAmount * (total.value / 100);

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
          <div className="widget-title"> Projected Gross @ {percentFomatter(total.value)} </div>
          <MoneyDisplay
            value={closedGross + projectedGrossFromRemaining}
            size={26}
          />
        </div>
      </div>
    );
  };

  const marginBar = () => {
    return (
      <div className="home-phasecount-widget sub-widget">
        <div
          style={{
            display: "flex",
            paddingTop: "15px",
            alignItems: "flex-start",
          }}
        >
          <div className="widget-title">
            Monthly Margin Performance
          </div>
        </div>
        <div
          className="phase-chart"
          style={{
            flex: 1,
            minHeight: 0,
            position: "relative",
            isolation: "is",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <MarginBarChart data={data} marginColor={"#acadae"} />
        </div>
      </div>
    );
  };

  return (
    <div
      className="widget"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxSizing: "border-box",
        paddingBlock: "25px",
      }}
    >
      <div className="widget-title">
        {" "}
        Margin Performance{" "}
      </div>

      <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
        {margin()}
        {gross()}
        {projectedGross()}
      </div>

      {marginBar()}
    </div>
  );
}

export default MarginPerformance;
