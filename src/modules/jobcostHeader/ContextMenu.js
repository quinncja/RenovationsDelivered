import React from "react";

const ContextMenu = React.forwardRef(
  ({ x, y, onDelete, onViewAllTime, onViewByYear }, ref) => {
    const style = {
      position: "fixed",
      top: y,
      left: x,
      zIndex: 1000,
    };

    return (
      <div ref={ref} style={style} className="context-menu">
        <button onClick={onViewAllTime} className="project-button">
          View All Time
        </button>
        <button onClick={onViewByYear} className="project-button">
          View By Year
        </button>
        <div className="context-hl" />
        <button onClick={onDelete} className="project-button">
          Delete
        </button>
      </div>
    );
  },
);

export default ContextMenu;
