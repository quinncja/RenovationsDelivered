import { Pie, ResponsivePie } from "@nivo/pie";
import { createPortal } from "react-dom";
import { useState } from "react";
import PieChartTooltips from "../Insights/PieChartTooltips";

function CompletionPie({ totalContracted, completedContracted }) {
  const [tooltip, setTooltip] = useState(null);

  if (!totalContracted || totalContracted <= 0) return null;

  const remainingContract = totalContracted - completedContracted;
  const completionPercentage = Math.round(
    (completedContracted / totalContracted) * 100,
  );

  const data = [
    {
      id: "completed",
      label: "Completed",
      value: completedContracted,
      color: "#475569",
    },
    {
      id: "remaining",
      label: "Remaining",
      value: remainingContract,
      color: "#2563eb",
    },
  ].filter((item) => item.value > 0);

  const getColor = (datum) => {
    return datum.data.color;
  };

  const CenterText = ({ centerX, centerY }) => {
    return (
      <g>
        <text
          x={centerX}
          y={centerY - 5}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            fill: "#ffffff",
          }}
        >
          {completionPercentage}%
        </text>
        <text
          x={centerX}
          y={centerY + 18}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: "14px",
            fontWeight: "500",
            fill: "#9ca3af",
          }}
        >
          Complete
        </text>
      </g>
    );
  };

  const theme = {
    tooltip: {
      container: {
        zIndex: 9999,
        position: "absolute",
      },
    },
  };

  return (
    <>
      <ResponsivePie
        data={data}
        onMouseEnter={(data, event) => {
          setTooltip({
            datum: {
              id: data.label,
              value: data.value,
              color: data.data.color,
            },
            x: event.clientX,
            y: event.clientY,
          });
        }}
        onMouseMove={(data, event) => {
          setTooltip({
            datum: {
              id: data.label,
              value: data.value,
              color: data.data.color,
            },
            x: event.clientX,
            y: event.clientY,
          });
        }}
        onMouseLeave={() => setTooltip(null)}
        margin={{ left: 20, top: 20, bottom: 20, right: 20 }}
        colors={getColor}
        innerRadius={0.6}
        padAngle={2}
        cornerRadius={4}
        activeOuterRadiusOffset={8}
        borderWidth={2}
        borderColor={{
          from: "color",
          modifiers: [["darker", "0.2"]],
        }}
        enableArcLabels={false}
        enableArcLinkLabels={false}
        animate={true}
        theme={theme}
        layers={["arcs", "arcLabels", "arcLinkLabels", "legends", CenterText]}
      />
      {tooltip &&
        createPortal(
          <div
            style={{
              position: "fixed",
              left: tooltip.x,
              top: tooltip.y - 10,
              zIndex: 9999,
              pointerEvents: "none",
              transform: "translate(-50%, -100%)",
              transition: "left 0.2s ease-out, top 0.2s ease-out",
              opacity: 1,
            }}
          >
            <PieChartTooltips
              datum={tooltip.datum}
              sum={totalContracted}
              color={tooltip.datum.color}
            />
          </div>,
          document.body,
        )}
    </>
  );
}

export default CompletionPie;
