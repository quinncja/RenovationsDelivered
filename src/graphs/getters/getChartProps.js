import { revChartProps } from "graphs/widgets/Revenue/ChartProps";
import { marginChartProps } from "graphs/widgets/Margin/ChartProps";
import { budgetChartProps } from "graphs/widgets/Budget/ChartProps";

export const getChartProps = (query, type) => {
  if (query === "revenue" || query === "revenue-single") return revChartProps;
  if (query === "margin") return marginChartProps;
  if (query === "budget") return budgetChartProps;
  else return {};
};
