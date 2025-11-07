import MarginFilters from "./MarginFilters";
import PhaseCount from "./PhaseCount";
import ProjectCount from "./ProjectCount";
import Searchbar from "./Searchbar";

function TrackedProjectsHeader(props) {
  const { filteredJobsToShow } = props;

  return (
    <div className="tracked-jobs-header">
      <div style={{ display: "flex", gap: "10px", width: "100%" }}>
        <ProjectCount filteredJobsToShow={filteredJobsToShow} />
        <PhaseCount filteredJobsToShow={filteredJobsToShow} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "10px",
            width: "100%",
          }}
        >
          <MarginFilters />
          <Searchbar />
        </div>
      </div>
    </div>
  );
}

export default TrackedProjectsHeader;
