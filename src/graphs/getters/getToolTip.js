import BarTooltip from "graphs/charts/BarChart/BarToolTip";
import MarginToolTip from "../../widgets/jobWidgets/Margin/Tooltip";
import PieChartToolTip from "../charts/PieChart/PieChartToolTip";
import RevenueTooltip from "../../widgets/jobWidgets/Revenue/Tooltip";

export const getToolTip = (query, chartType) => {
  if (chartType === "Pie")
    return (datum, sum) => <PieChartToolTip datum={datum} sum={sum} />;
  if (chartType === "Bar")
    return (id, color, value) => (
      <BarTooltip id={id} color={color} value={value} />
    );
  if (query === "revenue") return (slice) => <RevenueTooltip slice={slice} />;
  if (query === "margin") return (slice) => <MarginToolTip slice={slice} />;
};
