import transformMarginData from "widgets/jobWidgets/Margin/transformData";
import { transformLineData } from "graphs/charts/LineChart/transformLineData";
import transformRevenueData from "widgets/jobWidgets/Revenue/transformData";

function getTableFunc(type) {
  switch (type) {
    case "Cost Analysis":
      return (data) => transformLineData(transformRevenueData(data));
    case "Margin":
      return (data) => transformLineData(transformMarginData(data));
    default:
      return (data) => data;
  }
}

export default getTableFunc;
