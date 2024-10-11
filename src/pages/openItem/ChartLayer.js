import BodyDisplay from "pages/dashboard/items/display/BodyDisplay";
import { formatMarginData, formatRevenueData } from "utils/formatters";
import LegendDisplay from "./LegendDisplay";

function ChartLayer(props) {
  const { data, chartObj, showLegend, nestingLevel, unfiltered, ...rest } =
    props;
  const { chartType, query } = chartObj;

  let chartData = data;
  if (query === "margin") chartData = formatMarginData(data, nestingLevel);
  if (query === "revenue") chartData = formatRevenueData(data, nestingLevel);

  const legendData = chartType === "Pie" ? unfiltered : chartData;
  const allowToggle = chartType === "Pie";

  return (
    <div className="chart-legend">
      <BodyDisplay
        chartObj={chartObj}
        data={chartData}
        id={"open"}
        open={true}
        {...rest}
      />
      {showLegend && (
        <LegendDisplay data={legendData} allowToggle={allowToggle} {...rest} />
      )}
    </div>
  );
}

export default ChartLayer;
