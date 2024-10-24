import React, { useState, useRef, useEffect } from "react";
import ContextMenu from "./ContextMenu";
import { getBaseJobName } from "pages/openItem/transformData";

function ProjectTab({
  job,
  jobData,
  activeTab,
  onTabClick,
  onDelete,
  onViewAllTime,
  onViewByYear,
}) {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });
  const contextMenuRef = useRef(null);

  useEffect(() => {
    if (contextMenu.visible) {
      const handleClickOutside = (event) => {
        if (
          contextMenuRef.current &&
          !contextMenuRef.current.contains(event.target)
        ) {
          setContextMenu({ ...contextMenu, visible: false });
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [contextMenu]);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY });
  };

  return (
    <>
      <button
        className={`project-button ${activeTab ? "active-project-button" : ""}`}
        onClick={() => onTabClick(job, jobData, activeTab)}
        onContextMenu={handleContextMenu}
      >
        {getBaseJobName(jobData.jobnme)}
      </button>
      {contextMenu.visible && (
        <ContextMenu
          ref={contextMenuRef}
          x={contextMenu.x}
          y={contextMenu.y}
          onDelete={() => {
            onDelete(job);
            setContextMenu({ ...contextMenu, visible: false });
          }}
          onViewAllTime={() => {
            onViewAllTime(job);
            setContextMenu({ ...contextMenu, visible: false });
          }}
          onViewByYear={() => {
            onViewByYear(job, jobData);
            setContextMenu({ ...contextMenu, visible: false });
          }}
        />
      )}
    </>
  );
}

export default ProjectTab;
