import { useRef } from "react";
import ClientSelector from "./ClientSelector";
import PhaseSelector from "./PhaseSelector";
import ProjectManagerSelector from "./ProjectManagerSelector";
import ProjectStatus from "./ProjectStatus";
import StateSelector from "./StateSelector";
import YearSelector from "./YearSelector";
import { close } from "business/svg";
import { useProjectContext } from "context/ProjectContext";
import ProjectCount from "./ProjectCount";

function Header() {
  const headerRef = useRef(null);
  const { isEmpty, clearProjectQuery } = useProjectContext();

  return (
    <div ref={headerRef} className="job-cost-header">
      <ProjectCount/>
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
        <ProjectStatus />
        <YearSelector />
        <PhaseSelector />
        <ClientSelector />
        <StateSelector />
        <ProjectManagerSelector />
        {!isEmpty && (
          <button
            onClick={clearProjectQuery}
            title="Clear values"
            className="x-button-header clickable-widget header-button"
            style={{ marginLeft: "auto", width: "50px", height: "50px" }}
          >
            {close()}
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
