import { checkEmpty, getItemContainers } from "utils/funcs";
import TextBody from "./TextBody";
import ChartBody from "./ChartBody";
import ImageBody from "./ImageBody";
import EmptyDisplay from "./EmptyDisplay";

function BodyDisplay(props) {
  const { chartObj, open, data, id, dragging, toggleData } = props;
  const chartType = chartObj.chartType;
  const isEmpty = checkEmpty(data);
  if (isEmpty && chartType !== "Text") {
    return <EmptyDisplay text={chartObj.type} />;
  }
  if (chartType === "Text") {
    return <TextBody chartObj={chartObj} data={data} open={open} />;
  }

  const { container, chartSize, imageSize } = getItemContainers(
    chartObj.chartType,
    open,
  );

  return (
    <>
      {!dragging && (
        <ChartBody
          chartObj={chartObj}
          data={data}
          container={container}
          size={chartSize}
          id={id}
          toggleData={toggleData}
          open={open}
        />
      )}
      <ImageBody
        chartType={chartObj.chartType}
        container={container}
        size={imageSize}
        id={id}
        dragging={dragging}
      />
    </>
  );
}

export default BodyDisplay;
