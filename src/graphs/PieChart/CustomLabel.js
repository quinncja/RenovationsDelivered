import { useCSSVariable } from "utils/hooks/useCSSVariable";
import { useState, useRef, useEffect } from "react";

const CustomLabel = ({ datum, label, style }) => {
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);
  const arcLabelColor = useCSSVariable("--dark");

  const trimLabel = (label) => {
    return label
      .replace(/the/gi, "")
      .replace(/, inc/gi, "")
      .replace(/inc\./gi, "")
      .replace(/inc/gi, "")
      .replace(/llc/gi, "")
      .trim();
  };

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.getBBox().width);
    }
  }, [label]);

  return (
    <g transform={style.transform}>
      <rect
        x={-textWidth / 2 - 1}
        y={-8}
        width={textWidth + 2}
        height={16}
        fill={arcLabelColor}
        rx={2}
        ry={2}
      />
      <text
        ref={textRef}
        textAnchor="middle"
        dominantBaseline="central"
        transform={style.textPosition}
        style={{
          pointerEvents: "none",
          fill: datum.color,
          fontSize: "12px",
        }}
      >
        {trimLabel(label)}
      </text>
    </g>
  );
};

export default CustomLabel;
