import { useSingle } from "utils/hooks/useSingle";
import ChartLayer from "./ChartLayer";
import { DataTable } from "./DataTable";
import { checkEmpty } from "utils/funcs";

function VisualLayer(props) {
  const { data, chartObj, ...rest } = props;
  const { chartType, type } = chartObj;

  const single = useSingle();
  const isEmpty = checkEmpty(data);
  const hideTable =
    (single && !chartType === "Pie" && !chartType === "Bar") || isEmpty || (type === "Cost Analysis" && single);
  const showLegend =
    chartType !== "Text" && type !== "Margin" && chartType !== "Bar";

  return (
    <>
      <div className="open-chart-row">
        <ChartLayer
          data={data}
          isEmpty={isEmpty}
          chartObj={chartObj}
          showLegend={showLegend}
          {...rest}
        />
      </div>

      {!hideTable && chartType && (
        <DataTable data={data} chartType={chartType} {...rest} oldStyle={true}/>
      )}
    </>
  );
}

export default VisualLayer;
