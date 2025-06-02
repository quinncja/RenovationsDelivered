import { dollarFormatter, phaseNumToMonth } from "utils/formatters";
import { calculateMargin, displayMargin, getMarginClass } from "utils/funcs";
import useIsAdmin from "utils/hooks/useIsAdmin";

function PhaseEntry(props) {
  const { data, handleClick, handleSubClick } = props;
  const { YearNum, PhaseNum, TotalContract, TotalCost, SubAmount } = data || {};

  const isAdmin = useIsAdmin();
  const onSubClick = (e) => {
    e.stopPropagation();
    if (SubAmount > 0) handleSubClick(YearNum, PhaseNum);
  };

  const phaseAdminData = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: "5px",
        }}
      >
        <div>
          {" "}
          <h4> Contract {dollarFormatter(TotalContract)} </h4>{" "}
        </div>
        |
        <div>
          {" "}
          <h4> COGS {dollarFormatter(TotalCost)} </h4>{" "}
        </div>
      </div>
    );
  };

  const phaseBody = () => {
    const margin = calculateMargin(TotalContract, TotalCost);

    return (
      <div className="phase-body">
        <div className="phase-left">
          <div className="phase-box">
            {" "}
            <h3> P{PhaseNum} </h3>{" "}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            <h3> Phase {PhaseNum} </h3>
            <h4>
              {" "}
              {phaseNumToMonth(PhaseNum)} 20{YearNum}{" "}
            </h4>
          </div>
        </div>
        <div className="phase-right">
          <div
            className={SubAmount > 0 ? "hover-sub" : ""}
            onClick={(e) => onSubClick(e)}
            style={{ display: "flex", gap: "7px", alignItems: "baseline" }}
          >
            {" "}
            <h4>
              {" "}
              <strong style={{ color: "var(--white)" }}>
                {" "}
                {SubAmount}{" "}
              </strong>{" "}
              {SubAmount === 1 ? "sub contract" : "sub contracts"}{" "}
            </h4>{" "}
          </div>
          <h3
            style={{ justifySelf: "end" }}
            className={`${getMarginClass(margin)}`}
          >
            {" "}
            {displayMargin(margin)}{" "}
          </h3>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`tracked-job phase-job ${!data && "loading-widget"}`}
      onClick={() => handleClick(YearNum, PhaseNum)}
    >
      {data && phaseBody()}
    </div>
  );
}

export default PhaseEntry;
