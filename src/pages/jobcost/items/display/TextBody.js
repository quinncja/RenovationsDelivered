import JobDisplay from "widgets/jobWidgets/Status/StatusDisplay";
import YTDDisplay from "widgets/jobWidgets/YTD/YTDDisplay";
import { SingleMargin } from "widgets/jobWidgets/Margin/SingleMargin";
import ChangeOrders from "widgets/jobWidgets/CO's/ChangeOrders";

function TextBody(props) {
  const { chartObj, data, open } = props;
  switch (chartObj.query) {
    case "margin-single":
      return <SingleMargin data={data} />;
    case "ytd":
      return <YTDDisplay data={data} open={open} />;
    case "change-orders":
      return <ChangeOrders data={data}/>
    default:
      return <JobDisplay open={open} />;
  }
}

export default TextBody;
