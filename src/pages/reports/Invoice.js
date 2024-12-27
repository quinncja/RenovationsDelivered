import { useState } from "react";

const { dollarFormatter } = require("utils/formatters");

function Invoice(props) {
  const { item } = props;
  const { job_name, jobnum, contracted, invoiced } = item;

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

  const obj = {
    text:
      Number(invoiced) > Number(contracted)
        ? "Over invoiced"
        : "Under invoiced",
    classname: Number(invoiced) > Number(contracted) ? "over" : "under",
  };

  return (
    <>
      <div className="cost-item disc-item">
        <div className="cost-body invoice-body">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              textAlign: "left",
            }}
          >
            <h2
              className="home-widget-title copy-btn hwt-strong"
              onClick={(e) => handleClick(e, jobnum, "Job number")}
            >
              {" "}
              {job_name}{" "}
            </h2>
            <div className={obj.classname} style={{ fontWeight: "500" }}>
              {" "}
              {obj.text}{" "}
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div className="invoice-totals">
              <div className="home-widget-title "> Contracted </div>
              <div className="home-widget-title hwt-strong">
                {dollarFormatter(contracted)}{" "}
              </div>
            </div>
            <div className="invoice-totals">
              <div className="home-widget-title "> Invoiced </div>
              <div className="home-widget-title hwt-strong">
                {dollarFormatter(invoiced)}{" "}
              </div>
            </div>
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

export default Invoice;
