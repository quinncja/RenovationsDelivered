import React from "react";
import { useCSSVariable } from "utils/hooks/useCSSVariable";

export default function ZeroLineLayer(lineChartProps) {
  const y = lineChartProps.yScale(0);
  const lineColor = useCSSVariable("--shadow");

  const maxY = 195;
  const yVal = Math.min(y, maxY);

  return (
    <g>
      <line
        x1={0}
        y1={yVal}
        x2={lineChartProps.innerWidth}
        y2={yVal}
        stroke={lineColor}
        strokeDasharray="1 4"
      />
    </g>
  );
}
