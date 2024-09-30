import React, { useMemo } from "react";

export default function LineLayer(lineChartProps) {
  const { xScale, yScale, width, innerHeight, lineGenerator, data, lineWidth } =
    lineChartProps;

  const maskId = useMemo(
    () => `lineMask-${Math.random().toString(36).slice(2, 15)}`,
    [],
  );

  return (
    <g>
      <mask id={maskId}>
        {data.map(({ id, data: d }) => (
          <path
            key={id}
            d={lineGenerator(
              d.map((dt) => ({ x: xScale(dt.x), y: yScale(dt.y) })),
            )}
            fill="none"
            strokeWidth={lineWidth}
            stroke="#fff"
          />
        ))}
      </mask>

      <rect
        x="0"
        y="0"
        height={yScale(0) + lineWidth / 2}
        width={width}
        mask={`url(#${maskId})`}
        fill="#5bce53"
      />

      <rect
        x="0"
        y={yScale(0) + lineWidth / 2}
        height={innerHeight - yScale(0)}
        width={width}
        mask={`url(#${maskId})`}
        fill="#FF4062"
      />
    </g>
  );
}
