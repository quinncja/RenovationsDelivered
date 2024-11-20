const transformRevenueData = (data) => {
  const transformedData = [...data];
  console.log(transformedData)

  if (
    data[0] &&
    data[1] &&
    Array.isArray(data[0].data) &&
    Array.isArray(data[1].data)
  ) {
    const costDiff = {
      id: "Budget Difference ($)",
      data: data[0].data.map((item, index) => {
        const referenceItem = data[1].data[index];
        const difference = referenceItem ? item.y - referenceItem.y : item.y;
        return {
          x: item.x,
          y: difference,
          p: true,
        };
      }),
    };

    const costDiffP = {
      id: "Budget Difference (%)",
      data: data[0].data.map((item, index) => {
        const referenceItem = data[1].data[index];
        const difference = referenceItem ? item.y - referenceItem.y : item.y;
        const percentageDifference =
          referenceItem && referenceItem.y !== 0
            ? (difference / item.y) * 100
            : 0;

        return {
          x: item.x,
          y: parseFloat(percentageDifference.toFixed(2)),
          f: true,
          p: true,
        };
      }),
    };

    transformedData.push(costDiff, costDiffP);
  }

  // Calculate Contract Difference ($) and Contract Difference (%)
  if (
    data[1] &&
    data[2] &&
    Array.isArray(data[1].data) &&
    Array.isArray(data[2].data)
  ) {
    const cntrctDiff = {
      id: "Contract Difference ($)",
      data: data[2].data.map((item, index) => {
        const referenceItem = data[1].data[index];
        const difference = referenceItem ? item.y - referenceItem.y : item.y;
        return {
          x: item.x,
          y: difference,
          p: true,
        };
      }),
    };

    const cntrctDiffP = {
      id: "Contract Difference (%)",
      data: data[2].data.map((item, index) => {
        const referenceItem = data[1].data[index];
        const difference = referenceItem ? item.y - referenceItem.y : item.y;
        const percentageDifference =
          referenceItem && referenceItem.y !== 0
            ? (difference / item.y) * 100
            : 0;

        return {
          x: item.x,
          y: parseFloat(percentageDifference.toFixed(2)),
          f: true,
          p: true,
        };
      }),
    };

    transformedData.push(cntrctDiff, cntrctDiffP);
  }

  return transformedData;
};

export default transformRevenueData;
