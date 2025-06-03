import { dataValidationObjectList } from "pages/dashboardHome/widgets/DataValidation/dataValidationObjectList";
import { destructureJobNumber, getBaseJobName } from "utils/formatters";
import { useState } from "react";

function DataValidationPage({ data, id }) {
  const { widgetData, homeData } = data || {};
  const hasLoaded = widgetData && homeData;
  const obj = dataValidationObjectList.find((item) => item.id === id);

  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const copyJobNumber = async (jobNumber, event) => {
    try {
      await navigator.clipboard.writeText(jobNumber);
      setMousePosition({ x: event.clientX, y: event.clientY });
      setShowCopyNotification(true);
      setTimeout(() => {
        setShowCopyNotification(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy job number:", err);
    }
  };

  const renderHeader = () => {
    if (!hasLoaded)
      return (
        <div
          className="validation-header"
          style={{ height: "101px", boxSizing: "border-box" }}
        >
          <div className="loading-widget" />
        </div>
      );
    return (
      <div className="validation-header ">
        <div
          className="dv-card-header"
          style={{ marginBottom: "0px", alignItems: "center" }}
        >
          <div
            className={`status-indicator status-indicator-bigger ${obj.className}`}
          ></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              className="dv-card-value"
              style={{ marginTop: "0px", fontSize: "42px" }}
            >
              {widgetData[0][obj.accessor]}
            </div>
            <h4> {obj.subtitle} </h4>
          </div>
        </div>
      </div>
    );
  };

  const items = homeData
    ? homeData.filter((item) => item.category === obj.accessor)
    : null;

  const renderItem = (item) => {
    const { phase, year } = destructureJobNumber(item.JobNumber);

    return (
      <div className="validation-item">
        <div
          className="copy-dv-btn clickable-widget"
          style={{ display: "flex", flexDirection: "column" }}
          onClick={(e) => copyJobNumber(item.JobNumber, e)}
        >
          <h4>
            {" "}
            <span style={{fontWeight: "600", color: "white"}}> {getBaseJobName(item.jobnme)}{" "} </span>
            <span
              style={{
                fontWeight: "500",
                fontColor: "var(--secondary-font)",
                fontSize: "14px",
                opacity: 0.9,
              }}
            >
              {" "}
              P{phase} {year}{" "}
            </span>{" "}
          </h4>
          <h4> {item.JobNumber} </h4>
        </div>
        <div
          className="left-border"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <h5> Details </h5>
          <h4 style={{ color: "white" }}> {item.detail} </h4>
        </div>
      </div>
    );
  };

  const renderItems = (items) => {
    if (!items)
      return (
        <div
          className="validation-body"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "150px",
          }}
        >
          <div className="loading-widget"> </div>
        </div>
      );
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        {items.map((item) => renderItem(item))}
      </div>
    );
  };

  return (
    <>
      {renderHeader()}
      {renderItems(items)}

      {showCopyNotification && (
        <div
          style={{
            position: "fixed",
            top: `${mousePosition.y - 40}px`,
            left: `${mousePosition.x - 75}px`,
            backgroundColor: "#28a745",
            color: "white",
            padding: "8px 12px",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
            fontSize: "12px",
            fontWeight: "500",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          Copied job number!
        </div>
      )}
    </>
  );
}

export default DataValidationPage;
