import { dollarFormatter, percentFomatter } from "@shared/utils/functions";
import { getMarginClass } from "@shared/utils/functions";
import useIsAdmin from "@shared/hooks/useIsAdmin";
import SubcontractButton from "./SubcontractButton";
import { underConstructionSvg } from "@assets/icons/svgs";
import JobListButton from "./JobListButton";
import { useState, useEffect } from "react";
import JobList from "./JobList";
import MoneyDisplay from "@shared/components/MoneyDisplay/MoneyDisplay";

const {
  useJobcostContext,
} = require("@features/jobcost/context/JobcostContext");

function JobDetails() {
  const { getDataByType } = useJobcostContext();
  const id = "details";
  const data = getDataByType(id);
  const isAdmin = useIsAdmin();
  const { getJobDetails } = useJobcostContext();
  const jobDetails = getJobDetails();

  const [showJobList, setShowJobList] = useState(() => {
    const saved = localStorage.getItem("showJobList");
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("showJobList", JSON.stringify(showJobList));
  }, [showJobList]);

  if (!data) {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "7px",
            boxSizing: "border-box",
          }}
        >
          <div className="jobcost-details-widget loading-widget" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "7px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "7px",
                flexGrow: "1",
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <SubcontractButton />
            </div>
            <JobListButton isOpen={showJobList} setIsOpen={setShowJobList} />
          </div>
        </div>
        {showJobList && <JobList />}
      </>
    );
  }

  const infoBoxes = (details) => {
    const margin =
      ((details.ContractAmount - jobDetails.cost) / details.ContractAmount) *
      100;
    const marginClass = getMarginClass(margin);
    const markup =
      ((details.ContractAmount - jobDetails.budget) / jobDetails.budget) * 100;
    const remaining = jobDetails.budget - jobDetails.cost;
    const percentSpent = (jobDetails.cost / jobDetails.budget) * 100;
    const profit = details.ContractAmount - jobDetails.cost;
    if (!details.ContractAmount && !details.budget && !details.cost) {
      return (
        <div style={{ width: "100%" }}>
          <div className="empty-breakdown">
            {underConstructionSvg()}
            <h4> No data </h4>
          </div>
        </div>
      );
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "80%",
          flexGrow: "1",
          alignItems: "center",
          paddingInline: "25px",
          paddingBlock: "25px",
          height: "150px",
          boxSizing: "border-box",
          justifyContent: "flex-start",
          gap: "0px",
          overflowX: "scroll",
        }}
      >
        <div
          className="jobcost-detail-box"
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            flexShrink: 0,
          }}
        >
          <h4>Current Margin</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <h2 className={marginClass} style={{ fontSize: "24px" }}>
              {percentFomatter(margin)}
            </h2>
            {isAdmin ? (
              <>
                <div className="jobcost-hl" />
                <h5>{dollarFormatter(profit)} profit</h5>
              </>
            ) : (
              <>
                <div className="jobcost-hl" />
                <h5 style={{ opacity: "0" }}>-</h5>
              </>
            )}
          </div>
        </div>
        {isAdmin && (
          <div
            className="jobcost-detail-box"
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <h4>Contract</h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <MoneyDisplay size={20} value={details.ContractAmount} />
              <div className="jobcost-hl" />
              <h5 style={{ opacity: isFinite(markup) ? 1 : 0 }}>
                {percentFomatter(markup)} Markup
              </h5>
            </div>
          </div>
        )}
        <div
          className="jobcost-detail-box"
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <h4>Budget</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <MoneyDisplay size={20} value={jobDetails.budget} />
            <div className="jobcost-hl" />
            <h5>
              {dollarFormatter(remaining)}{" "}
              {remaining >= 0 ? "remaining" : "over budget"}
            </h5>
          </div>
        </div>
        <div
          className="jobcost-detail-box"
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <h4>Spent</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <MoneyDisplay size={20} value={jobDetails.cost} />
            <div className="jobcost-hl" />
            <h5 style={{ opacity: isFinite(percentSpent) ? 1 : 0 }}>
              {percentFomatter(percentSpent)} spent
            </h5>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: "7px",
          boxSizing: "border-box",
        }}
      >
        <div className="jobcost-details-widget">{infoBoxes(data[0])}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "7px",
              flexGrow: "1",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <SubcontractButton />
          </div>
          <JobListButton isOpen={showJobList} setIsOpen={setShowJobList} />
        </div>
      </div>
      {showJobList && <JobList />}
    </>
  );
}

export default JobDetails;
