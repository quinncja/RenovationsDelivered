import { useSingle } from "utils/hooks/useSingle";
import ChartLayer from "./ChartLayer";
import { DataTable } from "./DataTable";

function VisualLayer(props) {
  const { data, chartObj, ...rest } = props;
  const { chartType, type } = chartObj;

  const single = useSingle();
  const hideTable = single && !chartType === "Pie" && !chartType === "Bar";
  const showLegend =
    chartType !== "Text" && type !== "Margin" && chartType !== "Bar";

  return (
    <>
      <div className="open-chart-row">
        <ChartLayer
          data={data}
          chartObj={chartObj}
          showLegend={showLegend}
          {...rest}
        />
      </div>

      {!hideTable && chartType && (
        <DataTable data={data} chartType={chartType} {...rest} />
      )}
    </>
  );
}

export default VisualLayer;
