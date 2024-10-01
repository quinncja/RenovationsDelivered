import { Line } from "@nivo/line";
import { phaseToMonth } from "utils/formatters";
import { useCSSVariable } from "utils/hooks/useCSSVariable";

function LineChart({ data, open, size, chartObj, chartProps, tooltip }) {
  const gridColor = useCSSVariable("--grid-color");
  let showLabel = true;
  const customTheme = {
    grid: {
      line: {
        stroke: gridColor,
        strokeWidth: 1,
        opacity: showLabel ? "1" : "0",
      },
    },
    axis: {
      ticks: {
        line: {
          stroke: "#999",
          strokeWidth: 1,
          opacity: showLabel ? "1" : "0",
        },
        text: {
          fill: "#999",
          opacity: showLabel ? "1" : "0",
        },
      },
    },
  };

  let margin = open
    ? { top: 5, right: 20, bottom: 50, left: 50 }
    : { top: 5, right: 70, bottom: 120, left: 40 };

  const axisLeft = open && showLabel ? chartObj.chartProps.axisLeft : false;
  const colors =
    chartObj.type === "Margin" ? "" : data.map((data) => data.color);

  if (!data) return <div style={{ margin: "auto" }}>No Data</div>;
  return (
    <Line
      {...chartProps}
      {...size}
      data={data}
      margin={margin}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
        tickRotation: -45,
        tickValues:
          data[0]?.data.length === 2
            ? data[0].data.map((d) => d.x)
            : data[0]?.data
                .filter((_, index) => index % 2 === 0)
                .map((d) => d.x),
        format: (v) => phaseToMonth(v, true),
      }}
      enableGridX={showLabel}
      enableGridY={showLabel}
      axisLeft={axisLeft}
      colors={colors}
      lineWidth={3}
      pointSize={8}
      pointColor={{ from: "color" }}
      pointBorderWidth={0}
      pointBorderColor={{ from: "color", modifiers: [] }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      areaBaselineValue={0}
      areaOpacity={1}
      areaBlendMode="normal"
      enableTouchCrosshair={true}
      useMesh={true}
      enableSlices={"x"}
      sliceTooltip={({ slice }) => tooltip(slice)}
      theme={customTheme}
      animate={true}
    />
  );
}

export default LineChart;
