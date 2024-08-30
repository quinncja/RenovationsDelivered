import { Pie } from "@nivo/pie";
import { useDashboardContext } from "context/DashboardContext";
import { useEffect } from "react";
import { CenterSum } from "./CenterSum";
import { calculateTotalSum } from "utils/funcs";

function PieChart({ data, open, chartObj, showLabel, chartRef, colorScheme }) {
  const { setLegends } = useDashboardContext();
  const arcLabelColor = "#f3f3f3"
  const slicedData = data.slice(0, 20);
  const legendsData = slicedData
    ? slicedData.map((d) => ({
        id: d.id,
        label: d.label,
        color: d.color,
      }))
    : "";

  const sum = calculateTotalSum(data);

  const trimLabel = (label) => {
    if(!label) return;
    return label
      .replace(/the/gi, "")
      .replace(/, inc/gi, "")
      .replace(/inc\./gi, "")
      .replace(/inc/gi, "")
      .replace(/llc/gi, "")
      .trim();
  };

  useEffect(() => {
    if (open) setLegends(legendsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Pie
      width={320}
      height={320}
      data={slicedData}
      ref={chartRef}
      margin={{ top: 10, bottom: 90, right: 0, left: -20 }}
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
      arcLabel={(datum) => showLabel && trimLabel(chartObj.label(datum))}
      arcLabelsSkipAngle={20}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsDiagonalLength={6}
      arcLinkLabelsStraightLength={10}
      arcLinkLabelsTextColor={arcLabelColor}
      arcLinkLabelsColor={arcLabelColor}
      arcLabelsTextColor={arcLabelColor}
      animate={true}
      layers={[
        "arcs",
        "arcLabels",
        "legends",
        (props) => <CenterSum {...props} sum={sum} />,
      ]}
    />
  );
}

export default PieChart;
