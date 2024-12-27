import { dollarFormatter } from "utils/formatters";

export default function CostBreakdown({ budget, spent, open = false }) {
  const remainder = budget - spent;
  const remainderText = remainder > 0 ? "Remaining" : "Exceeded";

  return (
    <div className={`${open ? "breakdown-horizontal" : "breakdown-display"}`}>
      <div className={`ytd-single breakdown-single `}>
        <p> Budget </p>
        <h2> {dollarFormatter(budget || 0)} </h2>
      </div>
      <div className={`ytd-single breakdown-single `}>
        <p> Spent </p>
        <h2> {dollarFormatter(spent || 0)} </h2>
      </div>
      <div
        className={`ytd-single ${remainder < 0 ? "over" : ""} breakdown-single `}
      >
        <p> {remainderText} </p>
        <h2 className={`${remainder < 0 ? "over" : ""}`}>
          {" "}
          {dollarFormatter(remainder || 0)}{" "}
        </h2>
      </div>
    </div>
  );
}
