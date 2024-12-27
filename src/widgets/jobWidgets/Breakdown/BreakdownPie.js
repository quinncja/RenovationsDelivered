import React from "react";
import { Pie } from "@nivo/pie";
import { transformLineData } from "graphs/charts/LineChart/transformLineData";
import { BreakdownToolTip } from "graphs/charts/PieChart/PieChartToolTip";
import { calculateTotalSum } from "utils/funcs";
import { hashData } from "utils/colors";
import { useUserContext } from "context/UserContext";
import { venderMap } from "../Vender/Label";

function BreakdownPie({ costItems }) {
  const { getColorScheme } = useUserContext();
  const pallete = getColorScheme();

  const { posted, committed } = costItems;

  const postedByVendor = posted.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + item.value;
    return acc;
  }, {});

  const committedByVendor = committed.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + item.value;
    return acc;
  }, {});

  let sum;
  sum = calculateTotalSum(posted);
  sum += calculateTotalSum(committed);
  const data = [];

  for (const vendor in postedByVendor) {
    data.push({
      id: vendor,
      label: vendor,
      value: postedByVendor[vendor],
      type: "posted",
    });
  }

  for (const vendor in committedByVendor) {
    data.push({
      id: `${vendor} - C`,
      label: vendor,
      value: committedByVendor[vendor],
      type: "committed",
    });
  }

  const visualData = data.map((datum) => hashData(datum, pallete, true));

  const slicedData = visualData.slice(0, 20);

  const defs = [
    {
      id: "stripes",
      type: "patternDots",
      background: "inherit",
      color: "rgba(255, 255, 255, 0.25)",
      size: 5,
      padding: 4,
      stagger: true,
    },
  ];

  const fill = [
    {
      match: (d) => d.data.type === "committed",
      id: "stripes",
    },
  ];

  const label = (datum) => {
    const vendorLabel = venderMap[datum.label] || datum.label;
    const trimmedLabel = transformLineData(vendorLabel);
    return trimmedLabel;
  };
  const arcLabelColor = "#f3f3f3";

  return (
    <Pie
      data={slicedData}
      width={260}
      height={260}
      colors={(datum) => datum.data.color}
      margin={{ top: 10, right: 10, bottom: 20, left: 10 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={1}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", "0.3"]] }}
      arcLabel={(datum) => label(datum)}
      tooltip={(datum) => BreakdownToolTip({ ...datum, sum })}
      enableArcLinkLabels={false}
      arcLabelsTextColor={arcLabelColor}
      defs={defs}
      fill={fill}
      sortByValue={true}
      arcLabelsSkipAngle={20}
      theme={{
        labels: {
          text: {
            fontSize: 12,
            fontWeight: 500,
          },
        },
      }}
    />
  );
}

export default BreakdownPie;
