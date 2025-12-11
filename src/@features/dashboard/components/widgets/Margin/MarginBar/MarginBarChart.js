import { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { displayMargin, getMarginClass, phaseToFullMonth } from "@shared/utils/functions";
import {
  dollarFormatter,
  phaseNumToMonth,
  phaseToShortMonth,
} from "@shared/utils/functions";
import { useDashboard } from "@features/dashboard/context/DashboardContext";

function MarginBarChart() {
  const [hoveredId, setHoveredId] = useState(null);
  const id = "marginPerformance";
  const { getWidgetDataById } = useDashboard();
  const data = getWidgetDataById(id);

  if(!data) return "";
  const allMonths = [];
  for (let i = 1; i <= 12; i++) {
    const monthData = data.find((item) => item.month === i);
    if (monthData) {
      allMonths.push({
        month: i,
        margin: monthData.margin_percentage,
        revenue: monthData.revenue,
        material: monthData.material,
        labor: monthData.labor,
        subcontractors: monthData.subcontractors,
        wtpm: monthData.wtpm,
        total_expenses: monthData.total_expenses,
        gross_profit: monthData.gross_profit,
        hasData: true,
        hoverValue: 100,
      });
    } else {
      allMonths.push({
        month: i,
        margin: 0,
        revenue: 0,
        material: 0,
        labor: 0,
        subcontractors: 0,
        wtpm: 0,
        total_expenses: 0,
        gross_profit: 0,
        hasData: false,
        hoverValue: 100,
      });
    }
  }

  const actualMargins = allMonths
    .filter((item) => item.hasData)
    .map((item) => item.margin);
  const maxMargin = actualMargins.length > 0 ? Math.max(...actualMargins) : 25;
  const minMargin = actualMargins.length > 0 ? Math.min(...actualMargins) : 0;

  const calculateChartBounds = (min, max) => {
    const range = max - min;
    const padding = Math.max(range * 0.1, 2);
    const paddedMin = min - padding;
    const paddedMax = max + padding;
    const chartMin = Math.floor(paddedMin / 5) * 5;
    const chartMax = Math.ceil(paddedMax / 5) * 5;
    return { chartMin, chartMax };
  };

  const { chartMin, chartMax } = calculateChartBounds(minMargin, maxMargin);
  const chartRange = chartMax - chartMin;

  const getBarColor = (margin) => {
    if (margin >= 20) return "#28a745";
    if (margin >= 17) return "#e6c935";
    else return "#e6204a";
  };

  const CustomBarLayer = ({ bars }) => {
    return (
      <g>
        {bars.map((bar) => {
          const monthData = allMonths.find(
            (m) => m.month === parseInt(bar.data.indexValue)
          );

          if (!monthData || !monthData.hasData) {
            return null;
          }

          const zeroLinePercent = (0 - chartMin) / chartRange;
          const zeroLineY = (bar.y + bar.height * (1 - zeroLinePercent)) + (monthData.margin > 0 ? 0 : 1);          const marginFromZero = monthData.margin;
          const barHeightPercent = Math.abs(marginFromZero) / chartRange;
          const actualBarHeight = bar.height * barHeightPercent;
          const actualBarY =
            marginFromZero >= 0 ? zeroLineY - actualBarHeight : zeroLineY;

          return (
            <g key={`margin-bar-${bar.data.indexValue}`}>
              {monthData.margin >= 0 ? (
                <path
                  d={`
                    M ${bar.x + 3} ${actualBarY}
                    L ${bar.x + bar.width - 3} ${actualBarY}
                    Q ${bar.x + bar.width} ${actualBarY} ${bar.x + bar.width} ${actualBarY + 3}
                    L ${bar.x + bar.width} ${actualBarY + actualBarHeight}
                    L ${bar.x} ${actualBarY + actualBarHeight}
                    L ${bar.x} ${actualBarY + 3}
                    Q ${bar.x} ${actualBarY} ${bar.x + 3} ${actualBarY}
                    Z
                  `}
                  fill={getBarColor(monthData.margin)}
                  style={{ pointerEvents: "none" }}
                />
              ) : (
                <path
                  d={`
                    M ${bar.x} ${actualBarY}
                    L ${bar.x + bar.width} ${actualBarY}
                    L ${bar.x + bar.width} ${actualBarY + actualBarHeight - 3}
                    Q ${bar.x + bar.width} ${actualBarY + actualBarHeight} ${bar.x + bar.width - 3} ${actualBarY + actualBarHeight}
                    L ${bar.x + 3} ${actualBarY + actualBarHeight}
                    Q ${bar.x} ${actualBarY + actualBarHeight} ${bar.x} ${actualBarY + actualBarHeight - 3}
                    Z
                  `}
                  fill={getBarColor(monthData.margin)}
                  style={{ pointerEvents: "none" }}
                />
              )}
              {monthData.margin !== 0 && actualBarHeight > 15 && (
                <text
                  x={bar.x + bar.width / 2}
                  y={actualBarY + actualBarHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="600"
                  style={{ pointerEvents: "none" }}
                >
                  {Math.round(monthData.margin)}%
                </text>
              )}
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <ResponsiveBar
      data={allMonths}
      keys={["hoverValue"]}
      indexBy="month"
      margin={{ top: 15, right: 35, bottom: 35, left: 55 }}
      padding={0.25}
      valueScale={{ type: "linear", min: 0, max: 100 }}
      indexScale={{ type: "band", round: true }}
      colors={(bar) =>
        hoveredId === bar.indexValue ? "#191f27" : "var(--solid-dark)"
      }
      borderWidth={0}
      borderRadius={0}
      innerPadding={2}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 8,
        format: (value) => phaseToShortMonth(value),
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        tickValues: 5,
        format: (value) =>
          `${Math.round((value / 100) * chartRange + chartMin)}%`,
      }}
      layers={["bars", "grid", "axes", "markers", CustomBarLayer]}
      markers={[
        ...(chartMin < 0
          ? [
              {
                axis: "y",
                value: ((0 - chartMin) / chartRange) * 100,
                lineStyle: {
                  stroke: "#ededed98",
                  opacity: 0.8,
                  strokeWidth: 1,
                  pointerEvents: "none",
                },
                legendOrientation: "horizontal",
                legendPosition: "top-left",
                textStyle: {
                  fill: "#666666",
                  fontSize: 11,
                  fontWeight: 600,
                },
              },
            ]
          : []),
      ]}
      enableGridX={false}
      enableGridY={true}
      gridYValues={5}
      enableLabel={false}
      onMouseEnter={(data, event) => {
        setHoveredId(data.indexValue);
      }}
      onMouseLeave={() => {
        setHoveredId(null);
      }}
      theme={{
        background: "transparent",
        grid: {
          line: {
            stroke: "#acadae",
            pointerEvents: "none",
            strokeOpacity: 0.3,
          },
        },
        axis: {
          ticks: {
            line: {
              strokeWidth: 1,
              stroke: "#acadae",
            },
            text: {
              fontSize: 12,
              fill: "#acadae",
              fontWeight: "500",
            },
          },
          legend: {
            text: {
              fontSize: 14,
              fontWeight: 600,
              fill: "#acadae",
            },
          },
        },
        labels: {
          text: {
            fontSize: 12,
            fontWeight: "600",
          },
        },
      }}
      tooltip={({ indexValue }) => {
        const currentMonth = allMonths.find(
          (m) => m.month === parseInt(indexValue)
        );

        if (!currentMonth?.hasData) {
          return (
            <div className="tooltip">
              <h4 style={{marginBottom: "4px" }}>
                {phaseNumToMonth(indexValue)}
              </h4>
              <div
                style={{ color: "#8b949e", fontWeight: 500, fontSize: "12px" }}
              >
                No data available
              </div>
            </div>
          );
        }

        const marginValue = currentMonth.margin;
        const marginAmount = currentMonth.gross_profit;

        const currentIndex = allMonths.findIndex(
          (m) => m.month === parseInt(indexValue)
        );
        let marginChange = null;
        let marginChangeColor = "#ffffff";

        for (let i = currentIndex - 1; i >= 0; i--) {
          if (allMonths[i].hasData) {
            marginChange = marginValue - allMonths[i].margin;
            marginChangeColor = marginChange >= 0 ? "#28a745" : "#e6204a";
            break;
          }
        }

        return (
          <div className="tooltip">
            <h4 style={{ marginBottom: "8px" }}>
              {phaseToFullMonth(indexValue)}
            </h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span style={{ color: "#afbac7ff", fontSize: "12px" }}>
                  Revenue
                </span>
                <span style={{ color: "white", fontWeight: 600 }}>
                  {dollarFormatter(currentMonth.revenue)}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span style={{ color: "#afbac7ff", fontSize: "12px" }}>
                  Expenses
                </span>
                <span style={{ color: "white", fontWeight: 600 }}>
                  {dollarFormatter(currentMonth.total_expenses)}
                </span>
              </div>

              <div
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    borderTop: "1px solid var(--fancy-border)",
                    paddingTop: "5px",
                    marginTop: '2px'
                  }}
                >
                  <span style={{ color: "#afbac7ff", fontSize: "12px" }}>
                    Gross Profit
                  </span>
                  <span style={{ color: marginAmount > 0 ? "var(--green)" : "var(--red)",  fontWeight: 600 }}>
                    {dollarFormatter(marginAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ fontWeight: 600 }}>Margin</span>
              <span
                className={`${getMarginClass(marginValue)}`}
                style={{ fontWeight: 700, fontSize: "16px" }}
              >
                {displayMargin(marginValue)}
              </span>
            </div>

            {marginChange !== null && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  fontSize: "12px",
                  fontWeight: 600,
                  marginTop: "8px",
                }}
              >
                <div
                  style={{
                    color: marginChangeColor,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>{marginChange >= 0 ? "↗" : "↘"}</span>
                  <span>
                    {marginChange >= 0 ? "+" : ""}
                    {marginChange.toFixed(1)}% from previous
                  </span>
                </div>
              </div>
            )}

            {marginChange === null && (
              <div
                style={{
                  color: "#8b949e",
                  fontWeight: 500,
                  fontSize: "12px",
                  marginTop: "8px",
                }}
              >
                First month with data
              </div>
            )}
          </div>
        );
      }}
      animate={false}
      motionConfig="gentle"
    />
  );
}

export default MarginBarChart;