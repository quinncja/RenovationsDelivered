import { fetchChartData, processTableData } from "utils/api";
import RevenueCleaner from "./Revenue/Cleaner";
import RevenueTooltip from "./Revenue/Tooltip";
import MarginToolTip from "./Margin/Tooltip";
import { marginChartProps } from "./Margin/ChartProps";
import { revChartProps } from "./Revenue/ChartProps";
import PieChartToolTip from "./PieChart/PieChartToolTip";
import getVenderLabel from "./Vender/Label";
import ytdDisplay from "./YTD/display";
import jobDisplay from "./Jobs/jobDisplay";
import { SingleMargin } from "./Margin/SingleMargin";
import { trimLabel } from "./PieChart/TrimLabel";
import transformMarginData from "./Margin/transformData.js";
import { transformLineData } from "./LineChart/transformLineData";

export const chartObjects = [
  {
    type: "Vender Breakdown",
    admin: false,
    getter: (mods, signal) =>
      fetchChartData({ ...mods, type: "vender" }, signal),
    tooltip: (datum, sum) => <PieChartToolTip datum={datum} sum={sum} />,
    label: (datum) => getVenderLabel(datum),
    chartType: "Pie",
    modifierOptions: ["year", "job", "phase", "active"],
    cleaner: (data) => {
      return data;
    },
    tableFunc: (data) => {
      return data;
    },
  },
  {
    type: "COGs Breakdown",
    admin: false,
    getter: (mods, signal) => fetchChartData({ ...mods, type: "cogs" }, signal),
    tooltip: (datum, sum) => <PieChartToolTip datum={datum} sum={sum} />,
    label: (datum) => trimLabel(datum.id),
    chartType: "Pie",
    modifierOptions: ["year", "job", "phase", "active"],
    cleaner: (data) => {
      return data;
    },
    tableFunc: (data) => {
      return data;
    },
  },
  {
    type: "Sub Breakdown",
    admin: false,
    getter: (mods, signal) => fetchChartData({ ...mods, type: "sub" }, signal),
    tooltip: (datum, sum) => <PieChartToolTip datum={datum} sum={sum} />,
    label: (datum) => trimLabel(datum.id),
    chartType: "Pie",
    modifierOptions: ["year", "job", "phase", "active"],
    cleaner: (data) => {
      return data;
    },
    tableFunc: (data) => {
      return data;
    },
  },
  {
    type: "Client Breakdown",
    admin: true,
    getter: (mods, signal) =>
      fetchChartData({ ...mods, type: "client" }, signal),
    tooltip: (datum, sum) => <PieChartToolTip datum={datum} sum={sum} />,
    label: (datum) => trimLabel(datum.id),
    chartType: "Pie",
    modifierOptions: ["year", "job", "phase", "active"],
    cleaner: (data) => {
      return data;
    },
    tableFunc: (data) => {
      return data;
    },
  },
  {
    type: "Cost Analysis",
    admin: false,
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
    modifierOptions: ["year", "job", "phase", "active"],
    tableFunc: async (data) => {
      const processedData = await processTableData(data, "revenue");
      return transformLineData(processedData);
    },
  },
  {
    type: "Margin",
    admin: false,
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
    modifierOptions: ["year", "job", "phase", "active"],
    tableFunc: (data) => {
      const processedData = transformMarginData(data);
      return transformLineData(processedData);
    },
  },
  {
    type: "Status",
    admin: false,
    chartType: "Text",
    getter: () => {
      return {};
    },
    display: (data, chartObj) => jobDisplay(data, chartObj),
    cleaner: (data) => {
      return data;
    },
    modifierOptions: ["year", "job", "phase", "active"],
  },
  {
    type: "Financial Overview",
    admin: false,
    chartType: "Text",
    getter: (mods, signal) => fetchChartData({ ...mods, type: "ytd" }, signal),
    display: (data) => ytdDisplay(data),
    cleaner: (data) => {
      return data;
    },
    modifierOptions: ["year", "job", "phase", "active"],
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
