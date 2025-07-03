import { useHome } from "context/HomeContext";
import { displayMargin, getMarginBackground, getMarginColor } from "utils/funcs";
import { dollarFormatter } from "utils/formatters";
import MarginBarChart from "./MarginBarChart";

function Margin() {
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

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: "calc(50% - 5px)", gap: "10px"}}> 
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "0px",
          gap: "10px"
        }}
      >
        <div
          className={`widget ${marginBackground}`}
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <h4 style={{color: "white"}}> Closed Job Margin </h4>
          <h2 style={{ fontSize: "32px", color: marginColor }}>
            {" "}
            {displayMargin(total.value)}{" "}
          </h2>
        </div>

        <div
          className="widget"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <h4> Gross Profit Amount </h4>
            <h2 style={{ fontSize: "32px" }}>
              {" "}
              {dollarFormatter(total.TotalContract - total.TotalCost)}{" "}
            </h2>
          </div>
        </div>

      </div>
    <div className="home-phasecount-widget">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "25px",
          paddingBottom: "0px",
          alignItems: "flex-start",
        }}
      >
      <h3 style={{fontWeight: 500, fontSize: "16px"}}>Monthly Margin Performance</h3>
      </div>
      <div
        className="phase-chart"
        style={{ flex: 1, minHeight: 0, paddingBottom: "25px" }}
        onClick={(e) => e.stopPropagation()}
      >
      <MarginBarChart data={data} marginColor={"#acadae"} />
      </div>
      </div>
    </div>
  );
}

export default Margin;
