import BodyDisplay from "pages/jobcost/items/display/BodyDisplay";
import { formatMarginData, formatRevenueData } from "utils/formatters";
import LegendDisplay from "./LegendDisplay";

function ChartLayer(props) {
  const {
    data,
    chartObj,
    showLegend,
    nestingLevel,
    unfiltered,
    isAdmin,
    isEmpty,
    ...rest
  } = props;
  const { chartType, query } = chartObj;
  const lineChart = query === "margin" || query === "revenue"

  let chartData = data;
  if (query === "margin")
    chartData = formatMarginData(data, nestingLevel, isAdmin);
  if (query === "revenue")
    chartData = formatRevenueData(data, nestingLevel, isAdmin);

  const legendData = chartType === "Pie" ? unfiltered : chartData;
  const allowToggle = chartType === "Pie";

  return (
    <div className={`${lineChart ? 'col-chart-legend' : `row-chart-legend`}`}>
      <BodyDisplay
        chartObj={chartObj}
        data={chartData}
        id={"open"}
        open={true}
        {...rest}
      />
      {showLegend && !isEmpty && (
        <LegendDisplay data={legendData} allowToggle={allowToggle} {...rest} />
      )}
    </div>
  );
}

export default ChartLayer;
