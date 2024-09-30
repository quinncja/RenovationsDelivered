import JobDisplay from "graphs/types/Status/StatusDisplay";
import YTDDisplay from "graphs/types/YTD/YTDDisplay";
import { SingleMargin } from "graphs/types/Margin/SingleMargin";

function TextBody(props){
    const {chartObj, data} = props;
    switch(chartObj.query){
        case("margin"): return <SingleMargin data={data}/>
        case("ytd"): return <YTDDisplay data={data}/>
        default: return <JobDisplay />
    }
}

export default TextBody;