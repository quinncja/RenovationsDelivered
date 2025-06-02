import { useHome } from "context/HomeContext";
import { displayMargin, getMarginColor } from "utils/funcs";
import MarginLineChart from "./MarginLineChart";
import { dollarFormatter } from "utils/formatters";

function Margin() {
  const id = "margin";
  const { getWidgetDataById } = useHome();
  const data = getWidgetDataById(id);

  if (!data) {
    return (
      <div className="home-margin-widget">
        <span className={`home-widget-num ${"home-widget-loading"}`}> </span>
        <span className="home-widget-title"> </span>
      </div>
    );
  }

  const year = new Date().getFullYear();
  const total = data.find((item) => item.id === "total");
  const marginColor = getMarginColor(total.value);

  return (
    <div className="home-margin-widget">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          justifyContent: "center",
          width: "30%",
          gap: "30px",
          flexShrink: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <h4> {year} Margin </h4>
          <h2 style={{ fontSize: "42px", color: marginColor }}>
            {" "}
            {displayMargin(total.value)}{" "}
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <h4> Amount </h4>
            <h2 style={{ fontSize: "32px" }}>
              {" "}
              {dollarFormatter(total.TotalContract - total.TotalCost)}{" "}
            </h2>
          </div>
        </div>
      </div>
      <MarginLineChart data={data} marginColor={"#acadae"} />
    </div>
  );
}

export default Margin;
