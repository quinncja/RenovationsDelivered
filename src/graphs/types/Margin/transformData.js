function transformMarginData(data) {
  const dataArray = [...data.previous, ...data.current].map((obj) => {
    return {
      ...obj,
      y: parseFloat(obj.y.toFixed(2)),
      f: true,
      p: true,
    };
  });

  let obj = [
    {
      id: "Margin",
      data: dataArray,
    },
  ];

  return obj;
}

export default transformMarginData;
