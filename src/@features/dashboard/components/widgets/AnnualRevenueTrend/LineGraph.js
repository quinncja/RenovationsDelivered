import { useDashboard } from "@features/dashboard/context/DashboardContext";
import { ResponsiveLine } from "@nivo/line";
import { dollarFormatter, formatNumberShort, phaseToFullMonth } from "@shared/utils/functions";

function LineGraph({ data }) {
  const {getOpenMonthIncome } = useDashboard();
  const { openMonthOverUnder, openMonthIncome, openMonthPeriod, openMonthYear } = getOpenMonthIncome();

  const chartData = [
    {
      id: "Revenue",
      data: data.map((item) => {
        const isOverUnderYear = item.year === openMonthYear;
        
        return {
          x: isOverUnderYear ? `${item.year}*` : item.year,
          y: isOverUnderYear ? item.revenue + openMonthOverUnder + openMonthIncome : item.revenue,
          invoicedRevenue: item.revenue, 
          hasOverUnder: isOverUnderYear,
          openMonthAmount: isOverUnderYear ? openMonthOverUnder + openMonthIncome : 0,
          openMonthPeriod: isOverUnderYear ? openMonthPeriod : null,
        };
      }),
    },
  ];

  const customTooltip = ({ point }) => {
    const currentIndex = chartData[0].data.findIndex(
      (item) => item.x === point.data.x,
    );

    let yoyGrowth = null;
    let growthColor = "#ffffff";

    if (currentIndex > 0) {
      const currentValue = point.data.y;
      const previousValue = chartData[0].data[currentIndex - 1].y;
      const growthPercent =
        ((currentValue - previousValue) / previousValue) * 100;

      yoyGrowth = growthPercent;
      growthColor = growthPercent >= 0 ? "#28a745" : "#dc3545";
    }

    return (
      <div className="tooltip" style={{ zIndex: "100", position: "relative" }}>
        <h4>
          {typeof point.data.x === 'string' ? point.data.x.replace('*', '') : point.data.x}
          {point.data.hasOverUnder && (
            <span style={{ 
              fontSize: "10px", 
              color: "#8b949e", 
              marginLeft: "4px",
              fontWeight: 500 
            }}>
              (In Progress)
            </span>
          )}
        </h4>
        
        {point.data.hasOverUnder && (
          <>
              <div style={{ fontWeight: 700, textAlign: "right", width: "100%" }}>
                {dollarFormatter(point.data.invoicedRevenue)}
              </div>
            
            <div style={{display: "flex", flexDirection: "column", gap: '2px', alignContent: "flex-end", width: '100%'}}>
                <div style={{ 
                  fontWeight: 700, 
                  color: "#28a745", 
                  textAlign: "right",
                  width: "100%" 
                }}>
                  + {dollarFormatter(point.data.openMonthAmount)}
                </div>
                <div style={{ 
                  fontSize: "11px", 
                  color: "#8b949e",
                  paddingBottom: "15px", 
                  marginBottom: "10px",
                  textAlign: "right",
                  width: "100%",
                  borderBottom: "1px solid var(--fancy-border)"
                }}>
                  {phaseToFullMonth(openMonthPeriod)} Income
                </div>
              </div>
              </>
        )}
        <div div style={{ fontWeight: 700 }}>
            {dollarFormatter(point.data.y)}
        </div>
        
        {yoyGrowth !== null && (
          <div
            style={{
              color: growthColor,
              fontWeight: 600,
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "3px",
            }}
          >
            <span>{yoyGrowth >= 0 ? "↗" : "↘"}</span>
            <span>
              {yoyGrowth >= 0 ? "+" : ""}
              {yoyGrowth.toFixed(1)}% YoY
            </span>
          </div>
        )}
        {yoyGrowth === null && (
          <div
            style={{
              color: "#8b949e",
              fontWeight: 500,
              fontSize: "12px",
              marginTop: "3px",
            }}
          >
            Base year
          </div>
        )}
      </div>
    );
  };

  return (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 40, right: 15, bottom: 50, left: 45 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        stacked: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 12,
        tickRotation: 0,
        legend: null,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        tickValues: 4,
        legend: null,
        legendPosition: "middle",
        format: (value) => `$${formatNumberShort(value)}`,
      }}
      pointSize={4}
      pointColor="#ffffff"
      pointBorderWidth={2}
      pointBorderColor="#28a745"
      pointLabelYOffset={-12}
      useMesh={false}
      enableSlices="x"
      sliceTooltip={({ slice }) => {
        const point = slice.points[0];
        return customTooltip({ point });
      }}
      colors={["#28a745"]}
      lineWidth={2}
      enableArea={true}
      areaOpacity={0.2}
      areaBaselineValue={0}
      curve="catmullRom"
      enableGridX={false}
      enableGridY={true}
      gridYValues={5}
      theme={{
        background: "transparent",
        text: {
          fontSize: 12,
          fill: "#586069",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        axis: {
          domain: {
            line: {
              stroke: "transparent",
              strokeWidth: 0,
            },
          },
          legend: {
            text: {
              fontSize: 13,
              fill: "#24292e",
              fontWeight: 500,
            },
          },
          ticks: {
            line: {
              strokeWidth: 1,
            },
            text: {
              fontSize: 12,
              fill: "#acadae",
              fontWeight: 500,
            },
          },
        },
        grid: {
          line: {
            stroke: "#acadae",
            strokeOpacity: 0.2,
          },
        },
        tooltip: {
          container: {
            zIndex: 9999,
          },
        },
        crosshair: {
          line: {
            stroke: "#28a745",
            strokeWidth: 1,
            strokeOpacity: 0.5,
          },
        },
      }}
      legends={[]}
      animate={true}
      motionConfig={{
        mass: 1,
        tension: 120,
        friction: 14,
        clamp: false,
        precision: 0.01,
        velocity: 0,
      }}
      enableCrosshair={true}
      crosshairType="bottom-left"
      pointSymbol={({ datum, size, color, borderWidth, borderColor }) => {
        const isOverUnderPoint = datum.hasOverUnder;
        
        if (isOverUnderPoint) {
          return (
            <g>
              <circle
                className="pulse-ring-outer"
                r={8}
                fill="none"
                stroke="#28a745"
                strokeWidth={1}
                strokeOpacity={0.25}
                style={{
                  animation: 'pulseOuter 3s cubic-bezier(0.4, 0, 0.2, 1) infinite'
                }}
              />
              
              <circle
                className="pulse-ring-inner"
                r={6}
                fill="#28a745"
                fillOpacity={0.08}
                style={{
                  animation: 'pulseInner 3s cubic-bezier(0.4, 0, 0.2, 1) infinite'
                }}
              />
              
              <circle
                r={size / 2}
                fill="#ffffff"
                style={{
                  animation: 'pulseCore 3s ease-in-out infinite'
                }}
              />
              
              <circle
                r={size / 2}
                fill="none"
                stroke="#ffffff"
                strokeWidth={borderWidth}
              />
            </g>
          );
        }
        
        return (
          <circle
            r={size / 2}
            fill={borderColor}
            stroke={borderColor}
            strokeWidth={borderWidth}
          />
        );
      }}
    />
  );
}

export default LineGraph;
