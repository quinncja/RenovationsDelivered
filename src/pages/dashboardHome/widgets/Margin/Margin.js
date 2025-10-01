import { useHome } from "context/HomeContext";
import {
  displayMargin,
  getMarginBackground,
  getMarginColor,
} from "utils/funcs";
import { dollarFormatter, percentFomatter } from "utils/formatters";
import MarginBarChart from "./MarginBarChart";
import CompletionPie from "./CompletionPie";
import PhaseCount from "../PhaseCount/PhaseCount";

function Margin() {
  const id = "margin";
  const { getWidgetDataById } = useHome();
  const data = getWidgetDataById(id);
  const homeRevData = getWidgetDataById("homeRev");
  const year = new Date().getFullYear();
  const yearSum =
    homeRevData && homeRevData.find((item) => item.year === year)?.revenue;

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
          height: "150px",
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

  const closedContract = () => {
    return (
      <div
        className="widget"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          boxSizing: "border-box",
          height: "87px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "15px",
            height: "15px",
            borderRadius: "5px",
            background: "var(--closed)",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <h4> Completed </h4>
          <h2 style={{ fontSize: "26px" }}>
            {" "}
            {dollarFormatter(total.TotalContract)}{" "}
          </h2>
        </div>
      </div>
    );
  };

  const remainingContract = () => {
    return (
      <div
        className="widget"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          boxSizing: "border-box",
          height: "87px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "15px",
            height: "15px",
            borderRadius: "5px",
            background: "var(--open)",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <h4> Remaining </h4>
          <h2 style={{ fontSize: "26px" }}>
            {" "}
            {dollarFormatter(yearSum - total.TotalContract)}{" "}
          </h2>
        </div>
      </div>
    );
  };

  const gross = () => {
    return (
      <div
        className="widget"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          boxSizing: "border-box",
          height: "120px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <h4> Completed Gross </h4>
          <h2 style={{ fontSize: "26px" }}>
            {" "}
            {dollarFormatter(total.TotalContract - total.TotalCost)}{" "}
          </h2>
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
        className="widget"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          boxSizing: "border-box",
          height: "87px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <h4> Projected Gross @ {percentFomatter(total.value)} </h4>
          <h2 style={{ fontSize: "26px" }}>
            {dollarFormatter(closedGross + projectedGrossFromRemaining)}
          </h2>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "10px",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        <div
          className="widget"
          style={{
            height: "280px",
            boxSizing: "border-box",
            justifyContent: "center",
          }}
        >
          <h4 style={{ textAlign: "left", color: "white", fontSize: "16px" }}>
            {" "}
            Contract Completion Progress{" "}
          </h4>
          <CompletionPie
            totalContracted={yearSum}
            completedContracted={total.TotalContract}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBottom: "0px",
            boxSizing: "border-box",
            gap: "10px",
          }}
        >
          {margin()}
          {gross()}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: "0px",
            boxSizing: "border-box",
            gap: "10px",
          }}
        >
          {closedContract()}
          {remainingContract()}
          {projectedGross()}
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
      >
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
            <h3 style={{ fontWeight: 500, fontSize: "16px" }}>
              Monthly Margin Performance
            </h3>
          </div>
          <div
            className="phase-chart"
            style={{ flex: 1, minHeight: 0, paddingBottom: "25px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <MarginBarChart data={data} marginColor={"#acadae"} />
          </div>
        </div>
        <PhaseCount />
      </div>
    </div>
  );
}

export default Margin;
