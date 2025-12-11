import MarginLineChart from "./MarginLineChart";

function MarginLine(){
    return (
      <div className="home-yearrevenue-widget">
        <div
          style={{
            display: "flex",
            paddingTop: "25px",
            paddingLeft: "25px",
            alignItems: "flex-start",
            width: "100%"
          }}
        >
          <div className="widget-title">
            Cumulative Margin Performance
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
          <MarginLineChart marginColor={"#acadae"} />
        </div>
      </div>
    );
  };

export default MarginLine;