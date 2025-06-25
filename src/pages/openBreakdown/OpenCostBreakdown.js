import { useState } from "react";
import { dollarFormatter, percentFomatter } from "utils/formatters";
import {
  calculateTotalSum,
  getBreakdownIconByType,
  getIconBackground,
  getStatusColor,
} from "utils/funcs";

function OpenCostBreakdown(props) {
  const { data, type } = props;
  const [tooltip, setTooltip] = useState({
    show: false,
    content: "",
    x: 0,
    y: 0,
  });

  if (!data) return <div className="open-breakdown-cost loading-widget" />;
  const { budget, costItems } = data;
  const { posted, committed } = costItems;

  const postedSum = calculateTotalSum(posted);
  const committedSum = calculateTotalSum(committed);

  const spent = postedSum + committedSum;
  const actualCommittedAmount = committedSum;

  const color = getStatusColor(budget, spent);
  const background = getIconBackground(budget, spent);

  const remainder = budget - spent;
  const budgetText = remainder > 0 ? "Under Budget" : "Over Budget";
  const remainderText = remainder > 0 ? "Remaining" : "Over budget";
  const utilizationRate = (spent / budget) * 100;
  const postedPercent = (postedSum / budget) * 100;
  const actualCommittedPercent = (actualCommittedAmount / budget) * 100;
  const remainingPercent = (remainder / budget) * 100;

  const handleMouseEnter = (type, amount, percent) => {
    setTooltip({
      show: true,
      content: `${type}: ${dollarFormatter(amount)} ${isFinite(percent) ? `• ${percent.toFixed(1)}% of budget` : ""}`,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, content: "", x: 0, y: 0 });
  };

  const icon = getBreakdownIconByType(type);

  const infoBoxes = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          flexGrow: "1",
          alignItems: "flex-end",
          boxSizing: "border-box",
          justifyContent: "flex-start",
          gap: "0px",
          overflowX: "scroll",
          paddingInline: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            paddingRight: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div
              className={`breakdown-icon-box breakdown-icon-box-bigger breakdown-icon-box-white}`}
              style={{ background: background }}
            >
              {" "}
              {icon}{" "}
            </div>
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                textAlign: "left",
                flexShrink: 0,
              }}
            >
              <h4>{type} Budget</h4>
              <h2 style={{ fontSize: "20px" }}>{dollarFormatter(budget)}</h2>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              border: `.5px solid ${color}`,
              background:
                remainder > 0
                  ? "rgba(40, 167, 69, 0.1)"
                  : "rgba(255, 71, 87, 0.1)",
              padding: "8px",
              paddingLeft: "10px",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "10px",
                backgroundColor: color,
              }}
            />
            <h4
              style={{
                fontSize: "10px",
                fontWeight: "600",
                color: color,
                textTransform: "uppercase",
              }}
            >
              {budgetText}
            </h4>
          </div>
        </div>

        <div
          className="jobcost-detail-box"
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <h4>Total Spent</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <h2 style={{ fontSize: "20px" }}>{dollarFormatter(spent)}</h2>
            <div className="jobcost-hl" />
            <h5 style={{ opacity: isFinite(utilizationRate) ? 1 : 0 }}>
              {percentFomatter(utilizationRate)} of budget
            </h5>
          </div>
        </div>
        <div
          className="jobcost-detail-box"
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <h4>Posted</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <h2 style={{ fontSize: "20px" }}>{dollarFormatter(postedSum)}</h2>
            <div className="jobcost-hl" />
            <h5 style={{ opacity: isFinite(utilizationRate) ? 1 : 0 }}>
              {percentFomatter(postedPercent)} of total spent
            </h5>
          </div>
        </div>
        <div
          className="jobcost-detail-box"
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <h4>Committed</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <h2 style={{ fontSize: "20px" }}>
              {dollarFormatter(actualCommittedAmount)}
            </h2>
            <div className="jobcost-hl" />
            <h5 style={{ opacity: isFinite(actualCommittedPercent) ? 1 : 0 }}>
              {percentFomatter(actualCommittedPercent)} of total spent
            </h5>
          </div>
        </div>
        <div
          className="jobcost-detail-box"
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
          }}
        >
          <h4>{remainderText}</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <h2 style={{ fontSize: "20px", color: color }}>
              {dollarFormatter(remainder)}
            </h2>
            <h5
              style={{
                opacity: isFinite(remainingPercent) ? 1 : 0,
                color: color,
              }}
            >
              {percentFomatter(remainingPercent)} of budget
            </h5>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="open-breakdown-cost" style={{position: 'relative'}}>
      {infoBoxes()}
      {tooltip.show && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            transform: "translateY(132%) translateX(0%)",
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
      <div
        className="breakdown-progress-bar open-progress-bar"
        style={{ position: "relative" }}
      >
        {spent > budget ? (
          <>
            {postedSum > 0 && (
              <div
                style={{
                  height: "12px",
                  borderRadius:
                    actualCommittedAmount > 0
                      ? "0px 0px 0px 5px"
                      : "0px 0px 0px 5px",
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
                  height: "12px",
                  borderRadius:
                    postedSum > 0 ? "0px 0px 5px 0px" : "0px 0px 0px 5px",
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
                height: "12px",
                borderRadius: "0px 15px 15px 0px",
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
                  height: "12px",
                  borderRadius:
                    actualCommittedAmount > 0
                      ? "0px 0px 0px 5px"
                      : "0px 15px 15px 5px",
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
                  height: "12px",
                  borderRadius:
                    postedSum > 0 ? "0px 15px 15px 0px" : "0px 15px 15px 5px",
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
                height: "12px",
                borderRadius: "0px 5px 5px 0px",
                width: "100%",
                background: "var(--darker)",
                position: "relative",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default OpenCostBreakdown;
