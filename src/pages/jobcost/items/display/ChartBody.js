import BarChart from "graphs/charts/BarChart/BarChart";
import LineChart from "graphs/charts/LineChart/LineChart";
import PieChart from "graphs/charts/PieChart/PieChart";
import { hashData } from "utils/colors";
import { useChartProps } from "utils/hooks/useChartProps";
import { useRef } from "react";
import useChartImage from "utils/images/useChartImage";

function ChartBody(props) {
  const chartRef = useRef(null);
  const { chartObj, data, container, size, id, toggleData, open } = props;
  const { query, chartType } = chartObj;
  useChartImage(chartRef, id);
  const { chartProps, tooltip, pallete } = useChartProps(query, chartType);
  const visualData = data.map((datum) => hashData(datum, pallete));

  function renderChart() {
    switch (chartObj.chartType) {
      case "Pie":
        return (
          <PieChart
            data={visualData}
            size={size}
            chartProps={chartProps}
            tooltip={tooltip}
            toggleData={toggleData}
          />
        );
      case "Line":
        return (
          <LineChart
            data={visualData}
            size={size}
            chartProps={chartProps}
            tooltip={tooltip}
            chartObj={chartObj}
            open={open}
            toggleData={toggleData}
          />
        );
      case "Bar":
        return (
          <BarChart
            data={visualData}
            size={size}
            chartProps={chartProps}
            tooltip={tooltip}
            open={open}
          />
        );
      default:
        return "";
    }
  }

  return (
    <div ref={chartRef} style={container}>
      {renderChart()}
    </div>
  );
}

export default ChartBody;
