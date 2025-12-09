import ClientSelector from "./ClientSelector";
import PhaseSelector from "./PhaseSelector";
import ProjectManagerSelector from "./ProjectManagerSelector";
import ProjectSelector from "./ProjectSelector";
import StatusSelector from "./StatusSelector";
import StateSelector from "./StateSelector";
import YearSelector from "./YearSelector";
import { useJobcostContext } from "@features/jobcost/context/JobcostContext";

function Header() {
  const { isEmpty, clearPageModifiers } = useJobcostContext();

  return (
    <div className="job-cost-header">
      <div
        className="job-cost-header-item"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
          width: "100%",
        }}
      >
        <ProjectSelector />
        <YearSelector />
        <PhaseSelector />
        <StatusSelector />
        <ClientSelector />
        <StateSelector />
        <ProjectManagerSelector />
        {!isEmpty && (
          <button
            onClick={clearPageModifiers}
            title="Clear values"
            className="x-button-header clickable-widget"
            style={{
              paddingInline: "20px",
              marginLeft: "20px",
              height: "50px",
              color: "white",
              border: "1px solid var(--fancy-border",
              backgroundColor: "var(--dark-selected)",
            }}
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
