import React from "react";

export default function ZeroLineLayer(lineChartProps) {
  const y = lineChartProps.yScale(0);

  return (
    <g>
      <line
        x1={0}
        y1={y + 1}
        x2={lineChartProps.innerWidth}
        y2={y + 1}
        stroke="rgba(0,0,0,0.3)"
        strokeDasharray="1 4"
      />
    </g>
  );
}
