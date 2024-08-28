import React, { useMemo } from "react";

export default function AreaLayer(lineChartProps) {
  const { xScale, yScale, width, areaGenerator, innerHeight, data } =
    lineChartProps;
  const maskId = useMemo(
    () => `areaMask-${Math.random().toString(36).slice(2, 15)}`,
    []
  );

  return (
    <g>
      <mask id={maskId}>
        {data.map(({ id, data: d }) => (
          <path
            key={id}
            d={areaGenerator(
              d.map((dt) => ({ x: xScale(dt.x), y: yScale(dt.y) }))
            )}
            fill="#fff"
          />
        ))}
      </mask>

      <rect
        x="0"
        y="0"
        height={yScale(0)}
        width={width}
        mask={`url(#${maskId})`}
        fill="url(#positiveGradient)"
      />

      <rect
        x="0"
        y={yScale(0) + 0.1}
        height={innerHeight - yScale(0)}
        width={width}
        mask={`url(#${maskId})`}
        fill="url(#negativeGradient)"
      />
    </g>
  );
}
