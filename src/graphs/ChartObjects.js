import { processTableData } from "utils/api";
import transformMarginData from "./types/Margin/transformData.js";
import { transformLineData } from "./charts/LineChart/transformLineData.js";

export const chartObjects = [
  {
    type: "Vender Breakdown",
    query: "vender",
    admin: false,
    chartType: "Pie",
  },
  {
    type: "COGs Breakdown",
    query: "cogs",
    admin: false,
    chartType: "Pie",
  },
  {
    type: "Sub Breakdown",
    query: "sub",
    admin: false,
    chartType: "Pie",
  },
  {
    type: "Client Breakdown",
    query: "client",
    admin: true,
    chartType: "Pie",
  },
  {
    type: "Cost Analysis",
    query: "revenue",
    admin: false,
    chartType: "Line",
    tableFunc: async (data) => {
      const processedData = await processTableData(data, "revenue");
      return transformLineData(processedData);
    },
  },
  {
    type: "Margin",
    query: "margin",
    admin: false,
    chartType: "Line",
    tableFunc: (data) => {
      const processedData = transformMarginData(data);
      return transformLineData(processedData);
    },
  },
  {
    type: "Status",
    admin: false,
    chartType: "Text",
    query: null,
  },
  {
    type: "Financial Overview",
    query: "ytd",
    chartType: "Text",
    admin: false,
  },
];

export const singleChartObjs = [
  {
    type: "Margin",
    chartType: "Text",
    query: "margin",
  },
  {
    type: "Cost Analysis",
    chartType: "Bar",
    query: "revenue-single"
  }
]

export const groupedByChartType = chartObjects.reduce((acc, obj) => {
  const { chartType } = obj;
  if (!acc[chartType]) {
    acc[chartType] = [];
  }
  acc[chartType].push(obj);
  return acc;
}, {});

export const getChartObj = (type) => {
  return chartObjects.find((obj) => obj.type === type);
};

export const getSingleChartObj = (type) => {
  let obj = singleChartObjs.find((obj) => obj.type === type);
  if(!obj) obj = getChartObj(type)
  return obj
};