import { getItemContainers } from "utils/funcs";
import TextBody from "./TextBody";
import ChartBody from "./ChartBody";
import ImageBody from "./ImageBody";

function BodyDisplay(props){
    const {chartObj, openItem, data, dragging, id} = props;
    const chartType = chartObj.chartType;

    if(chartType === "Text") {
        return <TextBody chartObj={chartObj} data={data}/>
    }

    const {container, chartSize, imageSize} = getItemContainers(chartObj.chartType, openItem)

    if(dragging) return (
        <ImageBody chartType={chartObj.chartType} container={container} size={imageSize} id={id}/>
    )

    return(
        <ChartBody chartObj={chartObj} data={data} container={container} size={chartSize} id={id} />
    )
}

export default BodyDisplay;