import {
  dollarFormatter,
  getMarginBackground,
  percentFomatter,
} from "@shared/utils/functions";
import { getMarginClass } from "@shared/utils/functions";
import useIsAdmin from "@shared/hooks/useIsAdmin";
import SubcontractButton from "./SubcontractButton";
import { underConstructionSvg } from "@assets/icons/svgs";
import JobListButton from "./JobListButton";
import { useState, useEffect } from "react";
import JobList from "./JobList";
import MoneyDisplay from "@shared/components/MoneyDisplay/MoneyDisplay";
import { useJobcostContext } from "@features/jobcost/context/JobcostContext";

function JobDetails() {
  const { getDataByType, getJobDetails } = useJobcostContext();
  const id = "details";
  const data = getDataByType(id);
  const isAdmin = useIsAdmin();
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
          display: "grid",
          gridTemplate: "1fr / 1fr 1fr 1fr 1fr",
          width: "100%",
          alignItems: "center",
          boxSizing: "border-box",
          justifyContent: "flex-start",
          gap: "10px",
        }}
      >
          <div className="widget jobcost-details-box loading-widget" style={{height: '162px'}} />
          <div className="widget jobcost-details-box loading-widget" style={{height: '162px'}} />
          <div className="widget jobcost-details-box loading-widget" style={{height: '162px'}} />
          <div className="widget jobcost-details-box loading-widget" style={{height: '162px'}} />

        </div>
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
    return (
      <div
        style={{
          display: "grid",
          gridTemplate: "1fr / 1fr 1fr 1fr 1fr",
          width: "100%",
          alignItems: "center",
          boxSizing: "border-box",
          justifyContent: "flex-start",
          gap: "10px",
        }}
      >
        <div
          className={`jobcost-detail-box ${getMarginBackground(margin)}`}
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            flexShrink: 0,
          }}
        >
          <div className="widget-title"> Current Margin</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <h2 className={marginClass} style={{ fontSize: "28px" }}>
              {percentFomatter(margin)}
            </h2>
            {isAdmin ? (
              <>
                <div className="jobcost-hl" />
                <h5>{dollarFormatter(profit)} Profit</h5>
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
            <div className="widget-title"> Contract</div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <MoneyDisplay size={28} value={details.ContractAmount} />
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
          <div className="widget-title"> Budget</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <MoneyDisplay size={28} value={jobDetails.budget} />
            <div className="jobcost-hl" />
            <h5>
              {dollarFormatter(remaining)}{" "}
              {remaining >= 0 ? "Remaining" : "Over Budget"}
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
          <div className="widget-title"> Spent</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <MoneyDisplay size={28} value={jobDetails.cost} />
            <div className="jobcost-hl" />
            <h5 style={{ opacity: isFinite(percentSpent) ? 1 : 0 }}>
              {percentFomatter(percentSpent)} Spent
            </h5>
          </div>
        </div>
      </div>
    );
  };

  return <>{infoBoxes(data[0])}</>;
}

export default JobDetails;
