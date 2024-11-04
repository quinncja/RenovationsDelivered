import JobDisplay from "widgets/jobWidgets/Status/StatusDisplay";
import YTDDisplay from "widgets/jobWidgets/YTD/YTDDisplay";
import { SingleMargin } from "widgets/jobWidgets/Margin/SingleMargin";

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
