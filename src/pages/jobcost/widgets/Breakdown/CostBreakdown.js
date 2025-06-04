import React, { useState } from "react";
import { dollarFormatter } from "utils/formatters";
import { calculateTotalSum } from "utils/funcs";

export default function CostBreakdown({
  budget,
  costItems,
  color,
}) {
  const { posted, committed } = costItems;
  const postedSum = calculateTotalSum(posted);
  const committedSum = calculateTotalSum(committed);
  const spent = postedSum + committedSum;
  const actualCommittedAmount = committedSum;

  const remainder = budget - spent;
  const remainderText = remainder > 0 ? "remaining" : "over budget";
  const utilizationRate = (spent / budget) * 100;
  const postedPercent = (postedSum / budget) * 100;
  const actualCommittedPercent = (actualCommittedAmount / budget) * 100;

  const [tooltip, setTooltip] = useState({
    show: false,
    content: "",
    x: 0,
    y: 0,
  });

  const handleMouseEnter = (type, amount, percent) => {
    setTooltip({
      show: true,
      content: `${type}: ${dollarFormatter(amount)} ${isFinite(percent) ? `• ${percent.toFixed(1)}% of budget` : ""}`,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, content: "", x: 0, y: 0 });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          paddingInline: "25px",
          paddingTop: "15px",
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
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "2px",
            }}
          >
            <h2>{dollarFormatter(spent || 0)}</h2>
            <h4>
              of {dollarFormatter(budget || 0)}{" "}
              {utilizationRate != null && isFinite(utilizationRate)
                ? ` • ${utilizationRate.toFixed(0)}% utilized`
                : ""}
            </h4>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "2px",
            }}
          >
            <h3>{dollarFormatter(Math.abs(remainder) || 0)}</h3>
            <h4 className={remainder < 0 ? "over" : ""}>{remainderText}</h4>
          </div>
        </div>

        <div
          className="breakdown-progress-bar"
          style={{ position: "relative" }}
        >
          {tooltip.show && (
            <div
              style={{
                position: "absolute",
                top: 0,
                transform: "translateY(50%) translateX(55%)",
                background: "var(--terciary)",
                color: "white",
                padding: "8px 12px",
                borderRadius: "2px",
                fontSize: "14px",
                fontWeight: "500",
                zIndex: 1000,
                pointerEvents: "none",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              {tooltip.content}
            </div>
          )}
          {spent > budget ? (
            <>
              {postedSum > 0 && (
                <div
                  style={{
                    height: "8px",
                    borderRadius:
                      actualCommittedAmount > 0 ? "15px 0px 0px 15px" : "15px",
                    width: `${(postedSum / spent) * 100}%`,
                    background: "var(--red)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    cursor: "pointer",
                    zIndex: 1,
                  }}
                  onMouseEnter={() =>
                    handleMouseEnter("Invoiced", postedSum, postedPercent)
                  }
                  onMouseLeave={handleMouseLeave}
                />
              )}

              {actualCommittedAmount > 0 && (
                <div
                  style={{
                    height: "8px",
                    borderRadius: postedSum > 0 ? "0px 15px 15px 0px" : "15px",
                    width: `${(actualCommittedAmount / spent) * 100}%`,
                    background: `repeating-linear-gradient(
                      45deg,
                      var(--red),
                      var(--red) 4px,
                      rgba(255, 255, 255, 0.2) 4px,
                      rgba(255, 255, 255, 0.2) 8px
                    )`,
                    position: "absolute",
                    top: 0,
                    left: `${(postedSum / spent) * 100}%`,
                    cursor: "pointer",
                    zIndex: 2,
                  }}
                  onMouseEnter={() =>
                    handleMouseEnter(
                      "Committed",
                      actualCommittedAmount,
                      actualCommittedPercent,
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              )}

              <div
                style={{
                  height: "8px",
                  borderRadius: "15px",
                  width: "100%",
                  background: "var(--darker)",
                  position: "relative",
                }}
              />
            </>
          ) : (
            <>
              {postedSum > 0 && (
                <div
                  style={{
                    height: "8px",
                    borderRadius:
                      actualCommittedAmount > 0 ? "15px 0px 0px 15px" : "15px",
                    width: `${Math.min(postedPercent, 100)}%`,
                    background: color,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    cursor: "pointer",
                    zIndex: 1,
                  }}
                  onMouseEnter={() =>
                    handleMouseEnter("Invoiced", postedSum, postedPercent)
                  }
                  onMouseLeave={handleMouseLeave}
                />
              )}

              {actualCommittedAmount > 0 && (
                <div
                  style={{
                    height: "8px",
                    borderRadius: postedSum > 0 ? "0px 15px 15px 0px" : "15px",
                    width: `${Math.min(actualCommittedPercent, 100 - Math.min(postedPercent, 100))}%`,
                    background: `repeating-linear-gradient(
                      45deg,
                      ${color},
                      ${color} 4px,
                      rgba(255, 255, 255, 0.2) 4px,
                      rgba(255, 255, 255, 0.2) 8px
                    )`,
                    position: "absolute",
                    top: 0,
                    left: `${Math.min(postedPercent, 100)}%`,
                    cursor: "pointer",
                    zIndex: 2,
                  }}
                  onMouseEnter={() =>
                    handleMouseEnter(
                      "Committed",
                      actualCommittedAmount,
                      actualCommittedPercent,
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              )}

              <div
                style={{
                  height: "8px",
                  borderRadius: "15px",
                  width: "100%",
                  background: "var(--darker)",
                  position: "relative",
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
