import { useEffect, useRef } from "react";
import ClientSelector from "./ClientSelector";
import PhaseSelector from "./PhaseSelector";
import ProjectManagerSelector from "./ProjectManagerSelector";
import ProjectSelector from "./ProjectSelector";
import ProjectStatus from "./ProjectStatus";
import StateSelector from "./StateSelector";
import YearSelector from "./YearSelector";
import { close } from "@assets/icons/svgs";
import { useJobcostContext } from "@features/jobcost/context/JobcostContext";

function Header({ setIsVisible }) {
  const headerRef = useRef(null);
  const { isEmpty, clearPageModifiers } = useJobcostContext();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-50px 0px 0px 0px",
      },
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        // eslint-disable-next-line
        observer.unobserve(headerRef.current);
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={headerRef} className="job-cost-header">
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
        <ProjectSelector />
        <YearSelector />
        <PhaseSelector />
        <ClientSelector />
        <StateSelector />
        <ProjectManagerSelector />
        {!isEmpty && (
          <button
            onClick={clearPageModifiers}
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
