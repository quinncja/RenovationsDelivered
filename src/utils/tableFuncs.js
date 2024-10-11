import transformMarginData from "graphs/widgets/Margin/transformData";
import { transformLineData } from "graphs/charts/LineChart/transformLineData";
import transformRevenueData from "graphs/widgets/Revenue/transformData";

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
