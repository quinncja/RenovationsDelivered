import { ResponsiveBar } from "@nivo/bar";
import { useUserContext } from "context/UserContext";
import { hashData } from "utils/colors";
import BarTooltip from "graphs/charts/BarChart/BarToolTip";
import { transformLineData } from "graphs/charts/LineChart/transformLineData";
import { venderMap } from "../Vender/Label";

function BreakdownOpenBar({ budget, costItems, handleClick }) {
  const { posted, committed } = costItems;
  const { getColorScheme } = useUserContext();
  const pallete = getColorScheme();
  const vendors = Array.from(
    new Set([
      ...posted.map((item) => item.id),
      ...committed.map((item) => item.id),
    ]),
  );

  const keys = ["Budget"];
  vendors.forEach((vendor) => {
    keys.push(`${vendor}`);
    keys.push(`${vendor} - C`);
  });

  const postedByVendor = posted.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + item.value;
    return acc;
  }, {});

  const committedByVendor = committed.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + item.value;
    return acc;
  }, {});

  const saleData = [];
  for (const vendor in postedByVendor) {
    saleData.push({
      id: vendor,
      label: vendor,
      value: postedByVendor[vendor],
      type: "posted",
    });
  }

  for (const vendor in committedByVendor) {
    saleData.push({
      id: `${vendor} - C`,
      label: vendor,
      value: committedByVendor[vendor],
      type: "committed",
    });
  }

  const data = [
    {
      id: "Vendors",
      Budget: 0,
      ...vendors.reduce((acc, vendor) => {
        acc[`${vendor}`] = postedByVendor[vendor] || 0;
        acc[`${vendor} - C`] = committedByVendor[vendor] || 0;
        return acc;
      }, {}),
    },
    {
      id: "Budget",
      Budget: budget,
    },
  ];

  const colorMap = {};
  keys.forEach((key) => {
    const dataForColor = { id: key };
    colorMap[key] = hashData(dataForColor, pallete, true).color;
  });

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

  const fill = keys
    .filter((key) => key.endsWith("- C"))
    .map((key) => ({
      match: { id: key },
      id: "stripes",
    }));

  const label = (label) => {
    const realLabel = label.replace(" - C", "");
    const vendorLabel = venderMap[realLabel] || realLabel;
    const trimmedLabel = transformLineData(vendorLabel);
    return trimmedLabel;
  };

  return (
    <>
      <ResponsiveBar
        onClick={(data) => handleClick(data.id, data.color)}
        data={data}
        keys={keys}
        indexBy="id"
        layout="horizontal"
        groupMode="stacked"
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        padding={0.2}
        borderRadius={4}
        colors={({ id }) => colorMap[id]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisLeft={false}
        axisBottom={false}
        innerPadding={2}
        enableGridY={false}
        defs={defs}
        fill={fill}
        label={(bar) => label(bar.id)}
        labelSkipWidth={50}
        labelSkipHeight={25}
        tooltip={(id, color, value) => BarTooltip(id, color, value)}
        labelTextColor="#f3f3f3"
        theme={{
          labels: {
            text: {
              fontSize: 14,
              fontWeight: 500,
            },
          },
          axis: {
            ticks: {
              text: {
                fill: "#f3f3f3",
              },
              line: {
                stroke: "#f3f3f3",
              },
            },
            domain: {
              line: {
                stroke: "#f3f3f3",
              },
            },
          },
          legends: {
            text: {
              fill: "#f3f3f3",
            },
          },
        }}
      />
      <div className="bar-left" />
    </>
  );
}

export default BreakdownOpenBar;
