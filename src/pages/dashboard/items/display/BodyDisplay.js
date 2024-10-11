import { getItemContainers } from "utils/funcs";
import TextBody from "./TextBody";
import ChartBody from "./ChartBody";
import ImageBody from "./ImageBody";

function BodyDisplay(props) {
  const { chartObj, open, data, dragging, id, toggleData } = props;
  const chartType = chartObj.chartType;

  if (chartType === "Text") {
    return <TextBody chartObj={chartObj} data={data} open={open} />;
  }

  const { container, chartSize, imageSize } = getItemContainers(
    chartObj.chartType,
    open,
  );

  if (dragging)
    return (
      <ImageBody
        chartType={chartObj.chartType}
        container={container}
        size={imageSize}
        id={id}
      />
    );

  return (
    <ChartBody
      chartObj={chartObj}
      data={data}
      container={container}
      size={chartSize}
      id={id}
      toggleData={toggleData}
      open={open}
    />
  );
}

export default BodyDisplay;
