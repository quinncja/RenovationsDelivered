import { useJobCostContext } from "context/JobCostContext";
import { useNavigate } from "react-router-dom";
import {
  destructureJobNumber,
  dollarFormatter,
  getBaseJobName,
  phaseNumToMonth,
  strToMods,
} from "utils/formatters";
import { calculateMargin, displayMargin, getMarginClass } from "utils/funcs";

function Phase(props) {
  const { data } = props;
  const {
    year_num,
    phase_num,
    Status,
    jobnme,
    recnum,
    TotalContract,
    TotalCost,
    SubAmount,
  } = data || {};

  const navigate = useNavigate();
  const { updatePageModifiers } = useJobCostContext();

  const handlePhaseClick = () => {
    const { jobNum, year, phase } = destructureJobNumber(recnum);
    const mods = strToMods(jobNum, year, phase);
    updatePageModifiers(mods);
    navigate("/jobcost");
  };

  const handleSubClick = (e) => {
    e.stopPropagation();
    const { jobNum, year, phase } = destructureJobNumber(recnum);
    const mods = strToMods(jobNum, year, phase);
    updatePageModifiers(mods);
    navigate("/jobcost/breakdown/subcontractors");
  };

  const phaseAdminData = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "right",
          gap: "5px",
        }}
      >
        {" "}
        <h4 style={{ color: "white" }}> {dollarFormatter(TotalContract)} </h4>
        <h4> Contract </h4>{" "}
      </div>
    );
  };

  const phaseBody = () => {
    const margin = calculateMargin(TotalContract, TotalCost);

    return (
      <div className="phase-body">
        <div className="phase-left">
          <div
            className="phase-box"
            style={{
              background: Status === 4 ? "var(--open)" : "var(--closed)",
            }}
          >
            {" "}
            <h3> P{phase_num} </h3>{" "}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              width: "300px",
              textAlign: "left",
            }}
          >
            <h3> {getBaseJobName(jobnme)} </h3>
            <h4>
              {" "}
              {phaseNumToMonth(phase_num)} 20{year_num}{" "}
            </h4>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.2fr 1fr",
            alignItems: "center",
            marginBlock: "auto",
            gap: "20px",
            textAlign: "right",
            width: "480px",
          }}
        >
          {phaseAdminData()}
          <div
            className={SubAmount > 0 ? "hover-sub" : ""}
            onClick={(e) => handleSubClick(e)}
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
      className={`tracked-job standalone-body phase-job ${!data && "loading-widget"}`}
      onClick={() => handlePhaseClick()}
    >
      {data && phaseBody()}
    </div>
  );
}

export default Phase;
