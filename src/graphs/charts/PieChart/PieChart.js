import { Pie } from "@nivo/pie";
import getVenderLabel from "widgets/jobWidgets/Vender/Label";
import { trimLabel } from "./TrimLabel";

function PieChart({ data, tooltip }) {
  if (!data) return;

  const slicedData = data.slice(0, 20);

  const label = (datum) => {
    const vendorLabel = getVenderLabel(datum);
    const trimmedLabel = trimLabel(vendorLabel);
    return trimmedLabel;
  };

  const theme = {
    tooltip: {
      container: {
        zIndex: 25,
      },
    },
  };

  return (
    <Pie
      tooltip={({ datum }) => tooltip(datum, "sum")}
      data={slicedData}
      colors={(datum) => datum.data.color}
      innerRadius={0.6}
      padAngle={0.7}
      cornerRadius={1}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", "0.3"]],
      }}
      arcLabel={(datum) => label(datum)}
      arcLabelsSkipAngle={20}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={5}
      arcLinkLabelsDiagonalLength={15}
      arcLinkLabelsStraightLength={15}
      animate={true}
      theme={theme}
    />
  );
}

export default PieChart;
