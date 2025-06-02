import { getColor } from "utils/colors";
import { dollarFormatter } from "utils/formatters";

export default function PieChartTooltips(props) {
  const { datum, sum } = props;
  const getPercentage = () => {
    if (sum === 0) return "0%";
    const percentage = (datum.value / sum) * 100;
    return `${percentage.toFixed(2)}%`;
  };

  return (
    <div className="tooltip slice" key={`${datum.value}`}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <div
          className="tooltip-cube"
          style={{
            flexShrink: 0,
            backgroundColor: getColor(datum.id),
          }}
        />
        <h3 style={{ textAlign: "left", display: "inline-block" }}>
          {datum.id}
        </h3>
      </div>
      <div className="single-slice">{dollarFormatter(datum.value)}</div>
      <div className="single-slice">{getPercentage()}</div>
    </div>
  );
}
