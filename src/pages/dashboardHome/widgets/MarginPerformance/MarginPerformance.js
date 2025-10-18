import { useHome } from "context/HomeContext";
import { percentFomatter } from "utils/formatters";
import {
  displayMargin,
  getMarginBackground,
  getMarginColor,
} from "utils/funcs";
import MarginBarChart from "./MarginBarChart";
import MoneyDisplay from "components/MoneyDisplay/MoneyDisplay";

function MarginPerformance() {
  const id = "margin";
  const { getWidgetDataById } = useHome();
  const data = getWidgetDataById(id);

  if (!data) {
    return (
      <div className="home-yearrevenue-widget loading-widget">
        <span className="home-widget-title"> </span>
      </div>
    );
  }

  const total = data.find((item) => item.id === "total");
  const marginColor = getMarginColor(total.value);
  const marginBackground = getMarginBackground(total.value);
  const homeRevData = getWidgetDataById("homeRev");
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
        }}
      >
        <h4 style={{ color: "white", opacity: ".9" }}>
          {" "}
          Completed Job Margin{" "}
        </h4>
        <h2 style={{ fontSize: "38px", color: marginColor }}>
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
          <h4> Completed Gross </h4>
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
          <h4> Projected Gross @ {percentFomatter(total.value)} </h4>
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
          <h4 style={{ fontWeight: 500, fontSize: "14px" }}>
            Monthly Margin Performance
          </h4>
        </div>
        <div
          className="phase-chart"
          style={{ flex: 1, minHeight: 0 }}
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
      <h3
        style={{ textAlign: "left", paddingBottom: "10px", fontWeight: "500" }}
      >
        {" "}
        Margin Performance{" "}
      </h3>

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
