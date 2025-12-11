import React from "react";
import { ResponsiveLine } from "@nivo/line";
import {
  formatNumberShort,
  phaseNumToMonth,
  phaseToShortMonth,
  displayMargin,
  getMarginClass,
  getMarginColor,
} from "@shared/utils/functions";
import { useDashboard } from "@features/dashboard/context/DashboardContext";

function MarginLineChart() {
  const id = "marginPerformance";
  const { getWidgetDataById, getOpenMonthFinances } = useDashboard();
  const data = getWidgetDataById(id);
  if(!data) return;

  const { openMonthIncome, openMonthOverUnder, openMonthPeriod, openMonthYear, openMonthSpent } = getOpenMonthFinances();

  const currentYear = new Date().getFullYear();

  const hasOpenMonthInData = data.some(
    item => item.month === openMonthPeriod
  );

  let processedData = [...data];
  if (!hasOpenMonthInData && openMonthIncome) {
    const openMonthRevenue = openMonthIncome + openMonthOverUnder;
    const openMonthProfit = openMonthRevenue - openMonthSpent;
    const openMonthMargin = openMonthRevenue !== 0 ? (openMonthProfit / openMonthRevenue) * 100 : 0;

    const previousMonths = data.filter(item => item.month < openMonthPeriod);
    const cumulativeRevenueBefore = previousMonths.reduce((sum, item) => sum + (item.revenue || 0), 0);
    const cumulativeExpensesBefore = previousMonths.reduce((sum, item) => sum + (item.total_expenses || 0), 0);
    const cumulativeProfitBefore = previousMonths.reduce((sum, item) => sum + (item.gross_profit || 0), 0);

    const cumulativeRevenue = cumulativeRevenueBefore + openMonthRevenue;
    const cumulativeExpenses = cumulativeExpensesBefore + openMonthSpent;
    const cumulativeProfit = cumulativeProfitBefore + openMonthProfit;
    const cumulativeMargin = cumulativeRevenue !== 0 ? (cumulativeProfit / cumulativeRevenue) * 100 : 0;

    processedData.push({
      month: openMonthPeriod,
      margin_percentage: openMonthMargin,
      cumulative_margin_percentage: cumulativeMargin,
      gross_profit: openMonthProfit,
      revenue: openMonthRevenue,
      total_expenses: openMonthSpent,
      cumulative_revenue: cumulativeRevenue,
      cumulative_expenses: cumulativeExpenses,
      cumulative_profit: cumulativeProfit,
    });
  }

  const chartData = [
    {
      id: `${currentYear}`,
      data: processedData
        .sort((a, b) => a.month - b.month)
        .map((item) => {
          const isOpenMonth = item.month === openMonthPeriod;
          
          return {
            x: phaseToShortMonth(item.month),
            y: item.cumulative_margin_percentage,
            month: item.month,
            monthlyMargin: item.margin_percentage,
            revenue: item.cumulative_revenue,
            expenses: item.cumulative_expenses,
            profit: item.cumulative_profit,
            hasOverUnder: isOpenMonth,
          };
        }),
    },
  ];

const ColoredBandsLayer = ({ series, xScale, yScale, innerHeight, innerWidth }) => {
  if (series.length === 0) return null;

  const getCatmullRomPoint = (p0, p1, p2, p3, t) => {
    const t2 = t * t;
    const t3 = t2 * t;
    
    return {
      x: 0.5 * (
        (2 * p1.x) +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
      ),
      y: 0.5 * (
        (2 * p1.y) +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
      )
    };
  };

  return (
    <defs>
      {series.map(({ id, data }) => {
        const points = data.map(d => ({
          x: xScale(d.data.x),
          y: yScale(d.data.y),
          yValue: d.data.y
        }));

        let pathD = '';
        
        for (let i = 0; i < points.length - 1; i++) {
          const p0 = i > 0 ? points[i - 1] : points[i];
          const p1 = points[i];
          const p2 = points[i + 1];
          const p3 = i < points.length - 2 ? points[i + 2] : points[i + 1];
          
          const samples = 50;
          
          for (let s = 0; s <= samples; s++) {
            const t = s / samples;
            const curvePoint = getCatmullRomPoint(p0, p1, p2, p3, t);
            
            if (i === 0 && s === 0) {
              pathD = `M ${curvePoint.x} ${curvePoint.y}`;
            } else {
              pathD += ` L ${curvePoint.x} ${curvePoint.y}`;
            }
          }
        }
        
        const lastPoint = points[points.length - 1];
        pathD += ` L ${lastPoint.x} ${innerHeight}`;
        pathD += ` L ${points[0].x} ${innerHeight}`;
        pathD += ` Z`;

        return (
          <clipPath key={`clip-${id}`} id={`clip-path-${id}`}>
            <path d={pathD} />
          </clipPath>
        );
      })}
    </defs>
  );
};

const ColoredLineLayer = ({ series, xScale, yScale }) => {
  const getCatmullRomPoint = (p0, p1, p2, p3, t) => {
    const t2 = t * t;
    const t3 = t2 * t;
    
    return {
      x: 0.5 * (
        (2 * p1.x) +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
      ),
      y: 0.5 * (
        (2 * p1.y) +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
      ),
      yValue: 0.5 * (
        (2 * p1.yValue) +
        (-p0.yValue + p2.yValue) * t +
        (2 * p0.yValue - 5 * p1.yValue + 4 * p2.yValue - p3.yValue) * t2 +
        (-p0.yValue + 3 * p1.yValue - 3 * p2.yValue + p3.yValue) * t3
      )
    };
  };

  return (
    <g>
      {series.map(({ id, data }) => {
        if (data.length < 2) return null;
        
        const points = data.map(d => ({
          x: xScale(d.data.x),
          y: yScale(d.data.y),
          yValue: d.data.y
        }));
        
        const allSegments = [];
        
        for (let i = 0; i < points.length - 1; i++) {
          const p0 = i > 0 ? points[i - 1] : points[i];
          const p1 = points[i];
          const p2 = points[i + 1];
          const p3 = i < points.length - 2 ? points[i + 2] : points[i + 1];
          
          const samples = 100; 
          let currentColor = null;
          let pathData = '';
          let segmentCount = 0;
          
          for (let s = 0; s <= samples; s++) {
            const t = s / samples;
            const curvePoint = getCatmullRomPoint(p0, p1, p2, p3, t);
            const color = getMarginColor(curvePoint.yValue);
            
            if (s === 0) {
              pathData = `M ${curvePoint.x} ${curvePoint.y}`;
              currentColor = color;
            } else if (color !== currentColor) {
              allSegments.push(
                <path
                  key={`${id}-seg-${i}-${segmentCount}`}
                  d={pathData}
                  fill="none"
                  stroke={currentColor}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pointerEvents: 'none' }}
                />
              );
              pathData = `M ${curvePoint.x} ${curvePoint.y}`;
              currentColor = color;
              segmentCount++;
            } else {
              pathData += ` L ${curvePoint.x} ${curvePoint.y}`;
            }
          }
          
          if (pathData) {
            allSegments.push(
              <path
                key={`${id}-seg-${i}-${segmentCount}`}
                d={pathData}
                fill="none"
                stroke={currentColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pointerEvents: 'none' }}
              />
            );
          }
        }
        
        return allSegments;
      })}
    </g>
  );
};

  const ColoredBandsContent = ({ series, xScale, yScale, innerHeight, innerWidth }) => {
    if (series.length === 0) return null;

    const yScaleMin = yScale.domain()[0];
    const yScaleMax = yScale.domain()[1];

    const thresholds = [
      { min: yScaleMin, max: 17, color: "var(--red)" },
      { min: 17, max: 20, color: "var(--yellow)" },
      { min: 20, max: yScaleMax, color: "var(--green)" }
    ];

    return (
      <g>
        {series.map(({ id }) => (
          <g key={`bands-${id}`} clipPath={`url(#clip-path-${id})`}>
            {thresholds.map((threshold, idx) => {
              const yTop = yScale(Math.min(threshold.max, yScaleMax));
              const yBottom = yScale(Math.max(threshold.min, yScaleMin));
              const height = yBottom - yTop;

              if (height <= 0) return null;

              return (
                <rect
                  key={`band-${id}-${idx}`}
                  x={0}
                  y={yTop}
                  width={innerWidth}
                  height={height}
                  fill={threshold.color}
                  fillOpacity={0.15}
                  style={{ pointerEvents: 'none' }}
                />
              );
            })}
          </g>
        ))}
      </g>
    );
  };


