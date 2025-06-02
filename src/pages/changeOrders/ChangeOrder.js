import { confirmedSvg, rejectedSvg, userReviewSvg } from "business/svg";
import { useProjectContext } from "context/ProjectContext";
import { useState } from "react";
import {
  dateTimeToString,
  destructureJobNumber,
  dollarFormatter,
} from "utils/formatters";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useJobCostContext } from "context/JobCostContext";

function ChangeOrder(props) {
  const { pageModifiers, excelData, changeOrder, newCO } = props;
  const { updatePageModifiers } = useJobCostContext();
  const { getJobStr, getPhaseStr, getYearStr } = useProjectContext();
  const navigate = useNavigate();
  const { labor, material, subs, wtpm } = newCO
    ? excelData
    : changeOrder
      ? changeOrder.totals
      : { labor: 0, material: 0, subs: 0, wtpm: 0 };

  const { rowObjects } = changeOrder || { rowObjects: [] };

  const { jobNum, year, phase } = pageModifiers
    ? {
        jobNum: pageModifiers.jobNum,
        year: pageModifiers.yearId,
        phase: pageModifiers.phaseId,
      }
    : destructureJobNumber(changeOrder.jobnum);

  const coJobNum = newCO
    ? pageModifiers
      ? getJobStr(pageModifiers.jobNum)
      : ""
    : changeOrder
      ? getJobStr(jobNum)
      : "";

  const coYearId = newCO
    ? pageModifiers
      ? getYearStr(pageModifiers.yearId)
      : ""
    : changeOrder
      ? year
      : "";

  const coPhaseId = newCO
    ? pageModifiers
      ? getPhaseStr(pageModifiers.phaseId)
      : ""
    : changeOrder
      ? `P${phase}`
      : "";

  const coTotal = newCO
    ? excelData.total
    : changeOrder
      ? changeOrder.appamt
      : 0;

  const coStatus = newCO ? 3 : changeOrder ? changeOrder.status : null;

  const coName = newCO ? excelData.name : changeOrder ? changeOrder.dscrpt : "";

  const coDate = newCO ? new Date() : changeOrder ? changeOrder.insdte : null;

  const coReason = newCO ? null : changeOrder ? changeOrder.reason : null;

  const coUser = newCO ? null : changeOrder ? changeOrder.user : null;

  const budgetTotal = labor + material + subs + wtpm;
  const markupTotal = coTotal - budgetTotal;

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    if (newCO) return;
    setOpen(!open);
  };
  const statusSymbol = (status) => {
    if (status === 1) return <div title="Confirmed">{confirmedSvg()}</div>;
    if (status === 3)
      return <div title="Pending Confirmation">{userReviewSvg()}</div>;
    if (status === 6) return <div title="Rejected">{rejectedSvg()}</div>;
  };

  const handleNav = () => {
    if (newCO) return;
    updatePageModifiers({
      jobNum,
      yearId: `${jobNum}-${year.substr(2)}`,
      phaseId: `${jobNum}-${year.substr(2)}-${phase}`,
    });
    navigate("/jobcost");
  };
  const renderRowObj = (obj) => {
    const { budgets } = obj;

    let labor = 0;
    let material = 0;
    let subs = 0;
    let wtpm = 0;

    budgets.forEach((budget) => {
      switch (budget.type) {
        case "labor":
          labor = budget.amount;
          break;
        case "material":
          material = budget.amount;
          break;
        case "subs":
          subs = budget.amount;
          break;
        case "wtpm":
          wtpm = budget.amount;
          break;
        default:
          break;
      }
    });

    return (
      <div className="rowObj" key={`${obj.desc}-${obj.unit}`}>
        <div className="change-order-amounts">
          <strong>
            {obj.desc} <br /> <span className="p"> Unit {obj.unit} </span>{" "}
          </strong>
          <div className="change-order-amount">
            <p>{dollarFormatter(labor)}</p>
          </div>
          <div className="change-order-amount">
            <p>{dollarFormatter(material)}</p>
          </div>
          <div className="change-order-amount">
            <p>{dollarFormatter(subs)}</p>
          </div>
          <div className="change-order-amount">
            <p>{dollarFormatter(wtpm)}</p>
          </div>
          <div className="change-order-amount">
            <p style={{ opacity: "1" }}>
              {dollarFormatter(labor + material + subs + wtpm)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={newCO ? "change-order-card" : "db-change-order-card"}
      layout
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="change-order-top-row">
        <div className="change-order-title">
          <p style={{ margin: "0px" }}> {coReason} </p>
          <div style={{ display: "flex", alignItems: "baseline", gap: "15px" }}>
            <div
              style={{ margin: "0px", fontSize: "2rem", fontWeight: "600" }}
              className="coName"
            >
              {" "}
              {coName}{" "}
            </div>
            <button
              style={{ margin: "0px" }}
              className={`p co-job ${newCO ? "" : "copy-btn"}`}
              title="View job"
              onClick={() => handleNav()}
            >
              {coJobNum} {coPhaseId} {coYearId}{" "}
            </button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {statusSymbol(coStatus)}
        </div>
      </div>

      <motion.div
        className={`change-order-open ${newCO ? "new-change-order-header" : ""}`}
      >
        <div
          className={`header-amounts change-order-open-header ${open ? "change-order-open-true" : ""}  `}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            gap: "1rem",
          }}
          onClick={handleClick}
        >
          <div className="change-order-header-amount">
            <strong> Budget </strong>
            <p>{dollarFormatter(budgetTotal)}</p>
          </div>
          <div className="change-order-header-amount">
            <strong> Markup </strong>
            <p>{dollarFormatter(markupTotal)}</p>
          </div>
          <div className="change-order-header-amount">
            <strong> Total </strong>
            <p>{dollarFormatter(coTotal)}</p>
          </div>
        </div>
        <AnimatePresence>
          {open ? (
            <motion.div
              style={{ overflow: "hidden" }}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              exit={{ height: 0 }}
              className="change-order-open-bottom"
              key={changeOrder._idnum}
            >
              <div />
              <div className="change-order-amounts header-amounts">
                <strong> </strong>
                <strong> Labor </strong>
                <strong> Material </strong>
                <strong> Sub </strong>
                <strong> WTPM </strong>
                <strong> Total </strong>
              </div>

              <div
                className="budget-totals"
                style={{ display: "flex", flexDirection: "column", gap: "0px" }}
              >
                <div className="change-order-amounts">
                  <strong> Budget Total </strong>
                  <div className="change-order-amount">
                    <p> {`${dollarFormatter(labor)}`} </p>
                  </div>
                  <div className="change-order-amount">
                    <p> {`${dollarFormatter(material)}`} </p>
                  </div>
                  <div className="change-order-amount">
                    <p> {`${dollarFormatter(subs)}`} </p>
                  </div>
                  <div className="change-order-amount">
                    <p> {`${dollarFormatter(wtpm)}`} </p>
                  </div>
                  <div className="change-order-amount">
                    <p style={{ opacity: "1" }}>
                      {" "}
                      {`${dollarFormatter(labor + material + subs + wtpm)}`}{" "}
                    </p>
                  </div>
                </div>
              </div>
              {rowObjects.map((obj) => renderRowObj(obj))}
              <div />
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
      </motion.div>
      {!newCO && (
        <div className="bottom-amounts">
          {coUser && (
            <div className="change-order-amount" style={{ minWidth: "5rem" }}>
              <strong> {coUser} </strong>
            </div>
          )}
          <div className="change-order-amount">
            <p> {dateTimeToString(new Date(coDate))} </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangeOrder;
