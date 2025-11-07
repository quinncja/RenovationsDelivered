import { useProjectContext } from "@features/projects/context/ProjectContext";
import { jobStatusFormatter } from "@shared/utils/functions";

function ProjectStatus() {
  const { projectQuery, updateProjectQuery } = useProjectContext();

  const status = projectQuery.status;

  const handleClick = () => {
    let newStatus;
    if (!status || status === "Mixed") newStatus = 4;
    else if (status === 4) newStatus = 5;
    else if (status === 5) newStatus = null;

    const newMods = {
      status: newStatus,
    };
    updateProjectQuery(newMods);
  };

  return (
    <div
      className={`status-select-wrapper ${status && "status-select-wrapper-active"}`}
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
          flexDirection: "column",
          paddingBottom: "5px",
          gap: "5px",
          marginInline: "22px",
          minWidth: "9ch",
          alignContent: "center",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <h4 style={{ textAlign: "left" }}> Status </h4>
        <h3 style={{ fontSize: "22px" }}>{jobStatusFormatter(status)}</h3>
      </div>
    </div>
  );
}

export default ProjectStatus;
