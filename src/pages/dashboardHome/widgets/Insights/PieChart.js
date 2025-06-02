import { Pie } from "@nivo/pie";
import { createPortal } from "react-dom";
import { useState } from "react";
import { getColor } from "utils/colors";
import PieChartTooltips from "./PieChartTooltips";
import { useProjectContext } from "context/ProjectContext";
import getVenderLabel from "./Label";

function PieChart({
  data,
  type,
}) {
  const { getJobStr } = useProjectContext();
  const [tooltip, setTooltip] = useState(null);
  
  if(!data) return;
  
  const slicedData = data.slice(0, 20);
  
  const sumValues = (array) => {
    if (!array || !Array.isArray(array)) {
      console.log('sumValues received:', array);
      return 0;
    }
    return array.reduce((sum, obj) => sum + (obj.value || 0), 0);
  };
  
  const sum = sumValues(data);
  
  const getName = (datum) => {
    return type === "Project" ? getJobStr(datum.data.jobNumber) : type === "Vender" ? getVenderLabel(datum) : datum.id;
  };
  
  const label = (datum) => {
    const name = getName(datum);
    return name && name.length > 20
      ? name.substring(0, 20) + "..."
      : name;
  };
  
  const theme = {
    tooltip: {
      container: {
        zIndex: 9999,
        position: 'absolute',
      },
    },
  };
  
  return (
    <>
      <Pie
        height={320}
        width={330}
        data={slicedData}
        onMouseEnter={(data, event) => {
          setTooltip({
            datum: {
              ...data,
              id: getName(data)
            },
            x: event.clientX,
            y: event.clientY
          });
        }}
        onMouseMove={(data, event) => {
          setTooltip({
            datum: {
              ...data,
              id: getName(data)
            },
            x: event.clientX,
            y: event.clientY
          });
        }}
        onMouseLeave={() => setTooltip(null)}
        margin={{left: 10, top: 10, bottom: 10, right: 10}}
        colors={(datum) => getColor(datum.id)}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", "0.3"]],
        }}
        arcLabel={(datum) => label(datum)}
        arcLabelsSkipAngle={8}
        arcLabelsTextColor="#ffffff"
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={5}
        arcLinkLabelsDiagonalLength={15}
        arcLinkLabelsStraightLength={15}
        animate={true}
        theme={theme}
      />
      
      {tooltip && createPortal(
        <div 
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y - 10,
            zIndex: 9999,
            pointerEvents: 'none',
            transform: 'translate(-50%, -100%)',
            transition: 'left 0.2s ease-out, top 0.2s ease-out', 
            opacity: 1,
          }}
        >
          <PieChartTooltips
            datum={tooltip.datum}
            sum={sum}
          />
        </div>,
        document.body
      )}
    </>
  );
}

export default PieChart;