import { revChartProps } from "widgets/jobWidgets/Revenue/ChartProps";
import { marginChartProps } from "widgets/jobWidgets/Margin/ChartProps";
import { budgetChartProps } from "widgets/jobWidgets/Budget/ChartProps";

export const getChartProps = (query, type) => {
  if (query === "revenue" || query === "revenue-single") return revChartProps;
  if (query === "margin") return marginChartProps;
  if (query === "budget") return budgetChartProps;
  else return {};
};
