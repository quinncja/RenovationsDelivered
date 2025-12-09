import React, { useState } from "react";
import { dollarFormatter } from "@shared/utils/functions";
import { calculateTotalSum } from "@shared/utils/functions";

function BudgetBar({ budget, costItems, color }) {
  const { posted, committed } = costItems;
  const postedSum = calculateTotalSum(posted);
  const committedSum = calculateTotalSum(committed);
  const spent = postedSum + committedSum;
  const actualCommittedAmount = committedSum;

  const remainder = budget - spent;
  const postedPercent = (postedSum / budget) * 100;
  const actualCommittedPercent = (actualCommittedAmount / budget) * 100;

  const [tooltip, setTooltip] = useState({
    show: false,
    content: "",
    x: 0,
    y: 0,
  });

  const handleMouseMove = (type, amount, percent, event) => {
    const parentRect = event.currentTarget.parentElement.getBoundingClientRect();
    const relativeX = event.clientX - parentRect.left;
    
    setTooltip({
      show: true,
      content: `${type}: ${dollarFormatter(amount)} ${isFinite(percent) ? `• ${percent.toFixed(1)}% of budget` : ""}`,
      x: relativeX,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, content: "", x: 0, y: 0 });
  };

  return (
    <>
        <div
          className="breakdown-progress-bar"
          style={{ position: "relative" }}
        >
          {tooltip.show && (
            <div
              style={{
                position: "absolute",
                bottom: "calc(100% + 8px)",
                left: `${tooltip.x}px`,
                transform: "translateX(-50%)",
                background: "var(--popover-dark)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid var(--fancy-border)",
                color: "white",
                padding: "12px 16px",
                borderRadius: "6px",
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
                    height: "15px",
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
                  onMouseMove={(e) =>
                    handleMouseMove("Invoiced", postedSum, postedPercent, e)
                  }
                  onMouseLeave={handleMouseLeave}
                />
              )}

              {actualCommittedAmount > 0 && (
                <div
                  style={{
                    height: "15px",
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
                  onMouseMove={(e) =>
                    handleMouseMove(
                      "Committed",
                      actualCommittedAmount,
                      actualCommittedPercent,
                      e
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              )}

              <div
                style={{
                  height: "15px",
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
                    height: "15px",
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
                  onMouseMove={(e) =>
                    handleMouseMove("Invoiced", postedSum, postedPercent, e)
                  }
                  onMouseLeave={handleMouseLeave}
                />
              )}

              {actualCommittedAmount > 0 && (
                <div
                  style={{
                    height: "15px",
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
                  onMouseMove={(e) =>
                    handleMouseMove(
                      "Committed",
                      actualCommittedAmount,
                      actualCommittedPercent,
                      e
                    )
                  }
                  onMouseLeave={handleMouseLeave}
                />
              )}

              <div
                style={{
                  height: "15px",
                  borderRadius: "15px",
                  width: "100%",
                  background: "var(--darker)",
                  position: "relative",
                }}
              />
            </>
          )}
        </div>
    </>
  );
}

export default BudgetBar;