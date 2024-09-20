import { Pie } from "@nivo/pie";
import { CenterSum } from "./CenterSum";
import { calculateTotalSum } from "utils/funcs";
import { useCSSVariable } from "utils/hooks/useCSSVariable";

function PieChart({ data, open, size, chartObj, showLabel, chartRef, colorScheme }) {
  const arcLabelColor = "#f3f3f3";
  const arcLinkLabelColor = useCSSVariable("--white")
  const slicedData = data.slice(0, 20);
  
  const sum = calculateTotalSum(data);

  const getPercentage = (datum) => {
    if (sum === 0) return "0%";
    const percentage = (datum.value / sum) * 100;
    return `${percentage.toFixed(2)}%`;
  };

  const trimLabel = (label) => {
    if (!label) return;
    return label
      .replace(/the/gi, "")
      .replace(/, inc/gi, "")
      .replace(/inc\./gi, "")
      .replace(/inc/gi, "")
      .replace(/llc/gi, "")
      .trim();
  };

  const margin = open ? { top: 40, bottom: 90, right: 50, left: 70 }
  : { top: 10, bottom: 90, right: 0, left: -20 }

  const label = (datum) => {
   return open ? getPercentage(datum) :
    showLabel && trimLabel(chartObj.label(datum))
  }

  return (
    <Pie
      {...size}
      data={slicedData}
      ref={chartRef}
      margin={margin}
      innerRadius={0.6}
      padAngle={0.7}
      cornerRadius={1}
      activeOuterRadiusOffset={8}
      colors={colorScheme}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", "0.3"]],
      }}
      tooltip={({ datum }) => chartObj.tooltip(datum, sum)}
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
