import { revChartProps } from "graphs/types/Revenue/ChartProps";
import { marginChartProps } from "graphs/types/Margin/ChartProps";
import { budgetChartProps } from "graphs/types/Budget/ChartProps";

export const getChartProps = (query, type) => {
  if (query === "revenue" || query === "revenue-single") return revChartProps;
  if (query === "margin") return marginChartProps;
  if (query === "budget") return budgetChartProps;
  else return {};
};
