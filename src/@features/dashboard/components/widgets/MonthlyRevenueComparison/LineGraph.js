import React from "react";
import { ResponsiveLine } from "@nivo/line";
import {
  dollarFormatter,
  formatNumberShort,
  phaseNumToMonth,
  phaseToShortMonth,
} from "@shared/utils/functions";

function LineGraph({ data }) {
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  const currentYearData = data.filter((item) => item.year === currentYear);
  const lastYearData = data.filter((item) => item.year === lastYear);

  const chartData = [
    {
      id: `${lastYear}`,
      data: lastYearData
        .sort((a, b) => a.month - b.month)
        .map((item) => ({
          x: phaseToShortMonth(item.month),
          y: item.revenue,
          year: item.year,
          month: item.month,
          monthlyRevenue: item.monthly_revenue,
        })),
    },
    {
      id: `${currentYear}`,
      data: currentYearData
        .sort((a, b) => a.month - b.month)
        .map((item) => ({
          x: phaseToShortMonth(item.month),
          y: item.revenue,
          year: item.year,
          month: item.month,
          monthlyRevenue: item.monthly_revenue,
        })),
    },
  ].filter((series) => series.data.length > 0);

  const CustomSliceTooltip = ({ slice }) => {
    const points = slice.points;
    const currentYearPoint = points.find((p) => p.data.year === currentYear);
    const lastYearPoint = points.find((p) => p.data.year === lastYear);

    let monthlyGrowth = null;
    let growthColor = "#8b949e";

    if (currentYearPoint && lastYearPoint) {
      const currentMonthly = currentYearPoint.data.y;
      const previousMonthly = lastYearPoint.data.y;
      const monthlyGrowthPercent =
        ((currentMonthly - previousMonthly) / previousMonthly) * 100;

      monthlyGrowth = monthlyGrowthPercent;
      growthColor = monthlyGrowthPercent >= 0 ? "var(--green)" : "var(--red)";
    }

    return (
      <div className="tooltip" style={{ minWidth: "220px" }}>
        <h4>{phaseNumToMonth(points[0].data.month)}</h4>

        {currentYearPoint && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <h4 style={{ color: "#ffffff" }}>{currentYear}</h4>
            <h3 style={{ fontWeight: 600, color: "var(--green)" }}>
              {dollarFormatter(currentYearPoint.data.y)}
            </h3>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          {lastYearPoint && (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "baseline",
                paddingBottom: "4px",
              }}
            >
              <h4 style={{ color: "#ffffff" }}>{lastYear}</h4>
              <h3 style={{ fontWeight: 600, color: "#ffffff" }}>
                {dollarFormatter(lastYearPoint.data.y)}
              </h3>
            </div>
          )}

          {monthlyGrowth !== null && (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "4px",
              }}
            >
              <h4>Monthly Growth:</h4>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <h4 style={{ color: growthColor }}>
                  {monthlyGrowth >= 0 ? "↗" : "↘"}
                </h4>
                <h4 style={{ color: growthColor }}>
                  {monthlyGrowth > 0 ? "+" : ""}
                  {monthlyGrowth.toFixed(1)}%
                </h4>
              </div>
            </div>
          )}

          {monthlyGrowth === null && currentYearPoint && !lastYearPoint && (
            <div
              style={{
                color: "#8b949e",
                fontWeight: 500,
                fontSize: "12px",
                textAlign: "center",
                paddingTop: "4px",
              }}
            >
              No comparison data available
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
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
          format: (value) => `$${formatNumberShort(value)}`,
        }}
        enableSlices="x"
        tooltip={() => null}
        sliceTooltip={CustomSliceTooltip}
        pointSize={6}
        pointColor="#ffffff"
        pointBorderWidth={2}
        pointBorderColor={(point) => {
          const colors = ["#475569", "#28a745"];
          const index = chartData.findIndex(
            (series) => series.id === point.serieId,
          );
          return colors[index] || "#475569";
        }}
        pointLabelYOffset={-12}
        useMesh={true}
        colors={["#475569", "#28a745"]}
        lineWidth={3}
        enableArea={true}
        areaOpacity={0.2}
        areaBaselineValue={0}
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
      />
    </>
  );
}

export default LineGraph;
