import { Pie } from "@nivo/pie";
import { calculateTotalSum } from "utils/funcs";
import { useCSSVariable } from "utils/hooks/useCSSVariable";
import getVenderLabel from "graphs/types/Vender/Label";
import { CenterSum } from "./CenterSum";
import { trimLabel } from "./TrimLabel";

function PieChart({
  data,
  open,
  size,
  chartRef,
  tooltip,
  chartProps
}) {
  const arcLabelColor = "#f3f3f3";
  const arcLinkLabelColor = useCSSVariable("--white");

  const sum = calculateTotalSum(data);
  const slicedData = data.slice(0, 20);

  // const getPercentage = (datum) => {
  //   if (sum === 0) return "0%";
  //   const percentage = (datum.value / sum) * 100;
  //   return `${percentage.toFixed(2)}%`;
  // };

  const label = (datum) => {
    const vendorLabel = getVenderLabel(datum);
    const trimmedLabel = trimLabel(vendorLabel);
    return trimmedLabel;
  }

  const margin = open
    ? { top: 40, bottom: 90, right: 50, left: 70 }
    : { top: 10, bottom: 90, right: 0, left: -20 };

  return (
    <Pie
      {...size}
      {...chartProps}
      tooltip={({datum}) => tooltip(datum, sum)}
      data={slicedData}
      ref={chartRef}
      colors={(datum) => datum.data.color}
      margin={margin}
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
      arcLabelsSkipAngle={open ? 10 : 20}
      enableArcLinkLabels={open ? true : false}
      arcLinkLabelsSkipAngle={5}
      arcLinkLabelsDiagonalLength={15}
      arcLinkLabelsStraightLength={15}
      arcLinkLabelsTextColor={arcLinkLabelColor}
      arcLinkLabelsColor={arcLinkLabelColor}
      arcLabelsTextColor={arcLabelColor}
      animate={true}
      layers={[
        "arcs",
        "arcLabels",
        "arcLinkLabels",
        "legends",
        (props) => <CenterSum {...props} sum={sum} />,
      ]}
    />
  );
}

export default PieChart;
