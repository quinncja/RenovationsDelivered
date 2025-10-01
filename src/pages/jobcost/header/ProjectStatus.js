import { useJobCostContext } from "context/JobCostContext";
import { useProjectContext } from "context/ProjectContext";
import { jobStatusFormatter } from "utils/formatters";

function ProjectStatus() {
  const { pageModifiers, updatePageModifiers } = useJobCostContext();
  const { getJobListStatus } = useProjectContext();
  const jobListStatus = getJobListStatus(pageModifiers);

  const status = pageModifiers.status || jobListStatus;

  const handleClick = () => {
    let newStatus;
    if (!status || status === "Mixed") newStatus = 4;
    else if (status === 4) newStatus = 5;
    else if (status === 5) newStatus = null;

    const newMods = {
      status: newStatus,
    };
    updatePageModifiers(newMods);
  };

  return (
    <div
      className={`status-select-wrapper ${pageModifiers.status && "status-select-wrapper-active"}`}
      onClick={handleClick}
      style={{
        flexShrink: "0",
        display: "flex",
        flexDirection: "row",
        height: "100%",
        borderRadius: "5px 0px 0px 5px",
      }}
    >
      <div
        style={{
          display: "flex",
          minWidth: "8ch",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20px",
          padding: "10px 8px",
          marginInline: "22px",
          marginBlock: "15px",
          background:
            !pageModifiers.status && !jobListStatus
              ? "var(--dark)"
              : (pageModifiers.status || jobListStatus) === "Mixed"
                ? "linear-gradient(135deg, var(--closed) 35%, var(--open))"
                : (pageModifiers.status || jobListStatus) > 4
                  ? "var(--closed)"
                  : "var(--open)",
        }}
      >
        <h3>{jobStatusFormatter(pageModifiers.status || jobListStatus)}</h3>
      </div>
    </div>
  );
}

export default ProjectStatus;
