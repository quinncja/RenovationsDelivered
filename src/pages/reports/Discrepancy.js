import { missingSvg, openSvg, wrongSvg } from "business/svg";
import { useState } from "react";

function Discrepancy(props) {
  const { item } = props;
  const { _id, job_name, jobnum, missing, open, wrong } = item;

  const [tooltip, setTooltip] = useState(null);

  const handleClick = (e, value, type) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value).then(() => {
      setTooltip({ x: e.clientX, y: e.clientY, message: ` ${type} copied` });

      setTimeout(() => {
        setTooltip(null);
      }, 1000);
    });
  };

  const svgMap = {
    Wrong: wrongSvg(),
    Missing: missingSvg(),
    Open: openSvg(),
  };

  const wrongBody = (items) => {
    return (
      <div className="discrepancy-body">
        <div className="discrepancy-body-left">{svgMap["Wrong"]}</div>
        <div className="discrepancy-body-right">
          <div className="home-widget-title hwt-strong">
            {" "}
            {items.length} Wrong field{items.length > 1 && "s"}{" "}
          </div>
          <div className="body-items">
            {items.map((item) => {
              return <div className="home-widget-title"> • {item}</div>;
            })}
          </div>
        </div>
      </div>
    );
  };
  const missingBody = (items) => {
    return (
      <div className="discrepancy-body">
        <div className="discrepancy-body-left">{svgMap["Missing"]}</div>
        <div className="discrepancy-body-right">
          <div className="home-widget-title hwt-strong">
            {" "}
            {items.length} Missing field{items.length > 1 && "s"}{" "}
          </div>
          <div className="body-items">
            {items.map((item) => {
              return <div className="home-widget-title"> • {item}</div>;
            })}
          </div>
        </div>
      </div>
    );
  };
  const openBody = (items) => {
    return (
      <div className="discrepancy-body">
        <div className="discrepancy-body-left">{svgMap["Open"]}</div>
        <div className="discrepancy-body-right">
          <div className="home-widget-title hwt-strong">
            {" "}
            {items.length} Open PO{items.length > 1 && "s"}{" "}
          </div>
          <div className="body-items">
            {items.map((item) => {
              return (
                <div
                  className="home-widget-title copy-btn"
                  onClick={(e) => handleClick(e, item, "PO number")}
                  key={`${_id}-${item}`}
                >
                  {" "}
                  • {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="cost-item disc-item">
        <div className="cost-body disc-body">
          <h2
            className="home-widget-title copy-btn hwt-strong"
            onClick={(e) => handleClick(e, jobnum, "Job number")}
          >
            {" "}
            {job_name}{" "}
          </h2>
          <div className="disc-bodies">
            {wrong.length > 0 && wrongBody(wrong)}
            {missing.length > 0 && missingBody(missing)}
            {open.length > 0 && openBody(open)}
          </div>
        </div>
      </div>
      {tooltip && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y - 10,
            transform: "translateX(-50%) translateY(-100%)",
            background: "var(--primary)",
            color: "var(--white)",
            padding: "10px 10px",
            borderRadius: "4px",
            fontSize: "14px",
            pointerEvents: "none",
            zIndex: "100",
          }}
        >
          {tooltip.message}
        </div>
      )}
    </>
  );
}

export default Discrepancy;
