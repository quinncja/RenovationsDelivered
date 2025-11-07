import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import { useProjectContext } from "@features/projects/context/ProjectContext";
import { useNavigate } from "react-router-dom";
import {
  dollarFormatter,
  getBaseJobName,
  phaseNumToMonth,
} from "@shared/utils/functions";
import {
  calculateMargin,
  displayMargin,
  getMarginClass,
} from "@shared/utils/functions";

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
  } = data || {};

  const navigate = useNavigate();
  const { recnumToPageModifiers } = useProjectContext();
  const { updatePageModifiers } = useJobcostContext();

  const handlePhaseClick = () => {
    const mods = recnumToPageModifiers(recnum);
    updatePageModifiers(mods);
    navigate("/jobcost");
  };

  const phaseBody = () => {
    const margin = calculateMargin(TotalContract, TotalCost);

    return (
      <div className="phase-body">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "40px 1fr 140px 140px 140px 100px",
            alignItems: "center",
            gap: "20px",
            width: "100%",
          }}
        >
          <div
            className="phase-box"
            style={{
              background: Status === 4 ? "var(--open)" : "var(--closed)",
            }}
          >
            <h3> P{phase_num} </h3>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              textAlign: "left",
              minWidth: 0,
            }}
          >
            <h4
              style={{
                color: "white",
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {getBaseJobName(jobnme)}
            </h4>
            <h4
              style={{
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {phaseNumToMonth(phase_num)} 20{year_num}
            </h4>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              textAlign: "right",
              gap: "2px",
            }}
          >
            <h4 style={{ margin: 0 }}> Contract </h4>
            <h4 style={{ color: "white", margin: 0 }}>
              {dollarFormatter(TotalContract)}
            </h4>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              textAlign: "right",
              gap: "2px",
            }}
          >
            <h4 style={{ margin: 0 }}> Cost </h4>
            <h4 style={{ color: "white", margin: 0 }}>
              {dollarFormatter(TotalCost)}
            </h4>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              textAlign: "right",
              gap: "2px",
            }}
          >
            <h4 style={{ margin: 0 }}> Profit </h4>

            <h4 style={{ color: "white", margin: 0 }}>
              {dollarFormatter(TotalContract - TotalCost)}
            </h4>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <h3 className={`${getMarginClass(margin)}`} style={{ margin: 0 }}>
              {displayMargin(margin)}
            </h3>
          </div>
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
