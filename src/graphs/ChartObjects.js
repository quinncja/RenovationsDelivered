export const chartObjects = [
  {
    type: "Material Breakdown",
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
    admin: false,
    chartType: "Pie",
  },
  {
    type: "Cost Analysis",
    query: "revenue",
    admin: false,
    chartType: "Line",
  },
  {
    type: "Margin",
    query: "margin",
    admin: false,
    chartType: "Line",
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
  {
    type: "Budget Breakdown",
    query: "budget",
    chartType: "Bar",
    admin: false,
  },
];

export const singleChartObjs = [
  {
    type: "Margin",
    chartType: "Text",
    query: "margin-single",
  },
  {
    type: "Cost Analysis",
    chartType: "Bar",
    query: "revenue-single",
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

export const getChartObj = (type) => {
  return chartObjects.find((obj) => obj.type === type);
};

export const getSingleChartObj = (type) => {
  let obj = singleChartObjs.find((obj) => obj.type === type);
  if (!obj) obj = getChartObj(type);
  return obj;
};
