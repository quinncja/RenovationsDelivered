import { ResponsiveLine } from '@nivo/line';
import { dollarFormatter, formatNumberShort } from "utils/formatters";

function RevenueLineChart({ data }) {
  const chartData = [
    {
      id: "Revenue",
      data: data.map(item => ({
        x: item.year,
        y: item.year === 2023 ? item.revenue + 3954081.79 : item.revenue
      }))
    }
  ];

  const customTooltip = ({ point }) => {
    const currentIndex = chartData[0].data.findIndex(item => item.x === point.data.x);
    
    let yoyGrowth = null;
    let growthColor = '#ffffff';
    
    if (currentIndex > 0) {
      const currentValue = point.data.y;
      const previousValue = chartData[0].data[currentIndex - 1].y;
      const growthPercent = ((currentValue - previousValue) / previousValue) * 100;
      
      yoyGrowth = growthPercent;
      growthColor = growthPercent >= 0 ? '#28a745' : '#dc3545';
    }

    return (
      <div className='tooltip' style={{zIndex: "100", position: "relative"}}>
        <h4>
          {point.data.x}
        </h4>
        <div style={{ 
          fontWeight: 700,
        }}>
          {dollarFormatter(point.data.y)}
        </div>
        {yoyGrowth !== null && (
          <div style={{ 
            color: growthColor,
            fontWeight: 600,
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>{yoyGrowth >= 0 ? '↗' : '↘'}</span>
            <span>{yoyGrowth >= 0 ? '+' : ''}{yoyGrowth.toFixed(1)}% YoY</span>
          </div>
        )}
        {yoyGrowth === null && (
          <div style={{ 
            color: '#8b949e',
            fontWeight: 500,
            fontSize: '12px'
          }}>
            Base year
          </div>
        )}
      </div>
    );
    
  };

  return (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 40, right: 15, bottom: 50, left: 40 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 0,
        tickPadding: 12,
        tickRotation: 0,
        legend: null,
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        tickValues: 4,
        legend: null,
        legendPosition: 'middle',
        format: (value) => `$${formatNumberShort(value)}`
      }}
      
      tooltip={customTooltip}
      
      pointSize={6}
      pointColor="#ffffff"
      pointBorderWidth={2}
      pointBorderColor="#28a745"
      pointLabelYOffset={-12}
      useMesh={true}
      
      colors={['#28a745']}
      lineWidth={3}
      
      enableArea={true}
      areaOpacity={0.2}
      areaBaselineValue={0}
      
      curve="catmullRom"
      
      enableGridX={false}
      enableGridY={true}
      gridYValues={5}
      
      theme={{
        background: 'transparent',
        text: {
          fontSize: 12,
          fill: '#586069',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        },
        axis: {
          domain: {
            line: {
              stroke: 'transparent',
              strokeWidth: 0
            }
          },
          legend: {
            text: {
              fontSize: 13,
              fill: '#24292e',
              fontWeight: 500
            }
          },
          ticks: {
            line: {
              strokeWidth: 1
            },
            text: {
              fontSize: 12,
              fill: '#acadae',
              fontWeight: 500
            }
          }
        },
        grid: {
          line: {
            stroke: "#acadae",
              strokeOpacity: 0.2,
          }
        },
        tooltip: {
          container: {
            zIndex: 9999,
          },
        },
        crosshair: {
          line: {
            stroke: '#28a745',
            strokeWidth: 1,
            strokeOpacity: 0.5
          }
        }
      }}
      
      legends={[]}
      
      animate={true}
      motionConfig={{
        mass: 1,
        tension: 120,
        friction: 14,
        clamp: false,
        precision: 0.01,
        velocity: 0
      }}
      
      enableCrosshair={true}
      crosshairType="bottom-left"
    />
  );
}

export default RevenueLineChart;