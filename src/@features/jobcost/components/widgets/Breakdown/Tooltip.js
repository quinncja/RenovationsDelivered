import { dollarFormatter } from "@shared/utils/functions";

function Tooltip(datum, totalSum) {
  const percentage = ((datum.value / totalSum) * 100).toFixed(1);
  const vendor = datum.indexValue;
  const type = datum.id;

  return (
    <div className="tooltip">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "7px",
          alignItems: "center",
        }}
      >
        <span
          className={`tooltip-cube ${type === "committed" ? "committed-cube" : ""}`}
          style={{ backgroundColor: datum.color }}
        ></span>
        <h3> {vendor} </h3>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1px",
          alignItems: "flex-start",
        }}
      >
        <h4 style={{ color: "var(--white)" }}>
          {" "}
          <strong> {dollarFormatter(datum.value)} </strong> {type}{" "}
        </h4>
        <h4> {percentage}% of total spending</h4>
      </div>
    </div>
  );
}

export default Tooltip;
