import { Pie } from "@nivo/pie";
import { createPortal } from "react-dom";
import { useState } from "react";
import { getColor } from "utils/colors";
import PieChartTooltips from "./PieChartTooltips";
import { useProjectContext } from "context/ProjectContext";
import getVenderLabel from "./Label";
import { useHome } from "context/HomeContext";

function PieChart({ data, type, pageId }) {
  const { getJobStr } = useProjectContext();
  const { openDetailPage } = useHome();
  const [tooltip, setTooltip] = useState(null);

  if (!data) return;

  const slicedData = data.slice(0, 20);

  const sumValues = (array) => {
    if (!array || !Array.isArray(array)) {
      return 0;
    }
    return array.reduce((sum, obj) => sum + (obj.value || 0), 0);
  };

  const handleDetailClick = (e, datum) => {
    const detailId = datum.data.detailId;
    const id = datum.data.id;
    e.stopPropagation();
    openDetailPage(pageId, {
      id: detailId,
      value: type === "Project" ? getJobStr(detailId) : id,
    });
  };

  const sum = sumValues(data);

  const getName = (datum) => {
    return type === "Project"
      ? getJobStr(datum.data.detailId)
      : type === "Vender"
        ? getVenderLabel(datum)
        : datum.id;
  };

  const label = (datum) => {
    const name = getName(datum);
    return name && name.length > 20 ? name.substring(0, 20) + "..." : name;
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
      <Pie
        height={320}
        width={330}
        data={slicedData}
        onMouseEnter={(data, event) => {
          setTooltip({
            datum: {
              ...data,
              id: getName(data),
            },
            x: event.clientX,
            y: event.clientY,
          });
        }}
        onMouseMove={(data, event) => {
          setTooltip({
            datum: {
              ...data,
              id: getName(data),
            },
            x: event.clientX,
            y: event.clientY,
          });
        }}
        onMouseLeave={() => setTooltip(null)}
        margin={{ left: 10, top: 10, bottom: 10, right: 10 }}
        colors={(datum) => getColor(getName(datum))}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", "0.3"]],
        }}
        onClick={(datum, e) => handleDetailClick(e, datum)}
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
            <PieChartTooltips datum={tooltip.datum} sum={sum} />
          </div>,
          document.body,
        )}
    </>
  );
}

export default PieChart;
