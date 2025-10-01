import { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { displayMargin, getMarginClass } from "utils/funcs";
import { dollarFormatter, yearPhaseToStr } from "utils/formatters";
import useIsAdmin from "utils/hooks/useIsAdmin";

function MarginBarChart({ phaseData, marginColor }) {
  const [hoveredId, setHoveredId] = useState(null);
  const isAdmin = useIsAdmin();

  if (phaseData.length === 0) return null;

  const maxMargin = Math.max(...phaseData.map((item) => item.value));
  const minMargin = Math.min(...phaseData.map((item) => item.value));

  const calculateChartBounds = (min, max) => {
    const range = max - min;
    const padding = Math.max(range * 0.1, 2);

    const paddedMin = min - padding;
    const paddedMax = max + padding;

    return {
      min: Math.floor(paddedMin / 5) * 5,
      max: Math.ceil(paddedMax / 5) * 5,
    };
  };

  const { min: chartMin, max: chartMax } = calculateChartBounds(
    minMargin,
    maxMargin,
  );

  const chartRange = chartMax - chartMin;

  const barData = phaseData.map((item) => ({
    phase: item.phase.toUpperCase(),
    margin: item.value,
    TotalContract: item.TotalContract,
    TotalCost: item.TotalCost,
    hasData: true,
    hoverValue: 100,
  }));

  const getBarColor = (margin) => {
    if (margin < 0) return "#e6204a";
    else if (margin > 25) return "#28a745";
    else if (margin > 20) return "#e6c935";
    else return "#ff7d35";
  };

  const getTickValues = () => {
    const totalPhases = phaseData.length;
    let step = 1;

    if (totalPhases > 25) {
      step = Math.ceil(totalPhases / 12);
    } else if (totalPhases > 15) {
      step = Math.ceil(totalPhases / 16);
    } else if (totalPhases > 10) {
      step = Math.ceil(totalPhases / 18);
    }

    return phaseData
      .filter((_, index) => index % step === 0)
      .map((item) => item.phase.toUpperCase());
  };

  const CustomBarLayer = ({ bars }) => {
    return (
      <g>
        {bars.map((bar) => {
          const phaseItem = barData.find(
            (p) => p.phase === bar.data.indexValue,
          );

          if (!phaseItem || !phaseItem.hasData) {
            return null;
          }

          const marginPercent = (phaseItem.margin - chartMin) / chartRange;
          const actualBarHeight = bar.height * marginPercent;
          const actualBarY = bar.y + bar.height - actualBarHeight;

          return (
            <g key={`margin-bar-${bar.data.indexValue}`}>
              <rect
                x={bar.x}
                y={actualBarY}
                width={bar.width}
                height={actualBarHeight}
                fill={getBarColor(phaseItem.margin)}
                rx={3}
                ry={3}
                style={{ pointerEvents: "none" }}
              />

              {actualBarHeight > 15 && bar.width > 25 && (
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
                  {Math.round(phaseItem.margin)}%
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
      data={barData}
      keys={["hoverValue"]}
      indexBy="phase"
      margin={{ top: 40, right: 15, bottom: 50, left: 40 }}
      padding={0.25}
      valueScale={{ type: "linear", min: 0, max: 100 }}
      indexScale={{ type: "band", round: true }}
      colors={(bar) =>
        hoveredId === bar.indexValue ? "#191f27" : "var(--dark)"
      }
      borderWidth={0}
      borderRadius={0}
      innerPadding={2}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 8,
        tickValues: getTickValues(),
        format: (value) => yearPhaseToStr(value),
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        tickValues: 5,
        format: (value) =>
          `${Math.round(chartMin + (value / 100) * chartRange)}%`,
      }}
      layers={["bars", "grid", "axes", "markers", CustomBarLayer]}
      markers={[
        {
          axis: "y",
          value: ((20 - chartMin) / chartRange) * 100,
          lineStyle: {
            stroke: "#acadae",
            opacity: 0.8,
            strokeWidth: 1,
            strokeDasharray: "4 2",
            pointerEvents: "none",
          },
          legendOrientation: "horizontal",
          legendPosition: "top-left",
          textStyle: {
            fill: "#28a745",
            fontSize: 11,
            fontWeight: 500,
          },
        },
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
      tooltip={({ indexValue, value, data: currentBarData }) => {
        const currentPhase = barData.find((p) => p.phase === indexValue);

        if (!currentPhase?.hasData) {
          return (
            <div className="tooltip">
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                {yearPhaseToStr(indexValue)}
              </div>
              <div
                style={{ color: "#8b949e", fontWeight: 500, fontSize: "12px" }}
              >
                No data available
              </div>
            </div>
          );
        }

        const marginValue = currentPhase.margin;
        const marginAmount =
          currentPhase.TotalContract - currentPhase.TotalCost;

        const currentIndex = phaseData.findIndex(
          (p) => p.phase.toUpperCase() === indexValue,
        );
        let marginChange = null;
        let marginChangeColor = "#ffffff";

        if (currentIndex > 0) {
          const previousPhaseData = phaseData[currentIndex - 1];
          marginChange = marginValue - previousPhaseData.value;
          marginChangeColor = marginChange >= 0 ? "#28a745" : "#e6204a";
        }

        return (
          <div className="tooltip">
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
              {yearPhaseToStr(indexValue)}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                marginBottom: "4px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "5px",
                }}
              >
                <span
                  className={`${getMarginClass(marginValue)}`}
                  style={{ fontWeight: 700, fontSize: "16px" }}
                >
                  {displayMargin(marginValue)}
                </span>
              </div>
              {isAdmin && (
                <h4 style={{ color: "white" }}>
                  {" "}
                  <span> {dollarFormatter(marginAmount)} </span> profit{" "}
                </h4>
              )}
            </div>
            {marginChange !== null && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  fontSize: "12px",
                  fontWeight: 600,
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
                }}
              >
                First phase
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
