import { ResponsiveBar } from "@nivo/bar";
import {
  formatNumberShort,
  phaseToMonth,
  phaseToShortMonth,
} from "@shared/utils/functions";
import { useDashboard } from "@features/dashboard/context/DashboardContext";

function BarChartOpen({ data, focused }) {
  const year = new Date().getFullYear();
  const lastYear = year - 1;
  const { updateFocusedPhaseCount } = useDashboard();

  const phaseData = data
    .filter((item) => item.phase !== "total")
    .filter(
      (item) =>
        item.current_year_open > 0 ||
        item.current_year_closed > 0 ||
        item.previous_year_open > 0 ||
        item.previous_year_closed > 0,
    )
    .reduce((acc, item) => {
      const phaseNum = parseInt(item.phase);
      const normalizedPhase =
        phaseNum === 0 || phaseNum > 12 ? "13" : item.phase;

      const existingIndex = acc.findIndex((p) => p.phase === normalizedPhase);

      if (existingIndex >= 0) {
        acc[existingIndex].current_year_open += item.current_year_open;
        acc[existingIndex].current_year_closed += item.current_year_closed;
        acc[existingIndex].previous_year_open += item.previous_year_open;
        acc[existingIndex].previous_year_closed += item.previous_year_closed;
        acc[existingIndex].previous_year_total =
          acc[existingIndex].previous_year_open +
          acc[existingIndex].previous_year_closed;
        acc[existingIndex].total =
          acc[existingIndex].current_year_open +
          acc[existingIndex].current_year_closed;
      } else {
        acc.push({
          phase: normalizedPhase,
          phaseNum: normalizedPhase === "13" ? 13 : parseInt(normalizedPhase),
          current_year_open: item.current_year_open,
          current_year_closed: item.current_year_closed,
          previous_year_open: item.previous_year_open || 0,
          previous_year_closed: item.previous_year_closed || 0,
          previous_year_total:
            (item.previous_year_open || 0) + (item.previous_year_closed || 0),
          total: item.current_year_open + item.current_year_closed,
        });
      }

      return acc;
    }, [])
    .sort((a, b) => a.phaseNum - b.phaseNum);

  const CustomTooltip = ({ id, value, color, data }) => (
    <div className="tooltip">
      <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
        {data.phase === "13" ? "Other Phases" : phaseToMonth(data.phase)}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "4px",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: color,
            borderRadius: "2px",
          }}
        />
        <span style={{ textTransform: "capitalize", fontWeight: "500" }}>
          {value} {id === "current_year_open" ? "Active" : "Completed"}
        </span>
      </div>
      <h4 style={{ color: "white" }}>
        {year}: {data.total} phases
      </h4>
      <h4>
        {lastYear}: {data.previous_year_total} phases
      </h4>
    </div>
  );

  const LineLayer = ({ bars, xScale, yScale, innerHeight, innerWidth }) => {
    const lineData = phaseData
      .map((d, i) => {
        const barData = bars.find((bar) => bar.data.indexValue === d.phase);
        if (!barData) return null;

        return {
          x: barData.x + barData.width / 2,
          y: yScale(d.previous_year_total),
          data: d,
        };
      })
      .filter(Boolean);

    if (lineData.length < 2) return null;

    const catmullRom = (p0, p1, p2, p3, t) => {
      const v0 = (p2.x - p0.x) * 0.5;
      const v1 = (p3.x - p1.x) * 0.5;
      const t2 = t * t;
      const t3 = t * t2;

      const x =
        p1.x +
        v0 * t +
        (3 * (p2.x - p1.x) - 2 * v0 - v1) * t2 +
        (2 * (p1.x - p2.x) + v0 + v1) * t3;

      const v0y = (p2.y - p0.y) * 0.5;
      const v1y = (p3.y - p1.y) * 0.5;
      const y =
        p1.y +
        v0y * t +
        (3 * (p2.y - p1.y) - 2 * v0y - v1y) * t2 +
        (2 * (p1.y - p2.y) + v0y + v1y) * t3;

      return { x, y };
    };

    const createCatmullRomPath = (points) => {
      if (points.length < 2) return "";

      let path = `M ${points[0].x} ${points[0].y}`;

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = i > 0 ? points[i - 1] : points[0];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 =
          i < points.length - 2 ? points[i + 2] : points[points.length - 1];

        const segments = 20;
        for (let j = 0; j <= segments; j++) {
          const t = j / segments;
          const point = catmullRom(p0, p1, p2, p3, t);
          path += ` L ${point.x} ${point.y}`;
        }
      }

      return path;
    };

    return (
      <g>
        <path
          d={createCatmullRomPath(lineData)}
          fill="none"
          stroke="#ff6b6b"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {lineData.map((point, i) => (
          <g key={i}>
            <circle cx={point.x} cy={point.y} r={12} fill="transparent" />
            <circle
              cx={point.x}
              cy={point.y}
              r={3}
              fill="#ffffff"
              stroke="#ff6b6b"
              strokeWidth={2}
              style={{ pointerEvents: "none" }}
            />
          </g>
        ))}
      </g>
    );
  };

  const handleClick = (e) => {
    const textStatus = e.id.split("_")[2];
    const status = textStatus === "closed" ? 5 : 4;
    const phase = e.data.phaseNum;
    updateFocusedPhaseCount({ status, phase, textStatus });
  };

  const getColor = (datum) => {
    if (!focused)
      return datum.id === "current_year_open" ? "var(--open)" : "var(--closed)";
    else if (
      focused.textStatus === datum.id.split("_")[2] &&
      focused.phase === datum.data.phaseNum
    )
      return datum.id === "current_year_open" ? "var(--open)" : "var(--closed)";
    else return "#212831";
  };

  return (
    <>
      <ResponsiveBar
        data={phaseData}
        keys={["current_year_open", "current_year_closed"]}
        indexBy="phase"
        margin={{ top: 10, right: 30, bottom: 25, left: 43 }}
        padding={0.25}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={(datum) => getColor(datum)}
        onClick={handleClick}
        enableGridY={true}
        gridYValues={5}
        borderWidth={0}
        borderColor={{ from: "color", modifiers: [["darker", "0.3"]] }}
        axisTop={null}
        axisRight={null}
        borderRadius={3}
        innerPadding={2}
        axisLeft={{
          tickSize: 0,
          tickPadding: 5,
          tickValues: 5,
          format: (value) => formatNumberShort(value),
        }}
        axisBottom={{
          tickSize: 0,
          tickPadding: 8,
          format: (value) => phaseToShortMonth(value),
        }}
        tooltip={CustomTooltip}
        enableLabel={true}
        label={(d) => (d.value > 0 ? d.value : "")}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#ffffff"
        layers={[
          "grid",
          "axes",
          "bars",
          LineLayer,
          "labels",
          "markers",
          "legends",
          "annotations",
        ]}
        theme={{
          background: "transparent",
          grid: {
            line: {
              stroke: "#acadae",
              strokeOpacity: 0.3,
            },
          },
          axis: {
            ticks: {
              line: {
                strokeWidth: 1,
                stroke: "#acadae",
              },
              text: {
                fontSize: 12,
                fill: "#acadae",
                fontWeight: "500",
              },
            },
            legend: {
              text: {
                fontSize: 14,
                fontWeight: 600,
                fill: "#acadae",
              },
            },
          },
          labels: {
            text: {
              fontSize: 12,
              fontWeight: "600",
            },
          },
        }}
        animate={false}
        motionConfig="gentle"
      />
    </>
  );
}

export default BarChartOpen;
