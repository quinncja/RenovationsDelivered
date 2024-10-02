import { formatNumberShort } from "utils/formatters";

export const revChartProps = {
  axisLeft: {
    format: (v) => formatNumberShort(v),
    tickValues: 5,
  },
  legendsFunc: (data) =>
    data.map((series, index) => ({
      id: series.id,
      label: series.id,
      color: `color-${index}`,
    })),
  keys: ["Budgeted - ", "COGS - ", "Contracted - "],
  groupMode: "stacked",
}
