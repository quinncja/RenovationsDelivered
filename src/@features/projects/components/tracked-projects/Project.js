import { chevronRight, gridSvg } from "@assets/icons/svgs";
import { useTrackedProjects } from "@features/projects/context/TrackedProjectContext";
import { useRef, useState } from "react";
import {
  displayString,
  dollarFormatter,
  getBaseJobName,
  strToMods,
} from "@shared/utils/functions";
import { useNavigate } from "react-router-dom";
import {
  calculateMargin,
  displayMargin,
  getMarginClass,
} from "@shared/utils/functions";
import PhaseEntry from "./Phase";
import useIsAdmin from "@shared/hooks/useIsAdmin";
import { useJobcostContext } from "@features/jobcost/context/JobcostContext";
import { fetchProjectPhaseData } from "@features/projects/api/projectsApi";

function Project(props) {
  const { job, deleteSelf } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [phaseData, setPhaseData] = useState();
  const { dataMap } = useTrackedProjects();
  const { updatePageModifiers } = useJobcostContext();
  const navigate = useNavigate();
  const dataArray = props.data || dataMap[job] || null;
  const isAdmin = useIsAdmin();
  const accessJobData = () => {
    if (!dataArray) return;
    if (dataArray.length > 1) {
      return { ...dataArray[0], error: true };
    } else {
      return dataArray[0];
    }
  };
  const data = accessJobData();
  const abortControllerRef = useRef(null);

  const fetchPhaseData = async () => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const newPhaseData = await fetchProjectPhaseData(job, controller.signal);
      setPhaseData(newPhaseData);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch request aborted");
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  const toggleSelf = () => {
    if (!data) return;
    if (isOpen === false) fetchPhaseData();
    setIsOpen(!isOpen);
  };

  const handleClick = (obj) => {
    const mods = strToMods(job, null, null);
    updatePageModifiers(mods);
    navigate("/jobcost");
  };

  const handlePhaseClick = (year, phase) => {
    const mods = strToMods(job, year, phase);
    updatePageModifiers(mods);
    navigate("/jobcost");
  };

  const handleSubClick = (year, phase) => {
    const mods = strToMods(job, year, phase);
    updatePageModifiers(mods);
    navigate("/jobcost/breakdown/subcontractors");
  };

  const jobBody = () => {
    const margin = calculateMargin(data.TotalContract, data.TotalCost);
    const closedMargin = calculateMargin(data.ClosedContract, data.ClosedCost);

    return (
      <div className="job-body">
        <div className="job-left">
          <h3> {displayString(getBaseJobName(data.JobName))} </h3>
          <h4> {displayString(data.ClientName)} </h4>
        </div>
        <div className="job-right">
          <div
            style={{
              display: "flex",
              gap: "7px",
              alignItems: "baseline",
              justifyContent: "right",
            }}
          >
            {" "}
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50px",
                backgroundColor: "var(--open)",
              }}
            />
            <h4>
              {" "}
              <strong style={{ color: "var(--white)" }}>
                {" "}
                {data.OpenPhases}{" "}
              </strong>{" "}
              open{" "}
            </h4>{" "}
          </div>
          <div
            style={{
              display: "flex",
              gap: "7px",
              alignItems: "baseline",
              justifyContent: "right",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50px",
                backgroundColor: "var(--closed)",
              }}
            />{" "}
            <h4>
              {" "}
              <strong style={{ color: "var(--white)" }}>
                {" "}
                {data.ClosedPhases}{" "}
              </strong>{" "}
              closed{" "}
            </h4>{" "}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              textAlign: "right",
            }}
            title="Margin on all phases"
          >
            <h4> Current</h4>
            <h3
              style={{ justifySelf: "end" }}
              className={`${getMarginClass(margin)}`}
            >
              {" "}
              {displayMargin(margin)}{" "}
            </h3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              textAlign: "right",
            }}
            title="Margin on closed phases"
          >
            <h4> Closed</h4>
            <h3
              style={{ justifySelf: "end" }}
              className={`${getMarginClass(closedMargin)}`}
            >
              {" "}
              {displayMargin(closedMargin)}{" "}
            </h3>
          </div>
        </div>
      </div>
    );
  };

  const renderPhaseEntries = () => {
    if (!isOpen) return null;

    if (!phaseData) {
      return (
        <div className="phases-container">
          {data.OpenPhases > 0 && (
            <>
              <div
                style={{
                  display: "flex",
                  gap: "7px",
                  alignItems: "baseline",
                  paddingBottom: "5px",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50px",
                    backgroundColor: "var(--open)",
                  }}
                />{" "}
                <h3> Open Phases ({data.OpenPhases})</h3>{" "}
              </div>
              {Array(data.OpenPhases)
                .fill(null)
                .map((_, index) => (
                  <PhaseEntry key={`loading-${index}`} />
                ))}
            </>
          )}
          {data.OpenPhases > 0 && data.ClosedPhases > 0 && (
            <div style={{ height: "10px" }}></div>
          )}
          {data.ClosedPhases > 0 && (
            <>
              <div
                style={{
                  display: "flex",
                  gap: "7px",
                  alignItems: "baseline",
                  paddingBottom: "5px",
                }}
              >
                {" "}
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50px",
                    backgroundColor: "var(--closed)",
                  }}
                />
                <h3> Closed Phases ({data.ClosedPhases})</h3>{" "}
              </div>
              {Array(data.ClosedPhases)
                .fill(null)
                .map((_, index) => (
                  <PhaseEntry key={`loading-${index}`} />
                ))}
            </>
          )}
        </div>
      );
    }

    const openPhases = phaseData.filter((item) => item.Status === 4);
    const closedPhases = phaseData.filter((item) => item.Status > 4);

    return (
      <div className="phases-container">
        {data.OpenPhases > 0 && (
          <>
            <div
              style={{
                display: "flex",
                gap: "7px",
                alignItems: "baseline",
                paddingBottom: "5px",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50px",
                  backgroundColor: "var(--open)",
                }}
              />
              <h3> Open Phases ({openPhases.length})</h3>{" "}
            </div>
            {openPhases.map((item, index) => (
              <PhaseEntry
                key={`phase-open-${index}`}
                data={item}
                handleClick={handlePhaseClick}
                handleSubClick={handleSubClick}
              />
            ))}
          </>
        )}
        {data.OpenPhases > 0 && data.ClosedPhases > 0 && (
          <div style={{ height: "10px" }}></div>
        )}
        {data.ClosedPhases > 0 && (
          <>
            <div
              style={{
                display: "flex",
                gap: "7px",
                alignItems: "baseline",
                paddingBottom: "5px",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50px",
                  backgroundColor: "var(--closed)",
                }}
              />
              <h3> Closed Phases ({closedPhases.length})</h3>{" "}
            </div>
            {closedPhases.map((item, index) => (
              <PhaseEntry
                key={`phase-closed-${index}`}
                data={item}
                handleClick={handlePhaseClick}
                handleSubClick={handleSubClick}
              />
            ))}
          </>
        )}
      </div>
    );
  };

  const renderJobSubData = () => {
    if (!isOpen) return null;

    return (
      <div className="admin-job-details">
        <div style={{ display: "flex", flexDirection: "row", gap: "50px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <h4> Project Manager</h4>
            <h3> {displayString(data.ProjectManager)} </h3>
          </div>
          {isAdmin && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "3px" }}
            >
              <h4> Total Contract</h4>
              <h3> {dollarFormatter(data.TotalContract)} </h3>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <h4> Total Budget</h4>
            <h3> {dollarFormatter(data.TotalBudget)} </h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <h4> Total Spent</h4>
            <h3> {dollarFormatter(data.TotalCost)} </h3>
          </div>
        </div>
        {!isAdmin && (
          <button
            className="x-button"
            title="Remove tracked project"
            onClick={() => deleteSelf(job)}
          >
            <h4> Remove tracked job </h4>
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="tracked-job-container">
      <div
        className={`tracked-job ${!data && "loading-widget"} ${isOpen && "tracked-job-open"}`}
        onClick={toggleSelf}
      >
        <button
          className="widget-item"
          style={{
            opacity: ".5",
            height: "fit-content",
            alignSelf: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            transforBox: "fill-box",
            transformOrigin: "center",
            transform: `${isOpen ? "rotate(90deg)" : "rotate(0deg)"}`,
            transition: "all .2s ease-in-out",
            display: "flex",
          }}
        >
          {chevronRight()}
        </button>

        {data && jobBody()}

        <button
          className="x-item widget-item"
          style={{
            opacity: ".5",
            height: "fit-content",
            alignSelf: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "10px",
            display: "flex",
          }}
          title={"View Job Costing"}
          onClick={(e) => {
            e.stopPropagation();
            handleClick(job);
          }}
        >
          {gridSvg()}
        </button>
      </div>
      {renderJobSubData()}
      {renderPhaseEntries()}
    </div>
  );
}

export default Project;
