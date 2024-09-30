import JobDisplay from "graphs/types/Status/StatusDisplay";
import YTDDisplay from "graphs/types/YTD/YTDDisplay";
import { SingleMargin } from "graphs/types/Margin/SingleMargin";

function TextBody(props) {
  const { chartObj, data, open } = props;
  switch (chartObj.query) {
    case "margin":
      return <SingleMargin data={data} />;
    case "ytd":
      return <YTDDisplay data={data} open={open} />;
    default:
      return <JobDisplay open={open} />;
  }
}

export default TextBody;
