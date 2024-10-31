import React from "react";
import { percentFomatter } from "utils/formatters";
import { useCSSVariable } from "utils/hooks/useCSSVariable";

export const CenterPercent = ({ centerX, centerY, percent }) => {
  function trimPercent(str) {
    if (str.length <= 4) {
      return "";
    }
    return str.slice(0, -4);
  }

  percent = trimPercent(percentFomatter(percent));

  let fontColor = useCSSVariable("--white");

  return (
    <svg>
      <text
        x={centerX}
        y={centerY - 55}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          letterSpacing: "-1px",
          fill: fontColor,
        }}
      >
        {percent}%
      </text>
      <text
        x={centerX}
        y={centerY - 22}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: `16px`,
          fontWeight: "500",
          fill: fontColor,
          letterSpacing: "0px",
        }}
      >
        Closed under budget
      </text>
    </svg>
  );
};
