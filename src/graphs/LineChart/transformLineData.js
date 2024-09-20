export function transformLineData(data) {
  const xValues = data[0].data.map((item) => item.x);

  const transformedData = xValues.map((xValue, index) => {
    const row = { x: xValue };
    data.forEach((series) => {
      row[series.id] = series.data[index]?.y ?? null;
    });
    return row;
  });

  return transformedData;
}
