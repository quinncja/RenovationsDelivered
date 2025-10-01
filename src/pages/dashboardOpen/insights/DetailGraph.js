import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { dollarFormatter, formatNumberShort } from "utils/formatters";

function DetailGraph({ data, type, color = "#28a745" }) {
  const chartData = [
    {
      id: "Contracted",
      data: data.map((item) => ({
        x: item.x.toString(),
        y: item.y,
        year: item.x,
        value: item.y,
      })),
    },
  ];

  const CustomSliceTooltip = ({ slice }) => {
    const point = slice.points[0];
    const { year, value } = point.data;

    let growth = null;
    let growthColor = "#8b949e";

    if (data.length >= 2) {
      const currentIndex = data.findIndex((item) => item.x === year);
      if (currentIndex > 0) {
        const currentValue = value;
        const previousValue = data[currentIndex - 1].y;
        const growthPercent =
          ((currentValue - previousValue) / previousValue) * 100;
        growth = growthPercent;
        growthColor = growthPercent >= 0 ? "var(--green)" : "var(--red)";
      }
    }

    return (
      <div className="tooltip" style={{ minWidth: "220px" }}>
        <h4>{year}</h4>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <h4 style={{ color: "#ffffff" }}>Contracted</h4>
          <h3 style={{ fontWeight: 600, color: color }}>
            {dollarFormatter(value)}
          </h3>
        </div>

        {growth !== null && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              width: "100%",
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
              <h4>YoY Growth:</h4>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <h4 style={{ color: growthColor }}>
                  {growth >= 0 ? "↗" : "↘"}
                </h4>
                <h4
                  style={{
                    color: growthColor,
                  }}
                >
                  {growth > 0 ? "+" : ""}
                  {growth.toFixed(1)}%
                </h4>
              </div>
            </div>
          </div>
        )}
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
        min: 0,
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
      pointBorderColor={color}
      pointLabelYOffset={-12}
      useMesh={true}
      colors={[color]}
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
  );
}

export default DetailGraph;
