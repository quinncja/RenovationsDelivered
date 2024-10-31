import { Pie } from "@nivo/pie";
import { useCSSVariable } from "utils/hooks/useCSSVariable";
import { CenterPercent } from "./CenterPercent";
import HalfChartToolTip from "./HalfChartToolTip";

function HalfPieChart({ data, size }) {
  const arcLabelColor = "#f3f3f3";
  const arcLinkLabelColor = useCSSVariable("--white");
  const margin = { top: 10, bottom: 10, right: 0, left: 0 };
  const sum = data[0].value + data[1].value;
  const percent = (data[0].value / sum) * 100;

  return (
    <Pie
      data={data}
      {...size}
      startAngle={-90}
      endAngle={90}
      colors={["#25dd18", "#ff2049"]}
      margin={margin}
      innerRadius={0.8}
      tooltip={({ datum }) => <HalfChartToolTip datum={datum} sum={sum} />}
      padAngle={0.8}
      cornerRadius={1}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", "0.3"]],
      }}
      arcLabelsSkipAngle={20}
      enableArcLinkLabels={false}
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
        (props) => <CenterPercent {...props} percent={percent} />,
      ]}
    />
  );
}

export default HalfPieChart;