const CustomSliceTooltip = ({ slice }) => {
  const point = slice.points[0];
  
  const currentIndex = processedData
    .sort((a, b) => a.month - b.month)
    .findIndex((m) => m.month === point.data.month);
  
  let marginChange = null;
  let marginChangeColor = "#8b949e";

  if (currentIndex > 0) {
    const sortedData = processedData.sort((a, b) => a.month - b.month);
    const currentMargin = point.data.y;
    const previousMargin = sortedData[currentIndex - 1].cumulative_margin_percentage;
    const marginDifference = currentMargin - previousMargin;

    marginChange = marginDifference;
    marginChangeColor = marginDifference >= 0 ? "var(--green)" : "var(--red)";
  }

  return (
    <div className="tooltip" style={{ minWidth: "220px" }}>
      <h4>
        {phaseNumToMonth(point.data.month)}
        {point.data.hasOverUnder && (
          <span
            style={{
              fontSize: "10px",
              color: "#8b949e",
              marginLeft: "4px",
              fontWeight: 500,
            }}
          >
            (In Progress)
          </span>
        )}
      </h4>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <h4 style={{ color: "#ffffff" }}>Cumulative Margin</h4>
        <h3
          className={getMarginClass(point.data.y)}
          style={{ fontWeight: 600 }}
        >
          {displayMargin(point.data.y)}
        </h3>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          width: "100%",
        }}
      >
        {marginChange !== null && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              width: "100%",
              paddingTop: "4px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4>Change from Previous:</h4>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <h4 style={{ color: marginChangeColor }}>
                  {marginChange >= 0 ? "↗" : "↘"}
                </h4>
                <h4 style={{ color: marginChangeColor }}>
                  {marginChange > 0 ? "+" : ""}
                  {marginChange.toFixed(1)}pp
                </h4>
              </div>
            </div>
          </div>
        )}

        {marginChange === null && (
          <div
            style={{
              color: "#8b949e",
              fontWeight: 500,
              fontSize: "12px",
              textAlign: "center",
              paddingTop: "4px",
            }}
          >
            First month with data
          </div>
        )}
      </div>
    </div>
  );
};

  return (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 50, right: 35, bottom: 35, left: 65 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 12,
        tickRotation: 0,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        tickValues: 6,
        legendOffset: -40,
        legendPosition: "middle",
        format: (value) => `${value.toFixed(0)}%`,
      }}
      layers={[
        'grid',
        'markers',
        'axes',
        'slices',
        ColoredBandsLayer,
        ColoredBandsContent,
        ColoredLineLayer,
        'points',
        "crosshair",
        'mesh',
        'legends'
      ]}
      markers={[
      {
        axis: "y",
        value: 17,
        lineStyle: {
          stroke: "#ededed",
          strokeWidth: 1,
          strokeOpacity: 0.3,
        },
      },
      {
        axis: "y",
        value: 20,
        lineStyle: {
          stroke: "#ededed",
          strokeWidth: 1,
          strokeOpacity: 0.3,
        },
      },
    ]}
      enableSlices="x"
      tooltip={() => null}
      sliceTooltip={CustomSliceTooltip}
      pointSize={4}
      pointColor="#ffffff"
      pointBorderWidth={2}
      pointBorderColor={(point) => {
        const yValue = point.data?.y ?? point.y ?? 0;
        return getMarginColor(yValue);
      }}
      pointLabelYOffset={-12}
      useMesh={true}
      colors={["#28a745"]}
      lineWidth={2}
      curve="catmullRom"
      enableGridX={false}
      enableGridY={true}
      gridYValues={5}
      theme={{
        background: "transparent",
        text: {
          fontSize: 12,
          fill: "#586069",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        axis: {
          domain: {
            line: {
              stroke: "transparent",
              strokeWidth: 0,
            },
          },
          legend: {
            text: {
              fontSize: 13,
              fill: "#24292e",
              fontWeight: 500,
            },
          },
          ticks: {
            line: {
              strokeWidth: 1,
            },
            text: {
              fontSize: 12,
              fill: "#acadae",
              fontWeight: 500,
            },
          },
        },
        grid: {
          line: {
            stroke: "#acadae",
            strokeOpacity: 0.2,
          },
        },
        tooltip: {
          container: {
            zIndex: 9999,
          },
        },
        crosshair: {
          line: {
            stroke: "#acadae",
            strokeWidth: 1,
            strokeOpacity: 0.5,
          },
        },
      }}
      animate={true}
      motionConfig={{
        mass: 1,
        tension: 120,
        friction: 14,
        clamp: false,
        precision: 0.01,
        velocity: 0,
      }}
      enableCrosshair={true}
      crosshairType="x"
      pointSymbol={({ datum, size, borderWidth }) => {
        const isOverUnderPoint = datum.hasOverUnder;
        const pointColor = getMarginColor(datum.y);

        if (isOverUnderPoint) {
          return (
            <g>
              <circle
                className="pulse-ring-outer"
                r={8}
                fill="none"
                stroke={pointColor}
                strokeWidth={1}
                strokeOpacity={0.25}
                style={{
                  animation: "pulseOuter 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                }}
              />

              <circle
                className="pulse-ring-inner"
                r={6}
                fill={pointColor}
                fillOpacity={0.08}
                style={{
                  animation: "pulseInner 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                }}
              />

              <circle
                r={size / 2}
                fill="#ffffff"
                style={{
                  animation: "pulseCore 2.5s ease-in-out infinite",
                }}
              />

              <circle
                r={size / 2}
                fill="none"
                stroke="#ffffff"
                strokeWidth={borderWidth}
              />
            </g>
          );
        }

        return (
          <circle
            r={size / 2}
            fill={pointColor}
            stroke={pointColor}
            strokeWidth={borderWidth}
          />
        );
      }}
    />
  );
}

export default MarginLineChart;