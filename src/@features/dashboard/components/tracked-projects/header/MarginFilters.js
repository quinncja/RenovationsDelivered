import { useTrackedProjects } from "@features/projects/context/TrackedProjectContext";

function MarginFilters() {
  const { marginFilter, setMarginFilter } = useTrackedProjects();

  const toggleFilter = (filterValue) => {
    setMarginFilter(marginFilter === filterValue ? false : filterValue);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: "5px",
      }}
    >
      <div
        className={`margin-filter ${marginFilter === "high" ? "margin-filter-active" : ""}`}
        onClick={() => toggleFilter("high")}
      >
        {/* margin > 25% */}
        <span className="phase-dot-small under-dot"></span>
        <h4>High Performing</h4>
      </div>
      <div
        className={`margin-filter ${marginFilter === "target" ? "margin-filter-active" : ""}`}
        onClick={() => toggleFilter("target")}
      >
        {/* 25% > margin > 20% */}
        <span className="phase-dot-small semi-good-dot"></span>
        <h4>Target Performing</h4>
      </div>
      <div
        className={`margin-filter ${marginFilter === "under" ? "margin-filter-active" : ""}`}
        onClick={() => toggleFilter("under")}
      >
        {/* 20% > margin > 0% */}
        <span className="phase-dot-small semi-bad-dot"></span>
        <h4>Under Performing</h4>
      </div>
      <div
        className={`margin-filter ${marginFilter === "critical" ? "margin-filter-active" : ""}`}
        onClick={() => toggleFilter("critical")}
      >
        {/* margin < 0% */}
        <span className="phase-dot-small over-dot"></span>
        <h4>Critical</h4>
      </div>
    </div>
  );
}

export default MarginFilters;
