import { dollarFormatter } from "utils/formatters";

export default function PieChartToolTip({ datum, sum }) {
  const getPercentage = () => {
    if (sum === 0) return "0%";
    const percentage = (datum.value / sum) * 100;
    return `${percentage.toFixed(2)}%`;
  };

  return (
    <div className="tooltip slice" key={`${datum.value}`}>
      <strong>
        <div
          className="tooltip-cube"
          style={{
            backgroundColor: datum.color,
            width: "10px",
            height: "10px",
            display: "inline-block",
            marginRight: "5px",
          }}
        />
        {datum.id}
      </strong>

      <div className="single-slice">{getPercentage()}</div>
      <div className="single-slice">{dollarFormatter(datum.value)}</div>
    </div>
  );
}
