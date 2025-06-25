import { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { displayMargin, getMarginClass } from "utils/funcs";
import { dollarFormatter, phaseNumToMonth, phaseToShortMonth } from "utils/formatters";

function MarginBarChart({ data, marginColor }) {
  const [hoveredId, setHoveredId] = useState(null);

  const phaseData = data
    .filter((item) => item.id !== "total")
    .sort((a, b) => a.phase.localeCompare(b.phase));

  const phaseDataMap = new Map();
  phaseData.forEach((item) => {
    const phaseNum = item.phase.slice(1); 
    phaseDataMap.set(phaseNum, item);
  });

  const allPhases = [];
  for (let i = 1; i <= 12; i++) {
    const phaseKey = i.toString().padStart(2, '0');
    const existingData = phaseDataMap.get(phaseKey);
    
    if (existingData) {
      allPhases.push({
        phase: `P${phaseKey}`,
        margin: existingData.value,
        TotalContract: existingData.TotalContract,
        TotalCost: existingData.TotalCost,
        hasData: true,
        hoverValue: 100
      });
    } else {
      allPhases.push({
        phase: `P${phaseKey}`,
        margin: 0,
        TotalContract: 0,
        TotalCost: 0,
        hasData: false,
        hoverValue: 100
      });
    }
  }

  const actualMargins = phaseData.map((item) => item.value);
  const maxMargin = actualMargins.length > 0 ? Math.max(...actualMargins) : 25;
  
  const calculateChartMax = (max) => {
    const padding = Math.max(max * 0.1, 2);
    const paddedMax = max + padding;
    return Math.ceil(paddedMax / 5) * 5;
  };

  const chartMax = calculateChartMax(maxMargin);

  const getBarColor = (margin) => {
    if (margin < 0) return "#e6204a";
    else if (margin > 25) return "#28a745";
    else if (margin > 20) return "#e6c935";
    else return "#ff7d35";
  };

  const CustomBarLayer = ({ bars }) => {
    return (
      <g>
        {bars.map((bar, index) => {
          const phaseData = allPhases.find(p => p.phase === bar.data.indexValue);
          
          if (!phaseData || !phaseData.hasData) {
            return null;
          }

          const marginPercent = phaseData.margin / chartMax;
          const actualBarHeight = bar.height * marginPercent;
          const actualBarY = bar.y + bar.height - actualBarHeight;
          
          return (
            <g key={`margin-bar-${bar.data.indexValue}`}>
              <rect
                x={bar.x}
                y={actualBarY}
                width={bar.width}
                height={actualBarHeight}
                fill={getBarColor(phaseData.margin)}
                rx={3}
                ry={3}
                style={{pointerEvents: "none"}}
              />
              
              {phaseData.margin > 0 && actualBarHeight > 15 && (
                <text
                  x={bar.x + bar.width / 2}
                  y={actualBarY + actualBarHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="600"
                  style={{pointerEvents: "none"}}
                >
                  {Math.round(phaseData.margin)}%
                </text>
              )}
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <ResponsiveBar
      data={allPhases}
      keys={['hoverValue']}
      indexBy="phase"
      margin={{ top: 40, right: 15, bottom: 50, left: 40 }}
      padding={0.25}
      valueScale={{ type: 'linear', min: 0, max: 100 }}
      indexScale={{ type: 'band', round: true }}
      colors={(bar) => hoveredId === bar.indexValue ? '#191f27' : 'var(--dark)'}
      borderWidth={0}
      borderRadius={0}
      innerPadding={2}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 8,
        format: (value) => {
          const phaseNum = value.slice(-2);
          return phaseToShortMonth(phaseNum);
        }
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        tickValues: 5,
        format: (value) => `${Math.round((value / 100) * chartMax)}%`
      }}
      layers={[
        'bars',
        'grid',
        'axes', 
        'markers',
        CustomBarLayer,
      ]}
      markers={[
        {
          axis: 'y',
          value: (20 / chartMax) * 100,
          lineStyle: {
            stroke: '#acadae',
            opacity: 0.8,
            strokeWidth: 1,
            strokeDasharray: '4 2',
            pointerEvents: 'none',
          },
          legendOrientation: 'horizontal',
          legendPosition: 'top-left',
          textStyle: {
            fill: '#28a745',
            fontSize: 11,
            fontWeight: 500
          }
        }
      ]}
      enableGridX={false}
      enableGridY={true}
      gridYValues={5}
      enableLabel={false}
      onMouseEnter={(data, event) => {
        setHoveredId(data.indexValue);
      }}
      onMouseLeave={() => {
        setHoveredId(null);
      }}
      theme={{
        background: 'transparent',
        grid: {
          line: {
            stroke: '#acadae',
            pointerEvents: 'none',
            strokeOpacity: 0.3
          }
        },
        axis: {
          ticks: {
            line: {
              strokeWidth: 1,
              stroke: '#acadae',
            },
            text: {
              fontSize: 12,
              fill: '#acadae',
              fontWeight: '500'
            }
          },
          legend: {
            text: {
              fontSize: 14,
              fontWeight: 600,
              fill: '#acadae'
            }
          }
        },
        labels: {
          text: {
            fontSize: 12,
            fontWeight: '600'
          }
        }
      }}
      tooltip={({ indexValue, value, data: barData }) => {
        const currentPhase = allPhases.find(p => p.phase === indexValue);
        
        if (!currentPhase?.hasData) {
          return (
            <div className="tooltip">
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
              {phaseNumToMonth(indexValue.slice(1,3))}
              </div>
              <div style={{ color: "#8b949e", fontWeight: 500, fontSize: "12px" }}>
                No data available
              </div>
            </div>
          );
        }

        const marginValue = currentPhase.margin;
        const marginAmount = currentPhase.TotalContract - currentPhase.TotalCost;
        
        const currentIndex = allPhases.findIndex(p => p.phase === indexValue);
        let marginChange = null;
        let marginChangeColor = "#ffffff";
        
        for (let i = currentIndex - 1; i >= 0; i--) {
          if (allPhases[i].hasData) {
            marginChange = marginValue - allPhases[i].margin;
            marginChangeColor = marginChange >= 0 ? "#28a745" : "#e6204a";
            break;
          }
        }

        return (
          <div className="tooltip">
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
              {phaseNumToMonth(indexValue.slice(1,3))}
            </div>
            <div style={{
                display: 'flex', flexDirection: 'column', gap: "5px", marginBottom: "4px" 
            }}> 
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              gap: "5px",
            }}>
              <span className={`${getMarginClass(marginValue)}`} style={{ fontWeight: 700, fontSize: "16px" }}>
                {displayMargin(marginValue)}
              </span>
            </div>
            <h4 style={{color: "white"}}> <span > {dollarFormatter(marginAmount)} </span> profit </h4>
            </div>
            {marginChange !== null && (
              <div style={{
                display: "flex",
                justifyContent: "flex-start",
                fontSize: "12px",
                fontWeight: 600
              }}>
                <div style={{
                  color: marginChangeColor,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  <span>{marginChange >= 0 ? "↗" : "↘"}</span>
                  <span>
                    {marginChange >= 0 ? "+" : ""}
                    {marginChange.toFixed(1)}% from previous
                  </span>
                </div>
              </div>
            )}

            {marginChange === null && (
              <div style={{
                color: "#8b949e",
                fontWeight: 500,
                fontSize: "12px"
              }}>
                First phase with data
              </div>
            )}
          </div>
        );
      }}
      animate={false}
      motionConfig="gentle"
    />
  );
}

export default MarginBarChart;