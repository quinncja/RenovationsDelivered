import { dollarFormatter } from "utils/formatters";
import useIsAdmin from "utils/hooks/useIsAdmin";
import { useSingle } from "utils/hooks/useSingle";

export const YTDDisplay = ({ data, open }) => {
  const { Contract, Budget, Cost } = data[0];
  const margin = (Contract - Cost) / Contract;
  const single = useSingle();
  const isAdmin = useIsAdmin();

  const underBudget = Budget - Cost >= 0 ? true : false;
  const text = underBudget ? "Under budget" : "Over budget";
  return (
    <div className={` ${open ? "ytd-open" : ""} ytd-display `}>
      {single && (
        <div className={`ytd-no-admin ytd-single`}>
          <h2 className={`${underBudget ? "under" : "over"}`}> {text} </h2>
        </div>
      )}
      {isAdmin && (
        <div className={`ytd-single `}>
          <p> Contract </p>
          <h2> {dollarFormatter(Contract || 0)} </h2>
        </div>
      )}
      <div className={` ${!isAdmin ? "ytd-no-margin" : ""} ytd-single `}>
        <p> Budget </p>
        <h2> {dollarFormatter(Budget || 0)} </h2>
      </div>
      <div className={` ${!isAdmin ? "ytd-no-margin" : ""}  ytd-single `}>
        <p> COGS </p>
        <h2> {dollarFormatter(Cost || 0)} </h2>
      </div>
      {!single && (
        <div className={` ${!isAdmin ? "ytd-no-margin" : ""} ytd-single `}>
          <p> Margin </p>
          <h2> {((margin || 0) * 100).toFixed(2)}% </h2>
        </div>
      )}
    </div>
  );
};

export default YTDDisplay;
