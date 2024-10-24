import React, { useState, useEffect } from "react";
import { switchSvg } from "business/svg";
import useIsAdmin from "utils/hooks/useIsAdmin";
import { Modifiers } from "./Modifiers";
import ProjectTabs from "./ProjectTabs";

function JobCostHeader() {
  const isAdmin = useIsAdmin();
  const [showModifiers, setShowModifiers] = useState(isAdmin);

  useEffect(() => {
    if (!isAdmin) {
      setShowModifiers(false);
    }
  }, [isAdmin]);

  const handleSwitch = () => {
    setShowModifiers((prev) => !prev);
  };

  return (
    <div className="job-cost-header">
      {isAdmin && (
        <div className="switch-button-container">
          <button
            className="project-button"
            style={{ paddingBlock: "0px", paddingInline: "5px" }}
            onClick={handleSwitch}
          >
            {switchSvg()}
          </button>
        </div>
      )}
      {isAdmin && showModifiers ? (
        <Modifiers />
      ) : (
        <ProjectTabs isAdmin={isAdmin} />
      )}
    </div>
  );
}

export default JobCostHeader;
