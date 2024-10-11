import { dollarFormatter } from "utils/formatters";

export const YTDDisplay = ({ data, open }) => {
  const { Contract, Budget, Cost } = data[0];
  const margin = (Contract - Cost) / Contract;

  return (
    <div className={` ${open ? "ytd-open" : ""} ytd-display `}>
      <div className={` ${open ? "single-open" : ""} ytd-single `}>
        <p> Revenue </p>
        <h2> {dollarFormatter(Contract || 0)} </h2>
      </div>
      <div className={` ${open ? "single-open" : ""} ytd-single `}>
        <p> Cost </p>
        <h2> {dollarFormatter(Cost || 0)} </h2>
      </div>
      <div className={` ${open ? "single-open" : ""} ytd-single `}>
        <p> Budget </p>
        <h2> {dollarFormatter(Budget || 0)} </h2>
      </div>
      <div className={` ${open ? "single-open" : ""} ytd-single `}>
        <p> Margin </p>
        <h2> {((margin || 0) * 100).toFixed(2)}% </h2>
      </div>
    </div>
  );
};

export default YTDDisplay;
