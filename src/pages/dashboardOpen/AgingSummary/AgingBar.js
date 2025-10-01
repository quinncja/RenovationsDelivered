import React from "react";
import { dollarFormatter } from "utils/formatters";

export default function AgingBar({ max, current, color }) {
  const remainder = max - current;
  const remainderText = remainder > 0 ? "Remaining" : "Over";
  const utilizationRate = (current / max) * 100;

  const bar = () => {
    return (
      <div className="breakdown-progress-bar" style={{ position: "relative" }}>
        {current > 0 && (
          <div
            style={{
              height: "10px",
              borderRadius: "15px",
              width: `${(current / max) * 100}%`,
              background: color,
              position: "absolute",
              top: 0,
              left: 0,
              cursor: "pointer",
              zIndex: 1,
            }}
          />
        )}

        <div
          style={{
            height: "10px",
            borderRadius: "15px",
            width: "100%",
            background: "var(--darker)",
            position: "relative",
          }}
        />
      </div>
    );
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          paddingBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "2px",
            }}
          >
            <h4> Balance </h4>
            <div
              style={{ display: "flex", alignItems: "baseline", gap: "5px" }}
            >
              <h2>{dollarFormatter(current || 0)}</h2>
              <h5>
                {utilizationRate != null && isFinite(utilizationRate)
                  ? ` • ${utilizationRate.toFixed(0)}% Utilized`
                  : ""}
              </h5>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "2px",
            }}
          >
            <h4 className={remainder < 0 ? "Over" : ""}>{remainderText}</h4>
            <h3>{dollarFormatter(Math.abs(remainder) || 0)}</h3>
          </div>
        </div>
        {bar()}
      </div>
    </>
  );
}
