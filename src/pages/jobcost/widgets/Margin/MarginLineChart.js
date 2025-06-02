import { ResponsiveLine } from '@nivo/line';
import { linearGradientDef } from '@nivo/core';
import { line, curveCardinal } from 'd3-shape';
import { displayMargin } from "utils/funcs";
import { dollarFormatter, yearPhaseToStr } from "utils/formatters";

function MarginAreaLayer(lineChartProps) {
  const { xScale, yScale, width, innerHeight, data } = lineChartProps;
  
  const marginSeries = data.find(series => series.id === "Margin %");
  if (!marginSeries) return null;
  
  const lineGenerator = line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(curveCardinal);
  
  const points = marginSeries.data.map(point => ({
    x: xScale(point.x),
    y: yScale(point.y)
  }));
  
  const rawThresholdY = yScale(20);
  const thresholdY = Math.max(0, Math.min(rawThresholdY, innerHeight));
  
  const marginLinePath = lineGenerator(points);
  
  return (
    <g>
      <defs>
        <mask id="belowLineMask">
          <path
            d={`${marginLinePath} L${points[points.length - 1].x},${innerHeight} L${points[0].x},${innerHeight} Z`}
            fill="#fff"
          />
        </mask>
        
        <mask id="aboveLineMask">
          <path
            d={`${marginLinePath} L${points[points.length - 1].x},0 L${points[0].x},0 Z`}
            fill="#fff"
          />
        </mask>
      </defs>
      
      {rawThresholdY >= 0 && rawThresholdY <= innerHeight && (
        <rect
          x="0"
          y="0"
          height={thresholdY}
          width={width}
          mask="url(#belowLineMask)"
          fill="url(#positiveGradient)"
        />
      )}
      
      <rect
        x="0"
        y={thresholdY}
        height={innerHeight - thresholdY}
        width={width}
        mask="url(#aboveLineMask)"
        fill="url(#negativeGradient)"
      />
    </g>
  );
}

function MarginLineLayer(lineChartProps) {
  const { xScale, yScale, width, innerHeight, data, lineWidth = 3 } = lineChartProps;
  
  const marginSeries = data.find(series => series.id === "Margin %");
  
  const maskId = `lineMask-${Math.random().toString(36).slice(2, 15)}`;
  
  const thresholdY = yScale(20);
  
  const lineGenerator = line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(curveCardinal);
  
  return (
    <g>
      <defs>
        {marginSeries && (
          <mask id={maskId}>
            <path
              d={lineGenerator(marginSeries.data.map(point => ({
                x: xScale(point.x),
                y: yScale(point.y)
              })))}
              fill="none"
              strokeWidth={lineWidth}
              stroke="#fff"
            />
          </mask>
        )}
      </defs>
      
      {marginSeries && (
        <>
          <rect
            x="0"
            y="0"
            height={thresholdY + lineWidth / 2}
            width={width}
            mask={`url(#${maskId})`}
            fill="var(--green)"
          />
          
          <rect
            x="0"
            y={thresholdY + lineWidth / 2}
            height={innerHeight - thresholdY}
            width={width}
            mask={`url(#${maskId})`}
            fill="var(--red)"
          />
        </>
      )}
    </g>
  );
}

