import JobDisplay from "graphs/widgets/Status/StatusDisplay";
import YTDDisplay from "graphs/widgets/YTD/YTDDisplay";
import { SingleMargin } from "graphs/widgets/Margin/SingleMargin";

function TextBody(props) {
  const { chartObj, data, open } = props;
  switch (chartObj.query) {
    case "margin-single":
      return <SingleMargin data={data} />;
    case "ytd":
      return <YTDDisplay data={data} open={open} />;
    default:
      return <JobDisplay open={open} />;
  }
}

export default TextBody;
