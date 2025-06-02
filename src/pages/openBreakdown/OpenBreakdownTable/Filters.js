import { useJobCostContext } from "context/JobCostContext";
import { getColor } from "utils/colors";

function Filters() {
  const { breakdownData, updateFocusedId, typeFilter, setTypeFilter } =
    useJobCostContext();
  const { focused } = breakdownData;

  const toggleFilter = (filterValue) => {
    setTypeFilter(typeFilter === filterValue ? false : filterValue);
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
      {" "}
      {focused && (
        <div
          className={`margin-filter margin-filter-active`}
          onClick={() => updateFocusedId(focused)}
        >
          <span
            className="phase-dot-small under-dot "
            style={{ background: getColor(focused, "Tranquil") }}
          ></span>
          <h4>{focused}</h4>
        </div>
      )}
      <div
        className={`margin-filter ${typeFilter === "committed" ? "margin-filter-active" : ""}`}
        onClick={() => toggleFilter("committed")}
      >
        <h4>Committed</h4>
      </div>
      <div
        className={`margin-filter ${typeFilter === "posted" ? "margin-filter-active" : ""}`}
        onClick={() => toggleFilter("posted")}
      >
        <h4>Posted</h4>
      </div>
    </div>
  );
}

export default Filters;
