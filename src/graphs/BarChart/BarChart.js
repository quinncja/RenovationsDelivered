import { BarCanvas } from "@nivo/bar";
import { dollarFormatter } from "utils/formatters";
import { useCSSVariable } from "utils/hooks/useCSSVariable";

function BarChart({ data, open, size, showLabel, chartRef, colorScheme }) {
  const gridColor = useCSSVariable("--grid-color");

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
  function generateDataKeys(data) {
    return data.map((item) => `${item.id} -`);
  }

  const axisLeft =
    open && showLabel
      ? {
          tickValues: 5,
          format: (v) => dollarFormatter(v),
        }
      : false;

  let margin = open
    ? { top: 5, right: 20, bottom: 25, left: 80 }
    : { top: 5, right: 95, bottom: 100, left: 65 };

  if (!data) return <div style={{ margin: "auto" }}>No Data</div>;
  return (
    <BarCanvas
      data={data}
      ref={chartRef}
      keys={generateDataKeys(data)}
      {...size}
      indexBy="id"
      margin={margin}
      padding={0.15}
      groupMode="stacked"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={colorScheme}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={axisLeft}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      tooltip={({ id, color, value }) => (
        <div className="tooltip">
          <span
            className="tooltip-cube"
            style={{ backgroundColor: color }}
          ></span>
          <strong>{id}</strong> {dollarFormatter(value)}
        </div>
      )}
      enableLabel={false}
      enableGridY={showLabel ? true : false}
      role="application"
      theme={customTheme}
      animate={false}
    />
  );
}

export default BarChart;
