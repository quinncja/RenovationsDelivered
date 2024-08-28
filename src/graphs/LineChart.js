import { Line } from "@nivo/line";
import { useDashboardContext } from "context/DashboardContext";
import { useUserContext } from "context/UserContext";
import { useEffect } from "react";
import { phaseToMonth } from "utils/formatters";

function LineChart({ data, open, handleClick, showLabel, chartObj }) {
  const { colorScheme } = useUserContext();
  const { setLegends } = useDashboardContext();

  useEffect(() => {
    if (open && chartObj.chartProps.legendsFunc)
      setLegends(chartObj.chartProps.legendsFunc(data));
    else setLegends(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const customTheme = {
    grid: {
      line: {
        stroke: "#55555565",
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

  let margin = { top: 5, right: 70, bottom: 120, left: 40 };
  const axisLeft = open && showLabel ? chartObj.chartProps.axisLeft : false;

  if (!data) return <div style={{ margin: "auto" }}>No Data</div>;
  return (
    <Line
      {...chartObj.chartProps}
      width={640}
      height={320}
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
      colors={{ scheme: colorScheme }}
      lineWidth={3}
      pointSize={8}
      pointColor={{ from: "color", modifiers: [["darker"]] }}
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
      onClick={(data) => {
        if (handleClick) {
          handleClick(data.points[0].data.x);
        }
      }}
      sliceTooltip={({ slice }) => chartObj.tooltip(slice)}
      theme={customTheme}
      animate={false}
    />
  );
}

export default LineChart;
