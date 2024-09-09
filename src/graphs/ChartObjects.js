import { fetchChartData } from "utils/api";
import RevenueCleaner from "./Revenue/Cleaner";
import RevenueTooltip from "./Revenue/Tooltip";
import MarginToolTip from "./Margin/Tooltip";
import { marginChartProps } from "./Margin/ChartProps";
import { revChartProps } from "./Revenue/ChartProps";
import PieChartToolTip from "./PieChart/PieChartToolTip";
import getVenderLabel from "./Vender/Label";
import ytdDisplay from "./YTD/display";
import { SingleMargin } from "./Margin/SingleMargin";
import { trimLabel } from "./PieChart/TrimLabel";

export const chartObjects = [
  {
    type: "Vender Breakdown",
    getter: (mods, signal) =>
      fetchChartData({ ...mods, type: "vender" }, signal),
    tooltip: (datum, sum) => <PieChartToolTip datum={datum} sum={sum} />,
    label: (datum) => getVenderLabel(datum),
    chartType: "Pie",
    modifierOptions: ["year", "job", "phase"],
    cleaner: (data) => {
      return data;
    },
  },
  {
    type: "COGs Breakdown",
    getter: (mods, signal) => fetchChartData({ ...mods, type: "cogs" }, signal),
    tooltip: (datum, sum) => <PieChartToolTip datum={datum} sum={sum} />,
    label: (datum) => trimLabel(datum.id),
    chartType: "Pie",
    modifierOptions: ["year", "job", "phase"],
    cleaner: (data) => {
      return data;
    },
  },
  {
    type: "Sub Breakdown",
    getter: (mods, signal) => fetchChartData({ ...mods, type: "sub" }, signal),
    tooltip: (datum, sum) => <PieChartToolTip datum={datum} sum={sum} />,
    label: (datum) => trimLabel(datum.id),
    chartType: "Pie",
    modifierOptions: ["year", "job", "phase"],
    cleaner: (data) => {
      return data;
    },
  },
  {
    type: "Client Breakdown",
    getter: (mods, signal) => fetchChartData({ ...mods, type: "client" }, signal),
    tooltip: (datum, sum) => <PieChartToolTip datum={datum} sum={sum} />,
    label: (datum) => trimLabel(datum.id),
    chartType: "Pie",
    modifierOptions: ["year", "job", "phase"],
    cleaner: (data) => {
      return data;
    },
  },
  {
    type: "Cost Analysis",
    chartType: "Line",
    getter: (mods, signal) =>
      fetchChartData({ ...mods, type: "revenue" }, signal),
    cleaner: (data) => RevenueCleaner(data),
    tooltip: (slice) => <RevenueTooltip slice={slice} />,
    checkIfSingle: (data) =>
      data && data[0] && data[0].data.length === 1 ? true : false,
    single: {
      chartType: "Bar",
      cleaner: (data) =>
        data.map((item) => {
          const flattenedData = item.data
            .map((dataItem) => `${dataItem.y}`)
            .join(", ");
          return {
            id: item.id,
            [`${item.id} -`]: flattenedData,
          };
        }),
    },
    chartProps: revChartProps,
    modifierOptions: ["year", "job", "phase"],
    showTable: true,
  },
  {
    type: "Margin",
    chartType: "Line",
    getter: (mods, signal) =>
      fetchChartData({ ...mods, type: "margin" }, signal),
    cleaner: (data) => {
      return data;
    },
    tooltip: (slice) => <MarginToolTip slice={slice} />,
    checkIfSingle: (data) => (data && data.current.length === 1 ? true : false),
    single: {
      chartType: "Text",
      display: (data) => <SingleMargin data={data} />,
      cleaner: (data) => {
        return data;
      },
    },
    chartProps: marginChartProps,
    modifierOptions: ["year", "job", "phase"],
  },
  {
    type: "Financial Overview",
    chartType: "Text",
    getter: (mods, signal) => fetchChartData({ ...mods, type: "ytd" }, signal),
    display: (data) => ytdDisplay(data),
    cleaner: (data) => {
      return data;
    },
    modifierOptions: ["year", "job", "phase"],
  },
];

export const groupedByChartType = chartObjects.reduce((acc, obj) => {
  const { chartType } = obj;
  if (!acc[chartType]) {
    acc[chartType] = [];
  }
  acc[chartType].push(obj);
  return acc;
}, {});