function MarginLineChart({ phaseData, marginColor}) {

  if(phaseData.length === 0) return;
  const maxMargin = Math.max(...phaseData.map(item => item.value));
  const minMargin = Math.min(...phaseData.map(item => item.value));

  const calculateChartBounds = (min, max) => {
    const range = max - min;
    const padding = Math.max(range * 0.1, 2); 
    
    const paddedMin = min - padding;
    const paddedMax = max + padding;
    
    return {
      min: Math.floor(paddedMin / 5) * 5, 
      max: Math.ceil(paddedMax / 5) * 5   
    };
  };
  
  
  const { min: chartMin, max: chartMax } = calculateChartBounds(minMargin, maxMargin);

  const getTickValues = () => {
    const totalPhases = phaseData.length;
    let step = 1;
    
    if (totalPhases > 25) {
      step = Math.ceil(totalPhases / 12); 
    } else if (totalPhases > 15) {
      step = Math.ceil(totalPhases / 16);  
    } else if (totalPhases > 10) {
      step = Math.ceil(totalPhases / 18);
    }
    
    return phaseData
      .filter((_, index) => index % step === 0)
      .map(item => item.phase.toUpperCase());
  };
  
  const chartData = [
    {
      id: "Margin %",
      data: phaseData.map(item => ({
        x: item.phase.toUpperCase(),
        y: item.value,
        rawValue: item.value,
        type: 'margin'
      }))
    }
  ];

  return (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 20, right: 15, bottom: 50, left: 40 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        max: chartMax,
        min: chartMin,
        stacked: false,
      }}
      yFormat=" >-.1f"
      
      defs={[
        linearGradientDef("positiveGradient", [
          { offset: 0, color: "var(--green)", opacity: 0.4 },
          { offset: 100, color: "var(--green)", opacity: 0 },
        ]),
        linearGradientDef("negativeGradient", [
          { offset: 0, color: "var(--red)", opacity: 0 },
          { offset: 100, color: "var(--red)", opacity: 0.4 },
        ]),
      ]}
      
      layers={[
        'grid',
        'axes', 
        MarginAreaLayer,
        MarginLineLayer,
        'points',
        'markers',
        'mesh',
        'crosshair', 
        'legends'
      ]}
      
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 0,
        tickPadding: 12,
        tickRotation: 0,
        legend: null,
        tickValues: getTickValues(),
        legendOffset: 36,
        legendPosition: 'middle',
        format: (value) => `${yearPhaseToStr(value)}`
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        tickValues: 4,
        legendOffset: -40,
        legendPosition: 'middle',
        format: (value) => `${Math.round(value)}%`
      }}
      
      markers={[
        {
          axis: 'y',
          value: 20,
          lineStyle: {
            stroke: '#acadae',
            opacity: .8,
            strokeWidth: 1,
            strokeDasharray: '4 2'
          },
          legendOrientation: 'horizontal',
          legendPosition: 'top-left',
          textStyle: {
            fill: 'var(--green)',
            fontSize: 11,
            fontWeight: 500
          }
        }
      ]}
      
      pointSize={6}
      pointColor="#ffffff"
      pointBorderWidth={2}
      pointBorderColor={(point) => {
        const marginValue = phaseData[point.index]?.value;
        return marginValue >= 20 ? 'var(--green)' : 'var(--red)';
      }}
      pointLabelYOffset={-12}
      useMesh={true}
      
      colors={[marginColor]}
      lineWidth={3}
      
      enableArea={false}
      
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
        crosshair: {
          line: {
            stroke: '#acadae',
            opacity: .8,
            strokeWidth: 1,
            strokeOpacity: 0.5
          }
        }
      }}
      
      tooltip={({ point }) => {
        const currentPhase = point.data.x;
        const phaseIndex = phaseData.findIndex(item => item.phase.toUpperCase() === currentPhase);
        const currentPhaseData = phaseData[phaseIndex];
        
        const marginValue = currentPhaseData.value;
        const marginAmount = currentPhaseData.TotalContract - currentPhaseData.TotalCost;        
        
        let marginChange = null;
        let marginChangeColor = '#ffffff';
        
        if (phaseIndex > 0) {
          const previousPhaseData = phaseData[phaseIndex - 1];
          marginChange = marginValue - previousPhaseData.value;
          marginChangeColor = marginChange >= 0 ? 'var(--green)' : 'var(--red)';
        }
        
        return (
          <div className='tooltip' style={{minWidth: "100px"}}>
            <h4>{yearPhaseToStr(currentPhase)}</h4>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexDirection: "row",
              gap: "5px"
            }}>
              <span style={{ fontWeight: 700, fontSize: '18px' }}>
                {displayMargin(marginValue)}
              </span>
              <h4 style={{ 
              }}>
                {dollarFormatter(marginAmount)}
              </h4>
            </div>
            
            {marginChange !== null && (
              <div style={{ 
                display: 'flex',
                justifyContent: 'flex-start',
                fontSize: '12px',
                fontWeight: 600
              }}>
                <div style={{ 
                  color: marginChangeColor,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>{marginChange >= 0 ? '↗' : '↘'}</span>
                  <span>{marginChange >= 0 ? '+' : ''}{marginChange.toFixed(1)}% from previous</span>
                </div>
              </div>
            )}
            
            {marginChange === null && (
              <div style={{ 
                color: '#8b949e',
                fontWeight: 500,
                fontSize: '12px'
              }}>
                First phase
              </div>
            )}
          </div>
        );
      }}
      animate={true}
      motionConfig={{
        mass: 1.5,     
        tension: 100,   
        friction: 20,   
        clamp: false,
        precision: 0.001,
        velocity: 0
      }}
      enableCrosshair={true}
      crosshairType="bottom-left"
    />
  );
}

export default MarginLineChart;